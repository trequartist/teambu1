import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../Tabs';
import SlackPreview from './SlackPreview';
import NotionPreview from './NotionPreview';
import LinkedInPreview from './LinkedInPreview';
import CommandCenterPreview from './CommandCenterPreview';

const TeammatePreview: React.FC = () => {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">See Your Teammate in Action</h3>
      
      <Tabs defaultValue="command">
        <TabsList className="grid grid-cols-4 w-full mb-6">
          <TabsTrigger value="command">Command Center</TabsTrigger>
          <TabsTrigger value="slack">Slack</TabsTrigger>
          <TabsTrigger value="notion">Notion</TabsTrigger>
          <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
        </TabsList>
        
        <TabsContent value="command">
          <CommandCenterPreview />
        </TabsContent>
        
        <TabsContent value="slack">
          <SlackPreview />
        </TabsContent>
        
        <TabsContent value="notion">
          <NotionPreview />
        </TabsContent>
        
        <TabsContent value="linkedin">
          <LinkedInPreview />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeammatePreview;