import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useLocation } from 'react-router-dom';

interface AiAssistantProps {
  className?: string;
}

const AiAssistant: React.FC<AiAssistantProps> = ({ className = '' }) => {
  const location = useLocation();
  const { aiMessages, addAiMessage, usageMode, selectedWorkflows } = useStore();

  // Generate context-aware messages based on current route and state
  useEffect(() => {
    const generateContextMessage = () => {
      switch (location.pathname) {
        case '/onboarding':
          return "Let's configure your AI teammate to match your needs perfectly.";
        case '/connect':
          return "I'll help you connect and configure your tools securely.";
        case '/workflows':
          if (selectedWorkflows.length > 0) {
            return `Great choices! You've selected ${selectedWorkflows.length} workflows that work together seamlessly.`;
          }
          return "Let's select the workflows that will help you achieve your content goals.";
        case '/studio':
          return "Here you can customize and fine-tune your workflows.";
        default:
          return "How can I help you today?";
      }
    };

    addAiMessage(generateContextMessage(), 'assistant');
  }, [location.pathname, usageMode, selectedWorkflows.length]);

  return (
    <div className={`bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 ${className}`}>
      <div className="flex items-start space-x-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-indigo-500 rounded-lg flex items-center justify-center">
          <MessageCircle className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-white">Content Q</h3>
          <p className="text-sm text-zinc-400">AI Assistant</p>
        </div>
      </div>

      <div className="space-y-4">
        {aiMessages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`
              p-4 rounded-lg
              ${message.type === 'assistant' 
                ? 'bg-zinc-800/50 border border-zinc-700' 
                : 'bg-teal-500/10 border border-teal-500/20'
              }
            `}
          >
            {message.type === 'assistant' && (
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="w-4 h-4 text-teal-400" />
                <span className="text-sm font-medium text-teal-400">AI Assistant</span>
              </div>
            )}
            <p className="text-sm text-zinc-300">{message.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AiAssistant;