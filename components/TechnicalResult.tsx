import React from 'react';
import SimpleMarkdownRenderer from './SimpleMarkdownRenderer';
import styles from './TechnicalResult.module.css';

export interface TechnicalResultProps {
  content: string;
}

const TechnicalResult: React.FC<TechnicalResultProps> = ({ content }) => {
  return (
    <div className={styles.technicalResult}>
      <SimpleMarkdownRenderer content={content} />
    </div>
  );
};

export default TechnicalResult;
