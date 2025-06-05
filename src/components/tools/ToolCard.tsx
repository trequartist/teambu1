import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tool } from '../../types/tools';
import Button from '../Button';
import { Check, Settings } from 'lucide-react';

interface ToolCardProps {
  tool: Tool;
  isConnected: boolean;
  onConnect: () => void;
  onConfigure: () => void;
}

const ToolCard: React.FC<ToolCardProps> = ({
  tool,
  isConnected,
  onConnect,
  onConfigure
}) => {
  const Icon = tool.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        bg-zinc-900/50 rounded-xl p-6 border-2 transition-all duration-200
        ${isConnected 
          ? 'border-teal-500 shadow-lg shadow-teal-500/10' 
          : 'border-zinc-800 hover:border-zinc-700'
        }
      `}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`
            p-2 rounded-lg
            ${isConnected ? 'bg-teal-500/20' : 'bg-zinc-800'}
          `}>
            <Icon className={`h-6 w-6 ${isConnected ? 'text-teal-400' : 'text-zinc-400'}`} />
          </div>
          <div>
            <h3 className="font-medium text-white">{tool.name}</h3>
            <p className="text-sm text-zinc-400">{tool.description}</p>
          </div>
        </div>
        
        {isConnected ? (
          <Button
            variant="outline"
            size="sm"
            onClick={onConfigure}
            icon={<Settings className="h-4 w-4" />}
          >
            Configure
          </Button>
        ) : (
          <Button
            variant="primary"
            size="sm"
            onClick={onConnect}
          >
            Connect
          </Button>
        )}
      </div>
      
      {isConnected && (
        <div className="mt-4 pt-4 border-t border-zinc-800">
          <div className="flex items-center space-x-2 text-sm text-teal-400">
            <Check className="h-4 w-4" />
            <span>Connected successfully</span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ToolCard;