import React from 'react';
import { motion } from 'framer-motion';

interface CodeExplanationProps {
  title: string;
  description: string;
  className?: string;
}

const CodeExplanation: React.FC<CodeExplanationProps> = ({
  title,
  description,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-lg border shadow-sm p-4 ${className}`}
    >
      <h4 className="text-sm font-medium text-gray-900 mb-1">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </motion.div>
  );
};

export default CodeExplanation;