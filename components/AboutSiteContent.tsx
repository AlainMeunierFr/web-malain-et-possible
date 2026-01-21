'use client';

import React from 'react';
import styles from '../app/a-propos-du-site/about.module.css';
import AboutSiteContentRenderer from './AboutSiteContentRenderer';
import AccordionTitle from './AccordionTitle';
import type { AboutSiteStructure } from '../utils/aboutSiteReader';

interface AboutSiteContentProps {
  structure: AboutSiteStructure;
}

/**
 * Composant client pour afficher le contenu "À propos du site"
 * Reçoit les données via props (générées par le Server Component)
 * Gère les interactions (accordéon H1/H2)
 */
export default function AboutSiteContent({ structure }: AboutSiteContentProps) {
  const { chapitres } = structure;


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
                      // Clé unique : combiner le nom de la section, l'index de la partie, l'index de la sous-partie et le titre
                      const uniqueKey = `${section.nom}-${partieIndex}-${sousPartieIndex}-${sousPartie.titre}`;
                      
                      // Masquer le titre si typeDeContenu est "Prompt" ou "Résultat technique"
                      const doitMasquerTitre = sousPartie.typeDeContenu === 'Prompt' || sousPartie.typeDeContenu === 'Résultat technique';
                      
                      return (
                        <div key={uniqueKey} className={styles.sousPartie}>
                          {/* Masquer le titre pour les sous-parties avec typeDeContenu (mais présent dans le JSON pour SEO) */}
                          {!doitMasquerTitre && (
                            <h4 className={styles.sousPartieTitle}>{sousPartie.titre}</h4>
                          )}
                          {/* Contenu de la sous-partie si pas de blocs */}
                          {sousPartie.contenuParse && sousPartie.contenuParse.length > 0 && (
                            <AboutSiteContentRenderer 
                              elements={sousPartie.contenuParse}
                            />
                          )}
                          {/* Afficher les blocs (h5) */}
                          {sousPartie.blocs && sousPartie.blocs.map((bloc, blocIndex) => {
                            const blocKey = `${uniqueKey}-bloc-${blocIndex}`;
                            const estPrompt = bloc.typeDeContenu === 'Prompt';
                            
                            return (
                              <div key={blocKey} className={styles.bloc}>
                                {/* Masquer le titre si typeDeContenu est "Prompt" ou "Résultat technique" */}
                                {bloc.typeDeContenu !== 'Prompt' && bloc.typeDeContenu !== 'Résultat technique' && (
                                  <h5 className={styles.blocTitle}>{bloc.titre}</h5>
                                )}
                                {/* Contenu du bloc avec fond bleu clair si typeDeContenu est "Prompt" */}
                                {bloc.contenuParse && bloc.contenuParse.length > 0 && (
                                  <AboutSiteContentRenderer 
                                    elements={bloc.contenuParse}
                                    typeDeContenu={bloc.typeDeContenu}
                                  />
                                )}
                              </div>
                            );
                          })}
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
