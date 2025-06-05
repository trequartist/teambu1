import React from 'react';
import { motion } from 'framer-motion';

interface WorkflowConnectorProps {
  isActive?: boolean;
}

const WorkflowConnector: React.FC<WorkflowConnectorProps> = ({ isActive }) => {
  return (
    <div className="flex items-center justify-center py-2">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="h-8 border-l-2 border-dashed border-zinc-700"
      >
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: '100%' }}
          className={`h-full w-0.5 ${isActive ? 'bg-teal-500' : 'bg-transparent'}`}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </div>
  );
};

export default WorkflowConnector;