import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Zap, ArrowRight } from 'lucide-react';
import Button from '../Button';

interface WorkflowSummaryProps {
  selectedWorkflows: string[];
  onContinue: () => void;
}

const WorkflowSummary: React.FC<WorkflowSummaryProps> = ({
  selectedWorkflows,
  onContinue
}) => {
  const estimateOutput = () => {
    const baseOutput = 12;
    const outputPerWorkflow = 3;
    return {
      min: baseOutput + selectedWorkflows.length * outputPerWorkflow - 3,
      max: baseOutput + selectedWorkflows.length * outputPerWorkflow + 3
    };
  };

  const output = estimateOutput();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-zinc-900/95 border-t border-zinc-800 backdrop-blur-sm p-4 z-50"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-white">
              Your LinkedIn Content System ({selectedWorkflows.length} workflows selected)
            </h3>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-teal-400" />
                <span className="text-sm text-zinc-400">~20 hours/week saved</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-indigo-400" />
                <span className="text-sm text-zinc-400">{output.min}-{output.max} posts/week</span>
              </div>
            </div>
          </div>
          <Button
            variant="primary"
            onClick={onContinue}
            className="bg-gradient-to-r from-teal-500 to-indigo-500"
          >
            Continue to Workflow Studio
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default WorkflowSummary;