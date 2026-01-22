/**
 * Test d'intégration : Génération automatique du plan de test E2E
 * 
 * Ce test génère le scénario E2E qui parcourt tous les liens de Pages-Et-Lien.json
 * Il doit être exécuté avant chaque commit pour s'assurer que les tests E2E sont à jour
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

describe('Génération du plan de test E2E', () => {
  it('devrait générer le scénario E2E parcours-complet-liens.spec.ts depuis Pages-Et-Lien.json', () => {
    // Vérifier que Pages-Et-Lien.json existe
    const siteMapPath = path.join(process.cwd(), 'data', 'Pages-Et-Lien.json');
    expect(fs.existsSync(siteMapPath)).toBe(true);

    // Exécuter le script de génération
    const scriptPath = path.join(process.cwd(), 'scripts', 'generate-e2e-scenario.ts');
    expect(fs.existsSync(scriptPath)).toBe(true);

    try {
      execSync(`npx ts-node "${scriptPath}"`, { 
        stdio: 'pipe',
        encoding: 'utf8',
        cwd: process.cwd(),
      });
    } catch (error: any) {
      // Si le script échoue, le test doit échouer
      throw new Error(`Erreur lors de la génération du scénario E2E : ${error.message}`);
    }

    // Vérifier que le fichier de test a été généré
    const testPath = path.join(process.cwd(), 'tests', 'end-to-end', 'parcours-complet-liens.spec.ts');
    expect(fs.existsSync(testPath)).toBe(true);

    // Vérifier que le fichier n'est pas vide
    const contenu = fs.readFileSync(testPath, 'utf8');
    expect(contenu.length).toBeGreaterThan(0);
    expect(contenu).toContain("import { test, expect } from '@playwright/test';");
    expect(contenu).toContain("parcours complet de tous les liens du site");
  });
});
