import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import Button from '../Button';

interface WorkflowSuccessProps {
  onViewWorkflow: () => void;
  onCreateAnother: () => void;
}

const WorkflowSuccess: React.FC<WorkflowSuccessProps> = ({
  onViewWorkflow,
  onCreateAnother
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-teal-900/20 to-indigo-900/20 rounded-xl border border-teal-500/20 p-8 text-center"
      role="alert"
      aria-label="Workflow activation successful"
    >
      <div className="w-16 h-16 bg-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <Check className="w-8 h-8 text-teal-400" />
      </div>

      <h2 className="text-2xl font-bold text-white mb-3">
        Workflow Activated Successfully!
      </h2>

      <p className="text-zinc-400 mb-8 max-w-md mx-auto">
        Your workflow is now live and ready to start processing content. You can monitor its performance in the Command Center.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button
          variant="primary"
          onClick={onViewWorkflow}
          icon={<ArrowRight className="w-4 h-4" />}
        >
          View Workflow
        </Button>
        <Button
          variant="outline"
          onClick={onCreateAnother}
        >
          Create Another
        </Button>
      </div>
    </motion.div>
  );
};

export default WorkflowSuccess;