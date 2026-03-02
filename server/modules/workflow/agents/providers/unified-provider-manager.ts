import type { Agent, Task } from "../../../../../src/types/index.ts";
import { KiloModelManager, type KiloModel } from "./kilo-model-manager.ts";

interface ProviderCapabilities {
  supportsNativeCLI: boolean;
  supportsAPI: boolean;
  nativeCLIProvider?: string;
  apiEndpoint?: string;
  requiresAPIKey?: boolean;
}

interface ProviderConfig {
  id: string;
  name: string;
  capabilities: ProviderCapabilities;
  defaultModel: string;
  recommendedModels: string[];
}

export class UnifiedProviderManager {
  private kiloModelManager: KiloModelManager;
  private providerConfigs: Map<string, ProviderConfig>;

  constructor() {
    this.kiloModelManager = new KiloModelManager();
    this.providerConfigs = new Map();
    this.initializeProviderConfigs();
  }

  private initializeProviderConfigs() {
    // Kilo AI Gateway - พิเศษ models ทั้งหมดผ่าน API
    this.providerConfigs.set('kilo', {
      id: 'kilo',
      name: 'Kilo AI Gateway',
      capabilities: {
        supportsNativeCLI: false,
        supportsAPI: true,
        apiEndpoint: 'https://api.kilo.ai/api/gateway',
        requiresAPIKey: true
      },
      defaultModel: 'anthropic/claude-sonnet-4.5',
      recommendedModels: [
        'anthropic/claude-sonnet-4.5',
        'openai/gpt-4o',
        'google/gemini-2.5-pro',
        'corethink:free',
        'giga-potato'
      ]
    });

    // Claude - ใช้ native CLI ได้
    this.providerConfigs.set('claude', {
      id: 'claude',
      name: 'Claude',
      capabilities: {
        supportsNativeCLI: true,
        supportsAPI: true,
        nativeCLIProvider: 'claude',
        apiEndpoint: 'https://api.anthropic.com',
        requiresAPIKey: true
      },
      defaultModel: 'claude-opus-4-6',
      recommendedModels: [
        'claude-opus-4-6',
        'claude-sonnet-4-6'
      ]
    });

    // Codex - ใช้ native CLI ได้
    this.providerConfigs.set('codex', {
      id: 'codex',
      name: 'Codex',
      capabilities: {
        supportsNativeCLI: true,
        supportsAPI: true,
        nativeCLIProvider: 'codex',
        apiEndpoint: 'https://api.openai.com',
        requiresAPIKey: true
      },
      defaultModel: 'gpt-5.3-codex',
      recommendedModels: [
        'gpt-5.3-codex'
      ]
    });

    // Gemini - ใช้ native CLI ได้
    this.providerConfigs.set('gemini', {
      id: 'gemini',
      name: 'Gemini',
      capabilities: {
        supportsNativeCLI: true,
        supportsAPI: true,
        nativeCLIProvider: 'gemini',
        apiEndpoint: 'https://generativelanguage.googleapis.com',
        requiresAPIKey: true
      },
      defaultModel: 'gemini-3-pro-preview',
      recommendedModels: [
        'gemini-3-pro-preview'
      ]
    });

    // OpenCode - API only
    this.providerConfigs.set('opencode', {
      id: 'opencode',
      name: 'OpenCode',
      capabilities: {
        supportsNativeCLI: false,
        supportsAPI: true,
        apiEndpoint: 'https://api.opencode.ai',
        requiresAPIKey: true
      },
      defaultModel: 'github-copilot/claude-sonnet-4.6',
      recommendedModels: [
        'github-copilot/claude-sonnet-4.6'
      ]
    });

    // Copilot - API only
    this.providerConfigs.set('copilot', {
      id: 'copilot',
      name: 'GitHub Copilot',
      capabilities: {
        supportsNativeCLI: false,
        supportsAPI: true,
        apiEndpoint: 'https://api.githubcopilot.com',
        requiresAPIKey: true
      },
      defaultModel: 'github-copilot/claude-sonnet-4.6',
      recommendedModels: [
        'github-copilot/claude-sonnet-4.6',
        'github-copilot/gpt-4o'
      ]
    });

    // Antigravity - API only
    this.providerConfigs.set('antigravity', {
      id: 'antigravity',
      name: 'Antigravity',
      capabilities: {
        supportsNativeCLI: false,
        supportsAPI: true,
        apiEndpoint: 'https://antigravity.com',
        requiresAPIKey: true
      },
      defaultModel: 'google/antigravity-gemini-3-pro',
      recommendedModels: [
        'google/antigravity-gemini-3-pro',
        'google/antigravity-gemini-3-flash'
      ]
    });

    // API Provider - Generic API
    this.providerConfigs.set('api', {
      id: 'api',
      name: 'Custom API',
      capabilities: {
        supportsNativeCLI: false,
        supportsAPI: true,
        requiresAPIKey: true
      },
      defaultModel: 'gpt-4',
      recommendedModels: [
        'gpt-4',
        'claude-3-sonnet'
      ]
    });
  }

  getProviderConfig(providerId: string): ProviderConfig | undefined {
    return this.providerConfigs.get(providerId);
  }

