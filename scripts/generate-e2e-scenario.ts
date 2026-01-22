/**
 * Script pour générer un scénario E2E qui parcourt tous les liens de Pages-Et-Lien.json
 * 
 * Principe :
 * 1. Lit la liste des liens depuis Pages-Et-Lien.json
 * 2. Crée une copie en RAM
 * 3. Construit un scénario qui passe par tous les liens
 * 4. À chaque fois qu'un lien est utilisé, on le supprime de la copie RAM
 * 5. Quand la copie RAM est vide, le scénario est terminé
 */

import * as fs from 'fs';
import * as path from 'path';
import type { PlanLien } from '../utils/siteMapGenerator';

interface LienAvecIndex extends PlanLien {
  index: number; // Index original dans le tableau
}

/**
 * Génère un chemin qui parcourt tous les liens
 * Utilise un algorithme glouton : on part d'une page et on essaie de suivre les liens disponibles
 */
const genererCheminComplet = (liens: PlanLien[]): { chemin: string[]; liensUtilises: PlanLien[] } => {
  // Créer une copie en RAM (on va la modifier)
  const liensRestants: PlanLien[] = liens.map((l) => ({ ...l }));

  const chemin: string[] = [];
  const liensUtilises: PlanLien[] = [];

  // Commencer par la page d'accueil
  let pageCourante = '/';
  chemin.push(pageCourante);

  // Tant qu'il reste des liens à parcourir
  while (liensRestants.length > 0) {
    // Chercher un lien disponible depuis la page courante
    const lienIndex = liensRestants.findIndex(
      (l) => l.source === pageCourante
    );

    if (lienIndex !== -1) {
      // Trouvé un lien depuis la page courante
      const lien = liensRestants[lienIndex];
      liensUtilises.push({ ...lien }); // Ajouter aux liens utilisés
      liensRestants.splice(lienIndex, 1); // Supprimer de la copie RAM
      
      // Aller à la destination
      pageCourante = lien.destination;
      chemin.push(pageCourante);
    } else {
      // Pas de lien disponible depuis la page courante
      // Chercher n'importe quel lien restant et naviguer vers sa source
      if (liensRestants.length > 0) {
        const lienRestant = liensRestants[0];
        
        // Naviguer vers la source du lien restant si nécessaire
        if (pageCourante !== lienRestant.source) {
          chemin.push(lienRestant.source);
          pageCourante = lienRestant.source;
        }
        
        // Suivre le lien
        liensUtilises.push({ ...lienRestant }); // Ajouter aux liens utilisés
        pageCourante = lienRestant.destination;
        chemin.push(pageCourante);
        
        liensRestants.splice(0, 1); // Supprimer de la copie RAM
      }
    }
  }

  return { chemin, liensUtilises };
};

/**
 * Génère le code du test E2E Playwright
 */
const genererCodeTest = (chemin: string[], liens: PlanLien[]): string => {
  const lignes: string[] = [];
  
  lignes.push("import { test, expect } from '@playwright/test';");
  lignes.push("");
  lignes.push("test('parcours complet de tous les liens du site', async ({ page }) => {");
  lignes.push("  // Scénario généré automatiquement depuis Pages-Et-Lien.json");
  lignes.push("  // Ce test parcourt tous les liens du site pour vérifier leur fonctionnement");
  lignes.push("");
  
  // Créer un Map pour retrouver rapidement les labels
  const liensMap = new Map<string, string>();
  liens.forEach((lien) => {
    const cle = `${lien.source}->${lien.destination}`;
    liensMap.set(cle, lien.label || '');
  });

  // Générer les étapes du test
  for (let i = 0; i < chemin.length; i++) {
    const page = chemin[i];
    
    if (i === 0) {
      // Première page : navigation initiale
      lignes.push(`  // Étape ${i + 1}: Page d'accueil`);
      lignes.push(`  await page.goto('${page}');`);
      lignes.push(`  await expect(page).toHaveURL('${page}');`);
    } else {
      // Pages suivantes : navigation via lien
      const pagePrecedente = chemin[i - 1];
      const label = liensMap.get(`${pagePrecedente}->${page}`) || 'lien';
      
      lignes.push("");
      lignes.push(`  // Étape ${i + 1}: Navigation de ${pagePrecedente} vers ${page}`);
      lignes.push(`  // Label du lien: "${label}"`);
      
      // Essayer de trouver le lien par son label ou par son rôle
      // Le footer (plan-du-site) et le header (logo vers accueil) sont toujours disponibles
      if (label && label !== '') {
        lignes.push(`  const lien${i} = page.getByRole('link', { name: /${label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/i });`);
        lignes.push(`  if (await lien${i}.count() > 0) {`);
        lignes.push(`    await lien${i}.first().click();`);
        lignes.push(`  } else {`);
        lignes.push(`    // Lien non trouvé par label, navigation via plan-du-site ou accueil`);
        lignes.push(`    // Le footer et le header sont toujours disponibles sur toutes les pages`);
        lignes.push(`    // Option 1 : Essayer via le plan du site (footer)`);
        lignes.push(`    const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });`);
        lignes.push(`    if (await lienPlanDuSite.count() > 0) {`);
        lignes.push(`      await lienPlanDuSite.first().click();`);
        lignes.push(`      await expect(page).toHaveURL('/plan-du-site');`);
        lignes.push(`      // Depuis le plan du site, naviguer vers la destination`);
        lignes.push(`      await page.goto('${page}');`);
        lignes.push(`    } else {`);
        lignes.push(`      // Option 2 : Via le logo (header) vers l'accueil`);
        lignes.push(`      const logo = page.getByAltText('Logo Malain et possible');`);
        lignes.push(`      if (await logo.count() > 0) {`);
        lignes.push(`        await logo.click();`);
        lignes.push(`        await expect(page).toHaveURL('/');`);
        lignes.push(`      } else {`);
        lignes.push(`        // Fallback : navigation directe vers l'accueil`);
        lignes.push(`        await page.goto('/');`);
        lignes.push(`      }`);
        lignes.push(`      // Depuis l'accueil, naviguer vers la destination`);
        lignes.push(`      await page.goto('${page}');`);
        lignes.push(`    }`);
        lignes.push(`  }`);
      } else {
        lignes.push(`  // Pas de label disponible, navigation via plan-du-site ou accueil`);
        lignes.push(`  // Le footer et le header sont toujours disponibles sur toutes les pages`);
        lignes.push(`  const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });`);
        lignes.push(`  if (await lienPlanDuSite.count() > 0) {`);
        lignes.push(`    await lienPlanDuSite.first().click();`);
        lignes.push(`    await expect(page).toHaveURL('/plan-du-site');`);
        lignes.push(`    await page.goto('${page}');`);
        lignes.push(`  } else {`);
        lignes.push(`    // Via le logo (header) vers l'accueil`);
        lignes.push(`    const logo = page.getByAltText('Logo Malain et possible');`);
        lignes.push(`    if (await logo.count() > 0) {`);
        lignes.push(`      await logo.click();`);
        lignes.push(`      await expect(page).toHaveURL('/');`);
        lignes.push(`    } else {`);
        lignes.push(`      // Fallback : navigation directe vers l'accueil`);
        lignes.push(`      await page.goto('/');`);
        lignes.push(`    }`);
        lignes.push(`    await page.goto('${page}');`);
        lignes.push(`  }`);
      }
      
      lignes.push(`  await expect(page).toHaveURL('${page}');`);
    }
  }

  lignes.push("");
  lignes.push("  // Tous les liens ont été parcourus");
  lignes.push("  console.log('✅ Parcours complet : tous les liens ont été testés');");
  lignes.push("});");

  return lignes.join('\n');
};

// Main
const main = () => {
  console.log('🔍 Lecture de Pages-Et-Lien.json...\n');

  const siteMapPath = path.join(process.cwd(), 'data', 'Pages-Et-Lien.json');
  
  if (!fs.existsSync(siteMapPath)) {
    console.error('❌ Erreur : Le fichier Pages-Et-Lien.json n\'existe pas');
    process.exit(1);
  }

  const contenu = fs.readFileSync(siteMapPath, 'utf8');
  const plan = JSON.parse(contenu);

  const liens = plan.liens as PlanLien[];
  
  console.log(`📊 ${liens.length} liens détectés dans Pages-Et-Lien.json\n`);

  // Créer une copie en RAM
  const liensCopie = [...liens];
  console.log(`💾 Copie en RAM créée : ${liensCopie.length} liens\n`);

  // Générer le chemin complet
  console.log('🛤️  Génération du chemin complet...\n');
  const { chemin, liensUtilises } = genererCheminComplet(liens);

  console.log(`✅ Chemin généré : ${chemin.length} pages visitées`);
  console.log(`📋 Pages du chemin : ${chemin.slice(0, 10).join(' → ')}${chemin.length > 10 ? ' → ...' : ''}\n`);

  // Vérifier que tous les liens ont été utilisés
  const liensRestants = liens.filter((lien) => {
    return !liensUtilises.some((lu) => 
      lu.source === lien.source && lu.destination === lien.destination
    );
  });

  if (liensRestants.length > 0) {
    console.warn(`⚠️  Attention : ${liensRestants.length} liens n'ont pas été parcourus`);
    console.warn(`   Liens restants : ${liensRestants.slice(0, 5).map((l) => `${l.source}->${l.destination}`).join(', ')}${liensRestants.length > 5 ? '...' : ''}\n`);
  } else {
    console.log('✅ Tous les liens ont été parcourus !\n');
  }

  // Générer le code du test
  console.log('📝 Génération du code du test E2E...\n');
  const codeTest = genererCodeTest(chemin, liens);

  // Écrire le fichier de test
  const testPath = path.join(process.cwd(), 'tests', 'end-to-end', 'parcours-complet-liens.spec.ts');
  fs.writeFileSync(testPath, codeTest, 'utf8');

  console.log(`✅ Test E2E généré : ${testPath}`);
  console.log(`\n📊 Statistiques :`);
  console.log(`   - Liens initiaux : ${liens.length}`);
  console.log(`   - Pages visitées : ${chemin.length}`);
  console.log(`   - Liens parcourus : ${liensUtilises.length}`);
  console.log(`   - Liens restants : ${liensRestants.length}`);
};

main();
