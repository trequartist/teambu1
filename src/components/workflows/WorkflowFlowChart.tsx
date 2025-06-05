import React from 'react';
import { motion } from 'framer-motion';
import { useWorkflows } from '../../hooks/useWorkflows';
import { Workflow } from '../../types/workflows';

interface WorkflowFlowChartProps {
  onSelect: (workflow: Workflow) => void;
}

const WorkflowFlowChart: React.FC<WorkflowFlowChartProps> = ({ onSelect }) => {
  const { workflows } = useWorkflows();
  
  const contentWorkflows = workflows.filter(w => w.category === 'content');
  const processingWorkflows = workflows.filter(w => w.category === 'processing');
  const distributionWorkflows = workflows.filter(w => w.category === 'distribution');
  
  return (
    <div className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-8 overflow-auto min-h-[600px]">
      <div className="flex justify-between items-start max-w-6xl mx-auto">
        {/* Content Sources */}
        <div className="w-1/3">
          <h3 className="text-sm font-medium text-zinc-400 mb-4">CONTENT SOURCES</h3>
          <div className="space-y-4">
            {contentWorkflows.map((workflow) => (
              <WorkflowNode
                key={workflow.id}
                workflow={workflow}
                onClick={() => onSelect(workflow)}
              />
            ))}
          </div>
        </div>
        
        {/* Processing Hub */}
        <div className="w-1/3 flex flex-col items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-indigo-500/20 rounded-full transform scale-150" />
            <div className="relative bg-zinc-900/50 rounded-lg border border-zinc-800 p-4 text-center">
              <h3 className="font-medium text-white mb-2">AI Processing Hub</h3>
              <div className="text-sm text-zinc-400">
                Analyzes, optimizes, and enhances content
              </div>
            </div>
          </div>
          
          <div className="mt-8 space-y-4">
            {processingWorkflows.map((workflow) => (
              <WorkflowNode
                key={workflow.id}
                workflow={workflow}
                onClick={() => onSelect(workflow)}
              />
            ))}
          </div>
        </div>
        
        {/* Distribution */}
        <div className="w-1/3">
          <h3 className="text-sm font-medium text-zinc-400 mb-4">DISTRIBUTION</h3>
          <div className="space-y-4">
            {distributionWorkflows.map((workflow) => (
              <WorkflowNode
                key={workflow.id}
                workflow={workflow}
                onClick={() => onSelect(workflow)}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Connection Lines */}
      <svg className="absolute inset-0 pointer-events-none">
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill="#475569"
            />
          </marker>
        </defs>
        
        {/* Add your connection lines here */}
      </svg>
    </div>
  );
};

const WorkflowNode: React.FC<{
  workflow: Workflow;
  onClick: () => void;
}> = ({ workflow, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className={`
      bg-zinc-900/50 rounded-lg border transition-colors duration-200 cursor-pointer
      ${workflow.isActive 
        ? 'border-teal-500/50 shadow-lg shadow-teal-500/10' 
        : 'border-zinc-800 hover:border-zinc-700'
      }
    `}
    onClick={onClick}
  >
    <div className="p-4">
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg ${workflow.isActive ? 'bg-teal-500/20' : 'bg-zinc-800'}`}>
          {workflow.icon}
        </div>
        <div>
          <h3 className="font-medium text-sm text-white">{workflow.title}</h3>
          <p className="text-xs text-zinc-400">{workflow.schedule}</p>
        </div>
      </div>
    </div>
  </motion.div>
);

export default WorkflowFlowChart;