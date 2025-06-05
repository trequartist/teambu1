import React from 'react';
import { motion } from 'framer-motion';
import { Check, Calendar, FileText, AlertCircle } from 'lucide-react';

interface NotionUpdate {
  icon: string;
  title: string;
  details: string;
  timestamp: string;
  action?: string;
}

const NotionPreview: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800">
        <h4 className="font-medium text-white mb-3">📅 Content Calendar Updates</h4>
        <div className="space-y-2">
          <NotionUpdate
            icon="✅"
            title="Blog post adapted for LinkedIn"
            details="'10 SaaS Metrics' → 2 LinkedIn versions created"
            timestamp="Just now"
          />
          <NotionUpdate
            icon="📊"
            title="Performance data synced"
            details="Week 12 engagement: 2.8% avg (↑ 0.5%)"
            timestamp="2 hours ago"
          />
          <NotionUpdate
            icon="🎯"
            title="Content gap identified"
            details="No customer stories scheduled for next 2 weeks"
            timestamp="This morning"
            action="Schedule Story"
          />
        </div>
      </div>
      
      <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800">
        <h4 className="font-medium text-white mb-3">🤖 Automated Workflows</h4>
        <div className="space-y-3">
          <WorkflowStatus
            title="When blog published → Create LinkedIn draft"
            isActive={true}
          />
          <WorkflowStatus
            title="Weekly → Analyze top content & update strategy"
            isActive={true}
          />
          <WorkflowStatus
            title="Daily → Monitor industry trends"
            isActive={true}
          />
        </div>
      </div>
    </div>
  );
};

const NotionUpdate: React.FC<NotionUpdate> = ({
  icon,
  title,
  details,
  timestamp,
  action
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-start space-x-3 bg-zinc-800/50 rounded p-3 border border-zinc-700"
  >
    <span className="text-xl">{icon}</span>
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <h5 className="font-medium text-sm text-white">{title}</h5>
        <span className="text-xs text-zinc-500">{timestamp}</span>
      </div>
      <p className="text-sm text-zinc-400 mt-1">{details}</p>
      {action && (
        <button className="mt-2 text-sm text-teal-400 hover:text-teal-300 font-medium">
          {action} →
        </button>
      )}
    </div>
  </motion.div>
);

const WorkflowStatus: React.FC<{ title: string; isActive: boolean }> = ({
  title,
  isActive
}) => (
  <div className="flex items-center justify-between p-2 bg-zinc-800/50 rounded border border-zinc-700">
    <div className="flex items-center space-x-3">
      <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
      <span className="text-sm text-zinc-300">{title}</span>
    </div>
    <span className="text-xs text-zinc-500">Active</span>
  </div>
);

export default NotionPreview;