import { Workflow } from '../types/workflows';

export const generatePythonCode = (workflow: Workflow): string => {
  // Generate Python code based on workflow configuration
  const className = workflow.id
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

  const steps = workflow.naturalLanguage
    ?.split('STEPS:')[1]
    .trim()
    .split('\n\n')
    .filter(Boolean)
    .map(step => step.trim());

  let code = `
from kiwiq import workflow, step, trigger
from kiwiq.tools import wordpress, linkedin, canva, ai
from kiwiq.types import BlogPost, LinkedInPost, Analytics
from typing import List, Dict, Any

@workflow(
    name="${workflow.id}",
    description="${workflow.description}",
    schedule="${workflow.schedule}"
)
class ${className}:
    def __init__(self):
        self.analytics = Analytics()
        self.preferences = self.load_preferences()
    
    @trigger(
        events=["wordpress.post.published"],
        schedule="on_demand",
        command="adapt_blog_post"
    )
    def start(self, context: Dict[str, Any]) -> str:
        """Triggers when a new blog post is published"""
        return context.get("blog_post_url")
`;

  // Generate step methods based on natural language description
  if (steps) {
    steps.forEach((step, index) => {
      const stepNumber = index + 1;
      const stepTitle = step.split('\n')[0].replace(`${stepNumber}.`, '').trim();
      const stepContent = step.split('\n').slice(1).join('\n');
      
      code += `
    @step(
        name="${stepTitle}",
        retry_count=3,
        error_handling="auto"
    )
    def step_${stepNumber}(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """${stepContent.replace(/\n/g, '\n        ')}"""
        # Implementation generated based on natural language description
        result = {}
        
        try:
            # Step logic here
            pass
        except Exception as e:
            self.handle_error(e)
            raise
        
        return result
`;
    });
  }

  return code.trim();
};

export const codeExplanations: Record<string, { title: string; description: string }> = {
  '@workflow': {
    title: 'Workflow Decorator',
    description: 'Marks this class as a KiwiQ workflow that can be deployed and managed through the platform. Includes metadata like name, description, and schedule.'
  },
  '@trigger': {
    title: 'Trigger Definition',
    description: 'Specifies when this workflow should run. Can be event-based (like a new blog post), scheduled (daily/weekly), or triggered manually through commands.'
  },
  '@step': {
    title: 'Workflow Step',
    description: 'Defines a discrete action in the workflow. Each step has built-in error handling, retries, and monitoring. Steps run in sequence by default.'
  },
  'retry_count': {
    title: 'Automatic Retries',
    description: 'If a step fails, it will automatically retry up to the specified number of times with exponential backoff.'
  },
  'error_handling': {
    title: 'Error Handling',
    description: '"auto" mode enables intelligent error recovery, logging, and notifications. The system learns from failures to prevent similar issues.'
  },
  'Analytics': {
    title: 'Analytics Integration',
    description: 'Built-in analytics tracking for monitoring workflow performance, engagement rates, and optimization opportunities.'
  },
  'handle_error': {
    title: 'Error Handler',
    description: 'Custom error handling logic that can trigger notifications, fallback actions, or recovery procedures.'
  }
};