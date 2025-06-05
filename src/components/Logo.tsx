import React from 'react';
import { Zap } from 'lucide-react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="bg-teal-500 rounded-lg p-1.5">
        <Zap className="h-5 w-5 text-white" />
      </div>
      <div className="absolute -bottom-1 -right-1 bg-purple-500 rounded-full h-3 w-3"></div>
    </div>
  );
};