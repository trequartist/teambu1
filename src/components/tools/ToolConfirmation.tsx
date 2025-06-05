import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Shield, Zap } from 'lucide-react';
import Button from '../Button';

interface ToolConfirmationProps {
  selectedTools: string[];
  toolConfigs: Record<string, any>;
  onContinue: () => void;
}

const ToolConfirmation: React.FC<ToolConfirmationProps> = ({
  selectedTools,
  toolConfigs,
  onContinue
}) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-white mb-4"
        >
          Ready to Connect Your Tools
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-zinc-400 max-w-2xl mx-auto"
        >
          We'll securely connect these tools to power your AI teammate
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Selected Tools Summary */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-6"
        >
          <h3 className="font-medium text-white mb-4">Selected Tools</h3>
          <div className="space-y-3">
            {selectedTools.map((tool, index) => (
              <div 
                key={tool}
                className="flex items-center space-x-3 text-zinc-300"
              >
                <Check className="h-5 w-5 text-teal-400" />
                <span>{tool}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Security Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-6"
        >
          <div className="flex items-center space-x-2 mb-4">
            <Shield className="h-5 w-5 text-teal-400" />
            <h3 className="font-medium text-white">Security & Privacy</h3>
          </div>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-teal-400 rounded-full" />
              <span>OAuth 2.0 secure authentication</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-teal-400 rounded-full" />
              <span>End-to-end encryption</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-teal-400 rounded-full" />
              <span>Data stored in your region</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-teal-400 rounded-full" />
              <span>Revoke access anytime</span>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Connection Process */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-teal-900/20 to-indigo-900/20 rounded-xl border border-teal-500/20 p-6"
      >
        <div className="flex items-center space-x-2 mb-4">
          <Zap className="h-5 w-5 text-teal-400" />
          <h3 className="font-medium text-white">Connection Process</h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center mx-auto mb-2">
              🔐
            </div>
            <div className="text-sm text-zinc-300">Authenticate</div>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center mx-auto mb-2">
              ⚡️
            </div>
            <div className="text-sm text-zinc-300">Configure</div>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center mx-auto mb-2">
              ✅
            </div>
            <div className="text-sm text-zinc-300">Verify</div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex justify-end"
      >
        <Button
          variant="primary"
          size="lg"
          onClick={onContinue}
          className="bg-gradient-to-r from-teal-500 to-indigo-500"
        >
          Start Connecting Tools
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </motion.div>
    </div>
  );
};

export default ToolConfirmation;