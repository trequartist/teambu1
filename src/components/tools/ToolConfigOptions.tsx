import React from 'react';
import { Tool, ToolConfig } from '../../types/tools';

export const renderConfigOptions = (
  tool: Tool,
  config: Partial<ToolConfig>,
  setConfig: (config: Partial<ToolConfig>) => void
) => {
  switch (tool.id) {
    case 'linkedin':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">
              Company Page
            </label>
            <select 
              className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={config.linkedin?.companyPage}
              onChange={(e) => setConfig({
                ...config,
                linkedin: {
                  ...config.linkedin,
                  companyPage: e.target.value
                }
              })}
            >
              <option value="techflow">TechFlow Company Page (2,847 followers)</option>
              <option value="personal">Personal Profile (1,234 connections)</option>
            </select>
          </div>
          
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={config.linkedin?.includeAdvocacy}
                onChange={(e) => setConfig({
                  ...config,
                  linkedin: {
                    ...config.linkedin,
                    includeAdvocacy: e.target.checked
                  }
                })}
                className="rounded border-zinc-600 bg-zinc-800 text-teal-500 focus:ring-teal-500 focus:ring-offset-zinc-900"
              />
              <span className="text-sm text-zinc-300">Include employee advocacy posts</span>
            </label>
          </div>
        </div>
      );
      
    case 'notion':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">
              Workspace
            </label>
            <select 
              className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={config.notion?.workspace}
              onChange={(e) => setConfig({
                ...config,
                notion: {
                  ...config.notion,
                  workspace: e.target.value
                }
              })}
            >
              <option value="marketing">Marketing Workspace</option>
              <option value="product">Product Team Workspace</option>
            </select>
          </div>
          
          <div className="bg-zinc-800/50 p-3 rounded-md border border-zinc-700">
            <div className="text-sm text-zinc-300 space-y-1">
              <div className="flex items-center">
                <span className="text-teal-400 mr-1">✓</span>
                Content Calendar database detected
              </div>
              <div className="flex items-center">
                <span className="text-teal-400 mr-1">✓</span>
                Blog Ideas database detected
              </div>
              <div className="flex items-center">
                <span className="text-teal-400 mr-1">✓</span>
                Product Roadmap detected
              </div>
            </div>
          </div>
        </div>
      );
      
    case 'buffer':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Scheduling preference
            </label>
            <div className="flex space-x-2">
              {['optimal', 'fixed', 'manual'].map((pref) => (
                <button
                  key={pref}
                  onClick={() => setConfig({
                    ...config,
                    buffer: {
                      ...config.buffer,
                      schedulePreference: pref as ToolConfig['buffer']['schedulePreference']
                    }
                  })}
                  className={`px-3 py-1 rounded text-sm ${
                    config.buffer?.schedulePreference === pref
                      ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30'
                      : 'border border-zinc-700 text-zinc-300 hover:bg-zinc-800'
                  }`}
                >
                  {pref.charAt(0).toUpperCase() + pref.slice(1)} times
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">
              Timezone
            </label>
            <select 
              className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={config.buffer?.timezone}
              onChange={(e) => setConfig({
                ...config,
                buffer: {
                  ...config.buffer,
                  timezone: e.target.value
                }
              })}
            >
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
              <option value="UTC">UTC</option>
            </select>
          </div>
        </div>
      );
      
    default:
      return null;
  }
};