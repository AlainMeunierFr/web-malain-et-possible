import React from 'react';
import SimpleMarkdownRenderer from './SimpleMarkdownRenderer';

export interface PromptProps {
  content: string;
}

const Prompt: React.FC<PromptProps> = ({ content }) => {
  return (
    <div className="prompt">
      <SimpleMarkdownRenderer content={content} />
    </div>
  );
};

export default Prompt;
