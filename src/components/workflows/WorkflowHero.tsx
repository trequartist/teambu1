import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Target, Brain } from 'lucide-react';

const WorkflowHero: React.FC = () => {
  return (
    <div className="mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-white mb-4">
          Workflows: Your Teammate's Playbook
        </h1>
        <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
          Think of workflows as repeatable recipes that tell your AI teammate exactly how to handle different tasks
        </p>
      </motion.div>

      {/* Animated Diagram */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-8 mb-12"
      >
        <div className="flex items-center justify-center space-x-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-zinc-800 rounded-lg flex items-center justify-center mb-2">
              <span className="text-2xl">📝</span>
            </div>
            <p className="text-sm text-zinc-400">New blog post</p>
          </div>

          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowRight className="w-8 h-8 text-zinc-600" />
          </motion.div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-500/20 to-indigo-500/20 rounded-lg flex items-center justify-center mb-2 border border-teal-500/20">
              <span className="text-2xl">⚡️</span>
            </div>
            <p className="text-sm text-zinc-400">Workflow</p>
          </div>

          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          >
            <ArrowRight className="w-8 h-8 text-zinc-600" />
          </motion.div>

          <div className="text-center">
            <div className="w-16 h-16 bg-zinc-800 rounded-lg flex items-center justify-center mb-2">
              <span className="text-2xl">📱</span>
            </div>
            <p className="text-sm text-zinc-400">LinkedIn post scheduled</p>
          </div>
        </div>
      </motion.div>

      {/* Key Benefits */}
      <div className="grid md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-6"
        >
          <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-teal-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Automation</h3>
          <p className="text-zinc-400">Set it once, runs forever</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-6"
        >
          <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center mb-4">
            <Target className="w-6 h-6 text-indigo-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Consistency</h3>
          <p className="text-zinc-400">Same quality, every time</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-6"
        >
          <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center mb-4">
            <Brain className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Intelligence</h3>
          <p className="text-zinc-400">Learns and improves with each run</p>
        </motion.div>
      </div>
    </div>
  );
};

export default WorkflowHero;