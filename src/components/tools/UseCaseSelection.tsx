import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, MessageCircle } from 'lucide-react';
import Button from '../Button';

interface UseCaseSelectionProps {
  selectedUseCase: string;
  setSelectedUseCase: (useCase: string) => void;
  onContinue: () => void;
}

const useCases = [
  {
    id: 'full-automation',
    title: 'Full Content Automation',
    icon: '🚀',
    description: 'End-to-end content creation, publishing, and engagement',
    tools: ['LinkedIn', 'Slack', 'Google Docs', 'Calendar', 'Analytics'],
    benefits: [
      'Completely hands-off operation',
      'Maximum time savings (20+ hours/week)',
      'Consistent posting schedule',
      'Automated engagement handling'
    ],
    visual: (
      <div className="mt-4 bg-zinc-800 rounded-lg p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-zinc-400">Automation Level</span>
          <span className="text-xs text-teal-400">95%</span>
        </div>
        <div className="w-full bg-zinc-700 rounded-full h-2">
          <div className="bg-gradient-to-r from-teal-500 to-indigo-500 h-2 rounded-full" style={{width: '95%'}}></div>
        </div>
      </div>
    )
  },
  {
    id: 'collaborative',
    title: 'Team Collaboration Focus',
    icon: '👥',
    description: 'AI assists while keeping humans in control',
    tools: ['LinkedIn', 'Slack', 'Notion', 'Google Docs'],
    benefits: [
      'Perfect for team workflows',
      'Approval checkpoints',
      'Collaborative editing',
      'Flexible automation levels'
    ],
    visual: (
      <div className="mt-4 grid grid-cols-4 gap-2">
        {['Draft', 'Review', 'Approve', 'Publish'].map((step, i) => (
          <div key={i} className="text-center">
            <div className="w-full h-8 bg-zinc-800 rounded flex items-center justify-center text-xs">
              {i % 2 === 0 ? '🤖' : '👤'}
            </div>
            <div className="text-xs text-zinc-500 mt-1">{step}</div>
          </div>
        ))}
      </div>
    )
  },
  {
    id: 'analytics-driven',
    title: 'Data-Driven Optimization',
    icon: '📊',
    description: 'Focus on performance tracking and improvement',
    tools: ['LinkedIn', 'Analytics', 'Reporting Tools', 'A/B Testing'],
    benefits: [
      'Deep performance insights',
      'Continuous optimization',
      'ROI tracking',
      'Predictive content planning'
    ],
    visual: (
      <div className="mt-4 bg-zinc-800 rounded-lg p-3">
        <div className="flex items-end space-x-1 h-16">
          {[3, 5, 4, 7, 6, 8, 9].map((height, i) => (
            <div
              key={i}
              className="flex-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t"
              style={{height: `${height * 10}%`}}
            ></div>
          ))}
        </div>
        <div className="text-center text-xs text-zinc-500 mt-2">Performance Trend</div>
      </div>
    )
  }
];

const UseCaseSelection: React.FC<UseCaseSelectionProps> = ({
  selectedUseCase,
  setSelectedUseCase,
  onContinue
}) => {
  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-5 gap-8">
        {/* AI Assistant Panel */}
        <div className="lg:col-span-2">
          <div className="sticky top-24 bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-start space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-indigo-500 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Content Q</h3>
                <p className="text-sm text-zinc-400">Configuration Assistant</p>
              </div>
            </div>

            <div className="bg-zinc-800/50 rounded-lg p-4">
              <p className="text-sm text-zinc-300 mb-3">
                Let's configure your tool integrations based on how you want to work with your content.
              </p>
              
              {selectedUseCase && (
                <div className="mt-4 pt-4 border-t border-zinc-700">
                  <p className="text-sm text-zinc-300">
                    <span className="text-teal-400">Great choice!</span> I'll optimize the integrations for{' '}
                    {useCases.find(u => u.id === selectedUseCase)?.title.toLowerCase()}.
                  </p>
                  
                  {selectedUseCase === 'full-automation' && (
                    <p className="text-xs text-zinc-400 mt-2">
                      We'll set up end-to-end automation with smart safeguards and monitoring.
                    </p>
                  )}
                  
                  {selectedUseCase === 'collaborative' && (
                    <p className="text-xs text-zinc-400 mt-2">
                      I'll configure approval workflows and team collaboration features.
                    </p>
                  )}
                  
                  {selectedUseCase === 'analytics-driven' && (
                    <p className="text-xs text-zinc-400 mt-2">
                      We'll focus on deep analytics integration and performance optimization.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              What's your ideal workflow?
            </h2>
            <p className="text-zinc-400">
              Choose how you want to work with your content tools
            </p>
          </div>

          <div className="space-y-4">
            {useCases.map((useCase) => (
              <motion.div
                key={useCase.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setSelectedUseCase(useCase.id)}
                className={`
                  bg-zinc-900/50 border-2 rounded-xl p-6 cursor-pointer transition-all
                  ${selectedUseCase === useCase.id
                    ? 'border-teal-500 bg-zinc-800/50'
                    : 'border-zinc-800 hover:border-zinc-700'
                  }
                `}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{useCase.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {useCase.title}
                    </h3>
                    <p className="text-sm text-zinc-400 mb-3">
                      {useCase.description}
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        {useCase.benefits.map((benefit, i) => (
                          <div key={i} className="flex items-center space-x-2 text-sm">
                            <Check className="w-4 h-4 text-teal-400" />
                            <span className="text-zinc-300">{benefit}</span>
                          </div>
                        ))}
                      </div>
                      <div>
                        {useCase.visual}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {selectedUseCase && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-end mt-8"
            >
              <Button
                variant="primary"
                size="lg"
                onClick={onContinue}
                className="bg-gradient-to-r from-teal-500 to-indigo-500"
              >
                Continue to Tool Selection
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UseCaseSelection;