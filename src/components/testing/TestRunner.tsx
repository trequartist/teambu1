import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RefreshCw, Check, AlertCircle } from 'lucide-react';
import Button from '../Button';
import TestDataPanel from './TestDataPanel';
import ExecutionPanel from './ExecutionPanel';
import NodeInspector from './NodeInspector';
import TestMetrics from './TestMetrics';
import { TestExecution, TestDataSet } from '../../types/workflows';

interface TestRunnerProps {
  workflowId: string;
  onComplete: (results: TestExecution) => void;
}

const TestRunner: React.FC<TestRunnerProps> = ({
  workflowId,
  onComplete
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [testData, setTestData] = useState<TestDataSet>({
    inputs: {},
    expected_outputs: {},
    mocks: {}
  });
  const [execution, setExecution] = useState<TestExecution | null>(null);

  const handleRun = async () => {
    setIsRunning(true);
    // Simulate test execution
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRunning(false);
    // Handle completion
    if (execution) {
      onComplete(execution);
    }
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h3 className="font-medium text-white">Test Runner</h3>
          {isRunning && (
            <span className="text-sm text-zinc-400">
              Running test...
            </span>
          )}
        </div>
        
        <div className="flex space-x-2">
          {isRunning ? (
            <Button
              variant="outline"
              size="sm"
              onClick={handlePause}
              icon={<Pause className="w-4 h-4" />}
            >
              Pause
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={handleRun}
              icon={<Play className="w-4 h-4" />}
            >
              Run Test
            </Button>
          )}
        </div>
      </div>

      {/* Test Configuration */}
      <div className="grid grid-cols-2 gap-6">
        <TestDataPanel
          testData={testData}
          onUpdate={setTestData}
        />
        
        {execution && (
          <ExecutionPanel
            trace={execution.execution_trace}
            logs={execution.node_states[selectedNode || '']?.logs || []}
            duration={execution.metrics.total_duration}
            status={isRunning ? 'running' : 'complete'}
          />
        )}
      </div>

      {/* Node Inspector */}
      {selectedNode && execution?.node_states[selectedNode] && (
        <NodeInspector
          nodeId={selectedNode}
          type={execution.workflow.nodes[selectedNode].type}
          config={execution.workflow.nodes[selectedNode].config}
          status={execution.node_states[selectedNode].status}
          inputData={execution.node_states[selectedNode].input_data}
          outputData={execution.node_states[selectedNode].output_data}
          error={execution.node_states[selectedNode].error}
        />
      )}

      {/* Metrics */}
      {execution && (
        <TestMetrics metrics={execution.metrics} />
      )}
    </div>
  );
};

export default TestRunner;