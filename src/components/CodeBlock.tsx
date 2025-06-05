import React, { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism-tomorrow.css';

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
  onLineHover?: (lineNumber: number) => void;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'python',
  showLineNumbers = true,
  className = '',
  onLineHover
}) => {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);

      // Add line numbers and hover handlers
      if (showLineNumbers && onLineHover) {
        const lines = codeRef.current.innerHTML.split('\n');
        const numberedLines = lines.map((line, index) => {
          const lineNumber = index + 1;
          return `<div class="line-wrapper" data-line="${lineNumber}" onmouseover="this.dispatchEvent(new CustomEvent('line-hover', { detail: ${lineNumber}, bubbles: true }))">${line}</div>`;
        });
        codeRef.current.innerHTML = numberedLines.join('\n');
      }
    }
  }, [code, showLineNumbers, onLineHover]);

  useEffect(() => {
    if (onLineHover) {
      const handleLineHover = (e: Event) => {
        const customEvent = e as CustomEvent;
        onLineHover(customEvent.detail);
      };

      codeRef.current?.addEventListener('line-hover', handleLineHover);
      return () => {
        codeRef.current?.removeEventListener('line-hover', handleLineHover);
      };
    }
  }, [onLineHover]);

  return (
    <div className={`relative group ${className}`}>
      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => navigator.clipboard.writeText(code)}
          className="px-2 py-1 text-xs bg-gray-700 text-gray-200 rounded hover:bg-gray-600 transition-colors"
        >
          Copy
        </button>
      </div>
      <pre className={`${showLineNumbers ? 'line-numbers' : ''} rounded-lg !bg-gray-900 !p-4`}>
        <code ref={codeRef} className={`language-${language}`}>
          {code.trim()}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;