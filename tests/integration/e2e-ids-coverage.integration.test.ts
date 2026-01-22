/**
 * Tests d'intégration pour vérifier que tous les e2eID sont testés
 * dans le scénario E2E unique (parcours-complet-liens.spec.ts)
 */

import {
  generateE2eIdInventory,
  extractE2eIdsFromTestFile,
  type E2eIdInventoryItem,
} from '../../utils/e2eIdInventory';
import * as path from 'path';

describe('Couverture des e2eID dans le scénario E2E', () => {
  const e2eTestFile = path.join(
    process.cwd(),
    'tests',
    'end-to-end',
    'parcours-complet-liens.spec.ts'
  );

  it('devrait tester tous les e2eID existants dans le scénario E2E unique', () => {
    // 1. Générer l'inventaire complet de tous les e2eID
    const inventory = generateE2eIdInventory();

    // Filtrer les e2eID null (exclus explicitement)
    const activeE2eIds = inventory.filter((item) => item.e2eID !== null);

    if (activeE2eIds.length === 0) {
      // Aucun e2eID actif, test réussi
      expect(true).toBe(true);
      return;
    }

    // 2. Extraire les e2eID testés dans le fichier E2E
    const testedE2eIds = extractE2eIdsFromTestFile(e2eTestFile);

    // 3. Trouver les e2eID manquants
    const allE2eIds = new Set(activeE2eIds.map((item) => item.e2eID));
    const testedSet = new Set(testedE2eIds);
    const missingE2eIds = activeE2eIds.filter(
      (item) => !testedSet.has(item.e2eID)
    );

    if (missingE2eIds.length > 0) {
      let errorMessage = `\n\n❌ ${missingE2eIds.length} e2eID non testé(s) dans le scénario E2E:\n\n`;

      // Grouper par source
      const bySource: Record<string, E2eIdInventoryItem[]> = {
        json: [],
        react: [],
        constant: [],
      };

      missingE2eIds.forEach((item) => {
        bySource[item.source].push(item);
      });

      if (bySource.json.length > 0) {
        errorMessage += `📄 JSON (${bySource.json.length}):\n`;
        bySource.json.forEach((item) => {
          errorMessage += `   - ${item.e2eID} (${item.file} → ${item.path})\n`;
        });
        errorMessage += `\n`;
      }

      if (bySource.react.length > 0) {
        errorMessage += `⚛️  React (${bySource.react.length}):\n`;
        bySource.react.forEach((item) => {
          errorMessage += `   - ${item.e2eID} (${item.file} → ligne ${item.line})\n`;
        });
        errorMessage += `\n`;
      }

      if (bySource.constant.length > 0) {
        errorMessage += `🔧 Constantes (${bySource.constant.length}):\n`;
        bySource.constant.forEach((item) => {
          errorMessage += `   - ${item.e2eID} (${item.file} → ${item.description})\n`;
        });
        errorMessage += `\n`;
      }

      errorMessage += `\n📊 Statistiques:\n`;
      errorMessage += `   - Total e2eID actifs: ${activeE2eIds.length}\n`;
      errorMessage += `   - e2eID testés: ${testedE2eIds.length}\n`;
      errorMessage += `   - e2eID manquants: ${missingE2eIds.length}\n`;
      errorMessage += `   - Couverture: ${(
        ((testedE2eIds.length / activeE2eIds.length) * 100).toFixed(1)
      )}%\n\n`;

      errorMessage += `💡 Actions:\n`;
      errorMessage += `   1. Ouvrir ${e2eTestFile}\n`;
      errorMessage += `   2. Ajouter des tests pour chaque e2eID manquant\n`;
      errorMessage += `   3. Utiliser: page.getByTestId('e2eid-${missingE2eIds[0]?.e2eID}') ou page.locator('[data-e2eid="${missingE2eIds[0]?.e2eID}"]')\n`;

      throw new Error(errorMessage);
    }

    // Tous les e2eID sont testés
    expect(missingE2eIds.length).toBe(0);
    expect(testedE2eIds.length).toBeGreaterThanOrEqual(activeE2eIds.length);
  });

  it('devrait lister tous les e2eID existants pour référence', () => {
    const inventory = generateE2eIdInventory();
    const activeE2eIds = inventory.filter((item) => item.e2eID !== null);

    // Afficher un résumé (pour information, ne fait pas échouer le test)
    console.log(`\n📋 Inventaire des e2eID (${activeE2eIds.length} actifs):`);
    const byType: Record<string, number> = {};
    activeE2eIds.forEach((item) => {
      byType[item.type] = (byType[item.type] || 0) + 1;
    });

    Object.entries(byType).forEach(([type, count]) => {
      console.log(`   - ${type}: ${count}`);
    });

    // Le test passe toujours (c'est juste informatif)
    expect(activeE2eIds.length).toBeGreaterThanOrEqual(0);
  });
});
