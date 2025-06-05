import React, { useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  NodeTypes,
  Connection,
  useNodesState,
  useEdgesState
} from 'reactflow';
import 'reactflow/dist/style.css';

import { AgentGraphV2 } from '../../types/workflows';

interface WorkflowVisualViewProps {
  workflow?: AgentGraphV2;
  onNodeClick?: (nodeId: string) => void;
  onEdgeClick?: (edgeId: string) => void;
}

const initialNodes: Node[] = [
  {
    id: 'trigger',
    type: 'input',
    data: { label: 'Trigger' },
    position: { x: 0, y: 0 },
    className: 'bg-zinc-800 text-white rounded-lg border border-zinc-700 p-4'
  },
  {
    id: 'scraper',
    type: 'default',
    data: { label: 'LinkedIn Scraper' },
    position: { x: 200, y: 0 },
    className: 'bg-zinc-800 text-white rounded-lg border border-zinc-700 p-4'
  },
  {
    id: 'analyzer',
    type: 'default',
    data: { label: 'Content Analyzer' },
    position: { x: 400, y: 0 },
    className: 'bg-zinc-800 text-white rounded-lg border border-zinc-700 p-4'
  }
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: 'trigger', target: 'scraper', animated: true },
  { id: 'e2-3', source: 'scraper', target: 'analyzer', animated: true }
];

const WorkflowVisualView: React.FC<WorkflowVisualViewProps> = ({
  workflow,
  onNodeClick,
  onEdgeClick
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params: Connection) => {
    setEdges((eds) => addEdge(params, eds));
  }, [setEdges]);

  return (
    <div className="h-[600px] bg-zinc-900 rounded-lg border border-zinc-800">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={(_, node) => onNodeClick?.(node.id)}
        onEdgeClick={(_, edge) => onEdgeClick?.(edge.id)}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

export default WorkflowVisualView;