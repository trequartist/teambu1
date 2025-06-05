import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { date: 'Mon', engagement: 2.1 },
  { date: 'Tue', engagement: 2.8 },
  { date: 'Wed', engagement: 2.3 },
  { date: 'Thu', engagement: 3.2 },
  { date: 'Fri', engagement: 2.9 },
  { date: 'Sat', engagement: 1.8 },
  { date: 'Sun', engagement: 1.5 }
];

const EngagementChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.1}/>
            <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} tickLine={false} />
        <YAxis 
          stroke="#9ca3af"
          fontSize={12}
          tickLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '0.375rem',
            padding: '0.5rem'
          }}
          formatter={(value: number) => [`${value}%`, 'Engagement']}
        />
        <Area
          type="monotone"
          dataKey="engagement"
          stroke="#14b8a6"
          fillOpacity={1}
          fill="url(#colorEngagement)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default EngagementChart;