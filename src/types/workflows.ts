import { ReactNode } from 'react';

// Base workflow types
export interface AgentGraphV2 {
  version: "2.0";
  metadata: {
    name: string;
    description: string;
    author: string;
    created_at: string;
    tags: string[];
  };
  
  nodes: {
    [nodeId: string]: {
      type: NodeType;
      config: DynamicConfig;
      position?: { x: number; y: number };
    };
  };
  
  edges: Array<{
    source: string;
    target: string;
    source_field?: string;
    target_field?: string;
    condition?: ConditionExpression;
  }>;
  
  central_state: {
    [field: string]: {
      type: "string" | "number" | "array" | "object";
      reducer?: "replace" | "append" | "merge" | "custom";
      initial_value?: any;
    };
  };
  
  error_handling: {
    strategy: "fail_fast" | "continue" | "retry";
    max_retries?: number;
    fallback_workflow?: string;
  };
}

// Node types and configurations
export type NodeType = 
  | "input"
  | "linkedin_scraper"
  | "llm_processor"
  | "human_review"
  | "content_analyzer"
  | "engagement_monitor"
  | "scheduler";

export type DynamicConfig = 
  | InputNodeConfig
  | LinkedInScraperConfig
  | LLMProcessorConfig
  | HumanReviewConfig
  | ContentAnalyzerConfig
  | EngagementMonitorConfig
  | SchedulerConfig;

export interface InputNodeConfig {
  type: "input";
  data_source: "manual" | "api" | "webhook";
  validation?: Record<string, any>;
}

export interface LinkedInScraperConfig {
  type: "linkedin_scraper";
  companies: string[];
  post_count: number;
  include_metrics: boolean;
}

export interface LLMProcessorConfig {
  type: "llm_processor";
  model: "gpt-4" | "claude-3" | "llama-2";
  prompt_template: string;
  temperature: number;
  max_tokens: number;
  json_mode: boolean;
}

export interface HumanReviewConfig {
  type: "human_review";
  review_type: "approval" | "editing" | "rating";
  timeout: number;
  escalation?: {
    after: number;
    to: string[];
  };
}

export interface ContentAnalyzerConfig {
  type: "content_analyzer";
  metrics: string[];
  thresholds: Record<string, number>;
}

export interface EngagementMonitorConfig {
  type: "engagement_monitor";
  metrics: string[];
  alert_threshold: number;
  update_frequency: number;
}

export interface SchedulerConfig {
  type: "scheduler";
  schedule_type: "fixed" | "optimal" | "adaptive";
  timezone: string;
  frequency: string;
}

// Condition expressions for edges
export interface ConditionExpression {
  operator: "equals" | "not" | "greater" | "less" | "contains" | "matches";
  field: string;
  value: any;
}

// Test execution types
export interface TestExecution {
  id: string;
  workflow: AgentGraphV2;
  test_data: TestDataSet;
  execution_trace: ExecutionTrace;
  current_node: string;
  node_states: {
    [nodeId: string]: {
      status: "pending" | "running" | "success" | "error" | "skipped";
      start_time?: number;
      end_time?: number;
      input_data?: any;
      output_data?: any;
      error?: Error;
      logs: LogEntry[];
    };
  };
  central_state_snapshots: Array<{
    timestamp: number;
    state: CentralState;
    mutation: StateMutation;
  }>;
  metrics: {
    total_duration: number;
    node_durations: { [nodeId: string]: number };
    api_calls: number;
    estimated_cost: number;
    tokens_used?: number;
  };
}

export interface TestDataSet {
  inputs: Record<string, any>;
  expected_outputs?: Record<string, any>;
  mocks?: Record<string, any>;
}

export interface ExecutionTrace {
  steps: Array<{
    node: string;
    action: string;
    timestamp: number;
    data?: any;
  }>;
}

export interface LogEntry {
  level: "info" | "warn" | "error" | "debug";
  message: string;
  timestamp: number;
  metadata?: Record<string, any>;
}

export interface CentralState {
  [key: string]: any;
}

export interface StateMutation {
  type: "set" | "update" | "delete";
  path: string[];
  value?: any;
}

// Legacy Workflow interface (maintained for backward compatibility)
export interface Workflow {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  schedule: string;
  category: 'content' | 'engagement' | 'analytics' | 'distribution' | 'research';
  isActive: boolean;
  lastRun: string;
  metrics: {
    [key: string]: string;
  };
  setupTime: string;
  complexity: 'Low' | 'Medium' | 'High';
  requirements: string[];
  howItWorks: string[];
  exampleOutputs: Array<{
    input: string;
    output: string;
  }>;
  naturalLanguage?: string;
}