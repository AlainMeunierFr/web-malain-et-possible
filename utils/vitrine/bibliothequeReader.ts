/**
 * Backend pur : Lecture de la bibliothèque de compétences et domaines
 * Cette logique est réutilisable et testable en ligne de commande
 */

import fs from 'fs';
import path from 'path';
import type { ElementCompetence, ExperienceEtApprentissage } from './pageReader';

/**
 * Interface pour un domaine dans la bibliothèque
 */
export interface DomaineBibliotheque {
  id: string;
  titre: string;
  contenu: string;
  auteur?: string;
  competences: string[]; // IDs des compétences
  experiences?: string[]; // IDs des expériences
}

/**
 * Interface pour une compétence dans la bibliothèque
 */
export interface CompetenceBibliotheque extends ElementCompetence {
  id: string;
}

/** Ré-export du type centralisé dans pageReader (ex‑« Autres » : expériences, formations, etc.) */
export type { ExperienceEtApprentissage };

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

/**
 * Lit le fichier experienceEtApprentissage.json et retourne une Map des éléments
 */
export function readAutres(): Map<string, ExperienceEtApprentissage> {
  const autresPath = path.join(process.cwd(), 'data', 'bibliotheque', 'experienceEtApprentissage.json');
  
  if (!fs.existsSync(autresPath)) {
    throw new Error(`Le fichier experienceEtApprentissage.json n'existe pas dans data/bibliotheque/`);
  }

  const fileContent = fs.readFileSync(autresPath, 'utf-8');
  const data = JSON.parse(fileContent);

  if (!data.experienceEtApprentissage || typeof data.experienceEtApprentissage !== 'object') {
    throw new Error('Le fichier experienceEtApprentissage.json doit contenir un objet "experienceEtApprentissage"');
  }

  const autresMap = new Map<string, ExperienceEtApprentissage>();

  for (const [id, autre] of Object.entries(data.experienceEtApprentissage)) {
    const raw = autre as { id?: string; type?: string; description: string; periode: string | null };
    const elem: ExperienceEtApprentissage = {
      type: 'experienceEtApprentissage',
      id: raw.id ?? id,
      categorie: raw.type,
      description: raw.description,
      periode: raw.periode ?? null,
    };
    autresMap.set(id, elem);
  }

  return autresMap;
}
