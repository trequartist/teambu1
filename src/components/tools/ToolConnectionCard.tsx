import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tool, ToolConfig } from '../../types/tools';
import Button from '../Button';
import LoadingSpinner from '../LoadingSpinner';
import { getDefaultConfig, validateToolConfig } from '../../lib/tools';
import { renderConfigOptions } from './ToolConfigOptions';
import { AlertCircle, X } from 'lucide-react';

interface ToolConnectionCardProps {
  tool: Tool;
  onConnect: (toolId: string, config: Partial<ToolConfig>) => void;
  isConnected: boolean;
  isConnecting: boolean;
}

const ToolConnectionCard: React.FC<ToolConnectionCardProps> = ({
  tool,
  onConnect,
  isConnected,
  isConnecting
}) => {
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [config, setConfig] = useState(getDefaultConfig(tool));
  const [validationErrors, setValidationErrors] = useState<{ field: string; message: string; }[]>([]);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const Icon = tool.icon;
  
  const handleConnect = () => {
    if (isConnected) {
      setIsConfiguring(true);
      return;
    }
    
    setIsConfiguring(true);
  };

  const handleSave = async () => {
    // Clear previous errors
    setValidationErrors([]);
    setConnectionError(null);

    // Validate configuration
    const errors = validateToolConfig(tool, config);
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      await onConnect(tool.id, config);
      setIsConfiguring(false);
    } catch (error) {
      setConnectionError(error instanceof Error ? error.message : 'Failed to connect tool');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`
        bg-zinc-900/50 rounded-xl p-6 flex flex-col border-2 transition-all duration-200
        ${isConnected 
          ? 'border-teal-500 shadow-lg shadow-teal-500/10' 
          : 'border-zinc-800 hover:border-zinc-700'
        }
      `}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <motion.div 
            className={`p-2 rounded-lg ${isConnected ? 'bg-teal-500/20' : 'bg-zinc-800'}`}
            animate={{ scale: isConnecting ? [1, 1.1, 1] : 1 }}
            transition={{ duration: 0.5, repeat: isConnecting ? Infinity : 0 }}
          >
            <Icon className={`h-6 w-6 ${isConnected ? 'text-teal-400' : 'text-zinc-400'}`} />
          </motion.div>
          <div>
            <h3 className="font-medium text-white">{tool.name}</h3>
            <p className="text-sm text-zinc-400">{tool.description}</p>
          </div>
        </div>
        
        <Button
          variant={isConnected ? 'outline' : 'primary'}
          size="sm"
          onClick={handleConnect}
          disabled={isConnecting}
        >
          {isConnecting ? (
            <div className="flex items-center">
              <LoadingSpinner size="sm" className="mr-2" />
              Connecting...
            </div>
          ) : isConnected ? (
            'Connected ✓'
          ) : (
            'Connect'
          )}
        </Button>
      </div>
      
      <AnimatePresence>
        {isConfiguring && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 space-y-4"
          >
            {/* Validation Errors */}
            {validationErrors.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-900/20 rounded-lg p-3 border border-red-500/20"
              >
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-red-400">Configuration Errors</h4>
                    <ul className="mt-1 space-y-1">
                      {validationErrors.map((error, index) => (
                        <li key={index} className="text-sm text-red-300">
                          {error.message}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Connection Error */}
            {connectionError && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-900/20 rounded-lg p-3 border border-red-500/20"
              >
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <p className="text-sm text-red-300">{connectionError}</p>
                </div>
              </motion.div>
            )}

            {renderConfigOptions(tool, config, setConfig)}
            
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsConfiguring(false);
                  setValidationErrors([]);
                  setConnectionError(null);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSave}
                disabled={isConnecting}
              >
                Save Configuration
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ToolConnectionCard;