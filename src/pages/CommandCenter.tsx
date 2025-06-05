import React from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import EngagementChart from '../components/analytics/EngagementChart';
import ContentTypeChart from '../components/analytics/ContentTypeChart';
import { Calendar, MessageSquare, BarChart3, Settings, ArrowUp, Clock, Users, Zap } from 'lucide-react';

const CommandCenter: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              LinkedIn Content Marketer - Command Center
            </h1>
            <p className="text-gray-500 mt-1">Last updated: Just now</p>
          </div>
          <Button variant="outline" size="sm" icon={<Settings className="h-4 w-4 mr-2" />}>
            Settings
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-500">Posts This Week</div>
              <Calendar className="h-5 w-5 text-teal-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">5</div>
            <div className="flex items-center mt-2 text-sm text-green-600">
              <ArrowUp className="h-4 w-4 mr-1" />
              <span>20% vs last week</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-500">Engagement Rate</div>
              <Users className="h-5 w-5 text-purple-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">2.8%</div>
            <div className="flex items-center mt-2 text-sm text-green-600">
              <ArrowUp className="h-4 w-4 mr-1" />
              <span>0.5% vs benchmark</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-500">Response Time</div>
              <Clock className="h-5 w-5 text-orange-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">14m</div>
            <div className="flex items-center mt-2 text-sm text-green-600">
              <ArrowUp className="h-4 w-4 mr-1" />
              <span>31% faster</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-500">Hours Saved</div>
              <Zap className="h-5 w-5 text-yellow-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">23</div>
            <div className="text-sm text-gray-500 mt-2">This month</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Engagement Trends</h2>
                <select className="text-sm border rounded-md px-2 py-1">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>
              <EngagementChart />
            </div>
            
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Upcoming Content</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-24 text-sm text-gray-500">Today 3pm</div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3 className="font-medium">Why B2B Buying Has Changed</h3>
                      <span className="ml-2 px-2 py-0.5 text-xs bg-purple-100 text-purple-800 rounded">Thought Leadership</span>
                    </div>
                    <p className="text-sm text-gray-500">Estimated engagement: 2.4-3.1%</p>
                  </div>
                  <Button variant="outline" size="sm">Preview</Button>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-24 text-sm text-gray-500">Tomorrow 10am</div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3 className="font-medium">Meet Our New Engineering Lead</h3>
                      <span className="ml-2 px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded">Team Spotlight</span>
                    </div>
                    <p className="text-sm text-gray-500">Estimated engagement: 1.8-2.2%</p>
                  </div>
                  <Button variant="outline" size="sm">Preview</Button>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-24 text-sm text-gray-500">Thu 2pm</div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3 className="font-medium">Product Update: New Analytics</h3>
                      <span className="ml-2 px-2 py-0.5 text-xs bg-teal-100 text-teal-800 rounded">Product News</span>
                    </div>
                    <p className="text-sm text-gray-500">Estimated engagement: 2.1-2.6%</p>
                  </div>
                  <Button variant="outline" size="sm">Preview</Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Content Distribution</h2>
              <ContentTypeChart />
            </div>
            
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Top Performing Post</h2>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">The hidden cost of feature creep</h3>
                  <span className="px-2 py-0.5 text-xs bg-purple-100 text-purple-800 rounded">Thought Leadership</span>
                </div>
                <p className="text-sm text-gray-500 mb-3">
                  Posted 2 weeks ago
                </p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-white p-2 rounded">
                    <div className="text-lg font-semibold text-teal-500">14.2%</div>
                    <div className="text-xs text-gray-500">Engagement</div>
                  </div>
                  <div className="bg-white p-2 rounded">
                    <div className="text-lg font-semibold">847</div>
                    <div className="text-xs text-gray-500">Reactions</div>
                  </div>
                  <div className="bg-white p-2 rounded">
                    <div className="text-lg font-semibold">132</div>
                    <div className="text-xs text-gray-500">Comments</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <Button variant="outline" fullWidth className="justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule New Post
                </Button>
                <Button variant="outline" fullWidth className="justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  View Pending Comments
                </Button>
                <Button variant="outline" fullWidth className="justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandCenter;