import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowRight, Eye, X, Grid, List, SortAsc, Plus, Info } from 'lucide-react';
import Button from '../Button';
import WorkflowInspectionModal from './WorkflowInspectionModal';
import { useWorkflows } from '../../hooks/useWorkflows';

interface WorkflowGalleryProps {
  selectedWorkflows: string[];
  setSelectedWorkflows: (workflows: string[]) => void;
  onContinue: () => void;
}

const defaultWorkflows = [
  {
    id: 'blog-to-linkedin',
    title: 'Blog → LinkedIn Adapter',
    description: 'Automatically transforms blog posts into engaging LinkedIn content',
    schedule: 'Weekly',
    setupTime: '5 min',
    category: 'content',
    icon: '📝',
    metrics: {
      engagement: '2.5%',
      timeSaved: '3h/week'
    }
  },
  {
    id: 'thought-leadership',
    title: 'Thought Leadership Generator',
    description: 'Creates original insights based on industry trends',
    schedule: '3x per week',
    setupTime: '10 min',
    category: 'content',
    icon: '💡',
    metrics: {
      engagement: '3.1%',
      timeSaved: '4h/week'
    }
  },
  {
    id: 'engagement-monitor',
    title: 'Smart Engagement Handler',
    description: 'Monitors and responds to comments intelligently',
    schedule: 'Real-time',
    setupTime: '5 min',
    category: 'engagement',
    icon: '💬',
    metrics: {
      responseRate: '92%',
      timeSaved: '5h/week'
    }
  }
];

const WorkflowGallery: React.FC<WorkflowGalleryProps> = ({
  selectedWorkflows,
  setSelectedWorkflows,
  onContinue
}) => {
  const navigate = useNavigate();
  const { workflows } = useWorkflows();
  const [showInspectModal, setShowInspectModal] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortOption, setSortOption] = useState<'popularity' | 'complexity' | 'timeToRun'>('popularity');

  useEffect(() => {
    if (selectedWorkflows.length === 0) {
      setSelectedWorkflows(defaultWorkflows.map(w => w.id));
    }
  }, []);

  const getSortedWorkflows = () => {
    return [...workflows].sort((a, b) => {
      switch (sortOption) {
        case 'popularity':
          return parseInt(b.metrics.posts_created || '0') - parseInt(a.metrics.posts_created || '0');
        case 'complexity':
          const complexityMap = { Low: 1, Medium: 2, High: 3 };
          return complexityMap[a.complexity] - complexityMap[b.complexity];
        case 'timeToRun':
          return a.setupTime.localeCompare(b.setupTime);
        default:
          return 0;
      }
    });
  };

  const sortedWorkflows = getSortedWorkflows();

  return (
    <div className="space-y-8">
      <div className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          Recommended for Your LinkedIn Content Marketer
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 rounded-lg p-4 border-2 border-zinc-700 hover:border-zinc-600 cursor-pointer group"
            onClick={() => navigate('/create-workflow')}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center">
                <Plus className="w-6 h-6 text-zinc-400" />
              </div>
              <div>
                <h3 className="font-medium text-white">Create Custom Workflow</h3>
                <p className="text-sm text-zinc-400">Build your own workflow from scratch</p>
              </div>
            </div>
            <p className="text-sm text-zinc-400 mb-4">
              Design your own workflow in the Workflow Studio
            </p>
            <div className="bg-gradient-to-br from-teal-500/10 to-indigo-500/10 rounded-lg p-3 border border-teal-500/20">
              <p className="text-sm text-teal-300">Build Now →</p>
            </div>
          </motion.div>

          {defaultWorkflows.map((workflow) => (
            <motion.div
              key={workflow.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`
                relative bg-zinc-800/50 rounded-lg p-4 border-2 transition-all
                ${selectedWorkflows.includes(workflow.id)
                  ? 'border-teal-500'
                  : 'border-zinc-700'
                }
              `}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="text-2xl">{workflow.icon}</div>
                <div>
                  <h3 className="font-medium text-white">{workflow.title}</h3>
                  <p className="text-sm text-zinc-400">{workflow.schedule} • {workflow.setupTime} setup</p>
                </div>
              </div>
              <p className="text-sm text-zinc-400 mb-4">{workflow.description}</p>
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedWorkflow(workflow);
                    setShowInspectModal(true);
                  }}
                  icon={<Eye className="w-4 h-4" />}
                >
                  Preview
                </Button>
                <Button
                  variant={selectedWorkflows.includes(workflow.id) ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => {
                    if (selectedWorkflows.includes(workflow.id)) {
                      setSelectedWorkflows(selectedWorkflows.filter(id => id !== workflow.id));
                    } else {
                      setSelectedWorkflows([...selectedWorkflows, workflow.id]);
                    }
                  }}
                >
                  {selectedWorkflows.includes(workflow.id) ? 'Remove' : 'Add'}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Browse All Workflows</h2>
          <div className="flex items-center space-x-4">
            <div className="bg-zinc-800 rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                icon={<Grid className="w-4 h-4" />}
              >
                Grid
              </Button>
              <Button
                variant={viewMode === 'list' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                icon={<List className="w-4 h-4" />}
              >
                List
              </Button>
            </div>

            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="popularity">Sort by Popularity</option>
              <option value="complexity">Sort by Complexity</option>
              <option value="timeToRun">Sort by Time to Run</option>
            </select>
          </div>
        </div>

        <div className={viewMode === 'grid' ? 'grid md:grid-cols-3 gap-6' : 'space-y-4'}>
          {sortedWorkflows.map((workflow) => (
            <motion.div
              key={workflow.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`
                relative bg-zinc-800/50 rounded-lg p-4 border-2 transition-all cursor-pointer
                ${selectedWorkflows.includes(workflow.id)
                  ? 'border-teal-500'
                  : 'border-zinc-700 hover:border-zinc-600'
                }
                ${viewMode === 'list' ? 'flex items-center justify-between' : ''}
              `}
              onClick={() => {
                setSelectedWorkflow(workflow);
                setShowInspectModal(true);
              }}
            >
              <div className={viewMode === 'list' ? 'flex-1' : ''}>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center">
                    {typeof workflow.icon === 'string' ? (
                      <span className="text-2xl">{workflow.icon}</span>
                    ) : (
                      <workflow.icon className="w-6 h-6 text-zinc-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{workflow.title}</h3>
                    <p className="text-sm text-zinc-400">{workflow.schedule} • {workflow.setupTime} setup</p>
                  </div>
                </div>
                
                <p className="text-sm text-zinc-400 mb-4">{workflow.description}</p>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-zinc-900/50 rounded p-2">
                      <div className="text-sm font-medium text-white">{workflow.complexity}</div>
                      <div className="text-xs text-zinc-500">Complexity</div>
                    </div>
                    <div className="bg-zinc-900/50 rounded p-2">
                      <div className="text-sm font-medium text-white">{workflow.setupTime}</div>
                      <div className="text-xs text-zinc-500">Setup Time</div>
                    </div>
                  </div>
                  
                  <div className="border-t border-zinc-700 pt-3">
                    <h4 className="text-xs font-medium text-zinc-400 mb-2">Requirements:</h4>
                    <div className="flex flex-wrap gap-2">
                      {workflow.requirements.map((req, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-zinc-900/50 rounded text-xs text-zinc-400"
                        >
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedWorkflow(workflow);
                        setShowInspectModal(true);
                      }}
                      icon={<Eye className="w-4 h-4" />}
                    >
                      Inspect
                    </Button>
                    <Button
                      variant={selectedWorkflows.includes(workflow.id) ? 'primary' : 'outline'}
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (selectedWorkflows.includes(workflow.id)) {
                          setSelectedWorkflows(selectedWorkflows.filter(id => id !== workflow.id));
                        } else {
                          setSelectedWorkflows([...selectedWorkflows, workflow.id]);
                        }
                      }}
                    >
                      {selectedWorkflows.includes(workflow.id) ? 'Remove' : 'Add to Teammate'}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="fixed right-8 bottom-24 w-80">
        <div className="bg-zinc-900/95 border border-zinc-800 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-indigo-500 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-medium text-white">Content Q</h3>
              <p className="text-sm text-zinc-400">AI Assistant</p>
            </div>
          </div>
          <p className="text-sm text-zinc-300">
            {selectedWorkflows.length === 0
              ? "You'll need at least one workflow to continue. Not sure? Start with the pre-selected recommendations."
              : selectedWorkflows.length >= 5
              ? "Nice selection! These workflows will work together to create a comprehensive content system."
              : "Great start! These workflows will help automate your LinkedIn presence."}
          </p>
        </div>
      </div>

      <WorkflowInspectionModal
        workflow={selectedWorkflow}
        isOpen={showInspectModal}
        onClose={() => setShowInspectModal(false)}
        onAdd={() => {
          if (selectedWorkflow) {
            if (selectedWorkflows.includes(selectedWorkflow.id)) {
              setSelectedWorkflows(selectedWorkflows.filter(id => id !== selectedWorkflow.id));
            } else {
              setSelectedWorkflows([...selectedWorkflows, selectedWorkflow.id]);
            }
          }
          setShowInspectModal(false);
        }}
        isSelected={selectedWorkflow ? selectedWorkflows.includes(selectedWorkflow.id) : false}
      />
    </div>
  );
};

export default WorkflowGallery;