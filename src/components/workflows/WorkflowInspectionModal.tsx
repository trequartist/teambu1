import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Clock, Zap, ArrowRight, Check, Info } from 'lucide-react';
import Button from '../Button';

interface WorkflowInspectionModalProps {
  workflow: any;
  isOpen: boolean;
  onClose: () => void;
  onAdd: () => void;
  isSelected: boolean;
}

const WorkflowInspectionModal: React.FC<WorkflowInspectionModalProps> = ({
  workflow,
  isOpen,
  onClose,
  onAdd,
  isSelected
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'howItWorks' | 'requirements'>('overview');

  if (!isOpen || !workflow) return null;

  const renderIcon = (icon: any) => {
    if (typeof icon === 'string') {
      return <span className="text-4xl">{icon}</span>;
    }
    const IconComponent = icon;
    return <IconComponent className="w-8 h-8 text-zinc-400" />;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-zinc-900 rounded-xl border border-zinc-800 p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-start space-x-4 mb-6">
          <div className="w-16 h-16 bg-zinc-800 rounded-lg flex items-center justify-center">
            {renderIcon(workflow.icon)}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white mb-1">{workflow.title}</h2>
            <p className="text-zinc-400">{workflow.description}</p>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex space-x-4 mb-6 border-b border-zinc-800">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 -mb-px ${
              activeTab === 'overview'
                ? 'text-teal-400 border-b-2 border-teal-400'
                : 'text-zinc-400 hover:text-zinc-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('howItWorks')}
            className={`px-4 py-2 -mb-px ${
              activeTab === 'howItWorks'
                ? 'text-teal-400 border-b-2 border-teal-400'
                : 'text-zinc-400 hover:text-zinc-300'
            }`}
          >
            How it Works
          </button>
          <button
            onClick={() => setActiveTab('requirements')}
            className={`px-4 py-2 -mb-px ${
              activeTab === 'requirements'
                ? 'text-teal-400 border-b-2 border-teal-400'
                : 'text-zinc-400 hover:text-zinc-300'
            }`}
          >
            Requirements
          </button>
        </div>

        {/* Tab Content */}
        <div className="mb-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-800/50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-zinc-400 mb-2">
                    <Clock className="w-4 h-4" />
                    <span>Time Investment</span>
                  </div>
                  <div className="text-2xl font-semibold text-white">{workflow.setupTime}</div>
                  <p className="text-sm text-zinc-500">One-time setup</p>
                </div>
                <div className="bg-zinc-800/50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-zinc-400 mb-2">
                    <Zap className="w-4 h-4" />
                    <span>Time Saved</span>
                  </div>
                  <div className="text-2xl font-semibold text-white">
                    {Object.values(workflow.metrics).find((m: any) => m.includes('h/week')) || '3h/week'}
                  </div>
                  <p className="text-sm text-zinc-500">Automated work</p>
                </div>
              </div>

              {/* Success Metrics */}
              <div>
                <h3 className="text-lg font-medium text-white mb-3">Success Metrics</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(workflow.metrics).map(([key, value]) => (
                    <div key={key} className="bg-zinc-800/50 rounded-lg p-4">
                      <div className="text-xl font-semibold text-white">{value}</div>
                      <div className="text-sm text-zinc-400">{key.replace(/_/g, ' ')}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'howItWorks' && (
            <div className="space-y-4">
              <div className="bg-zinc-800/50 rounded-lg p-4">
                {workflow.howItWorks.map((step: string, index: number) => (
                  <div key={index} className="flex items-center space-x-3 mb-4 last:mb-0">
                    <div className="w-8 h-8 bg-zinc-700 rounded-full flex items-center justify-center">
                      <span className="text-sm text-zinc-300">{index + 1}</span>
                    </div>
                    <div className="text-zinc-300">{step}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'requirements' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-3">Required Tools</h3>
                <div className="space-y-2">
                  {workflow.requirements.map((requirement: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2 text-zinc-300">
                      <div className="w-5 h-5 bg-teal-500/20 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-teal-400" />
                      </div>
                      <span>{requirement}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-teal-900/20 to-indigo-900/20 rounded-lg p-4 border border-teal-500/20">
                <div className="flex items-start space-x-3">
                  <Info className="w-5 h-5 text-teal-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-white mb-1">Estimated Resources</h4>
                    <ul className="space-y-1 text-sm text-zinc-400">
                      <li>Setup time: {workflow.setupTime}</li>
                      <li>Runs {workflow.schedule.toLowerCase()}</li>
                      <li>Complexity: {workflow.complexity}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant={isSelected ? 'outline' : 'primary'}
            onClick={onAdd}
          >
            {isSelected ? 'Remove Workflow' : 'Add Workflow'}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default WorkflowInspectionModal;