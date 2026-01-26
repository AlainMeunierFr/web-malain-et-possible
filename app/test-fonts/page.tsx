'use client';

import React, { useState, useEffect } from 'react';
import DomaineDeCompetences from '../../components/DomaineDeCompetences';
import type { DomaineDeCompetences as DomaineDeCompetencesType } from '../../utils/indexReader';
import styles from './test-fonts.module.css';

// Données de test : un domaine de compétences
const testDomaine: DomaineDeCompetencesType = {
  titre: 'Développement informatique',
  contenu: 'Exemple de contenu pour tester les différentes polices. Ce texte permet d\'évaluer la lisibilité et l\'élégance de chaque option.',
  items: [
    {
      titre: 'Management de produit logiciel',
      image: {
        src: '1.2 product Management.png',
        alt: 'Management de produit logiciel'
      },
      description: 'Après 20 ans de pratique pour ma propre entreprise je suis devenu un **expert dans l\'édition de logiciels**, au niveau stratégie, marketing, programmation, SaaS, pilotage de projet et service client.',
      bouton: {
        texte: 'En savoir plus...',
        action: '/management-de-produit-logiciel'
      }
    },
    {
      titre: 'Ingénierie logicielle',
      image: {
        src: 'Excellence.png',
        alt: 'Ingénierie logicielle'
      },
      description: '**Ancien développeur** j\'ai suivi l\'évolution de **l\'état de l\'art** de l\'industrie informatique. Collaborant systématiquement avec des artisans logiciel de haut niveau j\'ai l\'habitude d\'interagir avec eux pendant qu\'ils pratiquent BDD, TDD, DDD, CQRS, EventSourcing, CI/CD...',
      bouton: {
        texte: 'En savoir plus...',
        action: '/ingenierie-logiciel'
      }
    }
  ]
};

type FontTheme = 'inter' | 'poppins' | 'montserrat' | 'system' | 'worksans' | 'spacegrotesk' | 'nunito' | 'outfit' | 'manrope' | 'plusjakarta' | 'dm sans' | 'rubik';

