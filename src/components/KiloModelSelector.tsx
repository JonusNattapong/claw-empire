import React, { useState, useEffect } from 'react';

interface KiloModel {
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

interface KiloProvider {
  id: string;
  name: string;
  description?: string;
}

interface KiloModelSelectorProps {
  selectedModel?: string;
  onModelSelect: (modelId: string) => void;
  taskType?: string;
}

export const KiloModelSelector: React.FC<KiloModelSelectorProps> = ({
  selectedModel,
  onModelSelect,
  taskType = 'general'
}) => {
  const [models, setModels] = useState<KiloModel[]>([]);
  const [providers, setProviders] = useState<KiloProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<string>('all');

  useEffect(() => {
    fetchModels();
    fetchProviders();
  }, []);

  const fetchModels = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/kilo/models');
      if (!response.ok) {
        throw new Error('Failed to fetch models');
      }
      const data = await response.json();
      setModels(data.models || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const fetchProviders = async () => {
    try {
      const response = await fetch('/api/kilo/providers');
      if (!response.ok) {
        throw new Error('Failed to fetch providers');
      }
      const data = await response.json();
      setProviders(data.providers || []);
    } catch (err) {
      console.error('Failed to fetch providers:', err);
    }
  };

  const getRecommendedModels = () => {
    const taskMappings: Record<string, string[]> = {
      'development': ['gpt', 'claude', 'codex', 'deepseek'],
      'design': ['claude', 'gemini', 'gpt'],
      'analysis': ['claude', 'gemini', 'gpt'],
      'documentation': ['claude', 'gpt', 'gemini'],
      'presentation': ['claude', 'gemini'],
      'general': ['claude', 'gpt', 'gemini']
    };

    const preferredProviders = taskMappings[taskType] || taskMappings['general'];
    
    return models.filter(model => {
      const provider = model.id.split('/')[0];
      return preferredProviders.some(pref => model.id.toLowerCase().includes(pref));
    }).slice(0, 5);
  };

  const getFreeModels = () => {
    return models.filter(model => 
      model.id.toLowerCase().includes('free') || 
      model.id.toLowerCase().includes('giga-potato') ||
      model.id.toLowerCase().includes('corethink')
    );
  };

  const getFilteredModels = () => {
    let filtered = models;

    // Filter by provider
    if (selectedProvider !== 'all') {
      filtered = filtered.filter(model => 
        model.id.split('/')[0] === selectedProvider
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(model =>
        model.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        model.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const getModelDisplayName = (model: KiloModel) => {
    const parts = model.id.split('/');
    const provider = parts[0];
    const modelName = parts.slice(1).join('/');
    
    return (
      <div>
        <div className="font-medium">{modelName}</div>
        <div className="text-sm text-gray-500">{provider}</div>
        {model.description && (
          <div className="text-xs text-gray-400 mt-1 line-clamp-2">
            {model.description}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        <p>Error loading models: {error}</p>
        <button 
          onClick={fetchModels}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  const filteredModels = getFilteredModels();
  const recommendedModels = getRecommendedModels();
  const freeModels = getFreeModels();

  return (
    <div className="p-4 space-y-4">
      {/* Search and Filter */}
      <div className="space-y-2">
        <input
          type="text"
          placeholder="Search models..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <select
          value={selectedProvider}
          onChange={(e) => setSelectedProvider(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Providers</option>
          {providers.map(provider => (
            <option key={provider.id} value={provider.id}>
              {provider.name}
            </option>
          ))}
        </select>
      </div>

      {/* Recommended Models */}
      {recommendedModels.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Recommended for {taskType}</h3>
          <div className="space-y-2">
            {recommendedModels.map(model => (
              <div
                key={model.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedModel === model.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => onModelSelect(model.id)}
              >
                {getModelDisplayName(model)}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Free Models */}
      {freeModels.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">🆓 Free Models</h3>
          <div className="space-y-2">
            {freeModels.map(model => (
              <div
                key={model.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedModel === model.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => onModelSelect(model.id)}
              >
                {getModelDisplayName(model)}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Models */}
      <div>
        <h3 className="text-lg font-semibold mb-2">
          All Models ({filteredModels.length})
        </h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {filteredModels.map(model => (
            <div
              key={model.id}
              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                selectedModel === model.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => onModelSelect(model.id)}
            >
              {getModelDisplayName(model)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
