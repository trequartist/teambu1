import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ThumbsUp, Share2, BarChart3 } from 'lucide-react';
import Button from '../Button';

const LinkedInPreview: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-zinc-900/50 rounded-lg border border-zinc-800">
        <div className="p-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-zinc-800 rounded-full overflow-hidden">
              <img
                src="https://images.pexels.com/photos/5474282/pexels-photo-5474282.jpeg"
                alt="Company Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="font-medium text-white">TechFlow</h4>
              <p className="text-sm text-zinc-400">2,847 followers</p>
            </div>
          </div>
          
          <div className="prose prose-invert prose-sm max-w-none">
            <p>Did you know that 73% of SaaS companies track the wrong metrics? 📊</p>
            <p>After analyzing hundreds of SaaS dashboards, we've identified the 10 metrics that actually correlate with sustainable growth.</p>
            <p>Here are my top 3 surprises:</p>
            <ol>
              <li>Logo retention matters more than dollar retention (until Series B)</li>
              <li>Feature adoption beats overall usage for predicting churn</li>
              <li>Support ticket sentiment is your best leading indicator</li>
            </ol>
            <p>The full analysis challenges conventional wisdom about CAC:LTV ratios and why MRR growth can be misleading.</p>
            <p>What metrics do you swear by? 🎯</p>
          </div>
          
          <div className="mt-4">
            <img
              src="https://images.pexels.com/photos/7567434/pexels-photo-7567434.jpeg"
              alt="Blog Preview"
              className="rounded-lg w-full"
            />
          </div>
          
          <div className="mt-4 flex items-center justify-between text-sm text-zinc-400">
            <div className="flex items-center space-x-1">
              <span className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <ThumbsUp className="w-2 h-2 text-white" />
              </span>
              <span>847</span>
            </div>
            <div className="flex space-x-2">
              <span>132 comments</span>
              <span>•</span>
              <span>23 shares</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-zinc-800 px-4 py-2">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" icon={<ThumbsUp className="w-4 h-4" />}>
              Like
            </Button>
            <Button variant="outline" size="sm" icon={<MessageSquare className="w-4 h-4" />}>
              Comment
            </Button>
            <Button variant="outline" size="sm" icon={<Share2 className="w-4 h-4" />}>
              Share
            </Button>
          </div>
        </div>
      </div>
      
      <div className="bg-zinc-900/50 rounded-lg border border-zinc-800 p-4">
        <h4 className="font-medium text-white mb-3">Post Performance</h4>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-semibold text-teal-400">14.2%</div>
            <div className="text-sm text-zinc-500">Engagement</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-white">2.8K</div>
            <div className="text-sm text-zinc-500">Impressions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-white">132</div>
            <div className="text-sm text-zinc-500">Comments</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-white">23</div>
            <div className="text-sm text-zinc-500">Shares</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkedInPreview;