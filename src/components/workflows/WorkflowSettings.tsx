import React from 'react';
import { motion } from 'framer-motion';
import * as Slider from '@radix-ui/react-slider';
import * as Switch from '@radix-ui/react-switch';
import { Settings, Zap, Clock, MessageSquare } from 'lucide-react';
import Button from '../Button';

interface WorkflowSettingsProps {
  onClose: () => void;
}

const WorkflowSettings: React.FC<WorkflowSettingsProps> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className="fixed inset-y-0 right-0 w-80 bg-zinc-900 border-l border-zinc-800 shadow-xl"
    >
      <div className="p-4 border-b border-zinc-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-zinc-400" />
            <h3 className="font-medium text-white">Workflow Settings</h3>
          </div>
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        <div>
          <h4 className="text-sm font-medium text-white mb-4">AI Behavior</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-2">
                Creativity Level
              </label>
              <Slider.Root
                className="relative flex items-center select-none touch-none w-full h-5"
                defaultValue={[5]}
                max={10}
                step={1}
              >
                <Slider.Track className="bg-zinc-700 relative grow rounded-full h-1">
                  <Slider.Range className="absolute bg-teal-500 rounded-full h-full" />
                </Slider.Track>
                <Slider.Thumb
                  className="block w-5 h-5 bg-white rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  aria-label="Creativity"
                />
              </Slider.Root>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm text-zinc-400">
                Require Approval
              </label>
              <Switch.Root
                className="w-11 h-6 bg-zinc-700 rounded-full relative data-[state=checked]:bg-teal-500 outline-none cursor-pointer"
                defaultChecked
              >
                <Switch.Thumb
                  className="block w-5 h-5 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]"
                />
              </Switch.Root>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-white mb-4">Schedule</h4>
          <div className="space-y-3">
            <label className="block">
              <input
                type="radio"
                name="schedule"
                className="sr-only peer"
                defaultChecked
              />
              <div className="flex items-center p-3 rounded-lg border border-zinc-700 peer-checked:border-teal-500 peer-checked:bg-teal-500/10">
                <Clock className="w-5 h-5 text-zinc-400 mr-3" />
                <div>
                  <div className="text-sm font-medium text-white">Daily</div>
                  <div className="text-xs text-zinc-400">Run once per day</div>
                </div>
              </div>
            </label>

            <label className="block">
              <input
                type="radio"
                name="schedule"
                className="sr-only peer"
              />
              <div className="flex items-center p-3 rounded-lg border border-zinc-700 peer-checked:border-teal-500 peer-checked:bg-teal-500/10">
                <Zap className="w-5 h-5 text-zinc-400 mr-3" />
                <div>
                  <div className="text-sm font-medium text-white">On Trigger</div>
                  <div className="text-xs text-zinc-400">Run when triggered</div>
                </div>
              </div>
            </label>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-white mb-4">Notifications</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4 text-zinc-400" />
                <span className="text-sm text-zinc-400">Slack Updates</span>
              </div>
              <Switch.Root
                className="w-11 h-6 bg-zinc-700 rounded-full relative data-[state=checked]:bg-teal-500 outline-none cursor-pointer"
                defaultChecked
              >
                <Switch.Thumb
                  className="block w-5 h-5 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]"
                />
              </Switch.Root>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-zinc-800">
        <Button variant="primary" fullWidth>
          Save Changes
        </Button>
      </div>
    </motion.div>
  );
};

export default WorkflowSettings;