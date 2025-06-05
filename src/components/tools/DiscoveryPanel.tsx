import React from 'react';
import { motion } from 'framer-motion';
import { ToolInsights } from '../../types/tools';
import { Sparkles, TrendingUp, Users, Calendar } from 'lucide-react';

interface DiscoveryPanelProps {
  insights: ToolInsights | null;
}

const DiscoveryPanel: React.FC<DiscoveryPanelProps> = ({ insights }) => {
  if (!insights) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 bg-gradient-to-br from-teal-900/20 to-indigo-900/20 rounded-xl p-6 border border-teal-500/20"
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center space-x-2 mb-6"
      >
        <Sparkles className="w-5 h-5 text-teal-400" />
        <h3 className="font-semibold text-white">
          Intelligent Discovery Complete
        </h3>
      </motion.div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {insights.linkedin && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800"
          >
            <div className="flex items-center space-x-2 mb-3">
              <Users className="w-4 h-4 text-teal-400" />
              <h4 className="font-medium text-white">LinkedIn Insights</h4>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">Followers</span>
                <span className="text-white">{insights.linkedin.followers.toLocaleString()}</span>
              </li>
              <li className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">Engagement</span>
                <span className="text-white">{insights.linkedin.avgEngagement}</span>
              </li>
              <li className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">Best Time</span>
                <span className="text-white">{insights.linkedin.bestTime}</span>
              </li>
            </ul>
          </motion.div>
        )}
        
        {insights.wordpress && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800"
          >
            <div className="flex items-center space-x-2 mb-3">
              <TrendingUp className="w-4 h-4 text-indigo-400" />
              <h4 className="font-medium text-white">Content Library</h4>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">Posts to Repurpose</span>
                <span className="text-white">{insights.wordpress.posts}</span>
              </li>
              <li className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">Scheduled Items</span>
                <span className="text-white">{insights.notion?.upcomingContent}</span>
              </li>
              <li className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">Product Launches</span>
                <span className="text-white">{insights.notion?.launches}</span>
              </li>
            </ul>
          </motion.div>
        )}
        
        {insights.notion && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800"
          >
            <div className="flex items-center space-x-2 mb-3">
              <Calendar className="w-4 h-4 text-purple-400" />
              <h4 className="font-medium text-white">Opportunities</h4>
            </div>
            <ul className="space-y-2">
              {insights.notion.gaps.map((gap, index) => (
                <li key={index} className="flex items-center space-x-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                  <span className="text-zinc-400">{gap}</span>
                </li>
              ))}
              <li className="flex items-center space-x-2 text-sm">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                <span className="text-zinc-400">5 team members to feature</span>
              </li>
            </ul>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default DiscoveryPanel;