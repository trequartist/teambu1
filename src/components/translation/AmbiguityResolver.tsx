import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import Button from '../Button';

interface AmbiguityResolverProps {
  message: string;
  options: Array<{
    id: string;
    label: string;
    description: string;
  }>;
  onSelect: (optionId: string) => void;
}

const AmbiguityResolver: React.FC<AmbiguityResolverProps> = ({
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
      <div className="flex items-start space-x-3 mb-4">
        <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
        <div>
          <h3 className="text-sm font-medium text-white mb-1">Ambiguity Detected</h3>
          <p className="text-sm text-zinc-400">{message}</p>
        </div>
      </div>

      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className="w-full text-left p-3 rounded-lg border border-zinc-700 hover:border-zinc-600 transition-colors"
          >
            <div className="font-medium text-white mb-1">{option.label}</div>
            <div className="text-sm text-zinc-400">{option.description}</div>
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default AmbiguityResolver;