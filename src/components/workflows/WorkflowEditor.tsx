import React from 'react';
import { motion } from 'framer-motion';
import RichTextEditor from '../RichTextEditor';
import Button from '../Button';
import { Save, Undo } from 'lucide-react';

interface WorkflowEditorProps {
  workflow: {
    id: string;
    title: string;
    description: string;
    naturalLanguage: string;
  };
  onSave: (workflow: any) => void;
}

const WorkflowEditor: React.FC<WorkflowEditorProps> = ({
  workflow,
  onSave
}) => {
  const [description, setDescription] = React.useState(workflow.description);
  const [naturalLanguage, setNaturalLanguage] = React.useState(workflow.naturalLanguage);
  const [isDirty, setIsDirty] = React.useState(false);

  const handleSave = () => {
    onSave({
      ...workflow,
      description,
      naturalLanguage
    });
    setIsDirty(false);
  };

  const handleReset = () => {
    setDescription(workflow.description);
    setNaturalLanguage(workflow.naturalLanguage);
    setIsDirty(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Edit Workflow</h3>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            disabled={!isDirty}
            icon={<Undo className="h-4 w-4" />}
          >
            Reset
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleSave}
            disabled={!isDirty}
            icon={<Save className="h-4 w-4" />}
          >
            Save Changes
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Description
          </label>
          <RichTextEditor
            value={description}
            onChange={(value) => {
              setDescription(value);
              setIsDirty(true);
            }}
            placeholder="Enter a detailed description of your workflow..."
            className="mb-4"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">
            Natural Language Definition
          </label>
          <RichTextEditor
            value={naturalLanguage}
            onChange={(value) => {
              setNaturalLanguage(value);
              setIsDirty(true);
            }}
            placeholder="Define your workflow using natural language..."
          />
        </div>
      </div>

      {isDirty && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-indigo-900/20 rounded-lg p-4 border border-indigo-500/20"
        >
          <p className="text-sm text-indigo-300">
            You have unsaved changes. Click 'Save Changes' to update the workflow.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default WorkflowEditor;