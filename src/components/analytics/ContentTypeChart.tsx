import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Thought Leadership', value: 35 },
  { name: 'Product Updates', value: 25 },
  { name: 'Team Culture', value: 20 },
  { name: 'Industry News', value: 20 }
];

const COLORS = ['#14b8a6', '#6366f1', '#f59e0b', '#ec4899'];

const ContentTypeChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '0.375rem',
            padding: '0.5rem'
          }}
          formatter={(value: number) => [`${value}%`, 'Distribution']}
        />
        <Legend
          verticalAlign="bottom"
          height={36}
          formatter={(value) => <span className="text-sm text-gray-600">{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ContentTypeChart;