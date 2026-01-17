import React from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';
import texts from '../data/texts.json';

const Hero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.imageWrapper}>
            <Image
              src="/images/Photo.png"
              alt={texts.site.author}
              width={400}
              height={400}
              priority
              className={styles.image}
            />
          </div>
          <div className={styles.text}>
            <h2 className={styles.title}>{texts.hero.title}</h2>
            <p className={styles.subtitle}>{texts.hero.subtitle}</p>
            <p className={styles.description}>{texts.hero.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
