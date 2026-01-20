/**
 * Backend pur : Lecture du fichier JSON index.json
 * Cette logique est réutilisable et testable en ligne de commande
 */

import fs from 'fs';
import path from 'path';

/**
 * Interface pour une Compétence
 */
export interface Competence {
  titre: string;
  image?: {
    src: string;
    alt: string;
  };
  icon?: string; // Nom de l'icône lucide-react (ex: "Rocket", "Globe")
  description: string;
  auteur?: string; // Nom de l'auteur (optionnel, affiché en italique aligné à droite)
  bouton: {
    texte: string;
    action: string;
  } | null;
}

/**
 * Interface pour un Domaine de compétences
 */
export interface DomaineDeCompetences {
  titre: string;
  contenu: string;
  items: Competence[];
}

/**
 * Types d'éléments de contenu de page
 */
export type TypeElementContenu = 'titre' | 'video' | 'texteLarge' | 'domaineDeCompetence' | 'callToAction' | 'groupeBoutons' | 'temoignages' | 'videoDetournement';

/**
 * Interface pour un élément de type "Titre"
 */
export interface ElementTitre {
  type: 'titre';
  texte: string;
}

/**
 * Interface pour un élément de type "Vidéo"
 */
export interface ElementVideo {
  type: 'video';
  urlYouTube: string;
  lancementAuto: boolean;
  titre?: string; // Titre optionnel (h2, gras, centré, largeur comme domaine de compétence)
}

/**
 * Interface pour un élément de type "Texte large"
 */
export interface ElementTexteLarge {
  type: 'texteLarge';
  texte: string;
}

/**
 * Interface pour un élément de type "Domaine de compétences"
 */
export interface ElementDomaineDeCompetence {
  type: 'domaineDeCompetence';
  titre: string;
  contenu: string;
  items: Competence[];
}

/**
 * Interface pour un élément de type "Call to Action"
 */
export interface ElementCallToAction {
  type: 'callToAction';
  action: string; // Texte du bouton
}

/**
 * Interface pour un bouton dans un groupe de boutons
 */
export interface BoutonGroupe {
  id: string;
  icone: string; // Nom de l'icône lucide-react (ex: "Mail", "Youtube")
  texte: string | null; // Texte optionnel (null pour taille "petite")
  url: string | null;
  command: string | null; // Commande optionnelle pour navigation interne
}

/**
 * Interface pour un élément de type "Groupe de boutons"
 */
export interface ElementGroupeBoutons {
  type: 'groupeBoutons';
  taille: 'petite' | 'grande';
  boutons: BoutonGroupe[];
}

/**
 * Interface pour un Témoignage individuel
 */
export interface Temoignage {
  nom: string;
  fonction: string;
  photo: string; // Chemin vers l'image (ex: "/images/Florent Grosmaitre.jpeg")
  temoignage: string; // Texte du témoignage
}

/**
 * Interface pour un élément de type "Témoignages"
 */
export interface ElementTemoignages {
  type: 'temoignages';
  items?: Temoignage[]; // Optionnel si on utilise source
  source?: string; // Optionnel : nom du fichier JSON source
}

/**
 * Interface pour un Détournement vidéo individuel
 */
export interface DetournementVideo {
  id: number;
  titreVideoDetournee: string;
  videoDetournee: string; // ID YouTube
  titreVideoOriginale: string;
  droitsAuteur?: string; // Optionnel, texte long pour les alertes
  linkedin?: string; // Optionnel, URL LinkedIn
  videoOriginale: string; // ID YouTube
  pourLeCompteDe: string; // Nom du client
  date: string;
  pitch: string; // Contexte/pitch
}

/**
 * Interface pour un élément de type "Vidéo détournement" (liste de détournements)
 */
export interface ElementVideoDetournement {
  type: 'videoDetournement';
  items?: DetournementVideo[]; // Optionnel si on utilise source
  source?: string; // Optionnel : nom du fichier JSON source
}

/**
 * Union type pour tous les éléments de contenu
 */
export type ElementContenu = 
  | ElementTitre 
  | ElementVideo 
  | ElementTexteLarge 
  | ElementDomaineDeCompetence
  | ElementCallToAction
  | ElementGroupeBoutons
  | ElementTemoignages
  | ElementVideoDetournement;

/**
 * Interface pour la structure "contenu de page"
 */
export interface ContenuPage {
  contenu: ElementContenu[];
}

/**
 * Interface pour la structure complète du fichier index.json (ancienne structure pour compatibilité)
 */
export interface IndexData {
  domainesDeCompetences: DomaineDeCompetences[];
}

/**
 * Interface pour la nouvelle structure "contenu de page"
 */
export interface PageData {
  contenu: ElementContenu[];
}

/**
 * Convertit l'ancienne structure (IndexData) en nouvelle structure (PageData) pour compatibilité ascendante
 */
export const convertirIndexDataEnPageData = (indexData: IndexData): PageData => {
  const contenu: ElementContenu[] = indexData.domainesDeCompetences.map(domaine => ({
    type: 'domaineDeCompetence',
    titre: domaine.titre,
    contenu: domaine.contenu,
    items: domaine.items,
  }));

  return { contenu };
};

/**
 * Lit le fichier index.json et retourne les données (ancienne structure pour compatibilité)
 */
export const readIndexData = (): IndexData => {
  const indexPath = path.join(process.cwd(), 'data', 'index.json');
  
  if (!fs.existsSync(indexPath)) {
    throw new Error(`Le fichier index.json n'existe pas dans le dossier data/`);
  }

  const fileContent = fs.readFileSync(indexPath, 'utf8');
  const data: IndexData = JSON.parse(fileContent);

  return data;
};

/**
 * Interface pour le fichier Détournements vidéo.json
 */
export interface DetournementsVideoData {
  détournements: DetournementVideo[];
}

/**
 * Lit le fichier Détournements vidéo.json et retourne les détournements
 */
export const readDetournementsVideo = (): DetournementVideo[] => {
  const filePath = path.join(process.cwd(), 'data', 'Détournements vidéo.json');
  
  if (!fs.existsSync(filePath)) {
    throw new Error(`Le fichier Détournements vidéo.json n'existe pas dans le dossier data/`);
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const data: DetournementsVideoData = JSON.parse(fileContent);

  return data.détournements;
};

/**
 * Lit le fichier JSON et retourne les données en structure "contenu de page"
 * Supporte à la fois l'ancienne structure (domainesDeCompetences) et la nouvelle (contenu)
 * Résout automatiquement les références externes (source) pour les témoignages et détournements
 */
export const readPageData = (filename: string = 'index.json'): PageData => {
  const filePath = path.join(process.cwd(), 'data', filename);
  
  if (!fs.existsSync(filePath)) {
    throw new Error(`Le fichier ${filename} n'existe pas dans le dossier data/`);
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileContent);

  // Si c'est l'ancienne structure (domainesDeCompetences), on la convertit
  if ('domainesDeCompetences' in data && !('contenu' in data)) {
    return convertirIndexDataEnPageData(data as IndexData);
  }

  // Résoudre les références externes dans le contenu
  const pageData = data as PageData;
  if (pageData.contenu) {
    pageData.contenu = pageData.contenu.map(element => {
      // Résoudre les témoignages depuis un fichier source
      if (element.type === 'temoignages' && element.source && !element.items) {
        const sourceFilePath = path.join(process.cwd(), 'data', element.source);
        if (fs.existsSync(sourceFilePath)) {
          const sourceContent = fs.readFileSync(sourceFilePath, 'utf8');
          const sourceData = JSON.parse(sourceContent);
          return { ...element, items: sourceData.items };
        }
      }
      
      // Résoudre les détournements vidéo depuis un fichier source
      if (element.type === 'videoDetournement' && element.source && !element.items) {
        const sourceFilePath = path.join(process.cwd(), 'data', element.source);
        if (fs.existsSync(sourceFilePath)) {
          const sourceContent = fs.readFileSync(sourceFilePath, 'utf8');
          const sourceData = JSON.parse(sourceContent);
          return { ...element, items: sourceData.détournements || sourceData.items };
        }
      }
      
      return element;
    });
  }

  return pageData;
};

/**
 * Lit un fichier JSON de domaine de compétences et retourne les données
 * @param filename Nom du fichier JSON (ex: "Conduite du changement.json")
 */
export const readDomaineData = (filename: string): IndexData => {
  const filePath = path.join(process.cwd(), 'data', filename);
  
  if (!fs.existsSync(filePath)) {
    throw new Error(`Le fichier ${filename} n'existe pas dans le dossier data/`);
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const data: IndexData = JSON.parse(fileContent);

  return data;
};
