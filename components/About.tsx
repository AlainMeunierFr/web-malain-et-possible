import React from 'react';
import styles from './About.module.css';
import texts from '../data/texts.json';

const About: React.FC = () => {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <h2 className={styles.title}>{texts.about.title}</h2>
        <p className={styles.description}>{texts.about.description}</p>
      </div>
    </section>
  );
};

export default About;
