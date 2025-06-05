import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Clock, Zap, ArrowUp } from 'lucide-react';

const CommandCenterPreview: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-zinc-400">Posts This Week</div>
            <Calendar className="h-5 w-5 text-teal-400" />
          </div>
          <div className="text-2xl font-bold text-white">5</div>
          <div className="flex items-center mt-2 text-sm text-teal-400">
            <ArrowUp className="h-4 w-4 mr-1" />
            <span>20% vs last week</span>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-zinc-400">Engagement Rate</div>
            <Users className="h-5 w-5 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white">2.8%</div>
          <div className="flex items-center mt-2 text-sm text-teal-400">
            <ArrowUp className="h-4 w-4 mr-1" />
            <span>0.5% vs benchmark</span>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-zinc-400">Response Time</div>
            <Clock className="h-5 w-5 text-orange-400" />
          </div>
          <div className="text-2xl font-bold text-white">14m</div>
          <div className="flex items-center mt-2 text-sm text-teal-400">
            <ArrowUp className="h-4 w-4 mr-1" />
            <span>31% faster</span>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-zinc-400">Hours Saved</div>
            <Zap className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="text-2xl font-bold text-white">23</div>
          <div className="text-sm text-zinc-400 mt-2">This month</div>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-zinc-900/50 rounded-lg border border-zinc-800 p-4"
      >
        <h3 className="font-medium text-white mb-4">Upcoming Content</h3>
        <div className="space-y-4">
          <UpcomingPost
            time="Today 3pm"
            title="Why B2B Buying Has Changed"
            type="Thought Leadership"
            engagement="2.4-3.1%"
          />
          <UpcomingPost
            time="Tomorrow 10am"
            title="Meet Our New Engineering Lead"
            type="Team Spotlight"
            engagement="1.8-2.2%"
          />
          <UpcomingPost
            time="Thu 2pm"
            title="Product Update: New Analytics"
            type="Product News"
            engagement="2.1-2.6%"
          />
        </div>
      </motion.div>
    </div>
  );
};

const UpcomingPost: React.FC<{
  time: string;
  title: string;
  type: string;
  engagement: string;
}> = ({ time, title, type, engagement }) => (
  <div className="flex items-center space-x-4">
    <div className="flex-shrink-0 w-24 text-sm text-zinc-500">{time}</div>
    <div className="flex-1">
      <div className="flex items-center">
        <h3 className="font-medium text-white">{title}</h3>
        <span className="ml-2 px-2 py-0.5 text-xs bg-purple-500/20 text-purple-300 rounded">
          {type}
        </span>
      </div>
      <p className="text-sm text-zinc-400">Estimated engagement: {engagement}</p>
    </div>
  </div>
);

export default CommandCenterPreview;