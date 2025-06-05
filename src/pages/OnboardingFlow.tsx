import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTeammate } from '../context/TeammateContext';
import { MessageCircle, Users, Building2, User, Sparkles, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Button from '../components/Button';

const OnboardingFlow: React.FC = () => {
  const navigate = useNavigate();
  const { 
    contentGoal, setContentGoal,
    platforms, setPlatforms,
    hoursPerWeek, setHoursPerWeek
  } = useTeammate();
  
  const [endUserType, setEndUserType] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [showArchitecturePreview, setShowArchitecturePreview] = useState(false);

  const endUserOptions = [
    {
      id: 'founder',
      label: 'Founder/CEO',
      icon: <User className="w-5 h-5" />,
      description: 'Building personal brand'
    },
    {
      id: 'marketing-team',
      label: 'Marketing Team',
      icon: <Users className="w-5 h-5" />,
      description: 'Collaborative content creation'
    },
    {
      id: 'agency',
      label: 'Agency/Consultant',
      icon: <Building2 className="w-5 h-5" />,
      description: 'Managing multiple clients'
    }
  ];

  const teamSizeOptions = [
    { id: 'solo', label: '1 person', detail: 'Solo marketer' },
    { id: 'small', label: '2-5 people', detail: 'Small team' },
    { id: 'medium', label: '6-20 people', detail: 'Growing team' },
    { id: 'large', label: '20+ people', detail: 'Large organization' }
  ];

  const getArchitectureImplications = () => {
    if (!endUserType || !teamSize) return null;

    const implications = {
      'founder': {
        'solo': {
          title: 'Personal Brand Builder',
          features: [
            'Direct posting to personal LinkedIn',
            'Voice & tone matching AI',
            'Quick approval workflow',
            'Personal insights dashboard'
          ],
          aiNote: 'I\'ll optimize for authentic, personal storytelling that builds thought leadership.'
        },
        'small': {
          title: 'Founder-Led Content Team',
          features: [
            'Collaborative drafting with team',
            'Founder approval gates',
            'Brand voice consistency',
            'Team performance tracking'
          ],
          aiNote: 'I\'ll help maintain your voice while empowering your team to create on-brand content.'
        }
      },
      'marketing-team': {
        'small': {
          title: 'Agile Content Squad',
          features: [
            'Shared content calendar',
            'Role-based workflows',
            'Slack integration for approvals',
            'Collaborative editing'
          ],
          aiNote: 'I\'ll coordinate between team members and ensure consistent quality across all content.'
        },
        'medium': {
          title: 'Structured Content Operations',
          features: [
            'Multi-stage approval workflow',
            'Department-specific templates',
            'Advanced analytics & reporting',
            'Content governance rules'
          ],
          aiNote: 'I\'ll help scale your content operations while maintaining quality and brand standards.'
        }
      },
      'agency': {
        'small': {
          title: 'Multi-Client Content Engine',
          features: [
            'Client workspace separation',
            'White-label capabilities',
            'Bulk content generation',
            'Client-specific analytics'
          ],
          aiNote: 'I\'ll help you manage multiple client voices and maintain clear separation between accounts.'
        }
      }
    };

    return implications[endUserType]?.[teamSize] || implications[endUserType]?.['small'];
  };

  const implications = getArchitectureImplications();

  const handleContinue = () => {
    navigate('/connect');
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* AI Assistant Panel - Left Side */}
            <div className="lg:col-span-2">
              <div className="sticky top-24 bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Content Q</h3>
                    <p className="text-sm text-zinc-400">AI Assistant</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-zinc-800/50 rounded-lg p-4">
                    <p className="text-sm text-zinc-300 mb-3">
                      Great choice on the LinkedIn Ghostwriter! Now I need to understand 
                      who will be using this AI teammate so I can optimize the experience.
                    </p>
                    
                    {endUserType && (
                      <div className="mt-4 pt-4 border-t border-zinc-700">
                        <p className="text-sm text-zinc-300 mb-2">
                          <span className="text-teal-400">Perfect!</span> For a{' '}
                          {endUserOptions.find(o => o.id === endUserType)?.label.toLowerCase()}, 
                          I'll configure:
                        </p>
                        <ul className="space-y-1 text-xs text-zinc-400">
                          <li>• Appropriate approval workflows</li>
                          <li>• Relevant analytics dashboards</li>
                          <li>• Optimized content strategies</li>
                        </ul>
                      </div>
                    )}
                    
                    {teamSize && (
                      <div className="mt-4 pt-4 border-t border-zinc-700">
                        <p className="text-sm text-zinc-300">
                          <span className="text-teal-400">Got it!</span> I'm designing your 
                          AI teammate to work seamlessly with your {teamSizeOptions.find(o => o.id === teamSize)?.detail.toLowerCase()}.
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {implications && (
                    <div className="bg-gradient-to-br from-teal-900/20 to-indigo-900/20 rounded-lg p-4 border border-teal-500/20">
                      <div className="flex items-center space-x-2 mb-2">
                        <Sparkles className="w-4 w-4 text-teal-400" />
                        <span className="text-sm font-medium text-teal-400">Architecture Preview</span>
                      </div>
                      <p className="text-xs text-zinc-400">
                        {implications.aiNote}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Main Content - Right Side */}
            <div className="lg:col-span-3 space-y-8">
              {/* Question 1: End User Type */}
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-white mb-2">
                  Who will be using this LinkedIn Ghostwriter?
                </h2>
                <p className="text-sm text-zinc-400 mb-6">
                  This helps me configure the right workflows and permissions
                </p>
                
                <div className="space-y-3">
                  {endUserOptions.map((option) => (
                    <label
                      key={option.id}
                      className={`
                        flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all
                        ${endUserType === option.id
                          ? 'bg-zinc-800 border-teal-500'
                          : 'bg-zinc-800/50 border-zinc-700 hover:border-zinc-600'
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name="endUserType"
                        value={option.id}
                        checked={endUserType === option.id}
                        onChange={(e) => {
                          setEndUserType(e.target.value);
                          setShowArchitecturePreview(true);
                        }}
                        className="sr-only"
                      />
                      <div className="flex items-center space-x-3">
                        <div className={`
                          w-10 h-10 rounded-lg flex items-center justify-center
                          ${endUserType === option.id
                            ? 'bg-teal-500/20 text-teal-400'
                            : 'bg-zinc-700 text-zinc-400'
                          }
                        `}>
                          {option.icon}
                        </div>
                        <div>
                          <div className="font-medium text-white">{option.label}</div>
                          <div className="text-sm text-zinc-500">{option.description}</div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Question 2: Team Size */}
              {endUserType && (
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                  <h2 className="text-lg font-semibold text-white mb-2">
                    How many people will collaborate with this AI teammate?
                  </h2>
                  <p className="text-sm text-zinc-400 mb-6">
                    This determines collaboration features and approval workflows
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {teamSizeOptions.map((option) => (
                      <label
                        key={option.id}
                        className={`
                          flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all
                          ${teamSize === option.id
                            ? 'bg-zinc-800 border-teal-500'
                            : 'bg-zinc-800/50 border-zinc-700 hover:border-zinc-600'
                          }
                        `}
                      >
                        <input
                          type="radio"
                          name="teamSize"
                          value={option.id}
                          checked={teamSize === option.id}
                          onChange={(e) => setTeamSize(e.target.value)}
                          className="sr-only"
                        />
                        <div className="text-center">
                          <div className="font-medium text-white">{option.label}</div>
                          <div className="text-xs text-zinc-500 mt-1">{option.detail}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Architecture Preview */}
              {implications && showArchitecturePreview && (
                <div className="bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    {implications.title}
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {implications.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <div className="w-5 h-5 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <ArrowRight className="w-3 h-3 text-teal-400" />
                        </div>
                        <span className="text-sm text-zinc-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Continue Button */}
              {endUserType && teamSize && (
                <div className="flex justify-end">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleContinue}
                  >
                    Continue to Workflow Setup
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;