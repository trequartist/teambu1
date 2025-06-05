import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../Button';
import LoadingSpinner from '../LoadingSpinner';
import { Rocket, Check, AlertCircle, Settings, ArrowRight } from 'lucide-react';

interface DeploymentConfig {
  environment: 'staging' | 'production';
  monitoring: boolean;
  notifications: boolean;
  rollbackEnabled: boolean;
  autoScale: boolean;
}

interface DeploymentStatus {
  status: string;
  environment: string;
  version: string;
  timestamp: Date;
}

interface WorkflowDeploymentProps {
  workflowId: string;
  onDeploy: (config: DeploymentConfig) => Promise<void>;
  setDeploymentStatus: (status: DeploymentStatus) => void;
}

const WorkflowDeployment: React.FC<WorkflowDeploymentProps> = ({
  workflowId,
  onDeploy,
  setDeploymentStatus
}) => {
  const [isDeploying, setIsDeploying] = useState(false);
  const [config, setConfig] = useState<DeploymentConfig>({
    environment: 'staging',
    monitoring: true,
    notifications: true,
    rollbackEnabled: true,
    autoScale: false
  });

  const handleDeploy = async () => {
    setIsDeploying(true);
    try {
      await onDeploy(config);
      setDeploymentStatus({
        status: 'deploying',
        environment: config.environment,
        version: '1.0.0',
        timestamp: new Date()
      });
    } catch (error) {
      console.error('Deployment failed:', error);
      setDeploymentStatus({
        status: 'failed',
        environment: config.environment,
        version: '1.0.0',
        timestamp: new Date()
      });
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Deploy Workflow</h3>
        <Button
          variant="primary"
          size="sm"
          onClick={handleDeploy}
          disabled={isDeploying}
          icon={isDeploying ? <LoadingSpinner size="sm" /> : <Rocket className="h-4 w-4" />}
        >
          {isDeploying ? 'Deploying...' : 'Deploy'}
        </Button>
      </div>

      <div className="space-y-4">
        {/* Environment Selection */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Environment
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setConfig({ ...config, environment: 'staging' })}
              className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                config.environment === 'staging'
                  ? 'bg-teal-500/20 border-teal-500 text-teal-400'
                  : 'bg-zinc-800/50 border-zinc-700 text-zinc-300 hover:border-zinc-600'
              }`}
            >
              Staging
            </button>
            <button
              onClick={() => setConfig({ ...config, environment: 'production' })}
              className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                config.environment === 'production'
                  ? 'bg-teal-500/20 border-teal-500 text-teal-400'
                  : 'bg-zinc-800/50 border-zinc-700 text-zinc-300 hover:border-zinc-600'
              }`}
            >
              Production
            </button>
          </div>
        </div>

        {/* Configuration Options */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Deployment Options
          </label>
          
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={config.monitoring}
              onChange={(e) => setConfig({ ...config, monitoring: e.target.checked })}
              className="rounded border-zinc-600 bg-zinc-800 text-teal-500 focus:ring-teal-500 focus:ring-offset-zinc-900"
            />
            <span className="text-sm text-zinc-300">Enable performance monitoring</span>
          </label>
          
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={config.notifications}
              onChange={(e) => setConfig({ ...config, notifications: e.target.checked })}
              className="rounded border-zinc-600 bg-zinc-800 text-teal-500 focus:ring-teal-500 focus:ring-offset-zinc-900"
            />
            <span className="text-sm text-zinc-300">Enable notifications</span>
          </label>
          
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={config.rollbackEnabled}
              onChange={(e) => setConfig({ ...config, rollbackEnabled: e.target.checked })}
              className="rounded border-zinc-600 bg-zinc-800 text-teal-500 focus:ring-teal-500 focus:ring-offset-zinc-900"
            />
            <span className="text-sm text-zinc-300">Enable automatic rollback</span>
          </label>
          
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={config.autoScale}
              onChange={(e) => setConfig({ ...config, autoScale: e.target.checked })}
              className="rounded border-zinc-600 bg-zinc-800 text-teal-500 focus:ring-teal-500 focus:ring-offset-zinc-900"
            />
            <span className="text-sm text-zinc-300">Enable auto-scaling</span>
          </label>
        </div>

        {/* Deployment Info */}
        <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700">
          <h4 className="text-sm font-medium text-white mb-2">Deployment Info</h4>
          <div className="space-y-2 text-sm text-zinc-400">
            <div className="flex items-center justify-between">
              <span>Environment:</span>
              <span className="font-medium text-zinc-300">{config.environment}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Version:</span>
              <span className="font-medium text-zinc-300">1.0.0</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Last Deploy:</span>
              <span className="font-medium text-zinc-300">Never</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowDeployment;