import type { RuntimeContext } from "../../../../types/runtime-context.ts";
import type { Agent, Task } from "../../../../../src/types/index.ts";
import { KiloModelManager, type KiloModel } from "./kilo-model-manager.ts";
import { UnifiedProviderManager } from "./unified-provider-manager.ts";

export interface KiloToolsParams {
  db: any;
  logsDir: string;
  activeProcesses: Map<number, any>;
  broadcast: (type: string, payload: any) => void;
  normalizeStreamChunk: (chunk: string) => string;
  handleTaskRunComplete: (...args: any[]) => void;
  createSafeLogStreamOps: any;
  parseSSEStream: any;
  getProviderModelConfig: (...args: any[]) => any;
  buildAgentArgs: (provider: string, model?: string, reasoningLevel?: string) => string[];
  spawnCliAgent: (...args: any[]) => any;
}

export function createKiloTools(params: KiloToolsParams) {
  const { 
    db, 
    logsDir, 
    activeProcesses, 
    broadcast, 
    normalizeStreamChunk, 
    handleTaskRunComplete, 
    createSafeLogStreamOps, 
    parseSSEStream,
    getProviderModelConfig,
    buildAgentArgs,
    spawnCliAgent
  } = params;

  const modelManager = new KiloModelManager();
  const unifiedManager = new UnifiedProviderManager();

  async function executeKiloAgent(agent: Agent, task: Task, model: string, onChunk: (chunk: string) => void): Promise<void> {
    // Get execution method from unified manager
    const execution = unifiedManager.getOptimalExecutionMethod('kilo', model);
    console.log(`[Kilo] ${execution.reason}`);
    
    // If should use native CLI, delegate to CLI
    if (execution.method === 'native-cli') {
      const nativeProvider = unifiedManager.mapProviderToCLI(model.split('/')[0]);
      if (!nativeProvider) {
        throw new Error(`Cannot map model ${model} to native CLI provider`);
      }
      
      console.log(`[Kilo] Using native CLI: ${nativeProvider} for model ${model}`);
      
      // Use native CLI instead of Kilo API
      const taskId = task.id;
      const projectPath = process.cwd(); // or resolve from task
      const logPath = `${logsDir}/${taskId}.log`;
      
      const child = spawnCliAgent(taskId, nativeProvider, task.title + (task.description ? "\n\n" + task.description : ""), projectPath, logPath, model);
      
      // Handle CLI output
      child.stdout?.on('data', (chunk: Buffer) => {
        const text = normalizeStreamChunk(chunk.toString());
        if (text) onChunk(text);
      });
      
      child.stderr?.on('data', (chunk: Buffer) => {
        const text = normalizeStreamChunk(chunk.toString());
        if (text) onChunk(text);
      });
      
      return new Promise((resolve, reject) => {
        child.on('close', (code: number | null) => {
          if (code === 0) resolve();
          else reject(new Error(`CLI process exited with code ${code}`));
        });
        child.on('error', reject);
      });
    }

    // Use Kilo API Gateway
    const kiloApiKey = process.env.KILO_API_KEY;
    if (!kiloApiKey) {
      throw new Error("KILO_API_KEY environment variable is required for Kilo provider");
    }

    const requestBody = {
      model: model,
      messages: [
        {
          role: "user",
          content: task.title + (task.description ? "\n\n" + task.description : "")
        }
      ],
      stream: true,
      temperature: 0.7
    };

    try {
      const response = await fetch("https://api.kilo.ai/api/gateway/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${kiloApiKey}`
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Kilo API error: ${response.status} - ${errorText}`);
      }

      // Parse SSE stream
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("No response body from Kilo API");
      }

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;
            
            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                onChunk(content);
              }
            } catch (e) {
              // Ignore parsing errors
            }
          }
        }
      }
    } catch (error) {
      console.error("[Kilo] Error executing agent:", error);
      throw error;
    }
  }

  async function launchKiloAgent(agent: Agent, task: Task, model: string): Promise<number> {
    const pid = -(Date.now() % 1_000_000);
    
    const processInfo = {
      pid,
      agentId: agent.id,
      taskId: task.id,
      provider: "kilo" as const,
      model,
      startTime: Date.now(),
      status: "running" as const,
      kill: async () => {
        // For API-based providers, we don't need to kill processes
        activeProcesses.delete(pid);
      }
    } as any; // Type assertion for flexible status

    activeProcesses.set(pid, processInfo);

    // Execute the agent
    executeKiloAgent(agent, task, model, (chunk: string) => {
      const normalizedChunk = normalizeStreamChunk(chunk);
      broadcast("cli_output", {
        agentId: agent.id,
        taskId: task.id,
        chunk: normalizedChunk,
        timestamp: Date.now()
      });
    }).then(() => {
      processInfo.status = "completed";
      handleTaskRunComplete(task.id, agent.id, "completed");
    }).catch((error) => {
      processInfo.status = "failed";
      console.error(`[Kilo] Agent ${agent.name} failed:`, error);
      handleTaskRunComplete(task.id, agent.id, "failed");
    });

    return pid;
  }

  async function getAvailableModels(): Promise<KiloModel[]> {
    return await modelManager.getModels();
  }

  async function getRecommendedModel(taskType?: string): Promise<string> {
    const models = await modelManager.getModels();
    const optimal = modelManager.getOptimalModelForTask(taskType || 'general');
    return optimal?.id || 'anthropic/claude-sonnet-4.5';
  }

  return {
    executeKiloAgent,
    launchKiloAgent,
    getAvailableModels,
    getRecommendedModel,
    modelManager
  };
}
