'use client';

import React from 'react';
import styles from '../app/about-site/about-site.module.css';
import AboutSiteContentRenderer from './AboutSiteContentRenderer';
import AccordionTitle from './AccordionTitle';
import type { AboutSiteStructure } from '../utils/aboutSiteReader';

interface AboutSiteContentProps {
  structure: AboutSiteStructure;
}

/**
 * Composant client pour afficher le contenu "À propos du site"
 * avec accordion pour h1 et h2
 */
export default function AboutSiteContent({ structure }: AboutSiteContentProps) {
  const { chapitres } = structure;

  // Fonction pour vérifier si une sous-partie est un "Prompt"
  const isPrompt = (titre: string): boolean => {
    return titre.toLowerCase().includes('prompt');
  };

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        {chapitres.map((chapitre) => (
          <AccordionTitle 
            key={chapitre.nom} 
            title={chapitre.nom} 
            level={1}
            defaultOpen={false}
          >
            {chapitre.sections.map((section) => (
              <AccordionTitle 
                key={section.nom} 
                title={section.nom} 
                level={2}
                defaultOpen={false}
              >
                {section.parties.map((partie, partieIndex) => (
                  <div key={`${section.nom}-${partieIndex}-${partie.titre}`} className={styles.partie}>
                    <h3 className={styles.partieTitle}>{partie.titre}</h3>
                    {/* Contenu de la partie */}
                    {partie.contenuParse && partie.contenuParse.length > 0 && (
                      <AboutSiteContentRenderer elements={partie.contenuParse} />
                    )}
                    {partie.sousParties.map((sousPartie, sousPartieIndex) => {
                      // Vérifier si c'est une sous-partie spéciale (Prompt ou Résultat technique) - pour masquer le titre
                      const isSpecial = sousPartie.estSpecial || isPrompt(sousPartie.titre);
                      
                      // Vérifier si c'est un "Prompt" - pour appliquer le fond bleu clair
                      const isPromptSection = isPrompt(sousPartie.titre);
                      
                      // Clé unique : combiner le nom de la section, l'index de la partie, l'index de la sous-partie et le titre
                      const uniqueKey = `${section.nom}-${partieIndex}-${sousPartieIndex}-${sousPartie.titre}`;
                      
                      return (
                        <div key={uniqueKey} className={styles.sousPartie}>
                          {/* Masquer le titre pour les sous-parties spéciales (mais présent dans le JSON pour SEO) */}
                          {!isSpecial && (
                            <h4 className={styles.sousPartieTitle}>{sousPartie.titre}</h4>
                          )}
                          {/* Contenu avec fond bleu clair uniquement pour Prompt */}
                          {sousPartie.contenuParse && sousPartie.contenuParse.length > 0 && (
                            <AboutSiteContentRenderer 
                              elements={sousPartie.contenuParse} 
                              isPrompt={isPromptSection}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </AccordionTitle>
            ))}
          </AccordionTitle>
        ))}
      </div>
    </main>
  );
}
