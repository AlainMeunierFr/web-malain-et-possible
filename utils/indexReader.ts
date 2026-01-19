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
  image: {
    src: string;
    alt: string;
  };
  description: string;
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
export type TypeElementContenu = 'titre' | 'video' | 'teteLarge' | 'domaineDeCompetence';

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
}

/**
 * Interface pour un élément de type "Tête large"
 */
export interface ElementTeteLarge {
  type: 'teteLarge';
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
 * Union type pour tous les éléments de contenu
 */
export type ElementContenu = 
  | ElementTitre 
  | ElementVideo 
  | ElementTeteLarge 
  | ElementDomaineDeCompetence;

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
 * Lit le fichier JSON et retourne les données en structure "contenu de page"
 * Supporte à la fois l'ancienne structure (domainesDeCompetences) et la nouvelle (contenu)
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

  // Sinon, on retourne la nouvelle structure
  return data as PageData;
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
