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
 * Interface pour la structure complète du fichier index.json
 */
export interface IndexData {
  domainesDeCompetences: DomaineDeCompetences[];
}

/**
 * Lit le fichier index.json et retourne les données
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
