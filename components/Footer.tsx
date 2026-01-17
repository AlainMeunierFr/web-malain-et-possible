import React from 'react';
import styles from './Footer.module.css';
import texts from '../data/texts.json';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.text}>{texts.footer.text}</p>
      </div>
    </footer>
  );
};

export default Footer;
