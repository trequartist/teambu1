import React from 'react';
import { motion } from 'framer-motion';
import { Check, AlertCircle, RefreshCw } from 'lucide-react';

interface DeploymentStatusProps {
  status: 'deploying' | 'success' | 'error';
  environment: string;
  version: string;
  timestamp: Date;
  metrics?: {
    uptime: string;
    executions: number;
    avgDuration: string;
    successRate: string;
  };
  error?: string;
}

const DeploymentStatus: React.FC<DeploymentStatusProps> = ({
  status,
  environment,
  version,
  timestamp,
  metrics,
  error
}) => {
  return (
    <div className="space-y-4">
      <div className={`rounded-lg p-4 border ${
        status === 'deploying' ? 'bg-indigo-900/20 border-indigo-500/20' :
        status === 'success' ? 'bg-teal-900/20 border-teal-500/20' :
        'bg-red-900/20 border-red-500/20'
      }`}>
        <div className="flex items-center space-x-3">
          {status === 'deploying' ? (
            <RefreshCw className="h-5 w-5 text-indigo-400 animate-spin" />
          ) : status === 'success' ? (
            <Check className="h-5 w-5 text-teal-400" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-400" />
          )}
          <div>
            <h3 className="font-medium text-white">
              {status === 'deploying' ? 'Deployment in Progress' :
               status === 'success' ? 'Deployment Successful' :
               'Deployment Failed'}
            </h3>
            <p className="text-sm text-zinc-400">
              {environment} - v{version}
            </p>
          </div>
        </div>
      </div>

      {metrics && status === 'success' && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-zinc-900/50 rounded-lg border border-zinc-800 p-4">
            <div className="text-sm text-zinc-400">Uptime</div>
            <div className="text-xl font-semibold text-white">{metrics.uptime}</div>
          </div>
          <div className="bg-zinc-900/50 rounded-lg border border-zinc-800 p-4">
            <div className="text-sm text-zinc-400">Executions</div>
            <div className="text-xl font-semibold text-white">{metrics.executions}</div>
          </div>
          <div className="bg-zinc-900/50 rounded-lg border border-zinc-800 p-4">
            <div className="text-sm text-zinc-400">Avg Duration</div>
            <div className="text-xl font-semibold text-white">{metrics.avgDuration}</div>
          </div>
          <div className="bg-zinc-900/50 rounded-lg border border-zinc-800 p-4">
            <div className="text-sm text-zinc-400">Success Rate</div>
            <div className="text-xl font-semibold text-white">{metrics.successRate}</div>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-900/20 rounded-lg p-4 border border-red-500/20">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-red-400 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-red-300">Deployment Error</h4>
              <p className="text-sm text-red-200 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeploymentStatus;