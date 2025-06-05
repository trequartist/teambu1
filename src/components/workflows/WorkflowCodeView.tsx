import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Info } from 'lucide-react';
import { Workflow } from '../../types/workflows';
import { generatePythonCode, codeExplanations } from '../../lib/pythonCode';

interface WorkflowCodeViewProps {
  workflow: Workflow;
}

const WorkflowCodeView: React.FC<WorkflowCodeViewProps> = ({ workflow }) => {
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const code = generatePythonCode(workflow);

  const handleLineHover = (lineNumber: number) => {
    setSelectedLine(lineNumber);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        {/* Code Panel */}
        <div className="col-span-2 bg-zinc-900/50 rounded-lg border border-zinc-800">
          <div className="border-b border-zinc-800 p-4">
            <div className="flex items-center space-x-2">
              <Code2 className="w-5 h-5 text-zinc-400" />
              <h3 className="font-medium text-white">Python Implementation</h3>
            </div>
          </div>
          <div className="p-4 overflow-x-auto">
            <pre className="text-sm">
              <code className="language-python">
                {code.split('\n').map((line, index) => (
                  <div
                    key={index}
                    className={`px-4 py-0.5 -mx-4 ${
                      selectedLine === index ? 'bg-zinc-800' : ''
                    }`}
                    onMouseEnter={() => handleLineHover(index)}
                  >
                    <span className="mr-4 text-zinc-600">{index + 1}</span>
                    <span className="text-zinc-300">{line}</span>
                  </div>
                ))}
              </code>
            </pre>
          </div>
        </div>

        {/* Documentation Panel */}
        <div className="bg-zinc-900/50 rounded-lg border border-zinc-800 p-4">
          <h3 className="font-medium text-white mb-4">Documentation</h3>
          <div className="space-y-4">
            {Object.entries(codeExplanations).map(([key, explanation]) => (
              <motion.div
                key={key}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-zinc-800/50 rounded-lg p-3 border border-zinc-700"
              >
                <h4 className="text-sm font-medium text-white mb-1">
                  {explanation.title}
                </h4>
                <p className="text-sm text-zinc-400">
                  {explanation.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-indigo-900/20 rounded-lg p-4 border border-indigo-500/20">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-indigo-400 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-indigo-300 mb-2">
              Understanding the Code
            </h4>
            <ul className="space-y-1 text-sm text-indigo-200/80">
              <li>• Each @workflow defines a reusable workflow</li>
              <li>• @trigger specifies when the workflow runs</li>
              <li>• @step functions execute in sequence</li>
              <li>• AI steps are handled automatically</li>
              <li>• Error handling and retries are built-in</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowCodeView;