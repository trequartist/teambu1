import { Tool, ToolConfig, ToolInsights } from '../types/tools';

export const getDefaultConfig = (tool: Tool): Partial<ToolConfig> => {
  return tool.defaultConfig || {};
};

export const simulateToolConnection = async (toolId: string): Promise<void> => {
  // Simulate connection delay
  await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 500));
};

export const simulateDiscovery = async (connectedTools: string[]): Promise<ToolInsights | null> => {
  if (connectedTools.length < 3) return null;
  
  // Simulate discovery delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    linkedin: {
      followers: 2847,
      avgEngagement: '2.1%',
      topPost: 'How We Cut CAC by 40%',
      bestTime: 'Tuesday 10 AM'
    },
    wordpress: {
      posts: 47,
      avgLength: 1500,
      topCategories: ['Product', 'Engineering', 'Culture']
    },
    notion: {
      upcomingContent: 12,
      launches: 3,
      gaps: ['Customer stories', 'Technical deep-dives']
    }
  };
};

interface ValidationError {
  field: string;
  message: string;
}

export const validateToolConfig = (tool: Tool, config: Partial<ToolConfig>): ValidationError[] => {
  const errors: ValidationError[] = [];

  switch (tool.id) {
    case 'linkedin':
      if (!config.linkedin?.companyPage) {
        errors.push({ field: 'companyPage', message: 'Company page is required' });
      }
      if (!config.linkedin?.postingRole) {
        errors.push({ field: 'postingRole', message: 'Posting role must be specified' });
      }
      break;

    case 'wordpress':
      if (!config.wordpress?.siteUrl) {
        errors.push({ field: 'siteUrl', message: 'WordPress site URL is required' });
      }
      if (!config.wordpress?.contentTypes?.length) {
        errors.push({ field: 'contentTypes', message: 'At least one content type must be selected' });
      }
      break;

    case 'notion':
      if (!config.notion?.workspace) {
        errors.push({ field: 'workspace', message: 'Workspace is required' });
      }
      if (!config.notion?.contentDatabase) {
        errors.push({ field: 'contentDatabase', message: 'Content database must be specified' });
      }
      break;

    case 'canva':
      if (!config.canva?.brandKit) {
        errors.push({ field: 'brandKit', message: 'Brand kit is required' });
      }
      break;

    case 'buffer':
      if (!config.buffer?.schedulePreference) {
        errors.push({ field: 'schedulePreference', message: 'Schedule preference is required' });
      }
      if (!config.buffer?.timezone) {
        errors.push({ field: 'timezone', message: 'Timezone must be specified' });
      }
      break;
  }

  return errors;
};