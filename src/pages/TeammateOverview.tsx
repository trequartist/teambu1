import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ProgressHeader from '../components/ProgressHeader';
import Button from '../components/Button';
import { Check, FileText, MessageSquare, BarChart3, Calendar, Clock } from 'lucide-react';

const TeammateOverview: React.FC = () => {
  const navigate = useNavigate();
  const [selectedInterface, setSelectedInterface] = useState('command');
  const [notifications, setNotifications] = useState({
    dailySummary: true,
    urgentAlerts: true,
    weeklyEmail: false,
    mobileApprovals: true
  });

  const handleContinue = () => {
    navigate('/deploy');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ProgressHeader />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Your LinkedIn Content Marketer is almost ready!
          </h1>
          
          {/* Workflow Summary */}
          <div className="bg-white rounded-lg border p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">Here's what your teammate can do:</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-3">CONTENT CREATION (5 workflows)</h3>
                <ul className="space-y-2">
                  {[
                    'Transform blog posts into LinkedIn content',
                    'Generate thought leadership posts 3x per week',
                    'Create product launch announcements',
                    'Spotlight customer success stories',
                    'Feature team members bi-weekly'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <Check className="h-4 w-4 text-teal-500 mr-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-3">ENGAGEMENT & OPTIMIZATION (5 workflows)</h3>
                <ul className="space-y-2">
                  {[
                    'Monitor and respond to relevant comments',
                    'Track competitor content strategies',
                    'Schedule posts at optimal times',
                    'Create visuals for every post',
                    'Analyze performance weekly'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <Check className="h-4 w-4 text-teal-500 mr-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Estimated weekly output:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <FileText className="h-5 w-5 text-teal-500 mb-2" />
                  <div className="text-2xl font-bold text-gray-900">4-5</div>
                  <div className="text-sm text-gray-600">LinkedIn posts</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <MessageSquare className="h-5 w-5 text-teal-500 mb-2" />
                  <div className="text-2xl font-bold text-gray-900">10-15</div>
                  <div className="text-sm text-gray-600">Comment responses</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <BarChart3 className="h-5 w-5 text-teal-500 mb-2" />
                  <div className="text-2xl font-bold text-gray-900">1</div>
                  <div className="text-sm text-gray-600">Performance report</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <Clock className="h-5 w-5 text-teal-500 mb-2" />
                  <div className="text-2xl font-bold text-gray-900">20+</div>
                  <div className="text-sm text-gray-600">Hours saved</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Interface Configuration */}
          <div className="bg-white rounded-lg border p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">How do you want to interact with your LinkedIn Content Marketer?</h2>
            
            <div className="space-y-3 mb-6">
              {[
                {
                  id: 'command',
                  label: 'Command Center',
                  description: 'Visual dashboard with all controls'
                },
                {
                  id: 'chat',
                  label: 'Chat Interface',
                  description: 'Conversational interaction'
                },
                {
                  id: 'slack',
                  label: 'Slack Bot',
                  description: 'Integrate into your workspace'
                },
                {
                  id: 'api',
                  label: 'API Only',
                  description: 'Programmatic control'
                }
              ].map((option) => (
                <label
                  key={option.id}
                  className="flex items-start p-3 border rounded-md cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="radio"
                    name="interface"
                    value={option.id}
                    checked={selectedInterface === option.id}
                    onChange={() => setSelectedInterface(option.id)}
                    className="mt-1"
                  />
                  <div className="ml-3">
                    <div className="font-medium">{option.label}</div>
                    <div className="text-sm text-gray-500">{option.description}</div>
                  </div>
                </label>
              ))}
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Notification Preferences:</h3>
              <div className="space-y-3">
                {[
                  {
                    id: 'dailySummary',
                    label: 'Daily summary in Slack'
                  },
                  {
                    id: 'urgentAlerts',
                    label: 'Immediate alerts for urgent items'
                  },
                  {
                    id: 'weeklyEmail',
                    label: 'Weekly performance email'
                  },
                  {
                    id: 'mobileApprovals',
                    label: 'Mobile push for approvals needed'
                  }
                ].map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center"
                  >
                    <input
                      type="checkbox"
                      checked={notifications[option.id as keyof typeof notifications]}
                      onChange={() => setNotifications(prev => ({
                        ...prev,
                        [option.id]: !prev[option.id as keyof typeof notifications]
                      }))}
                      className="text-teal-500 focus:ring-teal-500 h-4 w-4 rounded"
                    />
                    <span className="ml-2 text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button
              variant="primary"
              size="lg"
              onClick={handleContinue}
            >
              Continue to Deployment →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeammateOverview;