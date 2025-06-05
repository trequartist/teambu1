import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Sparkles, Eye, Send } from 'lucide-react';
import WorkflowNode from './WorkflowNode';
import WorkflowConnector from './WorkflowConnector';

interface WorkflowStep {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  isComplete?: boolean;
}

interface WorkflowPreviewProps {
  steps: WorkflowStep[];
  currentStep: number;
  onStepClick?: (stepId: string) => void;
}

const WorkflowPreview: React.FC<WorkflowPreviewProps> = ({
  steps,
  currentStep,
  onStepClick
}) => {
  return (
    <div 
      className="space-y-2"
      role="region" 
      aria-label="Workflow Preview"
    >
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <WorkflowNode
            {...step}
            isActive={index === currentStep}
            isComplete={index < currentStep}
            onClick={() => onStepClick?.(step.id)}
            aria-current={index === currentStep ? 'step' : undefined}
            aria-label={`${step.label} - ${step.description}`}
          />
          {index < steps.length - 1 && (
            <WorkflowConnector 
              isActive={index < currentStep}
              aria-hidden="true"
            />
          )}
        </React.Fragment>
      ))}
      <div className="sr-only" role="status" aria-live="polite">
        {`Current step: ${steps[currentStep]?.label}`}
      </div>
    </div>
  );
};

export default WorkflowPreview;