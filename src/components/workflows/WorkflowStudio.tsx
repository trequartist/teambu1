import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import ProgressHeader from '../components/ProgressHeader';
import Button from '../components/Button';
import Modal from '../components/Modal';
import LoadingSpinner from '../components/LoadingSpinner';
import WorkflowCodeView from '../components/workflows/WorkflowCodeView';
import WorkflowTestRunner from '../components/workflows/WorkflowTestRunner';
import WorkflowDeployment from '../components/workflows/WorkflowDeployment';
import DeploymentStatus from '../components/workflows/DeploymentStatus';
import TestHistory from '../components/workflows/TestHistory';
import { useDeploymentStatus } from '../../hooks/useDeploymentStatus';
import { Grid3X3, MessageCircle, Play, Code, FileText, Check } from 'lucide-react';
import { Workflow } from '../../types/workflows';

// ... (previous code remains the same until the component)

const WorkflowStudio: React.FC = () => {
  // ... (previous state declarations)

  const [testHistory, setTestHistory] = useState<TestRun[]>([]);
  const [deploymentId, setDeploymentId] = useState<string>();
  const { status: deploymentStatus, isPolling } = useDeploymentStatus(deploymentId);

  const handleRunTest = async () => {
    if (!selectedPost) return;
    setIsRunningTest(true);
    
    // Simulate test execution
    await new Promise(resolve => setTimeout(resolve, 1000));
    setTestResults({ step: 'fetch', status: 'complete' });
    
    await new Promise(resolve => setTimeout(resolve, 800));
    setTestResults({ step: 'analyze', status: 'complete' });
    
    await new Promise(resolve => setTimeout(resolve, 1200));
    setTestResults({ step: 'create', status: 'complete' });
    
    await new Promise(resolve => setTimeout(resolve, 500));
    setTestResults({ step: 'enhance', status: 'complete' });
    
    await new Promise(resolve => setTimeout(resolve, 400));
    setTestResults({ step: 'optimize', status: 'complete' });
    
    // Add to test history
    const newTestRun: TestRun = {
      id: Date.now().toString(),
      timestamp: new Date(),
      duration: 3900,
      success: true,
      steps: [
        { name: 'Fetch Content', status: 'success', duration: 1000 },
        { name: 'Analyze', status: 'success', duration: 800 },
        { name: 'Create Versions', status: 'success', duration: 1200 },
        { name: 'Enhance', status: 'success', duration: 500 },
        { name: 'Optimize', status: 'success', duration: 400 }
      ]
    };
    
    setTestHistory(prev => [newTestRun, ...prev]);
    setIsRunningTest(false);
    setShowTestModal(true);
  };

  const handleDeploy = async (config: any) => {
    const newDeploymentId = `deploy-${Date.now()}`;
    setDeploymentId(newDeploymentId);
    setDeploymentStatus({
      status: 'deploying',
      environment: config.environment,
      version: '1.0.0',
      timestamp: new Date()
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ... (previous JSX remains the same until the modals) */}

      {/* Test Modal */}
      <Modal
        isOpen={showTestModal}
        onClose={() => setShowTestModal(false)}
        title="Test Workflow"
        maxWidth="xl"
      >
        <div className="p-6">
          <div className="grid grid-cols-2 gap-6">
            <WorkflowTestRunner
              workflowId={selectedWorkflow.id}
              onComplete={(results) => {
                setTestResults(results);
                setTimeout(() => setShowTestModal(false), 2000);
              }}
            />
            <TestHistory runs={testHistory} />
          </div>
        </div>
      </Modal>

      {/* Deploy Modal */}
      <Modal
        isOpen={showDeployModal}
        onClose={() => setShowDeployModal(false)}
        title="Deploy Workflow"
        maxWidth="xl"
      >
        <div className="p-6">
          <div className="grid grid-cols-2 gap-6">
            <WorkflowDeployment
              workflowId={selectedWorkflow.id}
              onDeploy={handleDeploy}
            />
            {deploymentStatus && (
              <DeploymentStatus {...deploymentStatus} />
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default WorkflowStudio;