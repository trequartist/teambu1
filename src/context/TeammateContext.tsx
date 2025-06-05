import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TeammateContextType {
  teammateType: string;
  contentGoal: string;
  platforms: string[];
  hoursPerWeek: number;
  description: string;
  setTeammateType: (type: string) => void;
  setContentGoal: (goal: string) => void;
  setPlatforms: (platforms: string[]) => void;
  setHoursPerWeek: (hours: number) => void;
  setDescription: (description: string) => void;
  selectedWorkflows: string[];
  addWorkflow: (workflow: string) => void;
  removeWorkflow: (workflow: string) => void;
  addAllWorkflows: () => void;
  clearWorkflows: () => void;
  usageMode: string;
  setUsageMode: (mode: string) => void;
  connectedTools: string[];
  addConnectedTool: (tool: string) => void;
  removeConnectedTool: (tool: string) => void;
}

const TeammateContext = createContext<TeammateContextType | undefined>(undefined);

export const useTeammate = () => {
  const context = useContext(TeammateContext);
  if (!context) {
    throw new Error('useTeammate must be used within a TeammateProvider');
  }
  return context;
};

export const TeammateProvider = ({ children }: { children: ReactNode }) => {
  const [teammateType, setTeammateType] = useState('Content Marketer');
  const [contentGoal, setContentGoal] = useState('Build thought leadership on LinkedIn');
  const [platforms, setPlatforms] = useState(['LinkedIn', 'Company Blog', 'Newsletter']);
  const [hoursPerWeek, setHoursPerWeek] = useState(15);
  const [description, setDescription] = useState('');
  const [selectedWorkflows, setSelectedWorkflows] = useState<string[]>([]);
  const [usageMode, setUsageMode] = useState('');
  const [connectedTools, setConnectedTools] = useState<string[]>([]);

  const addWorkflow = (workflow: string) => {
    setSelectedWorkflows(prev => {
      if (!prev.includes(workflow)) {
        return [...prev, workflow];
      }
      return prev;
    });
  };

  const removeWorkflow = (workflow: string) => {
    setSelectedWorkflows(prev => prev.filter(w => w !== workflow));
  };

  const addAllWorkflows = () => {
    setSelectedWorkflows([
      'Content Calendar Sync',
      'Blog-to-LinkedIn Adapter',
      'Thought Leadership Generator',
      'Product Launch Amplifier',
      'Customer Story Spotlight',
      'Engagement Monitor',
      'Competitor Insights',
      'Performance Analytics',
      'Team Spotlight',
      'Industry News Curator',
      'Visual Content Creator',
      'Optimal Time Scheduler'
    ]);
  };

  const clearWorkflows = () => {
    setSelectedWorkflows([]);
  };

  const addConnectedTool = (tool: string) => {
    setConnectedTools(prev => [...prev, tool]);
  };

  const removeConnectedTool = (tool: string) => {
    setConnectedTools(prev => prev.filter(t => t !== tool));
  };

  return (
    <TeammateContext.Provider
      value={{
        teammateType,
        contentGoal,
        platforms,
        hoursPerWeek,
        description,
        setTeammateType,
        setContentGoal,
        setPlatforms,
        setHoursPerWeek,
        setDescription,
        selectedWorkflows,
        addWorkflow,
        removeWorkflow,
        addAllWorkflows,
        clearWorkflows,
        usageMode,
        setUsageMode,
        connectedTools,
        addConnectedTool,
        removeConnectedTool
      }}
    >
      {children}
    </TeammateContext.Provider>
  );
};