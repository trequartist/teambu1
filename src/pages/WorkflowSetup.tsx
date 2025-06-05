import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ProgressHeader from '../components/ProgressHeader';
import WorkflowHero from '../components/workflows/WorkflowHero';
import WorkflowGallery from '../components/workflows/WorkflowGallery';
import WorkflowSummary from '../components/workflows/WorkflowSummary';
import { useTeammate } from '../context/TeammateContext';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WorkflowSetup: React.FC = () => {
  const navigate = useNavigate();
  const { usageMode } = useTeammate();
  const [selectedWorkflows, setSelectedWorkflows] = useState<string[]>([]);

  const handleContinue = () => {
    navigate('/studio');
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />
      <ProgressHeader />
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* AI Assistant Panel - Left Side */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-indigo-500 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Content Q</h3>
                  <p className="text-sm text-zinc-400">AI Assistant</p>
                </div>
              </div>
              
              <div className="bg-zinc-800/50 rounded-lg p-4">
                <p className="text-sm text-zinc-300 mb-3">
                  Let's configure what your AI teammate will do. I'll help you choose the right workflows for your goals.
                </p>
                
                {selectedWorkflows.length === 0 && (
                  <p className="text-sm text-zinc-400">
                    Start by exploring the recommended workflows below, or browse the full library to find exactly what you need.
                  </p>
                )}
                
                {selectedWorkflows.length > 0 && selectedWorkflows.length < 5 && (
                  <p className="text-sm text-zinc-400">
                    Great start! These workflows will help automate your LinkedIn presence. Consider adding more to create a comprehensive system.
                  </p>
                )}
                
                {selectedWorkflows.length >= 5 && (
                  <div className="mt-4 pt-4 border-t border-zinc-700">
                    <p className="text-sm text-zinc-300">
                      <span className="text-teal-400">Excellent choices!</span> You've built a powerful automation system that will:
                    </p>
                    <ul className="mt-2 space-y-1 text-sm text-zinc-400">
                      <li>• Create engaging content automatically</li>
                      <li>• Maintain consistent posting schedule</li>
                      <li>• Handle engagement intelligently</li>
                      <li>• Track and optimize performance</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content - Right Side */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <WorkflowHero />
              <WorkflowGallery
                selectedWorkflows={selectedWorkflows}
                setSelectedWorkflows={setSelectedWorkflows}
                onContinue={handleContinue}
                usageMode={usageMode}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Selected Workflows Summary */}
      {selectedWorkflows.length > 0 && (
        <WorkflowSummary
          selectedWorkflows={selectedWorkflows}
          onContinue={handleContinue}
        />
      )}
    </div>
  );
};

export default WorkflowSetup;