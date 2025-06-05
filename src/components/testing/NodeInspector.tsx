import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Check, AlertCircle } from 'lucide-react';
import JsonView from '../translation/JsonView';
import { NodeType } from '../../types/workflows';

interface NodeInspectorProps {
  nodeId: string;
  type: NodeType;
  config: any;
  status: 'pending' | 'running' | 'success' | 'error';
  inputData?: any;
  outputData?: any;
  error?: Error;
}

const NodeInspector: React.FC<NodeInspectorProps> = ({
  nodeId,
  type,
  config,
  status,
  inputData,
  outputData,
  error
}) => {
  return (
    <div className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Settings className="w-5 h-5 text-teal-400" />
          <h3 className="font-medium text-white">{nodeId}</h3>
          <span className="text-xs text-zinc-500">{type}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          {status === 'success' && <Check className="w-4 h-4 text-teal-400" />}
          {status === 'error' && <AlertCircle className="w-4 h-4 text-red-400" />}
          <span className="text-sm text-zinc-400 capitalize">{status}</span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Configuration */}
        <div>
          <h4 className="text-sm font-medium text-zinc-400 mb-2">Configuration</h4>
          <JsonView data={config} />
        </div>

        {/* Input/Output Data */}
        {inputData && (
          <div>
            <h4 className="text-sm font-medium text-zinc-400 mb-2">Input</h4>
            <JsonView data={inputData} />
          </div>
        )}

        {outputData && (
          <div>
            <h4 className="text-sm font-medium text-zinc-400 mb-2">Output</h4>
            <JsonView data={outputData} />
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-900/20 rounded-lg p-3 border border-red-500/20">
            <div className="flex items-center space-x-2 mb-2">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span className="text-sm font-medium text-red-400">Error</span>
            </div>
            <pre className="text-xs text-red-300 whitespace-pre-wrap">
              {error.message}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default NodeInspector;