import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface WorkflowNodeProps {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  isActive?: boolean;
  isComplete?: boolean;
  onClick?: () => void;
  'aria-current'?: 'step' | undefined;
  'aria-label'?: string;
}

const WorkflowNode: React.FC<WorkflowNodeProps> = ({
  label,
  description,
  icon,
  isActive,
  isComplete,
  onClick,
  'aria-current': ariaCurrent,
  'aria-label': ariaLabel
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'p-4 rounded-lg border transition-all',
        isActive 
          ? 'bg-teal-500/20 border-teal-500'
          : isComplete
          ? 'bg-zinc-800/50 border-zinc-700'
          : 'bg-zinc-800/20 border-zinc-800',
        onClick && 'cursor-pointer'
      )}
      onClick={onClick}
      onKeyPress={handleKeyPress}
      role="button"
      tabIndex={onClick ? 0 : -1}
      aria-current={ariaCurrent}
      aria-label={ariaLabel}
    >
      <div className="flex items-start space-x-3">
        <div className={cn(
          'w-10 h-10 rounded-lg flex items-center justify-center',
          isActive ? 'bg-teal-500/20 text-teal-400' : 'bg-zinc-800 text-zinc-400'
        )}
        aria-hidden="true"
        >
          {icon}
        </div>
        <div>
          <h4 className="font-medium text-white">{label}</h4>
          <p className="text-sm text-zinc-400">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default WorkflowNode;