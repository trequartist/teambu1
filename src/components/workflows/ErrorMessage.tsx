import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, XCircle, Info } from 'lucide-react';
import Button from '../Button';

interface ErrorMessageProps {
  type: 'ambiguous' | 'technical' | 'complex';
  message: string;
  suggestion?: string;
  onRetry?: () => void;
  onAlternative?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  type,
  message,
  suggestion,
  onRetry,
  onAlternative
}) => {
  const getIcon = () => {
    switch (type) {
      case 'technical':
        return <XCircle className="w-5 h-5 text-red-400" />;
      case 'complex':
        return <Info className="w-5 h-5 text-yellow-400" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-orange-400" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        rounded-lg border p-4
        ${type === 'technical' ? 'bg-red-900/20 border-red-500/20' :
          type === 'complex' ? 'bg-yellow-900/20 border-yellow-500/20' :
          'bg-orange-900/20 border-orange-500/20'}
      `}
    >
      <div className="flex items-start space-x-3">
        {getIcon()}
        <div className="flex-1">
          <p className="text-sm text-white mb-2">{message}</p>
          {suggestion && (
            <p className="text-sm text-zinc-400">{suggestion}</p>
          )}
          {(onRetry || onAlternative) && (
            <div className="flex space-x-3 mt-3">
              {onRetry && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onRetry}
                >
                  Try Again
                </Button>
              )}
              {onAlternative && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onAlternative}
                >
                  Try Alternative
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ErrorMessage;