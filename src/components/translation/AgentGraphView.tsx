import React from 'react';
import { motion } from 'framer-motion';
import { Settings, ArrowRight } from 'lucide-react';
import { AgentGraphV2, NodeType } from '../../types/workflows';
import JsonView from './JsonView';

interface AgentGraphViewProps {
  graph: AgentGraphV2;
  className?: string;
}

const NodeTypeIcons: Record<NodeType, string> = {
  'input': '📥',
  'linkedin_scraper': '🔍',
  'llm_processor': '🧠',
  'human_review': '👤',
  'content_analyzer': '📊',
  'engagement_monitor': '📈',
  'scheduler': '⏰'
};

const AgentGraphView: React.FC<AgentGraphViewProps> = ({ graph, className = '' }) => {
  return (
    <div className={`bg-zinc-900/50 rounded-lg border border-zinc-800 ${className}`}>
      {/* Graph Metadata */}
      <div className="p-4 border-b border-zinc-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-white">{graph.metadata.name}</h3>
            <p className="text-sm text-zinc-400">{graph.metadata.description}</p>
          </div>
          <div className="text-sm text-zinc-500">
            v{graph.version} • Created {new Date(graph.metadata.created_at).toLocaleDateString()}
          </div>
        </div>
        {graph.metadata.tags.length > 0 && (
          <div className="flex gap-2 mt-2">
            {graph.metadata.tags.map(tag => (
              <span key={tag} className="px-2 py-0.5 text-xs bg-zinc-800 text-zinc-400 rounded">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Graph Structure */}
      <div className="p-4 space-y-6">
        {/* Nodes */}
        <div>
          <h4 className="text-sm font-medium text-zinc-400 mb-3">Nodes</h4>
          <div className="space-y-2">
            {Object.entries(graph.nodes).map(([nodeId, node]) => (
              <motion.div
                key={nodeId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-zinc-800/50 rounded-lg p-3 border border-zinc-700"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{NodeTypeIcons[node.type]}</span>
                    <span className="font-medium text-white">{nodeId}</span>
                    <span className="text-xs text-zinc-500">{node.type}</span>
                  </div>
                  <Settings className="w-4 h-4 text-zinc-500" />
                </div>
                <div className="pl-8">
                  <JsonView data={node.config} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Edges */}
        <div>
          <h4 className="text-sm font-medium text-zinc-400 mb-3">Edges</h4>
          <div className="space-y-2">
            {graph.edges.map((edge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-3 text-sm"
              >
                <span className="text-zinc-300">{edge.source}</span>
                <ArrowRight className="w-4 h-4 text-zinc-600" />
                <span className="text-zinc-300">{edge.target}</span>
                {edge.condition && (
                  <span className="text-xs text-zinc-500">
                    when {edge.condition.field} {edge.condition.operator} {edge.condition.value}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Central State */}
        <div>
          <h4 className="text-sm font-medium text-zinc-400 mb-3">Central State</h4>
          <div className="bg-zinc-800/50 rounded-lg p-3 border border-zinc-700">
            <JsonView data={graph.central_state} />
          </div>
        </div>

        {/* Error Handling */}
        <div>
          <h4 className="text-sm font-medium text-zinc-400 mb-3">Error Handling</h4>
          <div className="bg-zinc-800/50 rounded-lg p-3 border border-zinc-700">
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-300">Strategy: {graph.error_handling.strategy}</span>
              {graph.error_handling.max_retries && (
                <span className="text-zinc-500">Max Retries: {graph.error_handling.max_retries}</span>
              )}
            </div>
            {graph.error_handling.fallback_workflow && (
              <div className="text-sm text-zinc-500 mt-1">
                Fallback: {graph.error_handling.fallback_workflow}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentGraphView;