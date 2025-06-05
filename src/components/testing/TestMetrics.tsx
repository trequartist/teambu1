import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Clock, Zap, DollarSign } from 'lucide-react';

interface TestMetricsProps {
  metrics: {
    total_duration: number;
    node_durations: { [nodeId: string]: number };
    api_calls: number;
    estimated_cost: number;
    tokens_used?: number;
  };
}

const TestMetrics: React.FC<TestMetricsProps> = ({ metrics }) => {
  return (
    <div className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-4">
      <div className="flex items-center space-x-2 mb-4">
        <BarChart3 className="w-5 h-5 text-teal-400" />
        <h3 className="font-medium text-white">Test Metrics</h3>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-zinc-800/50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="w-4 h-4 text-zinc-400" />
            <span className="text-sm text-zinc-400">Duration</span>
          </div>
          <div className="text-xl font-semibold text-white">
            {metrics.total_duration}ms
          </div>
        </div>

        <div className="bg-zinc-800/50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="w-4 h-4 text-zinc-400" />
            <span className="text-sm text-zinc-400">API Calls</span>
          </div>
          <div className="text-xl font-semibold text-white">
            {metrics.api_calls}
          </div>
        </div>

        <div className="bg-zinc-800/50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="w-4 h-4 text-zinc-400" />
            <span className="text-sm text-zinc-400">Est. Cost</span>
          </div>
          <div className="text-xl font-semibold text-white">
            ${metrics.estimated_cost.toFixed(4)}
          </div>
        </div>

        {metrics.tokens_used && (
          <div className="bg-zinc-800/50 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="w-4 h-4 text-zinc-400" />
              <span className="text-sm text-zinc-400">Tokens</span>
            </div>
            <div className="text-xl font-semibold text-white">
              {metrics.tokens_used}
            </div>
          </div>
        )}
      </div>

      {/* Node Durations */}
      <div className="mt-4">
        <h4 className="text-sm font-medium text-zinc-400 mb-2">Node Durations</h4>
        <div className="space-y-2">
          {Object.entries(metrics.node_durations).map(([nodeId, duration]) => (
            <div key={nodeId} className="flex items-center">
              <div className="w-32 text-sm text-zinc-400">{nodeId}</div>
              <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-teal-500 rounded-full"
                  style={{ 
                    width: `${(duration / metrics.total_duration) * 100}%` 
                  }}
                />
              </div>
              <div className="w-20 text-right text-sm text-zinc-400">
                {duration}ms
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestMetrics;