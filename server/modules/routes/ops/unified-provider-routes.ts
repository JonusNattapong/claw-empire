import { UnifiedProviderManager } from "../../workflow/agents/providers/unified-provider-manager.ts";
import type { RuntimeContext } from "../../../types/runtime-context.ts";
import type { Request, Response } from "express";

interface QueryParams {
  [key: string]: string | string[] | undefined;
}

export function registerUnifiedProviderRoutes(ctx: RuntimeContext): void {
  const { app } = ctx;
  const unifiedManager = new UnifiedProviderManager();

  // Get all providers with their capabilities
  app.get("/api/providers", (req: Request<QueryParams>, res: Response) => {
    try {
      const providers = unifiedManager.getAllProviders();
      
      // Add execution method info for each provider
      const providersWithExecution = providers.map(provider => {
        const execution = unifiedManager.getOptimalExecutionMethod(provider.id);
        const validation = unifiedManager.validateProviderSetup(provider.id);
        
        return {
          ...provider,
          executionMethod: execution.method,
          executionReason: execution.reason,
          setupValid: validation.valid,
          setupIssues: validation.issues
        };
      });

      res.json({ providers: providersWithExecution });
    } catch (err) {
      res.status(500).json({ error: "providers_fetch_failed", message: String(err) });
    }
  });

  // Get optimal execution method for a specific provider and model
  app.get("/api/providers/:providerId/execution-method", (req: Request<QueryParams>, res: Response) => {
    try {
      const { providerId } = req.params;
      const model = req.query.model;
      
      // Handle both string and string[] for model parameter
      let modelStr: string;
      if (Array.isArray(model)) {
        modelStr = model[0] || '';
      } else if (typeof model === 'string') {
        modelStr = model;
      } else {
        modelStr = '';
      }
      
      const execution = unifiedManager.getOptimalExecutionMethod(providerId, modelStr);
      const summary = unifiedManager.getExecutionSummary(providerId, modelStr);
      
      res.json({
        providerId,
        model: model || null,
        executionMethod: execution.method,
        reason: execution.reason,
        summary
      });
    } catch (err) {
      res.status(500).json({ error: "execution_method_failed", message: String(err) });
    }
  });

  // Get recommended model for provider and task type
  app.get("/api/providers/:providerId/recommended-model", async (req: Request<QueryParams>, res: Response) => {
    try {
      const { providerId } = req.params;
      const taskType = req.query.taskType;
      
      // Handle both string and string[] for taskType parameter
      let taskTypeStr: string;
      if (Array.isArray(taskType)) {
        taskTypeStr = taskType[0] || 'general';
      } else if (typeof taskType === 'string') {
        taskTypeStr = taskType;
      } else {
        taskTypeStr = 'general';
      }
      
      const recommendedModel = unifiedManager.getRecommendedModel(providerId, taskTypeStr);
      const availableModels = await unifiedManager.getAvailableModels(providerId);
      
      res.json({
        providerId,
        taskType: taskType || 'general',
        recommendedModel,
        availableModels
      });
    } catch (err) {
      res.status(500).json({ error: "recommended_model_failed", message: String(err) });
    }
  });

  // Validate provider setup
  app.get("/api/providers/:providerId/validate", (req, res) => {
    try {
      const { providerId } = req.params;
      const validation = unifiedManager.validateProviderSetup(providerId);
      
      res.json({
        providerId,
        valid: validation.valid,
        issues: validation.issues
      });
    } catch (err) {
      res.status(500).json({ error: "validation_failed", message: String(err) });
    }
  });

  // Get provider comparison
  app.get("/api/providers/compare", (req, res) => {
    try {
      const { providerIds } = req.query;
      
      if (!providerIds || typeof providerIds !== 'string') {
        return res.status(400).json({ error: "providerIds parameter required" });
      }
      
      const ids = providerIds.split(',');
      const comparisons = ids.map(providerId => {
        const config = unifiedManager.getProviderConfig(providerId.trim());
        const execution = unifiedManager.getOptimalExecutionMethod(providerId.trim());
        const validation = unifiedManager.validateProviderSetup(providerId.trim());
        
        return {
          providerId: providerId.trim(),
          name: config?.name || 'Unknown',
          executionMethod: execution.method,
          executionReason: execution.reason,
          setupValid: validation.valid,
          setupIssues: validation.issues,
          capabilities: config?.capabilities || null
        };
      });
      
      res.json({ comparisons });
    } catch (err) {
      res.status(500).json({ error: "comparison_failed", message: String(err) });
    }
  });
}
