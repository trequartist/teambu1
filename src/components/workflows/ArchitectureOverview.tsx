import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Button from '../Button';

interface ArchitectureOverviewProps {
  onContinue: () => void;
}

const ArchitectureOverview: React.FC<ArchitectureOverviewProps> = ({ onContinue }) => {
  const metrics = [
    { icon: '⚡', label: 'Setup Time', value: '5 min' },
    { icon: '🎯', label: 'Engagement Boost', value: '+47%' },
    { icon: '⏰', label: 'Time Saved', value: '20h/week' },
    { icon: '📈', label: 'Average ROI', value: '3.2x' }
  ];

  return (
    <div className="max-w-5xl mx-auto py-12">
      <div className="text-center mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-white mb-4"
        >
          Here's how your LinkedIn Content Marketer works
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-zinc-400 text-lg"
        >
          A multi-agent AI system that works 24/7 for your content success
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative bg-zinc-900/50 rounded-2xl p-8 border border-zinc-800"
      >
        {/* Flow Diagram */}
        <div className="grid grid-cols-3 gap-8 mb-12">
          {/* Input Node */}
          <div className="space-y-4">
            <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
              <h3 className="font-medium text-white mb-2">Content Sources</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-zinc-400">
                  <div className="w-8 h-8 bg-zinc-700 rounded flex items-center justify-center">📝</div>
                  <span>Blog Posts</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-zinc-400">
                  <div className="w-8 h-8 bg-zinc-700 rounded flex items-center justify-center">📊</div>
                  <span>Product Updates</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-zinc-400">
                  <div className="w-8 h-8 bg-zinc-700 rounded flex items-center justify-center">👥</div>
                  <span>Team News</span>
                </div>
              </div>
            </div>
          </div>

          {/* Processing Hub */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-indigo-500/20 rounded-full transform scale-150 blur-3xl" />
            <div className="relative bg-zinc-800 rounded-xl p-6 border border-zinc-700 h-full flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-medium text-white mb-2">AI Processing Hub</h3>
              <p className="text-sm text-zinc-400">12 specialized workflows</p>
            </div>
          </div>

          {/* Output Node */}
          <div className="space-y-4">
            <div className="bg-zinc-800 rounded-xl p-6 border border-zinc-700">
              <h3 className="font-medium text-white mb-2">Outputs</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-zinc-400">
                  <div className="w-8 h-8 bg-zinc-700 rounded flex items-center justify-center">🎯</div>
                  <span>Optimized Posts</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-zinc-400">
                  <div className="w-8 h-8 bg-zinc-700 rounded flex items-center justify-center">💬</div>
                  <span>Engagement</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-zinc-400">
                  <div className="w-8 h-8 bg-zinc-700 rounded flex items-center justify-center">📈</div>
                  <span>Analytics</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Strip */}
        <div className="grid grid-cols-4 gap-6 mt-8 pt-8 border-t border-zinc-800">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl mb-2">{metric.icon}</div>
              <div className="text-xl font-bold text-white mb-1">{metric.value}</div>
              <div className="text-sm text-zinc-500">{metric.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex justify-center mt-8"
      >
        <Button
          variant="primary"
          size="lg"
          onClick={onContinue}
          className="bg-gradient-to-r from-teal-500 to-indigo-500"
        >
          Continue to Usage Preferences
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </motion.div>
    </div>
  );
};

export default ArchitectureOverview;