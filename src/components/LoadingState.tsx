import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface LoadingStateProps {
  className?: string;
  variant?: 'card' | 'text' | 'button';
  count?: number;
}

const LoadingState: React.FC<LoadingStateProps> = ({
  className,
  variant = 'card',
  count = 1
}) => {
  const renderShimmer = () => {
    switch (variant) {
      case 'text':
        return (
          <div className="h-4 bg-zinc-800 rounded animate-shimmer bg-[length:200%_100%] bg-shimmer" />
        );
      
      case 'button':
        return (
          <div className="h-10 bg-zinc-800 rounded-lg animate-shimmer bg-[length:200%_100%] bg-shimmer" />
        );
      
      case 'card':
      default:
        return (
          <div className="space-y-3">
            <div className="h-24 bg-zinc-800 rounded-lg animate-shimmer bg-[length:200%_100%] bg-shimmer" />
            <div className="space-y-2">
              <div className="h-4 bg-zinc-800 rounded w-2/3 animate-shimmer bg-[length:200%_100%] bg-shimmer" />
              <div className="h-4 bg-zinc-800 rounded animate-shimmer bg-[length:200%_100%] bg-shimmer" />
              <div className="h-4 bg-zinc-800 rounded w-4/5 animate-shimmer bg-[length:200%_100%] bg-shimmer" />
            </div>
          </div>
        );
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          {renderShimmer()}
        </motion.div>
      ))}
    </div>
  );
};

export default LoadingState;