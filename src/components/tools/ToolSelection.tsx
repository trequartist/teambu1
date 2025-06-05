import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowRight, Sparkles, Link2Icon, FileTextIcon, LayoutDashboardIcon, PaletteIcon, SendIcon } from 'lucide-react';
import Button from '../Button';
import ToolCard from './ToolCard';
import ToolConnectionCard from './ToolConnectionCard';
import DiscoveryPanel from './DiscoveryPanel';
import { Tool, ToolConfig, ToolInsights } from '../../types/tools';
import { simulateToolConnection, simulateDiscovery } from '../../lib/tools';

interface ToolSelectionProps {
  selectedUseCase: string;
  selectedTools: string[];
  setSelectedTools: (tools: string[]) => void;
  toolConfigs: Record<string, any>;
  setToolConfigs: (configs: Record<string, any>) => void;
  onContinue: () => void;
}

const ToolSelection: React.FC<ToolSelectionProps> = ({
  selectedUseCase,
  selectedTools,
  setSelectedTools,
  toolConfigs,
  setToolConfigs,
  onContinue
}) => {
  const [connectingTool, setConnectingTool] = useState<string | null>(null);
  const [connectedTools, setConnectedTools] = useState<string[]>([]);
  const [insights, setInsights] = useState<ToolInsights | null>(null);
  const [isDiscovering, setIsDiscovering] = useState(false);

  const tools: Tool[] = [
    {
      id: 'linkedin',
      name: 'LinkedIn',
      category: 'distribution',
      description: 'Connect your company page for posting and analytics',
      icon: Link2Icon,
      defaultConfig: {
        linkedin: {
          companyPage: '',
          postingRole: 'editor',
          includeAdvocacy: false
        }
      }
    },
    {
      id: 'wordpress',
      name: 'WordPress',
      category: 'content',
      description: 'Import content from your blog',
      icon: FileTextIcon,
      defaultConfig: {
        wordpress: {
          siteUrl: '',
          contentTypes: ['post', 'page']
        }
      }
    },
    {
      id: 'notion',
      name: 'Notion',
      category: 'content',
      description: 'Sync with your content calendar',
      icon: LayoutDashboardIcon,
      defaultConfig: {
        notion: {
          workspace: '',
          contentDatabase: '',
          calendarDatabase: ''
        }
      }
    },
    {
      id: 'canva',
      name: 'Canva',
      category: 'creation',
      description: 'Create visuals for your posts',
      icon: PaletteIcon,
      defaultConfig: {
        canva: {
          brandKit: '',
          templates: []
        }
      }
    },
    {
      id: 'buffer',
      name: 'Buffer',
      category: 'distribution',
      description: 'Schedule and publish content',
      icon: SendIcon,
      defaultConfig: {
        buffer: {
          schedulePreference: 'optimal',
          timezone: 'UTC'
        }
      }
    }
  ];

  const handleConnect = async (toolId: string, config: Partial<ToolConfig>) => {
    setConnectingTool(toolId);
    
    try {
      await simulateToolConnection(toolId);
      
      setConnectedTools(prev => [...prev, toolId]);
      setToolConfigs(prev => ({
        ...prev,
        [toolId]: config
      }));
      
      if (connectedTools.length >= 2) {
        setIsDiscovering(true);
        const discoveredInsights = await simulateDiscovery([...connectedTools, toolId]);
        setInsights(discoveredInsights);
        setIsDiscovering(false);
      }
    } catch (error) {
      console.error('Failed to connect tool:', error);
      throw error;
    } finally {
      setConnectingTool(null);
    }
  };

  return (
    <div className="space-y-8">
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
                Let's connect the tools your AI teammate needs. I'll help you configure each one optimally.
              </p>
              
              {connectedTools.length > 0 && (
                <div className="mt-4 pt-4 border-t border-zinc-700">
                  <p className="text-sm text-zinc-300">
                    <span className="text-teal-400">Great progress!</span> {connectedTools.length} tools connected.
                    {connectedTools.length >= 3 ? ' Ready to discover insights!' : ' Connect more tools for insights.'}
                  </p>
                </div>
              )}
            </div>

            {insights && (
              <div className="mt-4">
                <DiscoveryPanel insights={insights} />
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              Connect Your Tools
            </h2>
            <p className="text-zinc-400">
              Select and configure the tools your AI teammate will use
            </p>
          </div>

          <div className="space-y-4">
            {tools.map((tool) => (
              <ToolConnectionCard
                key={tool.id}
                tool={tool}
                onConnect={handleConnect}
                isConnected={connectedTools.includes(tool.id)}
                isConnecting={connectingTool === tool.id}
              />
            ))}
          </div>

          {connectedTools.length > 0 && (
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
                Continue to Workflow Studio
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolSelection;