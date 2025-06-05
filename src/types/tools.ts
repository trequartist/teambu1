import { Link2Icon, FileTextIcon, LayoutDashboardIcon, PaletteIcon, SendIcon } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// Tool roles and preferences
export type ToolRole = 'admin' | 'editor' | 'viewer';
export type SchedulePreference = 'optimal' | 'fixed' | 'manual';
export type NotificationLevel = 'all' | 'important' | 'errors';

// Node Registry System
export interface NodeRegistry {
  nodes: {
    input: {
      config_schema: {
        type: "object";
        properties: {
          data_source: { enum: ["manual", "api", "webhook"] };
          validation: { type: "object" };
        };
      };
      input_schema: Record<string, never>;
      output_schema: { data: "any" };
    };
    
    linkedin_scraper: {
      config_schema: {
        type: "object";
        properties: {
          companies: { type: "array"; items: { type: "string" } };
          post_count: { type: "number"; minimum: 1; maximum: 100 };
          include_metrics: { type: "boolean" };
        };
      };
      input_schema: {
        trigger: { type: "object" };
      };
      output_schema: {
        posts: { type: "array"; items: LinkedInPostSchema };
      };
    };
    
    llm_processor: {
      config_schema: {
        type: "object";
        properties: {
          model: { enum: ["gpt-4", "claude-3", "llama-2"] };
          prompt_template: { type: "string" };
          temperature: { type: "number"; min: 0; max: 2 };
          max_tokens: { type: "number" };
          json_mode: { type: "boolean" };
        };
      };
      input_schema: {
        messages: { type: "array" };
        context: { type: "object" };
      };
      output_schema: {
        response: { type: "string" };
        usage: { type: "object" };
      };
    };
    
    human_review: {
      config_schema: {
        type: "object";
        properties: {
          review_type: { enum: ["approval", "editing", "rating"] };
          timeout: { type: "number" };
          escalation: { type: "object" };
        };
      };
      dynamic_input_schema: true;
      output_schema: {
        approved: { type: "boolean" };
        feedback: { type: "string" };
        edited_content: { type: "any" };
      };
    };
  };
}

// LinkedIn specific schemas
export interface LinkedInPostSchema {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    title?: string;
  };
  metrics: {
    likes: number;
    comments: number;
    shares: number;
    impressions?: number;
  };
  published_at: string;
  media?: Array<{
    type: "image" | "video" | "document";
    url: string;
    thumbnail_url?: string;
  }>;
}

// Tool Configuration
export interface ToolConfig {
  linkedin?: {
    companyPage: string;
    postingRole: ToolRole;
    includeAdvocacy: boolean;
  };
  wordpress?: {
    siteUrl: string;
    contentTypes: string[];
  };
  notion?: {
    workspace: string;
    contentDatabase: string;
    calendarDatabase: string;
  };
  canva?: {
    brandKit: string;
    templates: string[];
  };
  buffer?: {
    schedulePreference: SchedulePreference;
    timezone: string;
  };
  googleAnalytics?: {
    propertyId: string;
    trackingGoals: string[];
  };
  slack?: {
    channel: string;
    notificationLevel: NotificationLevel;
  };
}

// Tool Definition
export interface Tool {
  id: string;
  name: string;
  category: 'content' | 'creation' | 'distribution' | 'internal';
  description: string;
  icon: typeof Link2Icon | typeof FileTextIcon | typeof LayoutDashboardIcon | typeof PaletteIcon | typeof SendIcon;
  defaultConfig: Partial<ToolConfig>;
}

// Tool Insights
export interface ToolInsights {
  linkedin?: {
    followers: number;
    avgEngagement: string;
    topPost: string;
    bestTime: string;
  };
  wordpress?: {
    posts: number;
    avgLength: number;
    topCategories: string[];
  };
  notion?: {
    upcomingContent: number;
    launches: number;
    gaps: string[];
  };
}