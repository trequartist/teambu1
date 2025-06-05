import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowRight, Check, Sparkles } from 'lucide-react';
import Button from '../Button';

interface UsageModeSelectionProps {
  onContinue: () => void;
}

const UsageModeSelection: React.FC<UsageModeSelectionProps> = ({ onContinue }) => {
  const [selectedMode, setSelectedMode] = useState<string>('');
  const [hoveredMode, setHoveredMode] = useState<string | null>(null);

  const usageModes = [
    {
      id: 'slack-first',
      title: 'Slack-First',
      subtitle: 'For teams that live in Slack',
      icon: '💬',
      primaryColor: 'from-purple-500 to-purple-600',
      preview: 'https://images.pexels.com/photos/7654096/pexels-photo-7654096.jpeg',
      keyFeature: 'Approve content with 👍',
      details: {
        description: 'Perfect for teams that collaborate primarily through Slack. Get notifications, approve content, and track performance without leaving your workspace.',
        features: [
          'Content drafts in Slack threads',
          'Emoji-based approvals',
          'Real-time notifications',
          'Performance digests'
        ],
        benefits: [
          'No context switching',
          'Quick team feedback',
          'Streamlined approvals',
          'Always in sync'
        ]
      }
    },
    {
      id: 'linkedin-native',
      title: 'LinkedIn-Native',
      subtitle: 'Work where you publish',
      icon: '🔗',
      primaryColor: 'from-blue-500 to-blue-600',
      preview: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg',
      keyFeature: 'AI suggestions inline',
      details: {
        description: 'Work directly on LinkedIn with AI-powered assistance. Get real-time suggestions, analytics, and optimizations as you create and engage.',
        features: [
          'Browser extension',
          'In-line suggestions',
          'Real-time analytics',
          'Engagement automation'
        ],
        benefits: [
          'Native experience',
          'Instant insights',
          'Faster workflow',
          'Better engagement'
        ]
      }
    },
    {
      id: 'command-center',
      title: 'Command Center',
      subtitle: 'Full control dashboard',
      icon: '🎯',
      primaryColor: 'from-teal-500 to-teal-600',
      preview: 'https://images.pexels.com/photos/5473337/pexels-photo-5473337.jpeg',
      keyFeature: 'See everything at once',
      details: {
        description: 'A comprehensive dashboard for complete control over your LinkedIn presence. Perfect for data-driven teams and strategic planning.',
        features: [
          'Content calendar',
          'Analytics dashboard',
          'Team management',
          'Multi-channel view'
        ],
        benefits: [
          'Complete oversight',
          'Strategic planning',
          'Team coordination',
          'Data-driven decisions'
        ]
      }
    }
  ];

  const selectedModeDetails = usageModes.find(mode => mode.id === selectedMode)?.details;

  return (
    <div className="max-w-6xl mx-auto py-12">
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
                Let's configure how your team will interact with the LinkedIn Content Marketer.
              </p>
              
              {selectedMode && (
                <div className="mt-4 pt-4 border-t border-zinc-700">
                  <p className="text-sm text-zinc-300">
                    <span className="text-teal-400">Great choice!</span> I'll optimize your workflows for{' '}
                    {usageModes.find(m => m.id === selectedMode)?.title.toLowerCase()}.
                  </p>
                  
                  {selectedMode === 'slack-first' && (
                    <p className="text-xs text-zinc-400 mt-2">
                      Your team will get drafts, notifications, and approval requests right in Slack. 
                      Perfect for async collaboration!
                    </p>
                  )}
                  
                  {selectedMode === 'linkedin-native' && (
                    <p className="text-xs text-zinc-400 mt-2">
                      You'll work directly on LinkedIn with our browser extension providing 
                      AI assistance in real-time.
                    </p>
                  )}
                  
                  {selectedMode === 'command-center' && (
                    <p className="text-xs text-zinc-400 mt-2">
                      You'll have full visibility and control from a central dashboard, 
                      with smart notifications keeping everyone in sync.
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
              How will your team work with the AI teammate?
            </h2>
            <p className="text-zinc-400">
              Choose your primary interface
            </p>
          </div>

          <div className="space-y-4">
            {usageModes.map((mode) => (
              <motion.div
                key={mode.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onHoverStart={() => setHoveredMode(mode.id)}
                onHoverEnd={() => setHoveredMode(null)}
                onClick={() => setSelectedMode(mode.id)}
                className={`
                  relative cursor-pointer rounded-xl overflow-hidden
                  transition-all duration-300
                  ${selectedMode === mode.id 
                    ? 'ring-4 ring-teal-500 ring-offset-4 ring-offset-zinc-950' 
                    : 'hover:ring-2 hover:ring-zinc-700'
                  }
                `}
              >
                {/* Card Background */}
                <div className={`
                  absolute inset-0 bg-gradient-to-br ${mode.primaryColor} opacity-10
                `} />
                
                {/* Card Content */}
                <div className="relative bg-zinc-900/90 backdrop-blur p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-3xl mb-2">{mode.icon}</div>
                      <h3 className="text-xl font-bold text-white">{mode.title}</h3>
                      <p className="text-sm text-zinc-400">{mode.subtitle}</p>
                    </div>
                    {selectedMode === mode.id && (
                      <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Key Feature Badge */}
                  <div className="mb-4">
                    <span className="inline-flex items-center px-3 py-1 bg-zinc-800 rounded-full text-xs text-zinc-300">
                      <Sparkles className="w-3 h-3 mr-1" />
                      {mode.keyFeature}
                    </span>
                  </div>

                  {/* Preview on Hover */}
                  {hoveredMode === mode.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute inset-x-6 bottom-6"
                    >
                      <img 
                        src={mode.preview} 
                        alt={`${mode.title} preview`}
                        className="w-full h-32 object-cover rounded-lg opacity-50"
                      />
                    </motion.div>
                  )}

                  {/* Selection Indicator */}
                  <div className="mt-auto pt-4">
                    <div className={`
                      text-center py-2 rounded-lg transition-all
                      ${selectedMode === mode.id 
                        ? 'bg-teal-500 text-white' 
                        : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                      }
                    `}>
                      {selectedMode === mode.id ? 'Selected' : 'Click to select'}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Details Panel */}
          {selectedModeDetails && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 bg-zinc-900/50 rounded-xl p-6 border border-zinc-800"
            >
              <h3 className="font-medium text-white mb-4">Mode Details</h3>
              <p className="text-sm text-zinc-400 mb-6">
                {selectedModeDetails.description}
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-white mb-3">Features</h4>
                  <ul className="space-y-2">
                    {selectedModeDetails.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <Check className="w-4 h-4 text-teal-400 mr-2" />
                        <span className="text-zinc-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-white mb-3">Benefits</h4>
                  <ul className="space-y-2">
                    {selectedModeDetails.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <Check className="w-4 h-4 text-teal-400 mr-2" />
                        <span className="text-zinc-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {selectedMode && (
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
                Continue to Workflow Selection
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsageModeSelection;