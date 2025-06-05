import React, { useState } from 'react';
import { DollarSign, TrendingUp, Clock, HelpCircle } from 'lucide-react';

const CostCalculator: React.FC = () => {
  const [showBreakdown, setShowBreakdown] = useState(false);
  
  const costs = {
    current: 0.23,
    perRun: 0.23,
    weekly: 1.61,
    monthly: 6.90,
    breakdown: {
      linkedinApi: 0.001,
      gpt4Analysis: 0.03,
      dataStorage: 0.0001,
      executionTime: 0.001
    }
  };

  return (
    <div className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <DollarSign className="w-5 h-5 text-teal-400" />
          <h3 className="font-medium text-white">Estimated Costs</h3>
        </div>
        <button
          className="text-zinc-400 hover:text-zinc-300"
          onClick={() => setShowBreakdown(!showBreakdown)}
        >
          <HelpCircle className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-zinc-400">Current build:</span>
          <span className="text-white">${costs.current.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-zinc-400">Per run:</span>
          <span className="text-white">~${costs.perRun.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-zinc-400">Weekly (7 runs):</span>
          <span className="text-white">~${costs.weekly.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-zinc-400">Monthly (30 runs):</span>
          <span className="text-white">~${costs.monthly.toFixed(2)}</span>
        </div>
      </div>

      {showBreakdown && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 pt-4 border-t border-zinc-700"
        >
          <h4 className="text-sm font-medium text-white mb-2">Cost Breakdown:</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-400">LinkedIn API calls:</span>
              <span className="text-white">${costs.breakdown.linkedinApi}/post</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">GPT-4 analysis:</span>
              <span className="text-white">${costs.breakdown.gpt4Analysis}/1k tokens</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Data storage:</span>
              <span className="text-white">${costs.breakdown.dataStorage}/MB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Execution time:</span>
              <span className="text-white">${costs.breakdown.executionTime}/minute</span>
            </div>
          </div>
          <p className="text-xs text-zinc-500 mt-2">
            These are estimates. Actual costs may vary based on data volume and API pricing.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default CostCalculator;