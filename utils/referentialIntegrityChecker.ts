/**
 * Backend pur : Vérification de l'intégrité référentielle
 * Cette logique est réutilisable et testable en ligne de commande
 */

import fs from 'fs';
import path from 'path';
import type { PageData } from './indexReader';
import type { CompetenceBibliotheque, DomaineBibliotheque } from './bibliothequeReader';
import { readPageData } from './indexReader';

/**
 * Résultat de la vérification d'intégrité
 */
export interface IntegrityCheckResult {
  valid: boolean;
  errors: string[];
}

/**
 * Vérifie l'intégrité référentielle d'une page
 */
export function checkReferentialIntegrity(
  pageData: PageData,
  competences: Map<string, CompetenceBibliotheque>,
  domaines: Map<string, DomaineBibliotheque>
): IntegrityCheckResult {
  const errors: string[] = [];

  for (const element of pageData.contenu) {
    if (element.type === 'domaineDeCompetence') {
      const elementAny = element as any;
      
      // Si l'élément a une référence, vérifier qu'elle existe
      if ('ref' in elementAny && typeof elementAny.ref === 'string') {
        const domaineId = elementAny.ref;
        
        // Vérifier que le domaine existe
        if (!domaines.has(domaineId)) {
          errors.push(`Domaine référencé introuvable: "${domaineId}"`);
          continue; // Ne pas vérifier les compétences si le domaine n'existe pas
        }

        // Vérifier que toutes les compétences référencées dans le domaine existent
        const domaine = domaines.get(domaineId)!;
        for (const competenceId of domaine.competences) {
          if (!competences.has(competenceId)) {
            errors.push(
              `Compétence référencée introuvable: "${competenceId}" dans le domaine "${domaineId}"`
            );
          }
        }
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Vérifie l'intégrité référentielle de tous les fichiers JSON de pages
 */
export function checkAllPagesIntegrity(
  competences: Map<string, CompetenceBibliotheque>,
  domaines: Map<string, DomaineBibliotheque>
): IntegrityCheckResult {
  const errors: string[] = [];
  const dataDir = path.join(process.cwd(), 'data');
  const files = fs.readdirSync(dataDir);

  for (const file of files) {
    if (file.endsWith('.json') && !file.includes('bibliotheque')) {
      try {
        const pageData = readPageData(file);
        
        // Ignorer les fichiers qui n'ont pas de structure "contenu" (ce ne sont pas des pages)
        if (!pageData.contenu || !Array.isArray(pageData.contenu)) {
          continue;
        }
        
        const result = checkReferentialIntegrity(pageData, competences, domaines);
        
        if (!result.valid) {
          errors.push(`Fichier ${file}:`);
          errors.push(...result.errors.map(err => `  - ${err}`));
        }
      } catch (error) {
        // Ignorer les fichiers qui ne sont pas des pages valides
        if (error instanceof Error && (
          error.message.includes('n\'existe pas') ||
          error.message.includes('is not iterable')
        )) {
          continue;
        }
        errors.push(`Erreur lors de la vérification de ${file}: ${error}`);
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
