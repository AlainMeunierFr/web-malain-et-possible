'use client';

import React from 'react';
import styles from '../app/a-propos-du-site/about.module.css';
import AboutSiteContentRenderer from './AboutSiteContentRenderer';
import AccordionTitle from './AccordionTitle';
import AccordionDossier from './AccordionDossier';
import type { AboutSiteStructure, PathContentAtRoot, Section } from '../utils/aboutSiteReader';

interface AboutSiteContentProps {
  structure?: AboutSiteStructure;
  /** US-11.4 : contenu à la racine du Path (fichiers MD + dossiers accordéon) */
  pathContent?: PathContentAtRoot;
  /** En vue dossier (page /a-propos-du-site/[dossier]) : affichage commence à H2 = liste des fichiers, sans H1/accordéon du nom du dossier */
  startAtSections?: boolean;
  /** Utilisé dans une page qui fournit déjà main : ne pas rendre le wrapper main/div (évite double main) */
  embedded?: boolean;
}

/** Rendu du contenu d'une section (parties H3, sous-parties H4, blocs H5) */
function renderSectionContent(section: Section) {
  return section.parties.map((partie, partieIndex) => (
    <div key={`${section.nom}-${partieIndex}-${partie.titre}`} className={styles.partie}>
      <h3 className={styles.partieTitle}>{partie.titre}</h3>
      {partie.contenuParse && partie.contenuParse.length > 0 && (
        <AboutSiteContentRenderer elements={partie.contenuParse} />
      )}
      {partie.sousParties.map((sousPartie, sousPartieIndex) => {
        const uniqueKey = `${section.nom}-${partieIndex}-${sousPartieIndex}-${sousPartie.titre}`;
        const doitMasquerTitre = sousPartie.typeDeContenu === 'Prompt' || sousPartie.typeDeContenu === 'Résultat technique';
        return (
          <div key={uniqueKey} className={styles.sousPartie}>
            {!doitMasquerTitre && (
              <h4 className={styles.sousPartieTitle}>{sousPartie.titre}</h4>
            )}
            {sousPartie.contenuParse && sousPartie.contenuParse.length > 0 && (
              <AboutSiteContentRenderer elements={sousPartie.contenuParse} />
            )}
            {sousPartie.blocs && sousPartie.blocs.map((bloc, blocIndex) => {
              const blocKey = `${uniqueKey}-bloc-${blocIndex}`;
              return (
                <div key={blocKey} className={styles.bloc}>
                  {bloc.typeDeContenu !== 'Prompt' && bloc.typeDeContenu !== 'Résultat technique' && (
                    <h5 className={styles.blocTitle}>{bloc.titre}</h5>
                  )}
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
  ));
}

/**
 * Composant client pour afficher le contenu "À propos du site"
 * Reçoit les données via props (générées par le Server Component)
 * Gère les interactions (accordéon H1/H2)
 * Si pathContent (US-11.4) : fichiers en H1 + dossiers en H1 accordéon (lazy).
 * Si startAtSections=true (vue dossier) : H2 = liste des fichiers, H3+ = contenu (pas d'accordéon dossier)
 */
export default function AboutSiteContent({ structure, pathContent, startAtSections = false, embedded = false }: AboutSiteContentProps) {
  if (pathContent) {
    const content = (
      <>
        {pathContent.fichiers.map((section) => (
          <AccordionTitle
            key={section.nom}
            title={section.nom}
            level={1}
            defaultOpen={false}
          >
            {renderSectionContent(section)}
          </AccordionTitle>
        ))}
        {pathContent.dossiers.map((dossier) => (
          <AccordionDossier key={dossier.path} dossier={dossier} />
        ))}
      </>
    );
    if (embedded) return <>{content}</>;
    return (
      <main className={styles.main}>
        <div className={styles.content}>
          {content}
        </div>
      </main>
    );
  }

  const { chapitres } = structure!;

  const renderSections = (chapitre: (typeof chapitres)[0]) =>
    chapitre.sections.map((section) => (
      <AccordionTitle
        key={section.nom}
        title={section.nom}
        level={2}
        defaultOpen={false}
      >
        {renderSectionContent(section)}
      </AccordionTitle>
    ));

  const content = startAtSections ? (
    chapitres.map((chapitre) => <React.Fragment key={chapitre.nom}>{renderSections(chapitre)}</React.Fragment>)
  ) : (
    chapitres.map((chapitre) => (
      <AccordionTitle
        key={chapitre.nom}
        title={chapitre.nom}
        level={1}
        defaultOpen={false}
      >
        {renderSections(chapitre)}
      </AccordionTitle>
    ))
  );

  if (embedded) {
    return <>{content}</>;
  }

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        {content}
      </div>
    </main>
  );
}
