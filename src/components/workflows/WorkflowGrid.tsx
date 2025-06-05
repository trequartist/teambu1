import React from 'react';
import { motion } from 'framer-motion';
import { Workflow } from '../../types/workflows';
import { useWorkflows } from '../../hooks/useWorkflows';
import { Calendar, FileText, Lightbulb, Rocket, Star, MessageSquare, Search, BarChart3, Users, Newspaper, Palette, Clock } from 'lucide-react';

interface WorkflowGridProps {
  onSelect: (workflow: Workflow) => void;
}

const WorkflowGrid: React.FC<WorkflowGridProps> = ({ onSelect }) => {
  const { workflows } = useWorkflows();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {workflows.map((workflow, index) => (
        <motion.div
          key={workflow.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => onSelect(workflow)}
          className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-6 cursor-pointer hover:border-zinc-700 transition-colors"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className={`p-2 rounded-lg ${workflow.isActive ? 'bg-teal-500/20' : 'bg-zinc-800'}`}>
              {typeof workflow.icon === 'string' ? (
                <span className="text-2xl">{workflow.icon}</span>
              ) : (
                <workflow.icon className="w-5 h-5 text-zinc-400" />
              )}
            </div>
            <div>
              <h3 className="font-medium text-white">{workflow.title}</h3>
              <p className="text-sm text-zinc-400">{workflow.schedule}</p>
            </div>
          </div>
          
          <p className="text-zinc-400 text-sm mb-4">
            {workflow.description}
          </p>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${workflow.isActive ? 'bg-teal-500' : 'bg-zinc-600'}`} />
              <span className="text-zinc-400">
                {workflow.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <span className="text-zinc-500">
              Last run: {workflow.lastRun}
            </span>
          </div>
          
          {workflow.metrics && (
            <div className="mt-4 pt-4 border-t border-zinc-800 grid grid-cols-2 gap-4">
              {Object.entries(workflow.metrics).map(([key, value]) => (
                <div key={key}>
                  <div className="text-sm font-medium text-white">{value}</div>
                  <div className="text-xs text-zinc-500 capitalize">
                    {key.replace(/_/g, ' ')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default WorkflowGrid;