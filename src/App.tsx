import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import OnboardingFlow from './pages/OnboardingFlow';
import WorkflowSetup from './pages/WorkflowSetup';
import ToolConnections from './pages/ToolConnections';
import WorkflowStudio from './pages/WorkflowStudio';
import TeammateOverview from './pages/TeammateOverview';
import DeployTeammate from './pages/DeployTeammate';
import CommandCenter from './pages/CommandCenter';
import CreateWorkflow from './pages/CreateWorkflow';
import { TeammateProvider } from './context/TeammateContext';

function App() {
  return (
    <TeammateProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/onboarding" element={<OnboardingFlow />} />
          <Route path="/connect" element={<ToolConnections />} />
          <Route path="/workflow-selection" element={<WorkflowSetup />} />
          <Route path="/studio" element={<WorkflowStudio />} />
          <Route path="/overview" element={<TeammateOverview />} />
          <Route path="/deploy" element={<DeployTeammate />} />
          <Route path="/command-center" element={<CommandCenter />} />
          <Route path="/create-workflow" element={<CreateWorkflow />} />
        </Routes>
      </Router>
    </TeammateProvider>
  );
}

export default App;