import React from 'react';
import { useLocation } from 'react-router-dom';
import { Check } from 'lucide-react';

const steps = [
  { name: 'Describe', path: '/create-workflow' },
  { name: 'Build', path: '/create-workflow/build' },
  { name: 'Test', path: '/create-workflow/test' },
  { name: 'Customize', path: '/create-workflow/customize' },
  { name: 'Activate', path: '/create-workflow/activate' }
];

const ProgressHeader: React.FC = () => {
  const location = useLocation();
  
  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.path === location.pathname);
  };

  return (
    <div className="bg-zinc-900/50 border-b border-zinc-800/50 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const currentStep = getCurrentStepIndex();
            const isComplete = index < currentStep;
            const isCurrent = index === currentStep;
            
            return (
              <div
                key={step.name}
                className={`flex items-center ${
                  index !== steps.length - 1 ? 'flex-1' : ''
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`
                      flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full
                      transition-colors duration-200
                      ${isComplete
                        ? 'bg-teal-500'
                        : isCurrent
                        ? 'bg-teal-500/20 border-2 border-teal-500'
                        : 'bg-zinc-800 border-2 border-zinc-700'
                      }
                    `}
                  >
                    {isComplete ? (
                      <Check className="w-5 h-5 text-white" />
                    ) : (
                      <span
                        className={`text-sm font-medium ${
                          isCurrent ? 'text-teal-400' : 'text-zinc-500'
                        }`}
                      >
                        {index + 1}
                      </span>
                    )}
                  </div>
                  <span
                    className={`ml-3 text-sm font-medium transition-colors duration-200 ${
                      isCurrent ? 'text-white' : 'text-zinc-500'
                    }`}
                  >
                    {step.name}
                  </span>
                </div>
                {index !== steps.length - 1 && (
                  <div
                    className={`
                      flex-1 ml-4 mr-4 h-0.5 transition-colors duration-200
                      ${isComplete ? 'bg-teal-500' : 'bg-zinc-800'}
                    `}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressHeader;