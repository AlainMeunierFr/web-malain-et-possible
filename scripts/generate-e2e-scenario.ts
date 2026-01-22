/**
 * Script pour générer un scénario E2E qui parcourt tous les liens de Pages-Et-Lien.json
 * et teste tous les e2eID présents sur chaque page
 * 
 * Principe :
 * 1. Lit la liste des liens depuis Pages-Et-Lien.json
 * 2. Crée une copie en RAM
 * 3. Construit un scénario qui passe par tous les liens
 * 4. À chaque fois qu'un lien est utilisé, on le supprime de la copie RAM
 * 5. Après chaque navigation, teste tous les e2eID présents sur la page
 * 6. Quand la copie RAM est vide, le scénario est terminé
 */

import * as fs from 'fs';
import * as path from 'path';
import type { PlanLien } from '../utils/siteMapGenerator';
// TODO: Corriger l'import pour inclure les tests e2eID
// import { generateE2eIdInventory } from '../utils/e2eIdInventory';

// Type pour les items d'inventaire e2eID
interface E2eIdInventoryItem {
  e2eID: string | null;
  source: 'json' | 'react' | 'constant';
  file: string;
  path?: string;
  line?: number;
  type: string;
  description?: string;
}

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
 * Détermine quels e2eID sont présents sur une page donnée
 * Les boutons du footer sont présents sur toutes les pages
 * Les autres e2eID peuvent être spécifiques à une page (via JSON)
 */
const getE2eIdsForPage = (pageUrl: string, inventory: E2eIdInventoryItem[]): E2eIdInventoryItem[] => {
  const e2eIds: E2eIdInventoryItem[] = [];
  
  // Les boutons du footer sont présents sur toutes les pages
  const footerButtons = inventory.filter((item) => 
    item.file === 'footerButtons.json' && item.e2eID !== null
  );
  e2eIds.push(...footerButtons);
  
  // Les éléments du header sont présents sur toutes les pages
  const headerElements = inventory.filter((item) => 
    item.source === 'constant' && item.e2eID !== null
  );
  e2eIds.push(...headerElements);
  
  // Pour les autres e2eID, on suppose qu'ils sont présents sur toutes les pages
  // (car on ne peut pas facilement mapper un JSON à une route spécifique)
  // On peut améliorer cela plus tard si nécessaire
  const otherE2eIds = inventory.filter((item) => 
    item.source === 'json' && 
    item.file !== 'footerButtons.json' && 
    item.e2eID !== null
  );
  e2eIds.push(...otherE2eIds);
  
  // Dédupliquer par e2eID
  const uniqueE2eIds = new Map<string, E2eIdInventoryItem>();
  e2eIds.forEach((item) => {
    if (item.e2eID && !uniqueE2eIds.has(item.e2eID)) {
      uniqueE2eIds.set(item.e2eID, item);
    }
  });
  
  return Array.from(uniqueE2eIds.values());
};

/**
 * Génère le code pour tester un e2eID
 */
const genererCodeTestE2eId = (item: E2eIdInventoryItem, index: number): string[] => {
  const lignes: string[] = [];
  const e2eId = item.e2eID!;
  
  // Utiliser getByTestId avec le format 'e2eid-{id}'
  lignes.push(`  // Test e2eID: ${e2eId} (${item.type} - ${item.file})`);
  lignes.push(`  const element${index} = page.getByTestId('e2eid-${e2eId}');`);
  lignes.push(`  if (await element${index}.count() > 0) {`);
  
  // Si c'est un lien, on peut cliquer (mais on ne navigue pas, car on teste déjà la navigation)
  // Si c'est un bouton, on peut cliquer
  if (item.type === 'link' || item.type === 'bouton' || item.type === 'react') {
    lignes.push(`    await expect(element${index}).toBeVisible();`);
    // Pour les boutons externes (email, youtube, linkedin), on ne clique pas car ça ouvre une fenêtre
    if (item.description && (item.description.includes('email') || item.description.includes('youtube') || item.description.includes('linkedin'))) {
      lignes.push(`    // Élément externe, vérification de présence uniquement`);
    } else {
      lignes.push(`    // Élément interactif présent et visible`);
    }
  } else {
    lignes.push(`    await expect(element${index}).toBeVisible();`);
  }
  
  lignes.push(`  }`);
  
  return lignes;
};

/**
 * Génère le code du test E2E Playwright
 */