  getAllProviders(): ProviderConfig[] {
    return Array.from(this.providerConfigs.values());
  }

  getOptimalExecutionMethod(
    providerId: string, 
    modelId?: string
  ): { method: 'native-cli' | 'api'; reason: string } {
    const config = this.getProviderConfig(providerId);
    if (!config) {
      return { method: 'api', reason: 'Unknown provider, falling back to API' };
    }

    // ถ้ามี modelId และเป็น Kilo model
    if (providerId === 'kilo' && modelId) {
      const provider = modelId.split('/')[0];
      
      // ตรวจสอบว่า provider นี้มี native CLI หรือไม่
      const nativeProvider = this.mapProviderToCLI(provider);
      if (nativeProvider && this.getProviderConfig(nativeProvider)?.capabilities.supportsNativeCLI) {
        return { 
          method: 'native-cli', 
          reason: `Using native CLI for ${provider} model via ${nativeProvider}` 
        };
      }
    }

    // ถ้า provider นี้สนับสนุน native CLI
    if (config.capabilities.supportsNativeCLI) {
      return { 
        method: 'native-cli', 
        reason: `Using native CLI for ${config.name}` 
      };
    }

    // ถ้า support API
    if (config.capabilities.supportsAPI) {
      return { 
        method: 'api', 
        reason: `Using API for ${config.name}` 
      };
    }

    return { method: 'api', reason: 'Falling back to API' };
  }

  mapProviderToCLI(provider: string): string | null {
    const mappings: Record<string, string> = {
      'anthropic': 'claude',
      'openai': 'codex',
      'google': 'gemini',
      'mistral': 'opencode',
      'deepseek': 'codex',
      'xai': 'codex',
      'cohere': 'codex',
      'meta': 'codex',
      'qwen': 'codex',
      'inflection': 'claude',
      'alibaba': 'codex'
    };
    
    return mappings[provider] || null;
  }

  async getAvailableModels(providerId: string): Promise<string[]> {
    const config = this.getProviderConfig(providerId);
    if (!config) return [];

    // สำหรับ Kilo - ดึง models จาก Kilo API
    if (providerId === 'kilo') {
      const models = await this.kiloModelManager.getModels();
      return models.map(m => m.id);
    }

    // สำหรับ provider อื่นๆ - ใช้ recommended models
    return config.recommendedModels;
  }

  getRecommendedModel(providerId: string, taskType?: string): string {
    const config = this.getProviderConfig(providerId);
    if (!config) return '';
    
    const defaultModel = config.defaultModel || '';

    const taskMappings: Record<string, string[]> = {
      'development': ['gpt', 'claude', 'codex', 'deepseek'],
      'design': ['claude', 'gemini', 'gpt'],
      'analysis': ['claude', 'gemini', 'gpt'],
      'documentation': ['claude', 'gpt', 'gemini'],
      'presentation': ['claude', 'gemini'],
      'general': ['claude', 'gpt', 'gemini']
    };

    const preferredTypes = taskMappings[taskType || 'general'];
    
    // สำหรับ Kilo - ใช้ model manager
    if (providerId === 'kilo') {
      const optimal = this.kiloModelManager.getOptimalModelForTask(taskType || 'general');
      return optimal?.id || (config.defaultModel || '');
    }

    // สำหรับ provider อื่นๆ - กรองจาก recommended models
    const filtered = config.recommendedModels.filter(model => {
      return preferredTypes.some(type => model.toLowerCase().includes(type));
    });

    return filtered[0] || (config.defaultModel || '');
  }

  shouldUseNativeCLI(providerId: string, modelId?: string): boolean {
    const execution = this.getOptimalExecutionMethod(providerId, modelId);
    return execution.method === 'native-cli';
  }

  validateProviderSetup(providerId: string): { valid: boolean; issues: string[] } {
    const config = this.getProviderConfig(providerId);
    const issues: string[] = [];

    if (!config) {
      issues.push(`Unknown provider: ${providerId}`);
      return { valid: false, issues };
    }

    // ตรวจสอบ API key สำหรับ providers ที่ต้องการ
    if (config.capabilities.requiresAPIKey) {
      if (providerId === 'kilo' && !process.env.KILO_API_KEY) {
        issues.push('KILO_API_KEY environment variable is required');
      }
      // สามารถเพิ่มการตรวจสอบสำหรับ provider อื่นๆ ได้
    }

    return { valid: issues.length === 0, issues };
  }

  getExecutionSummary(providerId: string, modelId?: string): string {
    const config = this.getProviderConfig(providerId);
    if (!config) return `Unknown provider: ${providerId}`;

    const execution = this.getOptimalExecutionMethod(providerId, modelId);
    const capabilities = [];

    if (config.capabilities.supportsNativeCLI) capabilities.push('Native CLI');
    if (config.capabilities.supportsAPI) capabilities.push('API');
    if (config.capabilities.requiresAPIKey) capabilities.push('API Key Required');

    return `${config.name}: ${execution.method} (${execution.reason}) | Capabilities: ${capabilities.join(', ')}`;
  }
}
