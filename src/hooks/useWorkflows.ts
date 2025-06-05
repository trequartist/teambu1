import { useState } from 'react';
import { Workflow } from '../types/workflows';
import { FileText, MessageSquare, Lightbulb, Rocket, Star, BarChart3, Users, Calendar, Zap, Globe, Palette, Clock, Share2, Target, Search, TrendingUp, Megaphone, BookOpen, Award, Camera, Newspaper, Briefcase, Sparkles, LineChart, PieChart, BarChart, Gauge, Bell, Mail, Rss, Podcast, Video, Mic, Pen, Book, Coffee } from 'lucide-react';

export const useWorkflows = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([
    // Content Creation (12)
    {
      id: 'blog-to-linkedin',
      title: 'Blog → LinkedIn Adapter',
      description: 'Transforms blog posts into LinkedIn-optimized content',
      icon: FileText,
      schedule: 'When new blog published',
      category: 'content',
      isActive: true,
      lastRun: '2 hours ago',
      metrics: {
        posts_created: '8',
        avg_engagement: '2.3%'
      },
      setupTime: '5 min',
      complexity: 'Low',
      requirements: ['WordPress', 'LinkedIn API'],
      howItWorks: [
        'Monitor blog RSS feed',
        'Extract key content and themes',
        'Generate LinkedIn variations',
        'Create visuals',
        'Schedule posts'
      ],
      exampleOutputs: [
        {
          input: 'Technical blog post about new feature',
          output: 'Engaging LinkedIn announcement highlighting benefits'
        }
      ]
    },
    {
      id: 'thought-leadership',
      title: 'Thought Leadership Generator',
      description: 'Creates original insights based on industry trends',
      icon: Lightbulb,
      schedule: '3x per week',
      category: 'content',
      isActive: true,
      lastRun: '12 hours ago',
      metrics: {
        insights_generated: '24',
        avg_reach: '+62%'
      },
      setupTime: '10 min',
      complexity: 'Medium',
      requirements: ['Industry news sources', 'LinkedIn API'],
      howItWorks: [
        'Monitor industry trends',
        'Analyze key developments',
        'Generate unique insights',
        'Create engaging content',
        'Schedule for optimal reach'
      ],
      exampleOutputs: [
        {
          input: 'Latest tech industry trends',
          output: 'Original perspective on market implications'
        }
      ]
    },
    {
      id: 'product-launch',
      title: 'Product Launch Announcer',
      description: 'Creates and schedules product launch announcements',
      icon: Rocket,
      schedule: 'On demand',
      category: 'content',
      isActive: false,
      lastRun: '1 week ago',
      metrics: {
        launches_managed: '3',
        avg_impact: '+85%'
      },
      setupTime: '15 min',
      complexity: 'High',
      requirements: ['Product docs', 'LinkedIn API', 'Media assets'],
      howItWorks: [
        'Extract product details',
        'Create launch sequence',
        'Generate teasers',
        'Schedule announcements',
        'Monitor engagement'
      ],
      exampleOutputs: [
        {
          input: 'Product launch details',
          output: 'Multi-post launch campaign'
        }
      ]
    },
    {
      id: 'customer-stories',
      title: 'Customer Story Spotlight',
      description: 'Highlights customer success stories',
      icon: Star,
      schedule: 'Bi-weekly',
      category: 'content',
      isActive: true,
      lastRun: '3 days ago',
      metrics: {
        stories_shared: '6',
        engagement_rate: '3.1%'
      },
      setupTime: '10 min',
      complexity: 'Medium',
      requirements: ['Customer testimonials', 'LinkedIn API'],
      howItWorks: [
        'Select customer story',
        'Extract key achievements',
        'Create narrative',
        'Add visuals',
        'Schedule post'
      ],
      exampleOutputs: [
        {
          input: 'Customer case study',
          output: 'Engaging success story post'
        }
      ]
    },
    {
      id: 'team-member-feature',
      title: 'Team Member Feature',
      description: 'Creates engaging posts about team members',
      icon: Users,
      schedule: 'Monthly',
      category: 'content',
      isActive: true,
      lastRun: '2 weeks ago',
      metrics: {
        features_created: '12',
        avg_engagement: '2.8%'
      },
      setupTime: '10 min',
      complexity: 'Low',
      requirements: ['Team member info', 'LinkedIn API'],
      howItWorks: [
        'Collect team member info',
        'Generate feature story',
        'Create visual assets',
        'Schedule post',
        'Monitor engagement'
      ],
      exampleOutputs: [
        {
          input: 'Team member profile',
          output: 'Engaging team spotlight post'
        }
      ]
    },
    {
      id: 'industry-news',
      title: 'Industry News Curator',
      description: 'Curates and comments on industry news',
      icon: Newspaper,
      schedule: '2x per week',
      category: 'content',
      isActive: true,
      lastRun: '1 day ago',
      metrics: {
        news_curated: '16',
        reader_growth: '+31%'
      },
      setupTime: '5 min',
      complexity: 'Medium',
      requirements: ['News API', 'LinkedIn API'],
      howItWorks: [
        'Monitor industry news',
        'Select relevant stories',
        'Add expert commentary',
        'Create visual summary',
        'Schedule post'
      ],
      exampleOutputs: [
        {
          input: 'Industry news article',
          output: 'Curated news with insights'
        }
      ]
    },
    {
      id: 'tutorial-creator',
      title: 'Tutorial/How-To Creator',
      description: 'Creates step-by-step tutorials and guides',
      icon: BookOpen,
      schedule: 'Weekly',
      category: 'content',
      isActive: true,
      lastRun: '5 days ago',
      metrics: {
        tutorials_created: '12',
        avg_completion: '89%'
      },
      setupTime: '15 min',
      complexity: 'Medium',
      requirements: ['Documentation', 'LinkedIn API'],
      howItWorks: [
        'Identify tutorial topic',
        'Break down into steps',
        'Create visual aids',
        'Format for LinkedIn',
        'Schedule post'
      ],
      exampleOutputs: [
        {
          input: 'Product documentation',
          output: 'Engaging tutorial post'
        }
      ]
    },
    {
      id: 'event-promotion',
      title: 'Event Promotion Builder',
      description: 'Creates promotional content for events',
      icon: Calendar,
      schedule: 'As needed',
      category: 'content',
      isActive: true,
      lastRun: '1 week ago',
      metrics: {
        events_promoted: '8',
        avg_signups: '+45%'
      },
      setupTime: '10 min',
      complexity: 'Medium',
      requirements: ['Event details', 'LinkedIn API'],
      howItWorks: [
        'Extract event details',
        'Create promotion sequence',
        'Generate visuals',
        'Schedule posts',
        'Track registrations'
      ],
      exampleOutputs: [
        {
          input: 'Event details',
          output: 'Promotional post series'
        }
      ]
    },
    {
      id: 'company-culture',
      title: 'Company Culture Showcase',
      description: 'Highlights company culture and values',
      icon: Coffee,
      schedule: 'Bi-weekly',
      category: 'content',
      isActive: true,
      lastRun: '4 days ago',
      metrics: {
        showcases_created: '10',
        talent_inquiries: '+38%'
      },
      setupTime: '10 min',
      complexity: 'Low',
      requirements: ['Culture content', 'LinkedIn API'],
      howItWorks: [
        'Gather culture stories',
        'Create engaging narrative',
        'Add team photos',
        'Schedule posts',
        'Monitor impact'
      ],
      exampleOutputs: [
        {
          input: 'Team activity photos',
          output: 'Culture highlight post'
        }
      ]
    },
    {
      id: 'executive-ghostwriter',
      title: 'Executive Ghostwriter',
      description: 'Creates thought leadership content for executives',
      icon: Pen,
      schedule: 'Weekly',
      category: 'content',
      isActive: true,
      lastRun: '3 days ago',
      metrics: {
        posts_created: '15',
        profile_growth: '+28%'
      },
      setupTime: '15 min',
      complexity: 'High',
      requirements: ['Executive input', 'LinkedIn API'],
      howItWorks: [
        'Collect executive insights',
        'Draft content',
        'Match voice and style',
        'Get approval',
        'Schedule post'
      ],
      exampleOutputs: [
        {
          input: 'Executive insights',
          output: 'Thought leadership post'
        }
      ]
    },
    {
      id: 'case-study',
      title: 'Case Study Highlighter',
      description: 'Transforms case studies into LinkedIn content',
      icon: Book,
      schedule: 'Monthly',
      category: 'content',
      isActive: true,
      lastRun: '2 weeks ago',
      metrics: {
        studies_shared: '6',
        lead_generation: '+42%'
      },
      setupTime: '15 min',
      complexity: 'Medium',
      requirements: ['Case studies', 'LinkedIn API'],
      howItWorks: [
        'Extract key results',
        'Create success story',
        'Add data visualization',
        'Format for LinkedIn',
        'Schedule post'
      ],
      exampleOutputs: [
        {
          input: 'Detailed case study',
          output: 'Engaging success story'
        }
      ]
    },
    {
      id: 'milestone-celebration',
      title: 'Milestone Celebration Post',
      description: 'Creates posts celebrating company milestones',
      icon: Award,
      schedule: 'As needed',
      category: 'content',
      isActive: true,
      lastRun: '1 month ago',
      metrics: {
        celebrations_posted: '4',
        engagement_rate: '4.2%'
      },
      setupTime: '10 min',
      complexity: 'Low',
      requirements: ['Milestone details', 'LinkedIn API'],
      howItWorks: [
        'Identify milestone',
        'Create celebration post',
        'Add visual elements',
        'Schedule post',
        'Monitor engagement'
      ],
      exampleOutputs: [
        {
          input: 'Company milestone',
          output: 'Celebration post'
        }
      ]
    },

    // Engagement (8)
    {
      id: 'comment-monitor',
      title: 'Comment Monitor & Responder',
      description: 'Monitors and responds to comments intelligently',
      icon: MessageSquare,
      schedule: 'Real-time',
      category: 'engagement',
      isActive: true,
      lastRun: '5 minutes ago',
      metrics: {
        responses_sent: '127',
        avg_response_time: '14m'
      },
      setupTime: '10 min',
      complexity: 'Medium',
      requirements: ['LinkedIn API'],
      howItWorks: [
        'Monitor comments',
        'Analyze sentiment',
        'Generate response',
        'Get approval if needed',
        'Post response'
      ],
      exampleOutputs: [
        {
          input: 'User comment',
          output: 'Personalized response'
        }
      ]
    },
    {
      id: 'connection-manager',
      title: 'Connection Request Manager',
      description: 'Manages connection requests strategically',
      icon: Users,
      schedule: 'Daily',
      category: 'engagement',
      isActive: true,
      lastRun: '1 hour ago',
      metrics: {
        connections_managed: '250',
        acceptance_rate: '78%'
      },
      setupTime: '5 min',
      complexity: 'Low',
      requirements: ['LinkedIn API'],
      howItWorks: [
        'Review requests',
        'Check alignment',
        'Generate response',
        'Send/accept request',
        'Track growth'
      ],
      exampleOutputs: [
        {
          input: 'Connection request',
          output: 'Personalized response'
        }
      ]
    },
    {
      id: 'dm-conversation',
      title: 'DM Conversation Starter',
      description: 'Initiates meaningful conversations via DM',
      icon: MessageSquare,
      schedule: 'Daily',
      category: 'engagement',
      isActive: true,
      lastRun: '3 hours ago',
      metrics: {
        conversations_started: '45',
        response_rate: '62%'
      },
      setupTime: '10 min',
      complexity: 'Medium',
      requirements: ['LinkedIn API'],
      howItWorks: [
        'Identify opportunities',
        'Generate opener',
        'Send message',
        'Monitor response',
        'Continue conversation'
      ],
      exampleOutputs: [
        {
          input: 'Prospect profile',
          output: 'Personalized message'
        }
      ]
    },
    {
      id: 'community-answerer',
      title: 'Community Question Answerer',
      description: 'Answers questions in LinkedIn groups',
      icon: MessageSquare,
      schedule: 'Daily',
      category: 'engagement',
      isActive: true,
      lastRun: '2 hours ago',
      metrics: {
        questions_answered: '34',
        helpful_votes: '156'
      },
      setupTime: '10 min',
      complexity: 'Medium',
      requirements: ['LinkedIn API', 'Knowledge base'],
      howItWorks: [
        'Monitor questions',
        'Research answers',
        'Draft response',
        'Add value',
        'Track impact'
      ],
      exampleOutputs: [
        {
          input: 'Community question',
          output: 'Helpful answer'
        }
      ]
    },
    {
      id: 'influencer-engagement',
      title: 'Influencer Engagement Tracker',
      description: 'Tracks and engages with industry influencers',
      icon: Users,
      schedule: 'Daily',
      category: 'engagement',
      isActive: true,
      lastRun: '4 hours ago',
      metrics: {
        influencers_engaged: '23',
        response_rate: '45%'
      },
      setupTime: '15 min',
      complexity: 'High',
      requirements: ['LinkedIn API', 'Influencer list'],
      howItWorks: [
        'Monitor influencer activity',
        'Identify opportunities',
        'Create engagement',
        'Track responses',
        'Build relationships'
      ],
      exampleOutputs: [
        {
          input: 'Influencer post',
          output: 'Thoughtful comment'
        }
      ]
    },
    {
      id: 'brand-mention',
      title: 'Brand Mention Responder',
      description: 'Monitors and responds to brand mentions',
      icon: Bell,
      schedule: 'Real-time',
      category: 'engagement',
      isActive: true,
      lastRun: '30 minutes ago',
      metrics: {
        mentions_handled: '89',
        response_time: '12m'
      },
      setupTime: '5 min',
      complexity: 'Low',
      requirements: ['LinkedIn API'],
      howItWorks: [
        'Monitor mentions',
        'Analyze context',
        'Generate response',
        'Reply quickly',
        'Track sentiment'
      ],
      exampleOutputs: [
        {
          input: 'Brand mention',
          output: 'Timely response'
        }
      ]
    },
    {
      id: 'thank-you',
      title: 'Thank You Message Automator',
      description: 'Sends personalized thank you messages',
      icon: MessageSquare,
      schedule: 'As needed',
      category: 'engagement',
      isActive: true,
      lastRun: '1 day ago',
      metrics: {
        messages_sent: '156',
        positive_responses: '92%'
      },
      setupTime: '5 min',
      complexity: 'Low',
      requirements: ['LinkedIn API'],
      howItWorks: [
        'Identify triggers',
        'Generate message',
        'Personalize content',
        'Send message',
        'Track response'
      ],
      exampleOutputs: [
        {
          input: 'Engagement event',
          output: 'Thank you message'
        }
      ]
    },
    {
      id: 'welcome-followers',
      title: 'Welcome New Followers',
      description: 'Welcomes new followers with personalized messages',
      icon: Users,
      schedule: 'Daily',
      category: 'engagement',
      isActive: true,
      lastRun: '1 day ago',
      metrics: {
        welcomes_sent: '78',
        engagement_rate: '34%'
      },
      setupTime: '5 min',
      complexity: 'Low',
      requirements: ['LinkedIn API'],
      howItWorks: [
        'Detect new followers',
        'Research profile',
        'Generate welcome',
        'Send message',
        'Track engagement'
      ],
      exampleOutputs: [
        {
          input: 'New follower',
          output: 'Welcome message'
        }
      ]
    },

    // Analytics & Optimization (6)
    {
      id: 'performance-report',
      title: 'Performance Report Generator',
      description: 'Creates detailed performance reports',
      icon: BarChart,
      schedule: 'Weekly',
      category: 'analytics',
      isActive: true,
      lastRun: '6 days ago',
      metrics: {
        reports_generated: '12',
        insights_found: '45'
      },
      setupTime: '10 min',
      complexity: 'Medium',
      requirements: ['LinkedIn API', 'Analytics tools'],
      howItWorks: [
        'Collect metrics',
        'Analyze trends',
        'Generate insights',
        'Create report',
        'Share findings'
      ],
      exampleOutputs: [
        {
          input: 'Weekly data',
          output: 'Performance report'
        }
      ]
    },
    {
      id: 'ab-testing',
      title: 'A/B Test Runner',
      description: 'Runs A/B tests on content variations',
      icon: LineChart,
      schedule: 'Continuous',
      category: 'analytics',
      isActive: true,
      lastRun: '1 day ago',
      metrics: {
        tests_run: '24',
        improvements: '+31%'
      },
      setupTime: '15 min',
      complexity: 'High',
      requirements: ['LinkedIn API', 'A/B testing tools'],
      howItWorks: [
        'Create variations',
        'Split audience',
        'Run test',
        'Analyze results',
        'Implement winners'
      ],
      exampleOutputs: [
        {
          input: 'Content piece',
          output: 'Test results'
        }
      ]
    },
    {
      id: 'competitor-analysis',
      title: 'Competitor Analysis Tracker',
      description: 'Tracks and analyzes competitor content',
      icon: Target,
      schedule: 'Weekly',
      category: 'analytics',
      isActive: true,
      lastRun: '5 days ago',
      metrics: {
        competitors_tracked: '8',
        insights_generated: '34'
      },
      setupTime: '15 min',
      complexity: 'High',
      requirements: ['LinkedIn API', 'Competitor list'],
      howItWorks: [
        'Monitor competitors',
        'Analyze content',
        'Identify trends',
        'Generate insights',
        'Create report'
      ],
      exampleOutputs: [
        {
          input: 'Competitor activity',
          output: 'Analysis report'
        }
      ]
    },
    {
      id: 'hashtag-optimizer',
      title: 'Hashtag Performance Optimizer',
      description: 'Optimizes hashtag usage for better reach',
      icon: Search,
      schedule: 'Daily',
      category: 'analytics',
      isActive: true,
      lastRun: '1 day ago',
      metrics: {
        hashtags_optimized: '45',
        reach_improvement: '+28%'
      },
      setupTime: '5 min',
      complexity: 'Low',
      requirements: ['LinkedIn API'],
      howItWorks: [
        'Analyze performance',
        'Research trends',
        'Test combinations',
        'Track results',
        'Update strategy'
      ],
      exampleOutputs: [
        {
          input: 'Content topic',
          output: 'Optimized hashtags'
        }
      ]
    },
    {
      id: 'best-time',
      title: 'Best Time Analyzer',
      description: 'Determines optimal posting times',
      icon: Clock,
      schedule: 'Weekly',
      category: 'analytics',
      isActive: true,
      lastRun: '4 days ago',
      metrics: {
        times_analyzed: '168',
        engagement_lift: '+23%'
      },
      setupTime: '10 min',
      complexity: 'Medium',
      requirements: ['LinkedIn API', 'Analytics tools'],
      howItWorks: [
        'Collect engagement data',
        'Analyze patterns',
        'Identify best times',
        'Test findings',
        'Update schedule'
      ],
      exampleOutputs: [
        {
          input: 'Engagement data',
          output: 'Optimal schedule'
        }
      ]
    },
    {
      id: 'content-audit',
      title: 'Content Audit Workflow',
      description: 'Audits content performance and strategy',
      icon: PieChart,
      schedule: 'Monthly',
      category: 'analytics',
      isActive: true,
      lastRun: '25 days ago',
      metrics: {
        posts_analyzed: '124',
        improvements: '18'
      },
      setupTime: '20 min',
      complexity: 'High',
      requirements: ['LinkedIn API', 'Analytics tools'],
      howItWorks: [
        'Gather content data',
        'Analyze performance',
        'Identify patterns',
        'Generate insights',
        'Recommend changes'
      ],
      exampleOutputs: [
        {
          input: 'Monthly content',
          output: 'Audit report'
        }
      ]
    },

    // Distribution (10)
    {
      id: 'cross-platform',
      title: 'Cross-Platform Syndicator',
      description: 'Syndicates content across platforms',
      icon: Share2,
      schedule: 'As needed',
      category: 'distribution',
      isActive: true,
      lastRun: '2 days ago',
      metrics: {
        posts_syndicated: '34',
        reach_increase: '+45%'
      },
      setupTime: '15 min',
      complexity: 'Medium',
      requirements: ['LinkedIn API', 'Other platform APIs'],
      howItWorks: [
        'Adapt content',
        'Optimize for platform',
        'Schedule posts',
        'Monitor performance',
        'Adjust strategy'
      ],
      exampleOutputs: [
        {
          input: 'Original post',
          output: 'Platform variations'
        }
      ]
    },
    {
      id: 'newsletter-integration',
      title: 'Newsletter Integration',
      description: 'Integrates LinkedIn content with newsletters',
      icon: Mail,
      schedule: 'Weekly',
      category: 'distribution',
      isActive: true,
      lastRun: '5 days ago',
      metrics: {
        newsletters_enhanced: '12',
        click_rate: '+28%'
      },
      setupTime: '10 min',
      complexity: 'Medium',
      requirements: ['LinkedIn API', 'Newsletter platform'],
      howItWorks: [
        'Collect top content',
        'Format for newsletter',
        'Add insights',
        'Schedule delivery',
        'Track engagement'
      ],
      exampleOutputs: [
        {
          input: 'LinkedIn content',
          output: 'Newsletter section'
        }
      ]
    },
    {
      id: 'slack-announcer',
      title: 'Slack Announcement Poster',
      description: 'Posts LinkedIn updates to Slack',
      icon: Bell,
      schedule: 'Real-time',
      category: 'distribution',
      isActive: true,
      lastRun: '1 hour ago',
      metrics: {
        announcements_made: '56',
        team_engagement: '82%'
      },
      setupTime: '5 min',
      complexity: 'Low',
      requirements: ['LinkedIn API', 'Slack API'],
      howItWorks: [
        'Monitor LinkedIn',
        'Format for Slack',
        'Post update',
        'Add context',
        'Track engagement'
      ],
      exampleOutputs: [
        {
          input: 'LinkedIn update',
          output: 'Slack message'
        }
      ]
    },
    {
      id: 'email-signature',
      title: 'Email Signature Updater',
      description: 'Updates email signatures with latest content',
      icon: Mail,
      schedule: 'Weekly',
      category: 'distribution',
      isActive: true,
      lastRun: '6 days ago',
      metrics: {
        signatures_updated: '45',
        click_through: '3.2%'
      },
      setupTime: '5 min',
      complexity: 'Low',
      requirements: ['LinkedIn API', 'Email integration'],
      howItWorks: [
        'Select top content',
        'Create signature',
        'Update templates',
        'Deploy changes',
        'Track clicks'
      ],
      exampleOutputs: [
        {
          input: 'Latest content',
          output: 'Updated signature'
        }
      ]
    },
    {
      id: 'calendar-sync',
      title: 'Content Calendar Sync',
      description: 'Syncs content calendar across tools',
      icon: Calendar,
      schedule: 'Real-time',
      category: 'distribution',
      isActive: true,
      lastRun: '30 minutes ago',
      metrics: {
        events_synced: '89',
        conflicts_prevented: '12'
      },
      setupTime: '10 min',
      complexity: 'Medium',
      requirements: ['LinkedIn API', 'Calendar API'],
      howItWorks: [
        'Monitor schedules',
        'Sync events',
        'Resolve conflicts',
        'Update calendars',
        'Send notifications'
      ],
      exampleOutputs: [
        {
          input: 'Content schedule',
          output: 'Synced calendar'
        }
      ]
    },
    {
      id: 'rss-poster',
      title: 'RSS-to-Social Poster',
      description: 'Converts RSS feeds to LinkedIn posts',
      icon: Rss,
      schedule: 'Hourly',
      category: 'distribution',
      isActive: true,
      lastRun: '45 minutes ago',
      metrics: {
        feeds_monitored: '5',
        posts_created: '34'
      },
      setupTime: '5 min',
      complexity: 'Low',
      requirements: ['LinkedIn API', 'RSS feeds'],
      howItWorks: [
        'Monitor feeds',
        'Filter content',
        'Format post',
        'Schedule update',
        'Track performance'
      ],
      exampleOutputs: [
        {
          input: 'RSS item',
          output: 'LinkedIn post'
        }
      ]
    },
    {
      id: 'webinar-followup',
      title: 'Webinar Follow-up Sequence',
      description: 'Creates follow-up content for webinars',
      icon: Video,
      schedule: 'After webinars',
      category: 'distribution',
      isActive: true,
      lastRun: '1 week ago',
      metrics: {
        sequences_created: '8',
        engagement_rate: '4.2%'
      },
      setupTime: '15 min',
      complexity: 'Medium',
      requirements: ['LinkedIn API', 'Webinar platform'],
      howItWorks: [
        'Extract highlights',
        'Create sequence',
        'Add resources',
        'Schedule posts',
        'Monitor engagement'
      ],
      exampleOutputs: [
        {
          input: 'Webinar recording',
          output: 'Follow-up sequence'
        }
      ]
    },
    {
      id: 'podcast-promoter',
      title: 'Podcast Episode Promoter',
      description: 'Promotes podcast episodes on LinkedIn',
      icon: Podcast,
      schedule: 'Weekly',
      category: 'distribution',
      isActive: true,
      lastRun: '4 days ago',
      metrics: {
        episodes_promoted: '12',
        listener_growth: '+18%'
      },
      setupTime: '10 min',
      complexity: 'Medium',
      requirements: ['LinkedIn API', 'Podcast RSS'],
      howItWorks: [
        'Get episode details',
        'Create promotion',
        'Add key points',
        'Schedule posts',
        'Track listens'
      ],
      exampleOutputs: [
        {
          input: 'Podcast episode',
          output: 'Promotional post'
        }
      ]
    },
    {
      id: 'video-snippets',
      title: 'Video Snippet Creator',
      description: 'Creates video snippets for LinkedIn',
      icon: Video,
      schedule: 'As needed',
      category: 'distribution',
      isActive: true,
      lastRun: '3 days ago',
      metrics: {
        snippets_created: '24',
        view_rate: '68%'
      },
      setupTime: '15 min',
      complexity: 'High',
      requirements: ['LinkedIn API', 'Video editing'],
      howItWorks: [
        'Select highlights',
        'Create snippets',
        'Add captions',
        'Optimize format',
        'Schedule posts'
      ],
      exampleOutputs: [
        {
          input: 'Long video',
          output: 'Engaging snippet'
        }
      ]
    },
    {
      id: 'story-generator',
      title: 'Story/Reel Generator',
      description: 'Creates LinkedIn stories and reels',
      icon: Camera,
      schedule: 'Daily',
      category: 'distribution',
      isActive: true,
      lastRun: '1 day ago',
      metrics: {
        stories_created: '15',
        completion_rate: '72%'
      },
      setupTime: '10 min',
      complexity: 'Medium',
      requirements: ['LinkedIn API', 'Media assets'],
      howItWorks: [
        'Select content',
        'Create storyboard',
        'Add effects',
        'Schedule story',
        'Track views'
      ],
      exampleOutputs: [
        {
          input: 'Content idea',
          output: 'Engaging story'
        }
      ]
    },

    // Research & Intelligence (9)
    {
      id: 'trend-scanner',
      title: 'Trending Topic Scanner',
      description: 'Identifies trending topics in your industry',
      icon: TrendingUp,
      schedule: 'Daily',
      category: 'research',
      isActive: true,
      lastRun: '12 hours ago',
      metrics: {
        trends_identified: '34',
        content_ideas: '12'
      },
      setupTime: '10 min',
      complexity: 'Medium',
      requirements: ['LinkedIn API', 'News API'],
      howItWorks: [
        'Monitor sources',
        'Analyze trends',
        'Score relevance',
        'Generate ideas',
        'Track performance'
      ],
      exampleOutputs: [
        {
          input: 'Industry data',
          output: 'Trend report'
        }
      ]
    },
    {
      id: 'competitor-tracker',
      title: 'Competitor Content Tracker',
      description: 'Tracks competitor content strategies',
      icon: Target,
      schedule: 'Daily',
      category: 'research',
      isActive: true,
      lastRun: '6 hours ago',
      metrics: {
        competitors_tracked: '8',
        insights_found: '45'
      },
      setupTime: '15 min',
      complexity: 'High',
      requirements: ['LinkedIn API', 'Competitor list'],
      howItWorks: [
        'Monitor competitors',
        'Analyze content',
        'Identify patterns',
        'Generate insights',
        'Create report'
      ],
      exampleOutputs: [
        {
          input: 'Competitor posts',
          output: 'Strategy insights'
        }
      ]
    },
    {
      id: 'news-aggregator',
      title: 'Industry News Aggregator',
      description: 'Aggregates relevant industry news',
      icon: Newspaper,
      schedule: 'Hourly',
      category: 'research',
      isActive: true,
      lastRun: '1 hour ago',
      metrics: {
        sources_monitored: '25',
        stories_curated: '89'
      },
      setupTime: '10 min',
      complexity: 'Medium',
      requirements: ['LinkedIn API', 'News API'],
      howItWorks: [
        'Monitor sources',
        'Filter news',
        'Score relevance',
        'Create summary',
        'Share insights'
      ],
      exampleOutputs: [
        {
          input: 'News feeds',
          output: 'Curated digest'
        }
      ]
    },
    {
      id: 'keyword-finder',
      title: 'Keyword Opportunity Finder',
      description: 'Identifies trending keywords and topics',
      icon: Search,
      schedule: 'Weekly',
      category: 'research',
      isActive: true,
      lastRun: '5 days ago',
      metrics: {
        keywords_found: '156',
        content_ideas: '34'
      },
      setupTime: '10 min',
      complexity: 'Medium',
      requirements: ['LinkedIn API', 'Keyword tools'],
      howItWorks: [
        'Research keywords',
        'Analyze volume',
        'Check relevance',
        'Generate ideas',
        'Track performance'
      ],
      exampleOutputs: [
        {
          input: 'Industry terms',
          output: 'Keyword opportunities'
        }
      ]
    },
    {
      id: 'influencer-discovery',
      title: 'Influencer Discovery',
      description: 'Finds relevant industry influencers',
      icon: Users,
      schedule: 'Weekly',
      category: 'research',
      isActive: true,
      lastRun: '4 days ago',
      metrics: {
        influencers_found: '45',
        engagement_rate: '3.8%'
      },
      setupTime: '15 min',
      complexity: 'High',
      requirements: ['LinkedIn API'],
      howItWorks: [
        'Search profiles',
        'Analyze influence',
        'Check relevance',
        'Create list',
        'Monitor activity'
      ],
      exampleOutputs: [
        {
          input: 'Industry focus',
          output: 'Influencer list'
        }
      ]
    },
    {
      id: 'sentiment-analyzer',
      title: 'Customer Sentiment Analyzer',
      description: 'Analyzes customer sentiment in comments',
      icon: MessageSquare,
      schedule: 'Real-time',
      category: 'research',
      isActive: true,
      lastRun: '30 minutes ago',
      metrics: {
        comments_analyzed: '256',
        accuracy: '94%'
      },
      setupTime: '10 min',
      complexity: 'Medium',
      requirements: ['LinkedIn API', 'Sentiment API'],
      howItWorks: [
        'Collect comments',
        'Analyze sentiment',
        'Identify trends',
        'Generate report',
        'Track changes'
      ],
      exampleOutputs: [
        {
          input: 'Comment data',
          output: 'Sentiment report'
        }
      ]
    },
    {
      id: 'content-gap',
      title: 'Content Gap Identifier',
      description: 'Identifies content opportunities',
      icon: Search,
      schedule: 'Weekly',
      category: 'research',
      isActive: true,
      lastRun: '3 days ago',
      metrics: {
        gaps_found: '12',
        content_ideas: '28'
      },
      setupTime: '15 min',
      complexity: 'High',
      requirements: ['LinkedIn API', 'Analytics tools'],
      howItWorks: [
        'Analyze content',
        'Identify gaps',
        'Research demand',
        'Generate ideas',
        'Plan content'
      ],
      exampleOutputs: [
        {
          input: 'Content audit',
          output: 'Opportunity report'
        }
      ]
    },
    {
      id: 'viral-analyzer',
      title: 'Viral Content Analyzer',
      description: 'Analyzes viral content patterns',
      icon: TrendingUp,
      schedule: 'Daily',
      category: 'research',
      isActive: true,
      lastRun: '1 day ago',
      metrics: {
        posts_analyzed: '500',
        patterns_found: '15'
      },
      setupTime: '10 min',
      complexity: 'Medium',
      requirements: ['LinkedIn API'],
      howItWorks: [
        'Monitor viral posts',
        'Analyze patterns',
        'Extract insights',
        'Create templates',
        'Test findings'
      ],
      exampleOutputs: [
        {
          input: 'Viral posts',
          output: 'Pattern insights'
        }
      ]
    },
    {
      id: 'audience-insight',
      title: 'Audience Insight Gatherer',
      description: 'Gathers insights about your audience',
      icon: Users,
      schedule: 'Weekly',
      category: 'research',
      isActive: true,
      lastRun: '4 days ago',
      metrics: {
        profiles_analyzed: '1000',
        insights_found: '23'
      },
      setupTime: '15 min',
      complexity: 'High',
      requirements: ['LinkedIn API', 'Analytics tools'],
      howItWorks: [
        'Analyze followers',
        'Identify patterns',
        'Generate insights',
        'Create personas',
        'Update strategy'
      ],
      exampleOutputs: [
        {
          input: 'Follower data',
          output: 'Audience insights'
        }
      ]
    }
  ]);

  return { workflows, setWorkflows };
};