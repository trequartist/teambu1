import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Check, AlertCircle, RefreshCw } from 'lucide-react';
import Button from '../Button';

interface TestStep {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'success' | 'error';
  duration?: number;
  error?: string;
}

interface WorkflowTestRunnerProps {
  workflowId: string;
  onComplete: (results: TestResults) => void;
}

interface TestResults {
  success: boolean;
  steps: TestStep[];
  duration: number;
  timestamp: Date;
}

const WorkflowTestRunner: React.FC<WorkflowTestRunnerProps> = ({
  workflowId,
  onComplete
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [steps, setSteps] = useState<TestStep[]>([
    { id: 'setup', name: 'Environment Setup', status: 'pending' },
    { id: 'dependencies', name: 'Check Dependencies', status: 'pending' },
    { id: 'validation', name: 'Validate Configuration', status: 'pending' },
    { id: 'execution', name: 'Execute Workflow', status: 'pending' },
    { id: 'verification', name: 'Verify Results', status: 'pending' }
  ]);

  const runTest = async () => {
    setIsRunning(true);
    const startTime = Date.now();

    try {
      // Run through each step
      for (let i = 0; i < steps.length; i++) {
        setCurrentStep(i);
        
        // Update current step to running
        setSteps(prev => prev.map((step, index) => 
          index === i ? { ...step, status: 'running' } : step
        ));

        // Simulate step execution
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

        // Mark step as complete
        setSteps(prev => prev.map((step, index) => 
          index === i ? { ...step, status: 'success', duration: Math.random() * 1000 } : step
        ));
      }

      const results: TestResults = {
        success: true,
        steps: steps,
        duration: Date.now() - startTime,
        timestamp: new Date()
      };

      onComplete(results);
    } catch (error) {
      setSteps(prev => prev.map((step, index) => 
        index === currentStep ? { ...step, status: 'error', error: error instanceof Error ? error.message : 'Unknown error' } : step
      ));
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Workflow Test</h3>
        <Button
          variant="primary"
          size="sm"
          onClick={runTest}
          disabled={isRunning}
          icon={isRunning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
        >
          {isRunning ? 'Running Test...' : 'Run Test'}
        </Button>
      </div>

      <div className="space-y-3">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`
              flex items-center justify-between p-3 rounded-lg border
              ${step.status === 'running' ? 'bg-indigo-900/20 border-indigo-500/20' :
                step.status === 'success' ? 'bg-teal-900/20 border-teal-500/20' :
                step.status === 'error' ? 'bg-red-900/20 border-red-500/20' :
                'bg-zinc-800/50 border-zinc-700'
              }
            `}
          >
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                {step.status === 'running' ? (
                  <RefreshCw className="w-5 h-5 text-indigo-400 animate-spin" />
                ) : step.status === 'success' ? (
                  <Check className="w-5 h-5 text-teal-400" />
                ) : step.status === 'error' ? (
                  <AlertCircle className="w-5 h-5 text-red-400" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-zinc-600" />
                )}
              </div>
              <div>
                <div className="font-medium text-white">{step.name}</div>
                {step.error && (
                  <div className="text-sm text-red-400 mt-1">{step.error}</div>
                )}
              </div>
            </div>
            {step.duration && (
              <div className="text-sm text-zinc-400">
                {step.duration.toFixed(0)}ms
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {!isRunning && steps.every(step => step.status === 'success') && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-teal-900/20 rounded-lg p-4 mt-4 border border-teal-500/20"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Check className="w-5 h-5 text-teal-400" />
              <span className="font-medium text-teal-300">All tests passed successfully!</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={runTest}
            >
              Run Again
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default WorkflowTestRunner;