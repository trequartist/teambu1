import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Check, HelpCircle } from 'lucide-react';
import Button from '../Button';
import { useStore } from '../../store/useStore';

const ConfidenceIndicator: React.FC = () => {
  const [showDetails, setShowDetails] = useState(false);
  const { aiConfidence, aiConfidenceBreakdown } = useStore();

  const getConfidenceColor = (score: number) => {
    if (score >= 90) return 'text-teal-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-zinc-400">AI Confidence:</span>
          <div className={`text-lg font-semibold ${getConfidenceColor(aiConfidence)}`}>
            {aiConfidence}%
          </div>
        </div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-sm text-zinc-400 hover:text-zinc-300"
        >
          {showDetails ? 'Hide details' : 'Click for details'}
        </button>
      </div>

      {showDetails && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 space-y-3"
        >
          <h4 className="text-sm font-medium text-white mb-2">Confidence Breakdown:</h4>
          {aiConfidenceBreakdown.map((item, index) => (
            <div key={index} className="bg-zinc-800/50 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">{item.label}</span>
                <span className={`text-sm ${getConfidenceColor(item.confidence)}`}>
                  {item.confidence}%
                </span>
              </div>
              {item.warning && (
                <div className="flex items-center space-x-1 mt-2">
                  <AlertCircle className="w-3 h-3 text-yellow-400" />
                  <span className="text-xs text-yellow-400">{item.warning}</span>
                </div>
              )}
            </div>
          ))}

          <div className="flex space-x-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {/* Handle improve action */}}
            >
              Help me improve
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setShowDetails(false)}
            >
              Continue anyway
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ConfidenceIndicator;