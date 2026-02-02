import React from 'react';
import SimpleMarkdownRenderer from './SimpleMarkdownRenderer';

export interface TechnicalResultProps {
  content: string;
}

const TechnicalResult: React.FC<TechnicalResultProps> = ({ content }) => {
  return (
    <div className="technicalResult">
      <SimpleMarkdownRenderer content={content} />
    </div>
  );
};

export default TechnicalResult;