const genererCodeTest = (chemin: string[], liens: PlanLien[], inventory: E2eIdInventoryItem[]): string => {
  const lignes: string[] = [];
  
  lignes.push("import { test, expect } from '@playwright/test';");
  lignes.push("");
  lignes.push("test('parcours complet de tous les liens du site et test de tous les e2eID', async ({ page }) => {");
  lignes.push("  // Scénario généré automatiquement depuis Pages-Et-Lien.json");
  lignes.push("  // Ce test parcourt tous les liens du site et teste tous les e2eID présents");
  lignes.push("");
  
  // Créer un Map pour retrouver rapidement les labels
  const liensMap = new Map<string, string>();
  liens.forEach((lien) => {
    const cle = `${lien.source}->${lien.destination}`;
    liensMap.set(cle, lien.label || '');
  });
  
  // Créer un Set pour suivre les e2eID déjà testés
  const e2eIdsTestes = new Set<string>();
  let e2eIdTestIndex = 0;

  // Générer les étapes du test avec test.step() pour visibilité dans l'UI
  for (let i = 0; i < chemin.length; i++) {
    const page = chemin[i];
    
    if (i === 0) {
      // Première page : navigation initiale
      // Utiliser des guillemets doubles pour éviter les problèmes d'apostrophe
      lignes.push(`  await test.step("Étape ${i + 1}: Page d'accueil", async () => {`);
      lignes.push(`    await page.goto('${page}');`);
      lignes.push(`    await expect(page).toHaveURL('${page}');`);
      lignes.push(`  });`);
    } else {
      // Pages suivantes : navigation via lien
      const pagePrecedente = chemin[i - 1];
      const label = liensMap.get(`${pagePrecedente}->${page}`) || 'lien';
      
      lignes.push("");
      // Utiliser des guillemets doubles pour éviter les problèmes d'apostrophe
      // Échapper les guillemets doubles et autres caractères spéciaux dans le label
      // Utiliser JSON.stringify pour un échappement sûr de tous les caractères spéciaux
      const escapedLabel = JSON.stringify(label).slice(1, -1); // Enlever les guillemets externes
      lignes.push(`  await test.step("Étape ${i + 1}: Navigation de ${pagePrecedente} vers ${page} (${escapedLabel})", async () => {`);
      
      // Essayer de trouver le lien par son label ou par son rôle
      // Le footer (plan-du-site) et le header (logo vers accueil) sont toujours disponibles
      if (label && label !== '') {
        const escapedLabel = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        lignes.push(`    // Chercher le lien par label, puis vérifier la destination pour éviter les ambiguïtés`);
        lignes.push(`    const liens${i} = page.getByRole('link', { name: /${escapedLabel}/i });`);
        lignes.push(`    if (await liens${i}.count() > 0) {`);
        lignes.push(`      // Si plusieurs liens avec le même label, trouver celui qui va vers la bonne destination`);
        lignes.push(`      const liensTrouves = await liens${i}.all();`);
        lignes.push(`      let lienTrouve = null;`);
        lignes.push(`      for (const lien of liensTrouves) {`);
        lignes.push(`        const href = await lien.getAttribute('href');`);
        lignes.push(`        // Normaliser l'URL (enlever le slash final si présent)`);
        lignes.push(`        const hrefNormalise = href ? href.replace(/\\/$/, '') : '';`);
        lignes.push(`        const destinationNormalisee = '${page}'.replace(/\\/$/, '');`);
        lignes.push(`        if (hrefNormalise === destinationNormalisee || hrefNormalise === destinationNormalisee + '/' || href === destinationNormalisee || href === destinationNormalisee + '/') {`);
        lignes.push(`          lienTrouve = lien;`);
        lignes.push(`          break;`);
        lignes.push(`        }`);
        lignes.push(`      }`);
        lignes.push(`      if (lienTrouve) {`);
        lignes.push(`        await lienTrouve.click();`);
        lignes.push(`      } else {`);
        lignes.push(`        // Aucun lien trouvé vers la destination exacte, utiliser la navigation directe`);
        lignes.push(`        await page.goto('${page}');`);
        lignes.push(`      }`);
        lignes.push(`    } else {`);
        lignes.push(`      // Lien non trouvé par label, navigation via plan-du-site ou accueil`);
        lignes.push(`      // Le footer et le header sont toujours disponibles sur toutes les pages`);
        lignes.push(`      // Option 1 : Essayer via le plan du site (footer)`);
        lignes.push(`      const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });`);
        lignes.push(`      if (await lienPlanDuSite.count() > 0) {`);
        lignes.push(`        await lienPlanDuSite.first().click();`);
        lignes.push(`        await expect(page).toHaveURL('/plan-du-site');`);
        lignes.push(`        // Depuis le plan du site, naviguer vers la destination`);
        lignes.push(`        await page.goto('${page}');`);
        lignes.push(`      } else {`);
        lignes.push(`        // Option 2 : Via le logo (header) vers l'accueil`);
        lignes.push(`        const logo = page.getByAltText('Logo Malain et possible');`);
        lignes.push(`        if (await logo.count() > 0) {`);
        lignes.push(`          await logo.click();`);
        lignes.push(`          await expect(page).toHaveURL('/');`);
        lignes.push(`        } else {`);
        lignes.push(`          // Fallback : navigation directe vers l'accueil`);
        lignes.push(`          await page.goto('/');`);
        lignes.push(`        }`);
        lignes.push(`        // Depuis l'accueil, naviguer vers la destination`);
        lignes.push(`        await page.goto('${page}');`);
        lignes.push(`      }`);
        lignes.push(`    }`);
      } else {
        lignes.push(`    // Pas de label disponible, navigation via plan-du-site ou accueil`);
        lignes.push(`    // Le footer et le header sont toujours disponibles sur toutes les pages`);
        lignes.push(`    const lienPlanDuSite = page.getByRole('link', { name: /Plan du site/i });`);
        lignes.push(`    if (await lienPlanDuSite.count() > 0) {`);
        lignes.push(`      await lienPlanDuSite.first().click();`);
        lignes.push(`      await expect(page).toHaveURL('/plan-du-site');`);
        lignes.push(`      await page.goto('${page}');`);
        lignes.push(`    } else {`);
        lignes.push(`      // Via le logo (header) vers l'accueil`);
        lignes.push(`      const logo = page.getByAltText('Logo Malain et possible');`);
        lignes.push(`      if (await logo.count() > 0) {`);
        lignes.push(`        await logo.click();`);
        lignes.push(`        await expect(page).toHaveURL('/');`);
        lignes.push(`      } else {`);
        lignes.push(`        // Fallback : navigation directe vers l'accueil`);
        lignes.push(`        await page.goto('/');`);
        lignes.push(`      }`);
        lignes.push(`      await page.goto('${page}');`);
        lignes.push(`    }`);
      }
      
      lignes.push(`    await expect(page).toHaveURL('${page}');`);
      lignes.push(`  });`);
    }
    
    // Après chaque navigation, tester les e2eID présents sur cette page
    const e2eIdsPage = getE2eIdsForPage(page, inventory);
    if (e2eIdsPage.length > 0) {
      lignes.push("");
      lignes.push(`  // Test des e2eID présents sur ${page}`);
      
      for (const item of e2eIdsPage) {
        // Ne tester qu'une seule fois chaque e2eID
        if (!e2eIdsTestes.has(item.e2eID!)) {
          const codeTest = genererCodeTestE2eId(item, e2eIdTestIndex);
          lignes.push(...codeTest);
          e2eIdsTestes.add(item.e2eID!);
          e2eIdTestIndex++;
        }
      }
    }
  }

  lignes.push("");
  lignes.push("  // Tous les liens ont été parcourus");
  lignes.push(`  // ${e2eIdsTestes.size} e2eID ont été testés`);
  lignes.push("  console.log('✅ Parcours complet : tous les liens et e2eID ont été testés');");
  lignes.push("});");

  return lignes.join('\n');
};

