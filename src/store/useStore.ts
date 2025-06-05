import { create } from 'zustand';

interface WorkflowCreationState {
  // Workflow definition
  description: string;
  type: 'content' | 'engagement' | 'analytics' | null;
  steps: Array<{
    id: string;
    type: string;
    config: Record<string, any>;
  }>;
  
  // UI state
  currentStep: 'describe' | 'build' | 'test' | 'customize' | 'activate';
  isBuilding: boolean;
  isTesting: boolean;
  showSettings: boolean;
  
  // Test results
  testResults: {
    success: boolean;
    steps: Array<{
      name: string;
      status: 'success' | 'error';
      duration: number;
    }>;
  } | null;
  
  // Actions
  setDescription: (description: string) => void;
  setType: (type: 'content' | 'engagement' | 'analytics' | null) => void;
  addStep: (step: { id: string; type: string; config: Record<string, any> }) => void;
  removeStep: (stepId: string) => void;
  updateStepConfig: (stepId: string, config: Record<string, any>) => void;
  setCurrentStep: (step: 'describe' | 'build' | 'test' | 'customize' | 'activate') => void;
  setIsBuilding: (isBuilding: boolean) => void;
  setIsTesting: (isTesting: boolean) => void;
  setShowSettings: (show: boolean) => void;
  setTestResults: (results: WorkflowCreationState['testResults']) => void;
  reset: () => void;
}

interface AppState extends WorkflowCreationState {
  // AI Assistant state
  aiMessages: Array<{
    id: string;
    text: string;
    type: 'assistant' | 'user';
    timestamp: Date;
  }>;
  addAiMessage: (text: string, type: 'assistant' | 'user') => void;
  clearAiMessages: () => void;

  // AI Confidence state
  aiConfidence: number;
  aiConfidenceBreakdown: Array<{
    label: string;
    confidence: number;
    warning?: string;
  }>;
  setAiConfidence: (confidence: number) => void;
  setAiConfidenceBreakdown: (breakdown: Array<{
    label: string;
    confidence: number;
    warning?: string;
  }>) => void;

  // Tool connection state
  connectedTools: string[];
  addConnectedTool: (tool: string) => void;
  removeConnectedTool: (tool: string) => void;

  // Workflow state
  selectedWorkflows: string[];
  addWorkflow: (workflow: string) => void;
  removeWorkflow: (workflow: string) => void;
  
  // Usage mode state
  usageMode: string;
  setUsageMode: (mode: string) => void;
}

const initialState: Partial<WorkflowCreationState> = {
  description: '',
  type: null,
  steps: [],
  currentStep: 'describe',
  isBuilding: false,
  isTesting: false,
  showSettings: false,
  testResults: null
};

export const useStore = create<AppState>((set) => ({
  // Workflow Creation State
  ...initialState,
  setDescription: (description) => set({ description }),
  setType: (type) => set({ type }),
  addStep: (step) => set((state) => ({ steps: [...state.steps, step] })),
  removeStep: (stepId) => set((state) => ({
    steps: state.steps.filter(s => s.id !== stepId)
  })),
  updateStepConfig: (stepId, config) => set((state) => ({
    steps: state.steps.map(s => s.id === stepId ? { ...s, config } : s)
  })),
  setCurrentStep: (currentStep) => set({ currentStep }),
  setIsBuilding: (isBuilding) => set({ isBuilding }),
  setIsTesting: (isTesting) => set({ isTesting }),
  setShowSettings: (showSettings) => set({ showSettings }),
  setTestResults: (testResults) => set({ testResults }),
  reset: () => set(initialState),

  // AI Assistant state
  aiMessages: [],
  addAiMessage: (text, type) => set((state) => ({
    aiMessages: [...state.aiMessages, {
      id: Date.now().toString(),
      text,
      type,
      timestamp: new Date()
    }]
  })),
  clearAiMessages: () => set({ aiMessages: [] }),

  // AI Confidence state
  aiConfidence: 0,
  aiConfidenceBreakdown: [],
  setAiConfidence: (confidence) => set({ aiConfidence: confidence }),
  setAiConfidenceBreakdown: (breakdown) => set({ aiConfidenceBreakdown: breakdown }),

  // Tool connection state
  connectedTools: [],
  addConnectedTool: (tool) => set((state) => ({
    connectedTools: [...state.connectedTools, tool]
  })),
  removeConnectedTool: (tool) => set((state) => ({
    connectedTools: state.connectedTools.filter(t => t !== tool)
  })),

  // Workflow state
  selectedWorkflows: [],
  addWorkflow: (workflow) => set((state) => ({
    selectedWorkflows: [...state.selectedWorkflows, workflow]
  })),
  removeWorkflow: (workflow) => set((state) => ({
    selectedWorkflows: state.selectedWorkflows.filter(w => w !== workflow)
  })),

  // Usage mode state
  usageMode: '',
  setUsageMode: (mode) => set({ usageMode: mode })
}));