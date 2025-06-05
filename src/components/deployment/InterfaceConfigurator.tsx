import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, MessageSquare, Mail, Globe } from 'lucide-react';
import Button from '../Button';
import SlackConfig from './SlackConfig';
import EmailConfig from './EmailConfig';
import WebConfig from './WebConfig';

interface InterfaceConfiguratorProps {
  onSave: (config: any) => void;
}

const InterfaceConfigurator: React.FC<InterfaceConfiguratorProps> = ({
  onSave
}) => {
  const [activeTab, setActiveTab] = useState<'slack' | 'email' | 'web'>('slack');
  const [config, setConfig] = useState({
    slack: {
      enabled: true,
      channels: [],
      notification_level: 'important'
    },
    email: {
      enabled: false,
      recipients: [],
      digest_frequency: 'daily'
    },
    web: {
      enabled: true,
      custom_domain: '',
      theme: 'light'
    }
  });

  return (
    <div className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-4">
      <div className="flex items-center space-x-2 mb-6">
        <Settings className="w-5 h-5 text-teal-400" />
        <h3 className="font-medium text-white">Interface Configuration</h3>
      </div>

      <div className="flex space-x-2 mb-6">
        <Button
          variant={activeTab === 'slack' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setActiveTab('slack')}
          icon={<MessageSquare className="w-4 h-4" />}
        >
          Slack
        </Button>
        <Button
          variant={activeTab === 'email' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setActiveTab('email')}
          icon={<Mail className="w-4 h-4" />}
        >
          Email
        </Button>
        <Button
          variant={activeTab === 'web' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setActiveTab('web')}
          icon={<Globe className="w-4 h-4" />}
        >
          Web
        </Button>
      </div>

      <div className="space-y-6">
        {activeTab === 'slack' && (
          <SlackConfig
            config={config.slack}
            onChange={(slackConfig) => setConfig({ ...config, slack: slackConfig })}
          />
        )}
        
        {activeTab === 'email' && (
          <EmailConfig
            config={config.email}
            onChange={(emailConfig) => setConfig({ ...config, email: emailConfig })}
          />
        )}
        
        {activeTab === 'web' && (
          <WebConfig
            config={config.web}
            onChange={(webConfig) => setConfig({ ...config, web: webConfig })}
          />
        )}

        <div className="flex justify-end">
          <Button
            variant="primary"
            onClick={() => onSave(config)}
          >
            Save Configuration
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterfaceConfigurator;