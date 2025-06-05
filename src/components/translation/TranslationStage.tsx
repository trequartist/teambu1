import React from 'react';
import { motion } from 'framer-motion';
import { Check, AlertCircle } from 'lucide-react';
import JsonView from './JsonView';

interface TranslationStageProps {
  name: string;
  input: any;
  output: any;
  confidence: number;
  status: 'pending' | 'processing' | 'complete' | 'warning';
  warnings?: string[];
}

const TranslationStage: React.FC<TranslationStageProps> = ({
  name,
  input,
  output,
  confidence,
  status,
  warnings
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-800/50 rounded-lg border border-zinc-700 overflow-hidden"
    >
      <div className="p-3 border-b border-zinc-700">
        <div className="flex items-center space-x-2">
          {status === 'complete' && (
            <Check className="w-4 h-4 text-teal-400" />
          )}
          {status === 'warning' && (
            <AlertCircle className="w-4 h-4 text-yellow-400" />
          )}
          <span className="text-sm font-medium text-white">{name}</span>
          <span className="text-xs text-zinc-500">
            {Math.round(confidence * 100)}% confidence
          </span>
        </div>
      </div>

      <div className="p-3">
        <div className="mb-3">
          <h4 className="text-xs font-medium text-zinc-400 mb-1">Input</h4>
          <JsonView data={input} />
        </div>

        <div>
          <h4 className="text-xs font-medium text-zinc-400 mb-1">Output</h4>
          <JsonView data={output} />
        </div>

        {warnings && warnings.length > 0 && (
          <div className="mt-3 bg-yellow-900/20 rounded p-2 border border-yellow-500/20">
            <div className="flex items-center space-x-2 mb-1">
              <AlertCircle className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-yellow-400">Warnings</span>
            </div>
            <ul className="space-y-1">
              {warnings.map((warning, i) => (
                <li key={i} className="text-xs text-yellow-300">{warning}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TranslationStage;