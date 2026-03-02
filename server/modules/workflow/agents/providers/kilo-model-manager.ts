// Kilo AI Gateway Model Manager
export interface KiloModel {
  id: string;
  object: string;
  created?: number;
  owned_by?: string;
  description?: string;
  pricing?: {
    prompt: number;
    completion: number;
  };
  context_length?: number;
}

export interface KiloProvider {
  id: string;
  name: string;
  description?: string;
}

export class KiloModelManager {
  private modelsCache: KiloModel[] | null = null;
  private providersCache: KiloProvider[] | null = null;
  private cacheTimestamp: number = 0;
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  async getModels(): Promise<KiloModel[]> {
    const now = Date.now();
    if (this.modelsCache && (now - this.cacheTimestamp) < this.CACHE_TTL) {
      return this.modelsCache;
    }

    try {
      const response = await fetch("https://api.kilo.ai/api/gateway/models");
      if (!response.ok) {
        throw new Error(`Failed to fetch models: ${response.status}`);
      }
      
      const data = await response.json() as { data: KiloModel[] };
      this.modelsCache = data.data || [];
      this.cacheTimestamp = now;
      return this.modelsCache;
    } catch (error) {
      console.error("[Kilo] Failed to fetch models:", error);
      return this.modelsCache || [];
    }
  }

  async getProviders(): Promise<KiloProvider[]> {
    const now = Date.now();
    if (this.providersCache && (now - this.cacheTimestamp) < this.CACHE_TTL) {
      return this.providersCache;
    }

    try {
      const response = await fetch("https://api.kilo.ai/api/gateway/providers");
      if (!response.ok) {
        throw new Error(`Failed to fetch providers: ${response.status}`);
      }
      
      const data = await response.json() as { data: KiloProvider[] };
      this.providersCache = data.data || [];
      this.cacheTimestamp = now;
      return this.providersCache;
    } catch (error) {
      console.error("[Kilo] Failed to fetch providers:", error);
      return this.providersCache || [];
    }
  }

  getModelsByProvider(models: KiloModel[]): Record<string, KiloModel[]> {
    const byProvider: Record<string, KiloModel[]> = {};
    
    models.forEach(model => {
      const parts = model.id.split('/');
      const provider = parts[0] || 'unknown';
      
      if (!byProvider[provider]) {
        byProvider[provider] = [];
      }
      byProvider[provider].push(model);
    });
    
    return byProvider;
  }

  getRecommendedModels(): KiloModel[] {
    if (!this.modelsCache) return [];
    
    // Return top models for different use cases
    const recommendations = [
      // Claude models (best for general purpose)
      ...this.modelsCache.filter(m => m.id.includes('claude')).slice(0, 3),
      // GPT models (best for coding)
      ...this.modelsCache.filter(m => m.id.includes('gpt')).slice(0, 3),
      // Gemini models (best for reasoning)
      ...this.modelsCache.filter(m => m.id.includes('gemini')).slice(0, 2),
      // Free models (for cost efficiency)
      ...this.modelsCache.filter(m => 
        m.id.includes('free') || 
        m.id.includes('giga-potato') ||
        m.id.includes('corethink')
      ).slice(0, 2),
    ];
    
    return recommendations.slice(0, 10);
  }

  mapProviderToCLI(provider: string): string {
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
    };
    
    return mappings[provider] || 'codex';
  }

  shouldUseNativeCLI(modelId: string): boolean {
    const provider = modelId.split('/')[0];
    
    // Use native CLI for these providers when possible
    const nativeProviders = ['anthropic', 'openai', 'google'];
    return nativeProviders.includes(provider);
  }

  getOptimalModelForTask(taskType: string, budget: 'free' | 'paid' = 'paid'): KiloModel | null {
    if (!this.modelsCache) return null;
    
    const taskMappings: Record<string, string[]> = {
      'development': ['gpt', 'claude', 'codex', 'deepseek'],
      'design': ['claude', 'gemini', 'gpt'],
      'analysis': ['claude', 'gemini', 'gpt'],
      'documentation': ['claude', 'gpt', 'gemini'],
      'presentation': ['claude', 'gemini'],
      'general': ['claude', 'gpt', 'gemini']
    };
    
    const preferredProviders = taskMappings[taskType] || taskMappings['general'];
    
    let candidates = this.modelsCache.filter(model => {
      const provider = model.id.split('/')[0];
      return preferredProviders.some(pref => model.id.includes(pref));
    });
    
    if (budget === 'free') {
      candidates = candidates.filter(model => 
        model.id.includes('free') || 
        model.id.includes('giga-potato') ||
        model.id.includes('corethink')
      );
    }
    
    return candidates[0] || null;
  }

  clearCache(): void {
    this.modelsCache = null;
    this.providersCache = null;
    this.cacheTimestamp = 0;
  }
}
