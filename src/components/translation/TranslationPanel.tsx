import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, AlertCircle, Check, Edit2 } from 'lucide-react';
import Button from '../Button';
import JsonView from './JsonView';
import AgentGraphView from './AgentGraphView';
import { AgentGraphV2 } from '../../types/workflows';

interface TranslationPanelProps {
  input: string;
  stages: TranslationStage[];
  onEdit: (stageId: string) => void;
  className?: string;
}

interface TranslationStage {
  id: string;
  name: string;
  status: 'pending' | 'processing' | 'complete' | 'warning';
  input: any;
  output: any | AgentGraphV2;
  confidence: number;
  warnings?: string[];
  estimatedCost?: number;
}

const TranslationPanel: React.FC<TranslationPanelProps> = ({
  input,
  stages,
  onEdit,
  className = ''
}) => {
  const isAgentGraph = (output: any): output is AgentGraphV2 => {
    return output?.version === '2.0' && output?.metadata && output?.nodes;
  };

  return (
    <div className={`bg-zinc-900/50 rounded-xl border border-zinc-800 ${className}`}>
      <div className="p-4 border-b border-zinc-800">
        <div className="flex items-center space-x-2">
          <MessageCircle className="w-5 h-5 text-teal-400" />
          <h3 className="font-medium text-white">Translation Pipeline</h3>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Original Input */}
        <div>
          <h4 className="text-sm font-medium text-zinc-400 mb-2">Natural Language Input</h4>
          <div className="bg-zinc-800/50 rounded-lg p-3 border border-zinc-700">
            <p className="text-sm text-zinc-300">{input}</p>
          </div>
        </div>

        {/* Translation Stages */}
        <div className="space-y-4">
          {stages.map((stage, index) => (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-zinc-800/50 rounded-lg border border-zinc-700 overflow-hidden"
            >
              <div className="p-3 border-b border-zinc-700 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {stage.status === 'complete' && (
                    <Check className="w-4 h-4 text-teal-400" />
                  )}
                  {stage.status === 'warning' && (
                    <AlertCircle className="w-4 h-4 text-yellow-400" />
                  )}
                  <span className="text-sm font-medium text-white">{stage.name}</span>
                  <span className="text-xs text-zinc-500">
                    {Math.round(stage.confidence * 100)}% confidence
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(stage.id)}
                  icon={<Edit2 className="w-4 h-4" />}
                >
                  Edit
                </Button>
              </div>

              <div className="p-3">
                {isAgentGraph(stage.output) ? (
                  <AgentGraphView graph={stage.output} />
                ) : (
                  <JsonView data={stage.output} />
                )}
                
                {stage.warnings && stage.warnings.length > 0 && (
                  <div className="mt-3 bg-yellow-900/20 rounded p-2 border border-yellow-500/20">
                    <div className="flex items-center space-x-2 mb-1">
                      <AlertCircle className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm font-medium text-yellow-400">Warnings</span>
                    </div>
                    <ul className="space-y-1">
                      {stage.warnings.map((warning, i) => (
                        <li key={i} className="text-xs text-yellow-300">{warning}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {stage.estimatedCost !== undefined && (
                  <div className="mt-3 bg-zinc-800/50 rounded p-2 border border-zinc-700">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-400">Estimated Cost</span>
                      <span className="text-white">${stage.estimatedCost.toFixed(4)}</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TranslationPanel;