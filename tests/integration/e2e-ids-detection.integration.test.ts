/**
 * Tests d'intégration pour la détection des e2eID manquants
 * Détecte les éléments interactifs sans e2eID dans les JSON et React
 * Échoue si des éléments sont détectés (impose la correction)
 */

import {
  detectMissingE2eIds,
  generateAuditFile,
  type DetectionResult,
} from '../../utils/e2eIdDetector';
import { generateE2eIdsFromAudit } from '../../utils/e2eIdGenerator';
import * as fs from 'fs';
import * as path from 'path';

describe('Détection des éléments sans e2eID', () => {
  const auditFilePath = path.join(process.cwd(), 'e2e-ids-pending.json');

  afterAll(() => {
    // Nettoyer le fichier d'audit après les tests si nécessaire
    // (mais on le garde généralement pour que l'utilisateur puisse le consulter)
  });

  it('devrait détecter tous les éléments interactifs sans e2eID', () => {
    // Phase 1 : Détection
    const result: DetectionResult = detectMissingE2eIds();

    // Phase 2 : Génération du fichier d'audit
    const auditFile = generateAuditFile(result);

    // Construire le message d'erreur détaillé
    const jsonCount = result.json.length;
    const reactCount = result.react.length;
    const totalCount = jsonCount + reactCount;

    if (totalCount > 0) {
      let errorMessage = `\n\n❌ ${totalCount} élément(s) sans e2eID détecté(s):\n`;
      errorMessage += `   - ${jsonCount} élément(s) dans les JSON\n`;
      errorMessage += `   - ${reactCount} élément(s) dans les composants React\n\n`;

      errorMessage += `📊 Métadonnées:\n`;
      errorMessage += `   - Compteur max: ${result.compteurMax}\n`;
      errorMessage += `   - Prochain ID libre: ${result.prochainIdLibre}\n\n`;

      if (auditFile) {
      errorMessage += `📄 Fichier d'audit généré: ${auditFile}\n`;
      errorMessage += `   Modifiez ce fichier pour arbitrer chaque élément:\n`;
      errorMessage += `   - "add": générer un e2eID automatiquement\n`;
      errorMessage += `   - "null": exclure explicitement (mettre e2eID: null)\n`;
      errorMessage += `   - "": non affecté (valeur par défaut, à modifier)\n\n`;
      }

      // Afficher les détections JSON
      if (result.json.length > 0) {
        errorMessage += `📋 Éléments JSON détectés:\n`;
        result.json.forEach((item, index) => {
          errorMessage += `   ${index + 1}. ${item.file} → ${item.path}\n`;
          errorMessage += `      Type: ${item.type}`;
          if (item.typeDetecte) {
            errorMessage += ` (nouveau type détecté: ${item.typeDetecte})`;
          }
          if (item.proprietesInteractives) {
            errorMessage += `\n      Propriétés interactives: ${item.proprietesInteractives.join(', ')}`;
          }
          errorMessage += `\n`;
        });
        errorMessage += `\n`;
      }

      // Afficher les détections React
      if (result.react.length > 0) {
        errorMessage += `⚛️  Éléments React détectés:\n`;
        result.react.forEach((item, index) => {
          errorMessage += `   ${index + 1}. ${item.file} → ligne ${item.line}\n`;
          errorMessage += `      Type: ${item.type}\n`;
          if (item.element) {
            errorMessage += `      Élément: ${item.element}...\n`;
          }
        });
        errorMessage += `\n`;
      }

      errorMessage += `\n💡 Actions possibles:\n`;
      errorMessage += `   1. Ouvrir ${auditFile}\n`;
      errorMessage += `   2. Modifier "action" pour chaque élément: "add" ou "null"\n`;
      errorMessage += `   3. Relancer le test pour générer les e2eID\n`;
      errorMessage += `   4. Le fichier sera supprimé automatiquement quand tout est OK\n`;

      // Échouer le test avec le message détaillé
      throw new Error(errorMessage);
    }

    // Si aucun élément détecté, le test passe
    expect(totalCount).toBe(0);
    expect(auditFile).toBeNull();
  });

  it('devrait générer les e2eID après arbitrage si le fichier d\'audit existe et contient des actions', () => {
    // Vérifier si le fichier d'audit existe
    if (!fs.existsSync(auditFilePath)) {
      // Pas de fichier d'audit, test réussi (rien à générer)
      expect(true).toBe(true);
      return;
    }

    // Lire le fichier d'audit pour vérifier s'il y a des éléments à traiter
    const auditContent = fs.readFileSync(auditFilePath, 'utf8');
    const audit = JSON.parse(auditContent);

    // Vérifier s'il y a des éléments avec action !== '' (arbitrés)
    const hasItemsToProcess =
      audit.json.some((item: any) => item.action === 'add' || item.action === 'null') ||
      audit.react.some((item: any) => item.action === 'add' || item.action === 'null');

    if (!hasItemsToProcess) {
      // Aucun élément arbitré à traiter, test réussi (éléments non arbitrés seront traités plus tard)
      expect(true).toBe(true);
      return;
    }

    // Générer les e2eID pour les éléments arbitrés
    const result = generateE2eIdsFromAudit();

    if (result.errors.length > 0) {
      throw new Error(
        `Erreurs lors de la génération des e2eID:\n${result.errors.join('\n')}`
      );
    }

    // Vérifier que la génération a réussi
    expect(result.success).toBe(true);
    // Au moins un élément a été traité (généré ou exclu)
    expect(result.generated + result.excluded).toBeGreaterThan(0);
  });

  it('devrait avoir un format cohérent pour les e2eID existants', () => {
    // Vérifier que tous les e2eID existants respectent le format [lettre][chiffres]
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      return;
    }

    const files = fs.readdirSync(dataDir);
    const jsonFiles = files.filter((file) => file.endsWith('.json'));

    const formatRegex = /^[a-z]\d+$/;

    for (const jsonFile of jsonFiles) {
      try {
        const filePath = path.join(dataDir, jsonFile);
        const content = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(content);

        const checkE2eId = (obj: any, path: string): void => {
          if (typeof obj !== 'object' || obj === null) {
            return;
          }

          if (typeof obj.e2eID === 'string') {
            if (!formatRegex.test(obj.e2eID)) {
              throw new Error(
                `Format e2eID invalide dans ${jsonFile} à ${path}: "${obj.e2eID}" (format attendu: [lettre][chiffres], ex: "v10", "b15")`
              );
            }
          }

          if (Array.isArray(obj)) {
            obj.forEach((item, index) => {
              checkE2eId(item, `${path}[${index}]`);
            });
          } else if (typeof obj === 'object') {
            for (const key in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, key)) {
                const newPath = path === '' ? key : `${path}.${key}`;
                checkE2eId(obj[key], newPath);
              }
            }
          }
        };

        checkE2eId(data, '');
      } catch (error) {
        if (error instanceof Error && error.message.includes('Format e2eID invalide')) {
          throw error;
        }
        // Ignorer les autres erreurs de parsing
        continue;
      }
    }
  });
});