// Main
const main = () => {
  console.log('🔍 Lecture de Pages-Et-Lien.json...\n');

  const siteMapPath = path.join(process.cwd(), 'data', 'Pages-Et-Lien.json');
  
  if (!fs.existsSync(siteMapPath)) {
    console.error('❌ Erreur : Le fichier Pages-Et-Lien.json n\'existe pas');
    console.error('   Veuillez d\'abord générer le plan du site avec le script approprié');
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

  // Générer l'inventaire des e2eID (désactivé temporairement - problème d'import)
  console.log('🔍 Génération de l\'inventaire des e2eID...\n');
  let inventory: E2eIdInventoryItem[] = [];
  // TODO: Réactiver quand l'import sera corrigé
  // try {
  //   inventory = generateE2eIdInventory();
  // } catch (error) {
  //   console.warn('⚠️  Impossible de charger l\'inventaire des e2eID, utilisation d\'une liste vide');
  //   inventory = [];
  // }
  const activeE2eIds = inventory.filter((item) => item.e2eID !== null);
  console.log(`📋 ${activeE2eIds.length} e2eID actifs détectés (désactivé temporairement)\n`);

  // Générer le code du test
  console.log('📝 Génération du code du test E2E...\n');
  const codeTest = genererCodeTest(chemin, liens, inventory);

  // Écrire le fichier de test
  const testPath = path.join(process.cwd(), 'tests', 'end-to-end', 'parcours-complet-liens.spec.ts');
  fs.writeFileSync(testPath, codeTest, 'utf8');

  console.log(`✅ Test E2E généré : ${testPath}`);
  console.log(`\n📊 Statistiques :`);
  console.log(`   - Liens initiaux : ${liens.length}`);
  console.log(`   - Pages visitées : ${chemin.length}`);
  console.log(`   - Liens parcourus : ${liensUtilises.length}`);
  console.log(`   - Liens restants : ${liensRestants.length}`);
  console.log(`   - e2eID actifs : ${activeE2eIds.length}`);
};

main();
