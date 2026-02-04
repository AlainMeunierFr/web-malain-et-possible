/**
 * Backend pur : Vérification de l'intégrité référentielle
 * Cette logique est réutilisable et testable en ligne de commande
 */

import fs from 'fs';
import path from 'path';
import type { PageData } from '../../vitrine/pageReader';
import type { CompetenceBibliotheque, DomaineBibliotheque } from '../../vitrine/bibliothequeReader';
import { readPageData } from '../../vitrine/pageReader';

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
      
      if ('ref' in elementAny && typeof elementAny.ref === 'string') {
        const domaineId = elementAny.ref;
        
        if (!domaines.has(domaineId)) {
          errors.push(`Domaine référencé introuvable: "${domaineId}"`);
          continue;
        }

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

  return { valid: errors.length === 0, errors };
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
        
        if (!pageData.contenu || !Array.isArray(pageData.contenu)) {
          continue;
        }
        
        const result = checkReferentialIntegrity(pageData, competences, domaines);
        
        if (!result.valid) {
          errors.push(`Fichier ${file}:`);
          errors.push(...result.errors.map(err => `  - ${err}`));
        }
      } catch (error) {
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

  return { valid: errors.length === 0, errors };
}
