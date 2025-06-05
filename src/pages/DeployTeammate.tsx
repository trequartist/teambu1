import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ProgressHeader from '../components/ProgressHeader';
import Button from '../components/Button';
import { Check, AlertCircle } from 'lucide-react';

const DeployTeammate: React.FC = () => {
  const navigate = useNavigate();
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentStep, setDeploymentStep] = useState(0);
  const [deploymentComplete, setDeploymentComplete] = useState(false);

  const handleDeploy = async () => {
    setIsDeploying(true);
    
    // Simulate deployment steps
    const steps = [
      'Initializing workflows',
      'Establishing tool connections',
      'Setting up monitoring',
      'Configuring interface',
      'Running system checks'
    ];
    
    for (let i = 0; i < steps.length; i++) {
      setDeploymentStep(i);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    setDeploymentComplete(true);
  };

  const handleContinue = () => {
    navigate('/command-center');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ProgressHeader />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {!isDeploying ? (
            <div className="bg-white rounded-lg border p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">
                Final Review Before Deployment
              </h1>
              
              <div className="space-y-6 mb-8">
                <div>
                  <h2 className="text-sm font-medium text-gray-900 mb-3">Configuration Summary:</h2>
                  <ul className="space-y-2">
                    <li className="flex items-center text-gray-700">
                      <Check className="h-4 w-4 text-teal-500 mr-2" />
                      <span>12 workflows configured and tested</span>
                    </li>
                    <li className="flex items-center text-gray-700">
                      <Check className="h-4 w-4 text-teal-500 mr-2" />
                      <span>8 tools connected successfully</span>
                    </li>
                    <li className="flex items-center text-gray-700">
                      <Check className="h-4 w-4 text-teal-500 mr-2" />
                      <span>Interface configured (Command Center)</span>
                    </li>
                    <li className="flex items-center text-gray-700">
                      <Check className="h-4 w-4 text-teal-500 mr-2" />
                      <span>Notification preferences set</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h2 className="text-sm font-medium text-gray-900 mb-3">Limits & Safeguards:</h2>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Maximum posts per day</label>
                      <input
                        type="number"
                        defaultValue={3}
                        className="w-24 px-3 py-1.5 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Require approval for</label>
                      <select className="w-full px-3 py-1.5 border rounded-md">
                        <option>First week</option>
                        <option>Sensitive topics only</option>
                        <option>All posts</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Monthly budget limit</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                        <input
                          type="number"
                          defaultValue={50}
                          className="w-24 pl-7 py-1.5 border rounded-md"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Pause teammate if</label>
                      <div className="flex items-center space-x-2">
                        <span>Engagement drops below</span>
                        <input
                          type="number"
                          defaultValue={1}
                          className="w-16 px-2 py-1 border rounded-md"
                        />
                        <span>%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-sm font-medium text-gray-900 mb-3">Team Access:</h2>
                  <div className="flex items-center space-x-3 mb-3">
                    <input
                      type="email"
                      placeholder="teammate@company.com"
                      className="flex-1 px-3 py-1.5 border rounded-md"
                    />
                    <select className="px-3 py-1.5 border rounded-md">
                      <option>Editor</option>
                      <option>Viewer</option>
                    </select>
                    <Button variant="outline" size="sm">Add</Button>
                  </div>
                  <div className="bg-gray-50 rounded-md p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Sarah Chen (you)</div>
                        <div className="text-sm text-gray-500">Full control</div>
                      </div>
                      <span className="text-sm text-gray-500">Owner</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleDeploy}
              >
                Deploy LinkedIn Content Marketer →
              </Button>
            </div>
          ) : (
            <div className="bg-white rounded-lg border p-6 text-center">
              {!deploymentComplete ? (
                <>
                  <h1 className="text-2xl font-bold text-gray-900 mb-6">
                    Deploying Your LinkedIn Content Marketer...
                  </h1>
                  
                  <div className="space-y-4 mb-8">
                    {[
                      'Initializing workflows',
                      'Establishing tool connections',
                      'Setting up monitoring',
                      'Configuring interface',
                      'Running system checks'
                    ].map((step, index) => (
                      <div
                        key={step}
                        className="flex items-center justify-center space-x-3"
                      >
                        {index <= deploymentStep ? (
                          <Check className="h-5 w-5 text-teal-500" />
                        ) : (
                          <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                        )}
                        <span className={index <= deploymentStep ? 'text-gray-900' : 'text-gray-500'}>
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="h-8 w-8 text-teal-500" />
                  </div>
                  
                  <h1 className="text-2xl font-bold text-gray-900 mb-3">
                    Success! Your teammate is ready to work.
                  </h1>
                  
                  <p className="text-gray-600 mb-8">
                    Your LinkedIn Content Marketer has been deployed and is ready to help you create engaging content.
                  </p>
                  
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleContinue}
                  >
                    Go to Command Center →
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeployTeammate;