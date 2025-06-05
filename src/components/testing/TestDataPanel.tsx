import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Plus, Trash2 } from 'lucide-react';
import Button from '../Button';
import JsonView from '../translation/JsonView';

interface TestDataPanelProps {
  testData: any;
  onUpdate: (data: any) => void;
}

const TestDataPanel: React.FC<TestDataPanelProps> = ({
  testData,
  onUpdate
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(testData);

  const handleSave = () => {
    onUpdate(editedData);
    setIsEditing(false);
  };

  return (
    <div className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-teal-400" />
          <h3 className="font-medium text-white">Test Data</h3>
        </div>
        
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSave}
              >
                Save
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {isEditing ? (
          <textarea
            value={JSON.stringify(editedData, null, 2)}
            onChange={(e) => {
              try {
                setEditedData(JSON.parse(e.target.value));
              } catch (error) {
                // Handle invalid JSON
              }
            }}
            className="w-full h-64 bg-zinc-800 border border-zinc-700 rounded-lg p-4 font-mono text-sm text-white"
          />
        ) : (
          <JsonView data={testData} expanded={true} />
        )}
      </div>
    </div>
  );
};

export default TestDataPanel;