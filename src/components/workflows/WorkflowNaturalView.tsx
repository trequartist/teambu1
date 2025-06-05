import React from 'react';
import { motion } from 'framer-motion';
import { Workflow } from '../../types/workflows';
import { FileText, Clock, Settings } from 'lucide-react';

interface WorkflowNaturalViewProps {
  workflow: Workflow;
}

const WorkflowNaturalView: React.FC<WorkflowNaturalViewProps> = ({ workflow }) => {
  if (!workflow?.naturalLanguage) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-zinc-500">No natural language definition available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview */}
      <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700">
        <div className="flex items-center space-x-3 mb-4">
          <FileText className="w-5 h-5 text-teal-400" />
          <h3 className="font-medium text-white">Overview</h3>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-400">Trigger:</span>
            <span className="ml-2 text-white">Blog post published</span>
          </div>
          <div>
            <span className="text-zinc-400">Schedule:</span>
            <span className="ml-2 text-white">{workflow.schedule}</span>
          </div>
        </div>
      </div>

      {/* Natural Language Definition */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-zinc-900/50 rounded-lg border border-zinc-800"
      >
        <div className="border-b border-zinc-800 p-4">
          <div className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-zinc-400" />
            <h3 className="font-medium text-white">Natural Language Definition</h3>
          </div>
        </div>
        <div className="p-4">
          <pre className="whitespace-pre-wrap font-mono text-sm text-zinc-300">
            {workflow.naturalLanguage}
          </pre>
        </div>
      </motion.div>

      {/* Execution History */}
      <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700">
        <div className="flex items-center space-x-3 mb-4">
          <Clock className="w-5 h-5 text-indigo-400" />
          <h3 className="font-medium text-white">Recent Executions</h3>
        </div>
        <div className="space-y-2">
          {[
            { time: '2 hours ago', status: 'success', duration: '45s' },
            { time: '1 day ago', status: 'success', duration: '42s' },
            { time: '2 days ago', status: 'success', duration: '47s' }
          ].map((execution, index) => (
            <div 
              key={index}
              className="flex items-center justify-between py-2 border-b border-zinc-700 last:border-0"
            >
              <span className="text-zinc-400 text-sm">{execution.time}</span>
              <div className="flex items-center space-x-3">
                <span className="text-teal-400 text-sm">✓ Success</span>
                <span className="text-zinc-500 text-sm">{execution.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkflowNaturalView;