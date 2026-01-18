/**
 * Backend pur : Logique métier pour lire les dossiers dans "A propos de ce site"
 * Cette logique est réutilisable et testable en ligne de commande
 *
 * Principe : Séparation backend pur (logique métier) / backend Next.js (génération HTML)
 * Ces fonctions sont utilisables partout : ligne de commande, tests, composants React
 * 
 * APPROCHE TDD : Code fait émerger progressivement du simple au complexe
 * 
 * Structure hiérarchique :
 * - Dossier = Chapitre = h1
 * - Fichiers MD dans chaque dossier = Section = h2
 * - Ligne ### dans les fichiers MD = Partie = h3 (à venir)
 * - Ligne #### dans les fichiers MD = Sous partie = h4 (à venir)
 */

import fs from 'fs';
import path from 'path';

/**
 * Interface pour un élément de contenu parsé
 */
export interface ContenuElement {
  type: 'paragraph' | 'ul' | 'ol';
  content?: string; // Pour les paragraphes
  items?: string[]; // Pour les listes
}

/**
 * Interface pour une sous-partie (#### dans le fichier MD)
 */
export interface SousPartie {
  titre: string; // Titre de la sous-partie (texte après ####)
  contenu: string; // Contenu brut de la sous-partie jusqu'à la prochaine partie/sous-partie ou fin
  contenuParse: ContenuElement[]; // Contenu parsé en éléments (paragraphes, listes)
  estSpecial?: boolean; // Si true, titre à masquer (Prompt, Résultat technique) - pour SEO seulement
}

/**
 * Interface pour une partie (### dans le fichier MD)
 */
export interface Partie {
  titre: string; // Titre de la partie (texte après ###)
  contenu: string; // Contenu brut de la partie jusqu'à la prochaine partie ou fin
  contenuParse: ContenuElement[]; // Contenu parsé en éléments (paragraphes, listes)
  sousParties: SousPartie[]; // Sous-parties (####) dans cette partie
}

/**
 * Interface pour le contenu parsé d'une section
 */
export interface SectionContent {
  contenuInitial: string; // Contenu avant la première partie
  parties: Partie[]; // Parties (###) dans cette section
}

/**
 * Interface pour une section (fichier MD)
 */
export interface Section {
  nom: string; // Nom du fichier sans l'extension .md
  contenu: string; // Contenu complet du fichier MD
  parties: Partie[]; // Parties (###) dans cette section
}

/**
 * Interface pour un chapitre (dossier)
 */
export interface Chapitre {
  nom: string; // Nom du dossier
  sections: Section[]; // Fichiers MD dans ce dossier
}

/**
 * Interface pour le JSON retourné avec la structure complète
 */
export interface AboutSiteStructure {
  chapitres: Chapitre[];
}

/**
 * Interface pour le JSON retourné avec les noms des chapitres (ancienne version, conservée pour compatibilité)
 */
export interface AboutSiteFolders {
  chapitres: string[];
}

/**
 * Parse le contenu markdown en éléments (paragraphes, listes)
 * 
 * @param contenu Contenu markdown à parser
 * @returns Tableau d'éléments de contenu
 */
export const parseMarkdownContent = (contenu: string): ContenuElement[] => {
  const lignes = contenu.split('\n');
  const elements: ContenuElement[] = [];
  let paragrapheCourant: string[] = [];
  let listeCourante: string[] = [];
  let typeListeCourante: 'ul' | 'ol' | null = null;

  const finaliserParagraphe = () => {
    if (paragrapheCourant.length > 0) {
      const texte = paragrapheCourant.join(' ').trim();
      if (texte) {
        elements.push({
          type: 'paragraph',
          content: texte
        });
      }
      paragrapheCourant = [];
    }
  };

  const finaliserListe = () => {
    if (listeCourante.length > 0 && typeListeCourante) {
      elements.push({
        type: typeListeCourante,
        items: listeCourante
      });
      listeCourante = [];
      typeListeCourante = null;
    }
  };

  for (const ligne of lignes) {
    const trimmed = ligne.trim();

    // Ligne vide : finaliser le paragraphe ou la liste en cours
    if (!trimmed) {
      finaliserParagraphe();
      finaliserListe();
      continue;
    }

    // Détecter liste à puce (-)
    if (trimmed.startsWith('- ')) {
      finaliserParagraphe();
      if (typeListeCourante !== 'ul') {
        finaliserListe();
        typeListeCourante = 'ul';
      }
      listeCourante.push(trimmed.substring(2).trim());
      continue;
    }

    // Détecter liste numérotée (1. ou 1))
    const matchNumero = trimmed.match(/^(\d+)\.\s+(.+)$/);
    if (matchNumero) {
      finaliserParagraphe();
      if (typeListeCourante !== 'ol') {
        finaliserListe();
        typeListeCourante = 'ol';
      }
      listeCourante.push(matchNumero[2].trim());
      continue;
    }

    // Texte normal
    finaliserListe();
    paragrapheCourant.push(trimmed);
  }

  // Finaliser les éléments en cours
  finaliserParagraphe();
  finaliserListe();

  return elements;
};

/**
 * Parse le contenu d'une section pour extraire les parties (###) et sous-parties (####)
 * 
 * @param contenu Contenu complet du fichier MD
 * @returns Contenu parsé avec parties et sous-parties
 */
export const parseSectionContent = (contenu: string): SectionContent => {
  const lignes = contenu.split('\n');
  const parties: Partie[] = [];
  let contenuInitial = '';
  let partieCourante: Partie | null = null;
  let sousPartieCourante: SousPartie | null = null;
  let dansContenuInitial = true;

  for (let i = 0; i < lignes.length; i++) {
    const ligne = lignes[i];

    // Détecter une partie (###)
    if (ligne.startsWith('### ') && !ligne.startsWith('#### ')) {
      dansContenuInitial = false;
      
      // Finaliser la partie précédente si elle existe
      if (partieCourante) {
        // Finaliser la sous-partie courante si elle existe
        if (sousPartieCourante) {
          sousPartieCourante.contenuParse = parseMarkdownContent(sousPartieCourante.contenu.trim());
          partieCourante.sousParties.push(sousPartieCourante);
          sousPartieCourante = null;
        }
        // Parser le contenu de la partie avant de la sauvegarder
        partieCourante.contenuParse = parseMarkdownContent(partieCourante.contenu.trim());
        parties.push(partieCourante);
      }

      // Créer une nouvelle partie
      const titre = ligne.substring(4).trim(); // Enlever "### "
      partieCourante = {
        titre,
        contenu: '',
        contenuParse: [],
        sousParties: []
      };
      sousPartieCourante = null;
    }
    // Détecter une sous-partie (####)
    else if (ligne.startsWith('#### ')) {
      if (partieCourante) {
        // Finaliser la sous-partie précédente si elle existe
        if (sousPartieCourante) {
          sousPartieCourante.contenuParse = parseMarkdownContent(sousPartieCourante.contenu.trim());
          partieCourante.sousParties.push(sousPartieCourante);
        }

        // Créer une nouvelle sous-partie
        const titre = ligne.substring(5).trim(); // Enlever "#### "
        // Détecter si c'est une sous-partie spéciale (Prompt ou Résultat technique)
        const estSpecial = titre.toLowerCase() === 'prompt' || titre.toLowerCase() === 'résultat technique';
        
        sousPartieCourante = {
          titre,
          contenu: '',
          contenuParse: [],
          estSpecial: estSpecial || undefined // undefined si false pour ne pas polluer le JSON
        };
      }
    }
    // Contenu normal
    else {
      if (dansContenuInitial) {
        contenuInitial += ligne + '\n';
      } else if (partieCourante) {
        if (sousPartieCourante) {
          // Ajouter au contenu de la sous-partie courante
          sousPartieCourante.contenu += ligne + '\n';
        } else {
          // Ajouter au contenu de la partie courante
          partieCourante.contenu += ligne + '\n';
        }
      }
    }
  }

  // Sauvegarder la dernière partie et sous-partie
  if (partieCourante) {
    if (sousPartieCourante) {
      sousPartieCourante.contenuParse = parseMarkdownContent(sousPartieCourante.contenu.trim());
      partieCourante.sousParties.push(sousPartieCourante);
    }
    partieCourante.contenuParse = parseMarkdownContent(partieCourante.contenu.trim());
    parties.push(partieCourante);
  }

  return {
    contenuInitial: contenuInitial.trim(),
    parties
  };
};

/**
 * Lit la structure complète de "A propos de ce site"
 * Retourne un objet JSON avec les chapitres et leurs sections
 * 
 * @returns Objet JSON avec les chapitres et sections
 */
export const readAboutSiteStructure = (): AboutSiteStructure => {
  const aboutSiteDir = path.join(process.cwd(), 'A propos de ce site');
  
  // Lire les dossiers (chapitres)
  const entries = fs.readdirSync(aboutSiteDir, { withFileTypes: true });
  
  const chapitres: Chapitre[] = entries
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .sort()
    .map(chapitreNom => {
      const chapitreDir = path.join(aboutSiteDir, chapitreNom);
      
      // Lire les fichiers MD (sections) dans ce chapitre
      let sections: Section[] = [];
      
      try {
        const sectionEntries = fs.readdirSync(chapitreDir, { withFileTypes: true });
        
        sections = sectionEntries
          .filter(entry => entry.isFile() && entry.name.endsWith('.md'))
          .map(entry => {
            const sectionPath = path.join(chapitreDir, entry.name);
            const contenu = fs.readFileSync(sectionPath, 'utf8');
            const nom = entry.name.replace(/\.md$/, ''); // Enlever l'extension .md
            
            // Parser le contenu pour extraire les parties (###) et sous-parties (####)
            const contenuParse = parseSectionContent(contenu);
            
            return { 
              nom, 
              contenu,
              parties: contenuParse.parties
            };
          })
          .sort((a, b) => a.nom.localeCompare(b.nom)); // Trier par ordre alphabétique
      } catch (error) {
        // Si le dossier ne peut pas être lu, on retourne un tableau vide
        sections = [];
      }
      
      return {
        nom: chapitreNom,
        sections
      };
    });
  
  return { chapitres };
};

/**
 * Lit les dossiers contenus dans "A propos de ce site"
 * Retourne un objet JSON avec les noms de chapitres triés par ordre alphabétique
 * 
 * @deprecated Utiliser readAboutSiteStructure() à la place
 * @returns Objet JSON avec les noms des chapitres
 */
export const readAboutSiteFolders = (): AboutSiteFolders => {
  const aboutSiteDir = path.join(process.cwd(), 'A propos de ce site');
  
  const entries = fs.readdirSync(aboutSiteDir, { withFileTypes: true });
  
  const chapitres = entries
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .sort();
  
  return { chapitres };
};
