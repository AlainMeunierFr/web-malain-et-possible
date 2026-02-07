'use client';

import React from 'react';
import AboutSiteContentRenderer from './AboutSiteContentRenderer';

/** Styles A propos : app/a-propos-du-site/a-propos-du-site.css (chargés via layout) */
import AccordionTitle from './AccordionTitle';
import AccordionDossier from './AccordionDossier';
import type { AboutSiteStructure, PathContentAtRoot, Section } from '../utils';

interface AboutSiteContentProps {
  structure?: AboutSiteStructure;
  /** US-11.4 : contenu à la racine du Path (fichiers MD + dossiers accordéon) */
  pathContent?: PathContentAtRoot;
  /** En vue dossier (page /a-propos-du-site/[dossier]) : affichage commence à H2 = liste des fichiers, sans H1/accordéon du nom du dossier */
  startAtSections?: boolean;
  /** Utilisé dans une page qui fournit déjà main : ne pas rendre le wrapper main/div (évite double main) */
  embedded?: boolean;
}

/**
 * Calcule le niveau HTML à partir du niveau de base et du type de titre
 * niveauBase 1: # = h3, ## = h4, ### = h5
 * niveauBase 2: ## = h3, ### = h4, #### = h5
 * niveauBase 3: ### = h3, #### = h4, ##### = h5
 */
function calculerNiveauHTML(niveauBase: number | undefined, typeTitre: 'partie' | 'sousPartie' | 'bloc'): number {
  const base = niveauBase || 3; // Par défaut, niveau 3
  // Le niveau HTML est toujours h3 pour partie, h4 pour sous-partie, h5 pour bloc
  // Le niveau markdown change selon le niveau de base, mais le rendu HTML reste cohérent
  if (typeTitre === 'partie') {
    return 3; // Toujours h3
  } else if (typeTitre === 'sousPartie') {
    return 4; // Toujours h4
  } else {
    return 5; // Toujours h5
  }
}

/**
 * Normalise un titre pour la comparaison (enlève US-X.Y, ✅ COMPLÉTÉ, etc.)
 */
function normaliserTitre(titre: string): string {
  return titre
    // Enlever "US-X.Y - " ou "US-X.Y : " du début
    .replace(/^US-\d+\.\d+[a-z]?\s*[-:]\s*/i, '')
    // Enlever "✅ COMPLÉTÉ" ou variantes à la fin
    .replace(/\s*✅\s*(COMPLÉTÉ|COMPLETÉ|COMPLETE)\s*$/gi, '')
    .trim();
}

/**
 * Vérifie si la première partie correspond au nom du fichier
 */
function premierePartieCorrespondAuFichier(section: Section): boolean {
  if (section.parties.length === 0) return false;
  
  const premierePartie = section.parties[0];
  const titrePremierePartie = normaliserTitre(premierePartie.titre);
  const nomFichier = normaliserTitre(section.nom);
  
  return titrePremierePartie === nomFichier;
}

/** Rendu du contenu d'une section (parties H3, sous-parties H4, blocs H5) */
function renderSectionContent(section: Section) {
  const niveauBase = section.niveauBase || 3;
  const niveauPartie = calculerNiveauHTML(niveauBase, 'partie');
  const niveauSousPartie = calculerNiveauHTML(niveauBase, 'sousPartie');
  const niveauBloc = calculerNiveauHTML(niveauBase, 'bloc');
  
  const doitMasquerPremierePartie = premierePartieCorrespondAuFichier(section);
  
  return section.parties.map((partie, partieIndex) => {
    // Masquer le titre de la première partie si elle correspond au nom du fichier
    const doitMasquerTitre = doitMasquerPremierePartie && partieIndex === 0;
    
    return (
    <div key={`${section.nom}-${partieIndex}-${partie.titre}`} className="partie">
      {!doitMasquerTitre && (
        React.createElement(`h${niveauPartie}`, { className: 'partieTitle' }, partie.titre)
      )}
      {partie.contenuParse && partie.contenuParse.length > 0 && (
        <AboutSiteContentRenderer elements={partie.contenuParse} />
      )}
      {partie.sousParties.map((sousPartie, sousPartieIndex) => {
        const uniqueKey = `${section.nom}-${partieIndex}-${sousPartieIndex}-${sousPartie.titre}`;
        const doitMasquerTitreSousPartie = sousPartie.typeDeContenu === 'Prompt' || sousPartie.typeDeContenu === 'Résultat technique';
        return (
          <div key={uniqueKey} className="sousPartie">
            {!doitMasquerTitreSousPartie && (
              React.createElement(`h${niveauSousPartie}`, { className: 'sousPartieTitle' }, sousPartie.titre)
            )}
            {sousPartie.contenuParse && sousPartie.contenuParse.length > 0 && (
              <AboutSiteContentRenderer elements={sousPartie.contenuParse} />
            )}
            {sousPartie.blocs && sousPartie.blocs.map((bloc, blocIndex) => {
              const blocKey = `${uniqueKey}-bloc-${blocIndex}`;
              return (
                <div key={blocKey} className="bloc">
                  {bloc.typeDeContenu !== 'Prompt' && bloc.typeDeContenu !== 'Résultat technique' && (
                    React.createElement(`h${niveauBloc}`, { className: 'blocTitle' }, bloc.titre)
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
  );
  });
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
      <main className="main-cont">
        <div className="content">
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
    <main className="main-cont">
      <div className="content">
        {content}
      </div>
    </main>
  );
}
