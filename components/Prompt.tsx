import React from 'react';
import SimpleMarkdownRenderer from './SimpleMarkdownRenderer';
import styles from './Prompt.module.css';

export interface PromptProps {
  content: string;
}

const Prompt: React.FC<PromptProps> = ({ content }) => {
  return (
    <div className={styles.prompt}>
      <SimpleMarkdownRenderer content={content} />
    </div>
  );
};

export default Prompt;
