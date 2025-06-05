import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

interface JsonViewProps {
  data: any;
  level?: number;
  expanded?: boolean;
}

const JsonView: React.FC<JsonViewProps> = ({ 
  data, 
  level = 0, 
  expanded = false 
}) => {
  const [isExpanded, setIsExpanded] = useState(expanded);
  
  const indent = level * 20;
  
  if (data === null) {
    return <span className="text-zinc-500">null</span>;
  }
  
  if (typeof data === 'boolean') {
    return <span className="text-purple-400">{data.toString()}</span>;
  }
  
  if (typeof data === 'number') {
    return <span className="text-yellow-400">{data}</span>;
  }
  
  if (typeof data === 'string') {
    return <span className="text-teal-400">"{data}"</span>;
  }
  
  if (Array.isArray(data)) {
    if (data.length === 0) {
      return <span className="text-zinc-500">[]</span>;
    }
    
    return (
      <div>
        <div 
          className="flex items-center space-x-1 cursor-pointer select-none"
          onClick={() => setIsExpanded(!isExpanded)}
          style={{ paddingLeft: indent }}
        >
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-zinc-400" />
          ) : (
            <ChevronRight className="w-4 h-4 text-zinc-400" />
          )}
          <span className="text-zinc-400">[</span>
        </div>
        
        {isExpanded && (
          <div className="ml-4">
            {data.map((item, index) => (
              <div key={index} style={{ paddingLeft: indent }}>
                <JsonView data={item} level={level + 1} />
                {index < data.length - 1 && <span className="text-zinc-400">,</span>}
              </div>
            ))}
          </div>
        )}
        
        <div style={{ paddingLeft: indent }}>
          <span className="text-zinc-400">]</span>
        </div>
      </div>
    );
  }
  
  if (typeof data === 'object') {
    const entries = Object.entries(data);
    if (entries.length === 0) {
      return <span className="text-zinc-500">{}</span>;
    }
    
    return (
      <div>
        <div 
          className="flex items-center space-x-1 cursor-pointer select-none"
          onClick={() => setIsExpanded(!isExpanded)}
          style={{ paddingLeft: indent }}
        >
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-zinc-400" />
          ) : (
            <ChevronRight className="w-4 h-4 text-zinc-400" />
          )}
          <span className="text-zinc-400">{'{'}</span>
        </div>
        
        {isExpanded && (
          <div className="ml-4">
            {entries.map(([key, value], index) => (
              <div key={key} style={{ paddingLeft: indent }}>
                <span className="text-indigo-400">"{key}"</span>
                <span className="text-zinc-400">: </span>
                <JsonView data={value} level={level + 1} />
                {index < entries.length - 1 && <span className="text-zinc-400">,</span>}
              </div>
            ))}
          </div>
        )}
        
        <div style={{ paddingLeft: indent }}>
          <span className="text-zinc-400">{'}'}</span>
        </div>
      </div>
    );
  }
  
  return null;
};

export default JsonView;