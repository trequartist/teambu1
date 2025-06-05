import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import Button from '../Button';

interface ClarificationPromptProps {
  type: 'ambiguous' | 'technical' | 'complex';
  message: string;
  options: string[];
  onSelect: (option: string) => void;
}

const ClarificationPrompt: React.FC<ClarificationPromptProps> = ({
  type,
  message,
  options,
  onSelect
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-800/50 rounded-lg border border-zinc-700 p-4"
    >
      <div className="flex items-start space-x-3 mb-3">
        <AlertCircle className="w-5 h-5 text-teal-400 mt-0.5" />
        <div>
          <p className="text-sm text-zinc-300">{message}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {options.map((option, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onSelect(option)}
          >
            {option}
          </Button>
        ))}
      </div>
    </motion.div>
  );
};

export default ClarificationPrompt;