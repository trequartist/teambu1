import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, AlertCircle, BarChart3 } from 'lucide-react';

interface SlackMessage {
  time: string;
  channel: string;
  bot: string;
  message: string;
  attachments?: {
    title: string;
    text: string;
    color: string;
  }[];
  actions?: string[];
  preview?: {
    text: string;
    engagement: string;
  };
  metrics?: {
    views: string;
    reactions: string;
    comments: string;
    shares: string;
  };
  suggestion?: string;
}

const slackMessages: SlackMessage[] = [
  {
    time: '9:00 AM',
    channel: '#marketing',
    bot: 'KiwiQ Content Marketer',
    message: '🎯 Good morning! I found 3 trending topics in your industry that would make great LinkedIn posts:',
    attachments: [
      {
        title: '1. "The Rise of AI in B2B Sales"',
        text: 'Engagement prediction: 3.2% (50% above average)',
        color: '#14b8a6'
      },
      {
        title: '2. "Why Feature Velocity is Killing SaaS Companies"',
        text: 'Aligns with your recent blog post on feature creep',
        color: '#6366f1'
      }
    ],
    actions: ['Create Post', 'Schedule for Later', 'Dismiss']
  },
  {
    time: '10:15 AM',
    channel: '#marketing',
    bot: 'KiwiQ Content Marketer',
    message: '✅ LinkedIn post scheduled for Tuesday 10 AM',
    preview: {
      text: 'Did you know that 73% of SaaS companies track the wrong metrics?...',
      engagement: '2.3% predicted'
    }
  },
  {
    time: '2:30 PM',
    channel: '#marketing-alerts',
    bot: 'KiwiQ Content Marketer',
    message: '🔥 Your post is getting unusual traction!',
    metrics: {
      views: '2,847',
      reactions: '127',
      comments: '23',
      shares: '8'
    },
    suggestion: 'Consider engaging with top commenters to boost reach further'
  }
];

const SlackPreview: React.FC = () => {
  return (
    <div className="bg-zinc-900/50 rounded-lg p-4 max-h-[480px] overflow-y-auto border border-zinc-800">
      {slackMessages.map((msg, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.2 }}
        >
          <SlackMessage {...msg} />
        </motion.div>
      ))}
    </div>
  );
};

const SlackMessage: React.FC<SlackMessage> = ({
  time,
  channel,
  bot,
  message,
  attachments,
  actions,
  preview,
  metrics,
  suggestion
}) => (
  <div className="mb-4 bg-zinc-800/50 rounded-lg p-3 border-l-4 border-teal-500">
    <div className="flex items-start space-x-3">
      <div className="w-8 h-8 bg-teal-500 rounded flex items-center justify-center">
        <span className="text-white text-xs font-bold">K</span>
      </div>
      <div className="flex-1">
        <div className="flex items-center space-x-2 text-sm">
          <span className="font-medium text-white">{bot}</span>
          <span className="text-zinc-500">{channel}</span>
          <span className="text-zinc-500">{time}</span>
        </div>
        <p className="mt-1 text-zinc-300">{message}</p>
        
        {attachments && (
          <div className="mt-2 space-y-2">
            {attachments.map((att, i) => (
              <div
                key={i}
                className="border rounded p-2 bg-zinc-900/50"
                style={{ borderLeftColor: att.color, borderLeftWidth: '3px' }}
              >
                <h4 className="font-medium text-sm text-white">{att.title}</h4>
                <p className="text-xs text-zinc-400">{att.text}</p>
              </div>
            ))}
          </div>
        )}
        
        {actions && (
          <div className="mt-2 flex space-x-2">
            {actions.map((action, i) => (
              <button
                key={i}
                className="px-3 py-1 text-xs border border-zinc-700 rounded hover:bg-zinc-700 text-zinc-300 transition-colors"
              >
                {action}
              </button>
            ))}
          </div>
        )}
        
        {preview && (
          <div className="mt-2 bg-zinc-900/50 rounded p-2 border border-zinc-800">
            <p className="text-sm italic text-zinc-300">"{preview.text}"</p>
            <p className="text-xs text-zinc-500 mt-1">
              Predicted engagement: {preview.engagement}
            </p>
          </div>
        )}
        
        {metrics && (
          <div className="mt-2 grid grid-cols-4 gap-2 text-center">
            {Object.entries(metrics).map(([key, value]) => (
              <div key={key} className="bg-zinc-900/50 rounded p-1 border border-zinc-800">
                <div className="text-sm font-medium text-white">{value}</div>
                <div className="text-xs text-zinc-500 capitalize">{key}</div>
              </div>
            ))}
          </div>
        )}
        
        {suggestion && (
          <p className="mt-2 text-sm text-teal-400">💡 {suggestion}</p>
        )}
      </div>
    </div>
  </div>
);

export default SlackPreview;