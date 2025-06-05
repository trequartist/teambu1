import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Users, Building2, User, Sparkles, ArrowRight, Play, Check, Layers, Brain } from 'lucide-react';
import Header from '../components/Header';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { useTeammate } from '../context/TeammateContext';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { setTeammateType } = useTeammate();
  const [showModal, setShowModal] = useState(false);
  const [selectedTeammates, setSelectedTeammates] = useState<string[]>([]);

  const handleGetStarted = () => {
    setShowModal(true);
  };

  const handleTeammateToggle = (id: string) => {
    setSelectedTeammates(prev => 
      prev.includes(id) 
        ? prev.filter(t => t !== id)
        : [...prev, id]
    );
  };

  const handleContinue = () => {
    setTeammateType('Content Marketer');
    setShowModal(false);
    navigate('/onboarding');
  };

  const teammateOptions = [
    {
      id: 'linkedin-ghostwriter',
      title: 'LinkedIn Ghostwriter',
      icon: '🎯',
      description: 'Crafts engaging LinkedIn posts, builds thought leadership, and grows your professional network',
      capabilities: ['Daily posts', 'Engagement replies', 'Network growth'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'blog-seo-manager',
      title: 'Blogs/SEO Manager',
      icon: '📝',
      description: 'Writes SEO-optimized blog posts, manages content calendar, and tracks rankings',
      capabilities: ['SEO research', 'Long-form content', 'Keyword tracking'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'newsletter-ghostwriter',
      title: 'Newsletter Ghostwriter',
      icon: '📧',
      description: 'Creates compelling newsletters, manages subscriber engagement, and tracks metrics',
      capabilities: ['Weekly editions', 'A/B testing', 'Segmentation'],
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'landing-page-expert',
      title: 'Landing Page Expert',
      icon: '🚀',
      description: 'Designs high-converting landing pages, writes copy, and optimizes for conversions',
      capabilities: ['Copy optimization', 'A/B testing', 'Conversion tracking'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'reddit-x-marketer',
      title: 'Reddit+X Content Marketer',
      icon: '💬',
      description: 'Engages communities on Reddit and X, shares valuable content, and builds presence',
      capabilities: ['Community engagement', 'Trend monitoring', 'Viral content'],
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const capabilities = [
    {
      icon: <Layers className="w-8 h-8" />,
      title: "Multi-Agent Collaboration",
      description: "Build teams of AI agents that work together, share context, and collaborate on complex tasks",
      visual: (
        <div className="mt-4 p-4 bg-zinc-900 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex -space-x-2">
              {['🤖', '🧠', '✍️'].map((emoji, i) => (
                <div key={i} className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center text-sm border-2 border-zinc-900">
                  {emoji}
                </div>
              ))}
            </div>
            <span className="text-xs text-teal-400">Working together</span>
          </div>
          <div className="text-xs text-zinc-500">Content Researcher → Writer → Editor</div>
        </div>
      )
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Human-in-the-Loop",
      description: "Set approval points, provide feedback, and maintain control while AI handles the heavy lifting",
      visual: (
        <div className="mt-4 space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
            <div className="flex-1 h-1 bg-zinc-800 rounded"></div>
            <div className="w-6 h-6 bg-indigo-500 rounded flex items-center justify-center text-xs">👤</div>
            <div className="flex-1 h-1 bg-zinc-800 rounded"></div>
            <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
          </div>
          <div className="text-xs text-zinc-500 text-center">AI Draft → Your Review → AI Publish</div>
        </div>
      )
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Adaptive Intelligence",
      description: "Teammates learn from feedback, adapt to your style, and improve over time",
      visual: (
        <div className="mt-4 bg-zinc-900 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-zinc-400">Performance</span>
            <span className="text-xs text-teal-400">+38%</span>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-2">
            <div className="bg-gradient-to-r from-teal-500 to-indigo-500 h-2 rounded-full" style={{width: '75%'}}></div>
          </div>
        </div>
      )
    }
  ];

  const TeammateCard = ({ option, isSelected, onToggle }: any) => (
    <div
      onClick={onToggle}
      className={`
        relative cursor-pointer rounded-xl p-6 transition-all
        ${isSelected 
          ? 'bg-zinc-800 border-2 border-teal-500 shadow-lg shadow-teal-500/20' 
          : 'bg-zinc-800/50 border-2 border-zinc-700 hover:border-zinc-600'
        }
      `}
    >
      {isSelected && (
        <div className="absolute top-3 right-3">
          <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
            <Check className="w-4 h-4 text-white" />
          </div>
        </div>
      )}
      
      <div className={`
        w-12 h-12 rounded-lg bg-gradient-to-br ${option.color} 
        flex items-center justify-center text-2xl mb-4
      `}>
        {option.icon}
      </div>
      
      <h4 className="text-lg font-semibold text-white mb-2">
        {option.title}
      </h4>
      
      <p className="text-sm text-zinc-400 mb-4">
        {option.description}
      </p>
      
      <div className="space-y-1">
        {option.capabilities.map((cap: string, idx: number) => (
          <div key={idx} className="flex items-center space-x-2 text-xs">
            <div className="w-1 h-1 bg-zinc-500 rounded-full"></div>
            <span className="text-zinc-500">{cap}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-950">
      <Header />
      
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight">
              Build AI Teammates
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-400">
                That Actually Work
              </span>
            </h1>
            <p className="text-xl text-zinc-400 mb-10 max-w-3xl mx-auto">
              Create multi-agent AI applications that collaborate with humans. 
              No coding required. As autonomous as you want them to be.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                variant="primary" 
                size="lg"
                onClick={handleGetStarted}
                className="min-w-[200px]"
              >
                Start Building →
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                icon={<Play className="h-4 w-4" />}
              >
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What You Can Build</h2>
            <p className="text-zinc-400 text-lg">
              AI teammates that handle complex workflows across your entire stack
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((capability, index) => (
              <div key={index} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-all">
                <div className="text-teal-400 mb-4">{capability.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{capability.title}</h3>
                <p className="text-zinc-400 text-sm mb-4">{capability.description}</p>
                {capability.visual}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        maxWidth="4xl"
      >
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-indigo-500 rounded-2xl mb-4">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Hi! I'm Content Q 👋
            </h2>
            <p className="text-zinc-400 text-lg">
              Let's build your AI content team. Select the specialists you need.
            </p>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-zinc-300">
                Choose your specialists
              </h3>
              <span className="text-xs text-zinc-500">
                Select multiple to create a Squad
              </span>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teammateOptions.map((option) => (
                <TeammateCard
                  key={option.id}
                  option={option}
                  isSelected={selectedTeammates.includes(option.id)}
                  onToggle={() => handleTeammateToggle(option.id)}
                />
              ))}
            </div>
          </div>
          
          {selectedTeammates.length > 1 && (
            <div className="mb-6 p-4 bg-gradient-to-r from-teal-900/20 to-indigo-900/20 rounded-lg border border-teal-500/20">
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="w-5 h-5 text-teal-400" />
                <span className="font-medium text-teal-400">Squad Mode Activated!</span>
              </div>
              <p className="text-sm text-zinc-400">
                Your {selectedTeammates.length} specialists will collaborate seamlessly, 
                sharing context and coordinating content across channels.
              </p>
            </div>
          )}
          
          <Button
            variant="primary"
            fullWidth
            onClick={handleContinue}
            disabled={selectedTeammates.length === 0}
          >
            Continue with {selectedTeammates.length > 1 ? 'Squad' : 'Specialist'} →
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default LandingPage;