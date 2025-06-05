import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Button from '../components/Button';
import WorkflowGrid from '../components/workflows/WorkflowGrid';
import WorkflowFlowChart from '../components/workflows/WorkflowFlowChart';
import WorkflowQuickEdit from '../components/workflows/WorkflowQuickEdit';
import { Grid3X3, Share2 } from 'lucide-react';
import { Workflow } from '../types/workflows';

const WorkflowOverview: React.FC = () => {
  const navigate = useNavigate();
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'flow'>('grid');
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Your LinkedIn Content Marketer Workflows
            </h1>
            <p className="text-gray-500 mt-1">
              12 workflows working together to manage your LinkedIn presence
            </p>
          </div>
          
          <div className="flex space-x-3">
            <div className="bg-white rounded-lg border shadow-sm p-1">
              <button
                className={`px-4 py-2 rounded ${viewMode === 'grid' ? 'bg-teal-500 text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                className={`px-4 py-2 rounded ${viewMode === 'flow' ? 'bg-teal-500 text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                onClick={() => setViewMode('flow')}
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>
            
            <Button
              variant="outline"
              onClick={() => navigate('/studio')}
            >
              Open Studio
            </Button>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {viewMode === 'grid' ? (
            <WorkflowGrid onSelect={setSelectedWorkflow} />
          ) : (
            <WorkflowFlowChart onSelect={setSelectedWorkflow} />
          )}
        </motion.div>
        
        {selectedWorkflow && (
          <WorkflowQuickEdit
            workflow={selectedWorkflow}
            onClose={() => setSelectedWorkflow(null)}
          />
        )}
      </div>
    </div>
  );
};

export default WorkflowOverview;