export default function TestFontsPage() {
  const [theme, setTheme] = useState<FontTheme>('inter');

  // Charger les polices Google Fonts pour le test
  useEffect(() => {
    // Inter
    const linkInter = document.createElement('link');
    linkInter.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap';
    linkInter.rel = 'stylesheet';
    document.head.appendChild(linkInter);

    // Poppins
    const linkPoppins = document.createElement('link');
    linkPoppins.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap';
    linkPoppins.rel = 'stylesheet';
    document.head.appendChild(linkPoppins);

    // Source Sans Pro
    const linkSourceSans = document.createElement('link');
    linkSourceSans.href = 'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400&display=swap';
    linkSourceSans.rel = 'stylesheet';
    document.head.appendChild(linkSourceSans);

    // Montserrat
    const linkMontserrat = document.createElement('link');
    linkMontserrat.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap';
    linkMontserrat.rel = 'stylesheet';
    document.head.appendChild(linkMontserrat);

    // Open Sans
    const linkOpenSans = document.createElement('link');
    linkOpenSans.href = 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400&display=swap';
    linkOpenSans.rel = 'stylesheet';
    document.head.appendChild(linkOpenSans);

    // Work Sans
    const linkWorkSans = document.createElement('link');
    linkWorkSans.href = 'https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;600;700&display=swap';
    linkWorkSans.rel = 'stylesheet';
    document.head.appendChild(linkWorkSans);

    // Space Grotesk
    const linkSpaceGrotesk = document.createElement('link');
    linkSpaceGrotesk.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&display=swap';
    linkSpaceGrotesk.rel = 'stylesheet';
    document.head.appendChild(linkSpaceGrotesk);

    // Nunito
    const linkNunito = document.createElement('link');
    linkNunito.href = 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap';
    linkNunito.rel = 'stylesheet';
    document.head.appendChild(linkNunito);

    // Outfit
    const linkOutfit = document.createElement('link');
    linkOutfit.href = 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap';
    linkOutfit.rel = 'stylesheet';
    document.head.appendChild(linkOutfit);

    // Manrope - Chaleureuse, arrondie, moderne
    const linkManrope = document.createElement('link');
    linkManrope.href = 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700&display=swap';
    linkManrope.rel = 'stylesheet';
    document.head.appendChild(linkManrope);

    // Plus Jakarta Sans - Moderne, spacieuse, très lisible
    const linkPlusJakarta = document.createElement('link');
    linkPlusJakarta.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap';
    linkPlusJakarta.rel = 'stylesheet';
    document.head.appendChild(linkPlusJakarta);

    // DM Sans - Élégante, moderne, caractère doux
    const linkDMSans = document.createElement('link');
    linkDMSans.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700&display=swap';
    linkDMSans.rel = 'stylesheet';
    document.head.appendChild(linkDMSans);

    // Rubik - Géométrique mais douce, caractère unique
    const linkRubik = document.createElement('link');
    linkRubik.href = 'https://fonts.googleapis.com/css2?family=Rubik:wght@400;600;700&display=swap';
    linkRubik.rel = 'stylesheet';
    document.head.appendChild(linkRubik);

    return () => {
      // Nettoyage optionnel (les liens restent dans le DOM mais c'est OK pour une page de test)
    };
  }, []);

  return (
    <div className={`${styles.container} ${styles[`theme-${theme}`]}`}>
      <div className={styles.controls}>
        <h2 className={styles.controlsTitle}>Choisissez un thème de polices :</h2>
        <div className={styles.buttons}>
          <button
            className={`${styles.themeButton} ${theme === 'inter' ? styles.active : ''}`}
            onClick={() => setTheme('inter')}
          >
            Option 1 : Inter
          </button>
          <button
            className={`${styles.themeButton} ${theme === 'poppins' ? styles.active : ''}`}
            onClick={() => setTheme('poppins')}
          >
            Option 2 : Poppins
          </button>
          <button
            className={`${styles.themeButton} ${theme === 'montserrat' ? styles.active : ''}`}
            onClick={() => setTheme('montserrat')}
          >
            Option 3 : Montserrat
          </button>
          <button
            className={`${styles.themeButton} ${theme === 'system' ? styles.active : ''}`}
            onClick={() => setTheme('system')}
          >
            Option 4 : System Fonts
          </button>
          <button
            className={`${styles.themeButton} ${theme === 'worksans' ? styles.active : ''}`}
            onClick={() => setTheme('worksans')}
          >
            Option 5 : Work Sans
          </button>
          <button
            className={`${styles.themeButton} ${theme === 'spacegrotesk' ? styles.active : ''}`}
            onClick={() => setTheme('spacegrotesk')}
          >
            Option 6 : Space Grotesk
          </button>
          <button
            className={`${styles.themeButton} ${theme === 'nunito' ? styles.active : ''}`}
            onClick={() => setTheme('nunito')}
          >
            Option 7 : Nunito
          </button>
          <button
            className={`${styles.themeButton} ${theme === 'outfit' ? styles.active : ''}`}
            onClick={() => setTheme('outfit')}
          >
            Option 8 : Outfit
          </button>
          <button
            className={`${styles.themeButton} ${theme === 'manrope' ? styles.active : ''}`}
            onClick={() => setTheme('manrope')}
          >
            Option 9 : Manrope
          </button>
          <button
            className={`${styles.themeButton} ${theme === 'plusjakarta' ? styles.active : ''}`}
            onClick={() => setTheme('plusjakarta')}
          >
            Option 10 : Plus Jakarta Sans
          </button>
          <button
            className={`${styles.themeButton} ${theme === 'dm sans' ? styles.active : ''}`}
            onClick={() => setTheme('dm sans')}
          >
            Option 11 : DM Sans
          </button>
          <button
            className={`${styles.themeButton} ${theme === 'rubik' ? styles.active : ''}`}
            onClick={() => setTheme('rubik')}
          >
            Option 12 : Rubik
          </button>
        </div>
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>Titre de niveau 1</h1>
        <DomaineDeCompetences domaine={testDomaine} />
      </div>
    </div>
  );
}
