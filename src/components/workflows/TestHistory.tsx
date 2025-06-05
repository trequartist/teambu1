import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Clock } from 'lucide-react';

interface TestRun {
  id: string;
  timestamp: Date;
  duration: number;
  success: boolean;
  steps: {
    name: string;
    status: 'success' | 'error';
    duration: number;
  }[];
}

interface TestHistoryProps {
  runs: TestRun[];
}

const TestHistory: React.FC<TestHistoryProps> = ({ runs }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Test History</h3>
      
      <div className="space-y-3">
        {runs.map((run, index) => (
          <motion.div
            key={run.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`
              border rounded-lg p-4 
              ${run.success 
                ? 'bg-teal-900/20 border-teal-500/20' 
                : 'bg-red-900/20 border-red-500/20'
              }
            `}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                {run.success ? (
                  <Check className="h-5 w-5 text-teal-400" />
                ) : (
                  <X className="h-5 w-5 text-red-400" />
                )}
                <span className="font-medium text-white">
                  {run.success ? 'Successful Run' : 'Failed Run'}
                </span>
              </div>
              <div className="text-sm text-zinc-400">
                {new Date(run.timestamp).toLocaleString()}
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1 text-zinc-400">
                <Clock className="h-4 w-4" />
                <span>{(run.duration / 1000).toFixed(1)}s</span>
              </div>
              <div className="text-zinc-400">
                {run.steps.length} steps
              </div>
            </div>
            
            <div className="mt-3 grid grid-cols-2 gap-2">
              {run.steps.map((step, i) => (
                <div
                  key={i}
                  className={`text-xs px-2 py-1 rounded ${
                    step.status === 'success'
                      ? 'bg-teal-500/20 text-teal-300'
                      : 'bg-red-500/20 text-red-300'
                  }`}
                >
                  {step.name} ({step.duration}ms)
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TestHistory;