import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import ProgressHeader from '../components/ProgressHeader';
import ToolSelection from '../components/tools/ToolSelection';
import ToolConfirmation from '../components/tools/ToolConfirmation';

const ToolConnections: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<'selection' | 'confirmation'>('selection');
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [toolConfigs, setToolConfigs] = useState({});

  const handleContinue = () => {
    if (currentStep === 'selection') {
      setCurrentStep('confirmation');
    } else {
      navigate('/workflow-selection');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />
      <ProgressHeader />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {currentStep === 'selection' && (
            <ToolSelection
              selectedUseCase="content-marketer"
              selectedTools={selectedTools}
              setSelectedTools={setSelectedTools}
              toolConfigs={toolConfigs}
              setToolConfigs={setToolConfigs}
              onContinue={handleContinue}
            />
          )}
          
          {currentStep === 'confirmation' && (
            <>
              <ToolConfirmation
                selectedTools={selectedTools}
                toolConfigs={toolConfigs}
                onContinue={handleContinue}
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 bg-gradient-to-br from-teal-900/20 to-indigo-500/20 rounded-xl p-6 border border-teal-500/20"
              >
                <p className="text-lg text-zinc-300">
                  Now that your tools are connected, let's configure what your teammate will do with them.
                </p>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolConnections;