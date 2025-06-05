import React from 'react';
import { motion } from 'framer-motion';
import { Play, Check, AlertCircle, Clock } from 'lucide-react';
import { ExecutionTrace, LogEntry } from '../../types/workflows';

interface ExecutionPanelProps {
  trace: ExecutionTrace;
  logs: LogEntry[];
  duration: number;
  status: 'running' | 'complete' | 'error';
}

const ExecutionPanel: React.FC<ExecutionPanelProps> = ({
  trace,
  logs,
  duration,
  status
}) => {
  return (
    <div className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          {status === 'running' && <Clock className="w-5 h-5 text-indigo-400 animate-spin" />}
          {status === 'complete' && <Check className="w-5 h-5 text-teal-400" />}
          {status === 'error' && <AlertCircle className="w-5 h-5 text-red-400" />}
          <h3 className="font-medium text-white">Execution Trace</h3>
        </div>
        
        <span className="text-sm text-zinc-400">
          Duration: {duration}ms
        </span>
      </div>

      <div className="space-y-4">
        {/* Execution Steps */}
        <div className="space-y-2">
          {trace.steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-3 p-2 rounded-lg bg-zinc-800/50"
            >
              <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-xs text-zinc-400">
                {index + 1}
              </div>
              <div>
                <div className="text-sm text-white">{step.node}</div>
                <div className="text-xs text-zinc-500">{step.action}</div>
              </div>
              <div className="ml-auto text-xs text-zinc-500">
                {new Date(step.timestamp).toLocaleTimeString()}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Logs */}
        <div className="mt-4">
          <h4 className="text-sm font-medium text-zinc-400 mb-2">Logs</h4>
          <div className="bg-zinc-800 rounded-lg p-2 max-h-48 overflow-y-auto">
            {logs.map((log, index) => (
              <div
                key={index}
                className={`text-xs py-1 ${
                  log.level === 'error' ? 'text-red-400' :
                  log.level === 'warn' ? 'text-yellow-400' :
                  'text-zinc-400'
                }`}
              >
                [{new Date(log.timestamp).toLocaleTimeString()}] {log.message}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutionPanel;