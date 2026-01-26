/**
 * Backend pur : Lecture de la bibliothèque de compétences et domaines
 * Cette logique est réutilisable et testable en ligne de commande
 */

import fs from 'fs';
import path from 'path';
import type { Competence } from './indexReader';

/**
 * Interface pour un domaine dans la bibliothèque
 */
export interface DomaineBibliotheque {
  id: string;
  titre: string;
  contenu: string;
  auteur?: string;
  competences: string[]; // IDs des compétences
}

/**
 * Interface pour une compétence dans la bibliothèque
 */
export interface CompetenceBibliotheque extends Competence {
  id: string;
}

/**
 * Lit le fichier competences.json et retourne une Map des compétences
 */
export function readCompetences(): Map<string, CompetenceBibliotheque> {
  const competencesPath = path.join(process.cwd(), 'data', 'bibliotheque', 'competences.json');
  
  if (!fs.existsSync(competencesPath)) {
    throw new Error(`Le fichier competences.json n'existe pas dans data/bibliotheque/`);
  }

  const fileContent = fs.readFileSync(competencesPath, 'utf-8');
  const data = JSON.parse(fileContent);

  if (!data.competences || typeof data.competences !== 'object') {
    throw new Error('Le fichier competences.json doit contenir un objet "competences"');
  }

  const competencesMap = new Map<string, CompetenceBibliotheque>();

  for (const [id, competence] of Object.entries(data.competences)) {
    const comp = competence as CompetenceBibliotheque;
    if (!comp.id) {
      comp.id = id; // S'assurer que l'ID est présent
    }
    competencesMap.set(id, comp);
  }

  return competencesMap;
}

/**
 * Lit le fichier domaines.json et retourne une Map des domaines
 */
export function readDomaines(): Map<string, DomaineBibliotheque> {
  const domainesPath = path.join(process.cwd(), 'data', 'bibliotheque', 'domaines.json');
  
  if (!fs.existsSync(domainesPath)) {
    throw new Error(`Le fichier domaines.json n'existe pas dans data/bibliotheque/`);
  }

  const fileContent = fs.readFileSync(domainesPath, 'utf-8');
  const data = JSON.parse(fileContent);

  if (!data.domaines || typeof data.domaines !== 'object') {
    throw new Error('Le fichier domaines.json doit contenir un objet "domaines"');
  }

  const domainesMap = new Map<string, DomaineBibliotheque>();

  for (const [id, domaine] of Object.entries(data.domaines)) {
    const dom = domaine as DomaineBibliotheque;
    if (!dom.id) {
      dom.id = id; // S'assurer que l'ID est présent
    }
    domainesMap.set(id, dom);
  }

  return domainesMap;
}
