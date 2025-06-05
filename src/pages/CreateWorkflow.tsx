import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle, Play, Code, Settings, FileText, Sparkles, Eye, Send, AlertCircle, Check, Sliders } from 'lucide-react';
import Header from '../components/Header';
import ProgressHeader from '../components/ProgressHeader';
import Button from '../components/Button';
import Modal from '../components/Modal';
import WorkflowPreview from '../components/workflows/WorkflowPreview';
import WorkflowSettings from '../components/workflows/WorkflowSettings';
import WorkflowTestRunner from '../components/workflows/WorkflowTestRunner';
import TranslationPanel from '../components/translation/TranslationPanel';
import AmbiguityResolver from '../components/translation/AmbiguityResolver';
import { useStore } from '../store/useStore';

const WORKFLOW_TEMPLATES = [
  {
    id: 'competitor-analysis',
    name: 'Competitor Analysis',
    description: 'Track and analyze competitor content',
    matchScore: 0.92,
    features: ['Content monitoring', 'Engagement tracking', 'Weekly reports']
  },
  {
    id: 'market-insights',
    name: 'Market Insights',
    description: 'Industry trends and market analysis',
    matchScore: 0.78,
    features: ['Trend detection', 'Sentiment analysis', 'Strategic recommendations']
  }
];

const CreateWorkflow: React.FC = () => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);
  const [translationStages, setTranslationStages] = useState<any[]>([]);
  const [showClarificationPrompt, setShowClarificationPrompt] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showAdvancedConfig, setShowAdvancedConfig] = useState(false);
  const [estimatedCost, setEstimatedCost] = useState({ monthly: 0, perRun: 0 });
  const [matchedTemplates, setMatchedTemplates] = useState<typeof WORKFLOW_TEMPLATES>([]);

  const {
    aiConfidence,
    setAiConfidence,
    aiConfidenceBreakdown,
    setAiConfidenceBreakdown,
    addAiMessage
  } = useStore();

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setIsTyping(true);
    addAiMessage(userInput, 'user');
    addAiMessage('Understanding your request...', 'assistant');
    
    // Simulate initial confidence
    setAiConfidence(87);
    setAiConfidenceBreakdown([
      { label: 'Intent recognition', confidence: 94 },
      { label: 'Workflow mapping', confidence: 89 },
      { label: 'Parameter extraction', confidence: 76, warning: '"Weekly insights" is ambiguous' }
    ]);

    // Simulate template matching
    setMatchedTemplates(WORKFLOW_TEMPLATES);

    // Simulate cost calculation
    setEstimatedCost({
      monthly: 12.50,
      perRun: 0.05
    });

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    addAiMessage(`Great! I can help you build a LinkedIn Competitor Analysis workflow. Let me confirm what you need:

📊 What you'll track:
• Companies: Salesforce, HubSpot, Monday.com
• Platform: LinkedIn company pages
• Frequency: Weekly analysis

📈 What you'll receive:
• Content themes and topics
• Posting patterns and timing
• Engagement metrics comparison
• Strategic recommendations`, 'assistant');

    setShowClarificationPrompt(true);
    setIsTyping(false);
  }, [userInput, addAiMessage, setAiConfidence, setAiConfidenceBreakdown]);

  const handleTimeSelection = (time: string) => {
    setSelectedTime(time);
    addAiMessage(`Perfect! I'll schedule the weekly report for ${time}.`, 'assistant');
    setShowAdvancedConfig(true);
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />
      <ProgressHeader />
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* AI Assistant Panel */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 bg-zinc-900/50 rounded-xl border border-zinc-800 p-6">
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-indigo-500 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Content Q</h3>
                  <p className="text-sm text-zinc-400">AI Assistant</p>
                </div>
              </div>

              <div className="bg-zinc-800/50 rounded-lg p-4">
                <p className="text-sm text-zinc-300 mb-3">
                  Describe your workflow in natural language, and I'll help you build it.
                </p>
                <p className="text-sm text-zinc-400">
                  Example: "When a new blog post is published, create a LinkedIn post, optimize it for engagement, and schedule it for the best time"
                </p>
              </div>

              {aiConfidence > 0 && (
                <div className="mt-4 bg-zinc-800/50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm text-zinc-400">AI Confidence:</span>
                    <div className="flex-1 h-2 bg-zinc-700 rounded-full">
                      <div 
                        className="h-2 bg-teal-500 rounded-full"
                        style={{ width: `${aiConfidence}%` }}
                      />
                    </div>
                    <span className="text-sm text-zinc-400">{aiConfidence}%</span>
                  </div>

                  <div className="space-y-2">
                    {aiConfidenceBreakdown.map((item, index) => (
                      <div key={index} className="text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-zinc-400">{item.label}</span>
                          <span className="text-zinc-400">{item.confidence}%</span>
                        </div>
                        {item.warning && (
                          <p className="text-yellow-500 text-xs mt-0.5">{item.warning}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {estimatedCost.monthly > 0 && (
                <div className="mt-4 bg-gradient-to-br from-teal-900/20 to-indigo-900/20 rounded-lg p-4 border border-teal-500/20">
                  <h4 className="text-sm font-medium text-white mb-2">Estimated Cost</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400">Monthly</span>
                      <span className="text-white">${estimatedCost.monthly.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400">Per run</span>
                      <span className="text-white">${estimatedCost.perRun.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Input Form */}
            <div className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Describe your workflow..."
                  className="w-full h-32 bg-zinc-800 border border-zinc-700 rounded-lg p-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={!userInput.trim() || isTyping}
                  >
                    Translate to Workflow
                  </Button>
                </div>
              </form>
            </div>

            {/* Template Matches */}
            {matchedTemplates.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-6"
              >
                <h3 className="text-lg font-medium text-white mb-4">Matching Templates</h3>
                <div className="space-y-4">
                  {matchedTemplates.map((template) => (
                    <div
                      key={template.id}
                      className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-white">{template.name}</h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-zinc-400">Match:</span>
                          <span className="text-sm text-teal-400">{(template.matchScore * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                      <p className="text-sm text-zinc-400 mb-3">{template.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {template.features.map((feature, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-zinc-700 rounded-full text-xs text-zinc-300"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Clarification Prompt */}
            {showClarificationPrompt && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-6"
              >
                <h3 className="text-lg font-medium text-white mb-4">When do you want the weekly report?</h3>
                <div className="grid grid-cols-3 gap-4">
                  <Button
                    variant={selectedTime === 'Monday 9 AM' ? 'primary' : 'outline'}
                    onClick={() => handleTimeSelection('Monday 9 AM')}
                  >
                    Monday 9 AM
                  </Button>
                  <Button
                    variant={selectedTime === 'Friday 5 PM' ? 'primary' : 'outline'}
                    onClick={() => handleTimeSelection('Friday 5 PM')}
                  >
                    Friday 5 PM
                  </Button>
                  <Button
                    variant={selectedTime === 'custom' ? 'primary' : 'outline'}
                    onClick={() => handleTimeSelection('custom')}
                  >
                    Other time...
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Advanced Configuration */}
            {showAdvancedConfig && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-white">Advanced Configuration</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<Sliders className="w-4 h-4" />}
                  >
                    Show All Options
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Monitoring Settings */}
                  <div>
                    <h4 className="text-sm font-medium text-white mb-3">Monitoring Settings</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-zinc-400 mb-2">
                          Update Frequency
                        </label>
                        <select className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2 text-white">
                          <option>Real-time</option>
                          <option>Hourly</option>
                          <option>Daily</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-zinc-400 mb-2">
                          Alert Threshold
                        </label>
                        <select className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2 text-white">
                          <option>High priority only</option>
                          <option>Medium and high</option>
                          <option>All changes</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Analysis Settings */}
                  <div>
                    <h4 className="text-sm font-medium text-white mb-3">Analysis Settings</h4>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          className="rounded border-zinc-600 bg-zinc-800 text-teal-500"
                          defaultChecked
                        />
                        <span className="text-sm text-zinc-300">Include sentiment analysis</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          className="rounded border-zinc-600 bg-zinc-800 text-teal-500"
                          defaultChecked
                        />
                        <span className="text-sm text-zinc-300">Track engagement patterns</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          className="rounded border-zinc-600 bg-zinc-800 text-teal-500"
                          defaultChecked
                        />
                        <span className="text-sm text-zinc-300">Generate strategic recommendations</span>
                      </label>
                    </div>
                  </div>

                  {/* Output Settings */}
                  <div>
                    <h4 className="text-sm font-medium text-white mb-3">Output Settings</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-zinc-400 mb-2">
                          Report Format
                        </label>
                        <select className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2 text-white">
                          <option>PDF Report</option>
                          <option>Interactive Dashboard</option>
                          <option>Slack Summary</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-zinc-400 mb-2">
                          Data Export
                        </label>
                        <select className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2 text-white">
                          <option>Include raw data</option>
                          <option>Processed only</option>
                          <option>No export</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Translation Results */}
            {translationStages.length > 0 && (
              <TranslationPanel
                input={userInput}
                stages={translationStages}
                onEdit={(stageId) => {
                  // Handle stage editing
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={showTestModal}
        onClose={() => setShowTestModal(false)}
        title="Test Workflow"
        maxWidth="xl"
      >
        <div className="p-6">
          <WorkflowTestRunner
            workflowId="test"
            onComplete={() => setShowTestModal(false)}
          />
        </div>
      </Modal>

      {showSettings && (
        <WorkflowSettings onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
};

export default CreateWorkflow;