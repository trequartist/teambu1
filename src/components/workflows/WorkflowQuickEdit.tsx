import React from 'react';
import { motion } from 'framer-motion';
import { Workflow } from '../../types/workflows';
import Button from '../Button';
import { X, Play, Settings, Code } from 'lucide-react';

interface WorkflowQuickEditProps {
  workflow: Workflow;
  onClose: () => void;
}

const WorkflowQuickEdit: React.FC<WorkflowQuickEditProps> = ({
  workflow,
  onClose
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-zinc-900 rounded-xl border border-zinc-800 shadow-xl w-full max-w-2xl"
      >
        <div className="flex items-center justify-between border-b border-zinc-800 p-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${workflow.isActive ? 'bg-teal-500/20' : 'bg-zinc-800'}`}>
              {workflow.icon}
            </div>
            <div>
              <h3 className="font-medium text-white">{workflow.title}</h3>
              <p className="text-sm text-zinc-400">{workflow.schedule}</p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-white mb-2">Description</h4>
              <p className="text-zinc-400">{workflow.description}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-white mb-2">Configuration</h4>
              <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700">
                <pre className="text-sm text-zinc-400 whitespace-pre-wrap">
                  {JSON.stringify(workflow.config, null, 2)}
                </pre>
              </div>
            </div>
            
            {workflow.metrics && (
              <div>
                <h4 className="text-sm font-medium text-white mb-2">Performance</h4>
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(workflow.metrics).map(([key, value]) => (
                    <div key={key} className="bg-zinc-800/50 rounded-lg p-3 border border-zinc-700">
                      <div className="text-sm font-medium text-white">{value}</div>
                      <div className="text-xs text-zinc-500 capitalize">
                        {key.replace(/_/g, ' ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="border-t border-zinc-800 p-4 bg-zinc-900/50 rounded-b-xl flex justify-between">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              icon={<Play className="h-4 w-4" />}
            >
              Run Now
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={<Code className="h-4 w-4" />}
            >
              View Code
            </Button>
          </div>
          
          <Button
            variant="primary"
            size="sm"
            icon={<Settings className="h-4 w-4" />}
          >
            Configure
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default WorkflowQuickEdit;