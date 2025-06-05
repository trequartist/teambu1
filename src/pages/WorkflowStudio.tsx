import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/Tabs';
import { Settings, Code, Play, Send, MessageCircle } from 'lucide-react';
import Header from '../components/Header';
import ProgressHeader from '../components/ProgressHeader';
import WorkflowVisualView from '../components/workflows/WorkflowVisualView';
import WorkflowCodeView from '../components/workflows/WorkflowCodeView';
import WorkflowTestRunner from '../components/workflows/WorkflowTestRunner';
import WorkflowDeployment from '../components/workflows/WorkflowDeployment';
import CostCalculator from '../components/global/CostCalculator';
import ConfidenceIndicator from '../components/global/ConfidenceIndicator';
import { useStore } from '../store/useStore';
import { useWorkflows } from '../hooks/useWorkflows';

interface WorkflowStudioProps {
  workflowId?: string;
}

export default function WorkflowStudio({ workflowId }: WorkflowStudioProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('editor');
  const { workflows } = useWorkflows();
  const [selectedWorkflow] = useState(workflows[0]);
  const [testHistory, setTestHistory] = useState<any[]>([]);
  const [deploymentId, setDeploymentId] = useState<string>();
  const [deploymentStatus, setDeploymentStatus] = useState<any>(null);

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
    <div className="min-h-screen bg-zinc-950">
      <Header />
      <ProgressHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Main Content Area */}
          <div className="col-span-9">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="bg-zinc-900/50 rounded-lg p-1 border border-zinc-800">
                <TabsTrigger value="editor" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Editor
                </TabsTrigger>
                <TabsTrigger value="code" className="flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  Code View
                </TabsTrigger>
                <TabsTrigger value="test" className="flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  Test
                </TabsTrigger>
                <TabsTrigger value="deploy" className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Deploy
                </TabsTrigger>
              </TabsList>

              <TabsContent value="editor" className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-6">
                <WorkflowVisualView workflow={selectedWorkflow} />
              </TabsContent>

              <TabsContent value="code" className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-6">
                <WorkflowCodeView workflow={selectedWorkflow} />
              </TabsContent>

              <TabsContent value="test" className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-6">
                <div className="grid grid-cols-2 gap-6">
                  <WorkflowTestRunner
                    workflowId={selectedWorkflow.id}
                    onComplete={(results) => {
                      setTestHistory(prev => [results, ...prev]);
                    }}
                  />
                  {testHistory.length > 0 && (
                    <div className="bg-zinc-800/50 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-white mb-4">Test History</h3>
                      <div className="space-y-3">
                        {testHistory.map((test, index) => (
                          <div
                            key={index}
                            className="bg-zinc-900/50 rounded-lg p-3 border border-zinc-800"
                          >
                            <div className="flex justify-between text-sm">
                              <span className="text-zinc-400">
                                {new Date(test.timestamp).toLocaleString()}
                              </span>
                              <span className={test.success ? 'text-teal-400' : 'text-red-400'}>
                                {test.success ? 'Success' : 'Failed'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="deploy" className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-6">
                <div className="grid grid-cols-2 gap-6">
                  <WorkflowDeployment
                    workflowId={selectedWorkflow.id}
                    onDeploy={handleDeploy}
                    setDeploymentStatus={setDeploymentStatus}
                  />
                  {deploymentStatus && (
                    <div className="bg-zinc-800/50 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-white mb-4">Deployment Status</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-zinc-400">Status:</span>
                          <span className="text-teal-400">{deploymentStatus.status}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-zinc-400">Environment:</span>
                          <span className="text-white">{deploymentStatus.environment}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-zinc-400">Version:</span>
                          <span className="text-white">{deploymentStatus.version}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-3 space-y-6">
            {/* AI Assistant */}
            <div className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-indigo-500 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-white">Content Q</h3>
                  <p className="text-sm text-zinc-400">AI Assistant</p>
                </div>
              </div>
              <div className="text-sm text-zinc-400">
                I'm here to help you configure and optimize your workflow. Ask me anything!
              </div>
            </div>

            <CostCalculator />
            <ConfidenceIndicator />
          </div>
        </div>
      </div>
    </div>
  );
}