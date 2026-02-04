/**
 * Script pour générer un scénario E2E qui parcourt tous les liens de _Pages-Et-Lien.json
 * et teste tous les e2eID présents sur chaque page
 *
 * Principe général :
 * 1. Lit la liste des liens depuis _Pages-Et-Lien.json
 * 2. Construit un chemin qui visite chaque page une fois (genererCheminComplet)
 * 3. Pour chaque transition (page A → page B), génère du code de navigation
 * 4. Après chaque navigation, teste tous les e2eID présents sur la page
 *
 * Algorithme de navigation : Plan du site (e2eid-b13) est la source de vérité.
 * - Pour aller vers une page (sauf /, /metrics, /a-propos-du-site, /plan-du-site) :
 *   → Clic sur le bouton Plan du site (e2eid-b13) → puis clic sur le lien vers la destination (e2eID déterministe depuis l'URL).
 * - Pages footer : /metrics (b14), /a-propos-du-site (b15), /plan-du-site (b13), / (logo h1).
 * - Si le bouton Plan du site (b13) est absent : throw (pas de fallback).
 *
 * Pages avec zone "Masqué" (sauf Plan du site) : exclues du scénario de navigation.
 * Plan du site (/plan-du-site) reste la seule page "Masqué" incluse (utilisée comme cible de navigation).
 */

import * as fs from 'fs';
import * as path from 'path';
import { generateE2eIdFromUrl, getPagesExclues } from '../utils/client';
import type { PlanLien } from '../utils/client';
import type { E2eIdInventoryItem } from '../utils/backoffice/integrity/e2eIdInventory';
import {
  generateE2eIdInventory,
  detectMissingE2eIds,
  generateAuditFile,
  generateE2eIdsFromAudit,
  genererContenuSpecE2E,
} from '../utils/backoffice/index';
import { E2E_IDS } from '../constants/e2eIds';

interface LienAvecIndex extends PlanLien {
  index: number; // Index original dans le tableau
}

/**
 * Récupère les e2eID des boutons du footer (_footerButtons.json)
 * Ces e2eID ne sont pas dans l'inventaire car le fichier est ignoré
 */
const getFooterE2eIds = (): string[] => {
  const footerPath = path.join(process.cwd(), 'data', '_footerButtons.json');
  if (!fs.existsSync(footerPath)) return [];
  try {
    const data = JSON.parse(fs.readFileSync(footerPath, 'utf8'));
    const boutons = data?.boutons;
    if (!Array.isArray(boutons)) return [];
    return boutons.map((b: { e2eID?: string }) => b.e2eID).filter((id): id is string => typeof id === 'string');
  } catch {
    return [];
  }
};

/**
 * Extrait tous les e2eID référencés dans le code du test généré (getByTestId('e2eid-XXX'))
 */
const getE2eIdsUsedInGeneratedCode = (code: string): Set<string> => {
  const used = new Set<string>();
  const pattern = /getByTestId\(['"]e2eid-([^'"]+)['"]\)/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(code)) !== null) {
    used.add(match[1]);
  }
  return used;
};

/**
 * Valide la cohérence des e2eID : aucun e2eID utilisé dans le test ne doit être absent de l'app.
 * Source de vérité : inventaire + footer + header (constantes) + liens du plan du site (e2eID déterministe depuis l'URL).
 */
const validateE2eIdsConsistency = (
  codeTest: string,
  inventory: E2eIdInventoryItem[],
  footerE2eIds: string[],
  planPages: { url: string }[],
  planLiens: PlanLien[]
): { ok: boolean; orphelins: string[]; message?: string } => {
  const usedInTest = getE2eIdsUsedInGeneratedCode(codeTest);
  const appE2eIds = new Set<string>();
  inventory.forEach((item) => appE2eIds.add(item.e2eID));
  footerE2eIds.forEach((id) => appE2eIds.add(id));
  appE2eIds.add(E2E_IDS.header.logo);
  appE2eIds.add(E2E_IDS.header.photo);
  // Liens du plan du site : e2eID déterministe depuis l'URL (ListeDesPages utilise generateE2eIdFromUrl)
  planPages.forEach((p) => appE2eIds.add(generateE2eIdFromUrl(p.url)));
  // e2eID des liens définis dans _Pages-Et-Lien.json
  planLiens.forEach((l) => {
    if (l.e2eID) appE2eIds.add(l.e2eID);
  });
  // e2eID dynamiques des profils (profil-{slug}-acces, profil-{slug}-cv)
  ['cpo', 'coo', 'agile', 'cto'].forEach((slug) => {
    appE2eIds.add(`profil-${slug}-acces`);
    appE2eIds.add(`profil-${slug}-cv`);
  });
  // e2eID dynamiques du hero
  appE2eIds.add('hero-telecharger-cv');
  appE2eIds.add('hero-bouton-principal');

  const orphelins = [...usedInTest].filter((id) => !appE2eIds.has(id));
  if (orphelins.length > 0) {
    return {
      ok: false,
      orphelins,
      message: `Les e2eID suivants sont utilisés dans le scénario E2E mais n'existent pas dans l'application (JSON, React, footer, header, plan du site) : ${orphelins.join(', ')}. Vérifiez que les composants appliquent bien l'attribut e2eid issus des données.`,
    };
  }
  return { ok: true, orphelins: [] };
};

/**
 * Génère un chemin qui visite chaque page une seule fois en suivant les liens réels.
 * Si aucun lien direct n'existe, passe par /plan-du-site pour atteindre la destination.
 * Les pages avec zone "Masqué" (sauf /plan-du-site) sont exclues.
 */
const genererCheminComplet = (
  liens: PlanLien[],
  pagesExclues: string[]
): { chemin: string[]; liensUtilises: PlanLien[] } => {
  const liensRestants: PlanLien[] = liens.map((l) => ({ ...l }));

  const chemin: string[] = [];
  const liensUtilises: PlanLien[] = [];
  const pagesVisitees = new Set<string>();

  // Construire un index des liens par source pour accès rapide
  const liensParSource = new Map<string, PlanLien[]>();
  for (const lien of liens) {
    if (!liensParSource.has(lien.source)) {
      liensParSource.set(lien.source, []);
    }
    liensParSource.get(lien.source)!.push(lien);
  }

  const pagesUniques = new Set<string>();
  liensRestants.forEach((lien) => {
    if (!pagesExclues.includes(lien.source)) {
      pagesUniques.add(lien.source);
    }
    if (!pagesExclues.includes(lien.destination)) {
      pagesUniques.add(lien.destination);
    }
  });

  // Commencer par la page d'accueil si elle existe
  let pageCourante: string | null = null;
  if (pagesUniques.has('/')) {
    pageCourante = '/';
  } else if (pagesUniques.size > 0) {
    pageCourante = Array.from(pagesUniques)[0];
  }

  // Fonction pour marquer les liens depuis une page comme utilisés
  const marquerLiensUtilises = (page: string) => {
    const liensDepuisPage = liensRestants.filter((l) => l.source === page);
    liensDepuisPage.forEach((lien) => {
      liensUtilises.push({ ...lien });
      const index = liensRestants.findIndex(
        (l) => l.source === lien.source && l.destination === lien.destination
      );
      if (index !== -1) {
        liensRestants.splice(index, 1);
      }
    });
  };

  // Fonction pour trouver une destination accessible depuis la page courante
  const trouverDestinationAccessible = (depuis: string): string | null => {
    const liensDepuis = liensParSource.get(depuis) || [];
    // Priorité 1 : destination non visitée avec des liens restants
    for (const lien of liensDepuis) {
      if (!pagesVisitees.has(lien.destination) && !pagesExclues.includes(lien.destination)) {
        const aDesLiensRestants = liensRestants.some((l) => l.source === lien.destination);
        if (aDesLiensRestants) {
          return lien.destination;
        }
      }
    }
    // Priorité 2 : n'importe quelle destination non visitée
    for (const lien of liensDepuis) {
      if (!pagesVisitees.has(lien.destination) && !pagesExclues.includes(lien.destination)) {
        return lien.destination;
      }
    }
    return null;
  };

  // Visiter toutes les pages en suivant les liens réels
  while (pageCourante && pagesUniques.size > 0) {
    // Ajouter la page au chemin si elle n'a pas encore été visitée
    if (!pagesVisitees.has(pageCourante)) {
      chemin.push(pageCourante);
      pagesVisitees.add(pageCourante);
      pagesUniques.delete(pageCourante);
      marquerLiensUtilises(pageCourante);
    }

    // Trouver la prochaine page accessible via un lien direct
    let prochainePage = trouverDestinationAccessible(pageCourante);

    // Si aucune destination accessible et qu'il reste des pages à visiter
    if (!prochainePage && pagesUniques.size > 0) {
      // Passer par /plan-du-site pour accéder aux pages restantes
      if (pageCourante !== '/plan-du-site' && !pagesVisitees.has('/plan-du-site')) {
        // Aller d'abord sur /plan-du-site
        prochainePage = '/plan-du-site';
      } else if (pageCourante === '/plan-du-site') {
        // Depuis /plan-du-site, on peut accéder à n'importe quelle page non masquée
        prochainePage = trouverDestinationAccessible('/plan-du-site');
        if (!prochainePage) {
          // Prendre n'importe quelle page restante (accessible depuis plan-du-site)
          for (const page of pagesUniques) {
            if (!pagesExclues.includes(page)) {
              prochainePage = page;
              break;
            }
          }
        }
      } else {
        // Retourner à /plan-du-site via le footer (toujours accessible)
        chemin.push('/plan-du-site');
        pagesVisitees.add('/plan-du-site');
        pagesUniques.delete('/plan-du-site');
        marquerLiensUtilises('/plan-du-site');
        prochainePage = trouverDestinationAccessible('/plan-du-site');
        if (!prochainePage) {
          for (const page of pagesUniques) {
            if (!pagesExclues.includes(page)) {
              prochainePage = page;
              break;
            }
          }
        }
      }
    }

    pageCourante = prochainePage;
  }

  // Vérifier s'il reste des liens non testés
  if (liensRestants.length > 0) {
    console.warn(`⚠️  ${liensRestants.length} lien(s) non testé(s) (vers pages exclues ou inaccessibles)`);
  }

  // Si le chemin est vide, visiter au moins l'accueil
  if (chemin.length === 0) {
    chemin.push('/');
  }

  return { chemin, liensUtilises };
};

// Main
const main = () => {
  console.log('🔍 Détection des e2eID manquants...\n');

  // Phase 1 : Détecter les e2eID manquants
  const detectionResult = detectMissingE2eIds();
  const totalMissing = detectionResult.json.length + detectionResult.react.length;

  if (totalMissing > 0) {
    console.log(`📋 ${totalMissing} élément(s) sans e2eID détecté(s):`);
    console.log(`   - ${detectionResult.json.length} élément(s) dans les JSON`);
    console.log(`   - ${detectionResult.react.length} élément(s) dans les composants React\n`);

    // Générer le fichier d'audit
    const auditPath = generateAuditFile(detectionResult);
    if (auditPath) {
      console.log(`📄 Fichier d'audit généré : ${auditPath}\n`);

      // Lire le fichier d'audit et mettre "add" pour tous les éléments JSON
      // (les éléments React sont généralement exclus car ils utilisent des props du JSON)
      const auditContent = fs.readFileSync(auditPath, 'utf8');
      const audit = JSON.parse(auditContent);

      let autoAdded = 0;
      // Pour les éléments JSON, mettre automatiquement "add" (générer e2eID)
      for (const item of audit.json) {
        if (item.action === '') {
          item.action = 'add';
          autoAdded++;
        }
      }

      // Pour les éléments React, vérifier s'ils utilisent des props du JSON
      // Si oui, mettre "null" (exclure), sinon "add"
      for (const item of audit.react) {
        if (item.action === '') {
          // Si l'élément a une note indiquant qu'il utilise une prop du JSON, exclure
          if (item._note && item._note.includes('e2eID est déjà dans le JSON')) {
            item.action = 'null';
          } else {
            // Sinon, générer un e2eID
            item.action = 'add';
            autoAdded++;
          }
        }
      }

      // Sauvegarder le fichier d'audit modifié
      fs.writeFileSync(auditPath, JSON.stringify(audit, null, 2), 'utf8');

      if (autoAdded > 0) {
        console.log(`✅ ${autoAdded} élément(s) automatiquement marqué(s) pour génération d'e2eID\n`);

        // Phase 2 : Générer les e2eID
        console.log('🔧 Génération des e2eID...\n');
        const generationResult = generateE2eIdsFromAudit();

        if (generationResult.success) {
          console.log(`✅ Génération réussie :`);
          console.log(`   - ${generationResult.generated} e2eID généré(s)`);
          console.log(`   - ${generationResult.excluded} élément(s) exclu(s)\n`);

          if (generationResult.errors.length > 0) {
            console.warn(`⚠️  Erreurs lors de la génération :`);
            generationResult.errors.forEach((error) => {
              console.warn(`   - ${error}`);
            });
            console.warn('');
          }
        } else {
          console.error(`❌ Erreurs lors de la génération des e2eID :`);
          generationResult.errors.forEach((error) => {
            console.error(`   - ${error}`);
          });
          console.error('');
          process.exit(1);
        }
      } else {
        console.log('ℹ️  Aucun élément à générer automatiquement\n');
      }
    }
  } else {
    console.log('✅ Aucun e2eID manquant détecté\n');
  }

  console.log('🔍 Lecture de _Pages-Et-Lien.json...\n');

  const siteMapPath = path.join(process.cwd(), 'data', '_Pages-Et-Lien.json');
  
  if (!fs.existsSync(siteMapPath)) {
    console.error('❌ Erreur : Le fichier Pages-Et-Lien.json n\'existe pas');
    console.error('   Veuillez d\'abord générer le plan du site avec le script approprié');
    process.exit(1);
  }

  const contenu = fs.readFileSync(siteMapPath, 'utf8');
  const plan = JSON.parse(contenu);

  // Pages avec zone "Masqué" (sauf Plan du site) : exclues du scénario
  const planPages = (plan.pages || []) as { url: string; zone?: string }[];
  const pagesExclues = getPagesExclues(planPages);
  if (pagesExclues.length > 0) {
    console.log(`📌 Pages exclues du scénario (zone "Masqué", sauf Plan du site) : ${pagesExclues.join(', ')}\n`);
  }

  let liens = plan.liens as PlanLien[];
  const liensAvantFiltre = liens.length;
  liens = liens.filter((lien) => {
    const sourceExclue = pagesExclues.includes(lien.source);
    const destinationExclue = pagesExclues.includes(lien.destination);
    return !sourceExclue && !destinationExclue;
  });

  if (liens.length < liensAvantFiltre) {
    const liensFiltres = liensAvantFiltre - liens.length;
    console.log(`⚠️  ${liensFiltres} lien(s) exclu(s) (pages zone "Masqué")\n`);
  }

  console.log(`📊 ${liens.length} liens détectés dans _Pages-Et-Lien.json\n`);

  const liensCopie = [...liens];
  console.log(`💾 Copie en RAM créée : ${liensCopie.length} liens\n`);

  console.log('🛤️  Génération du chemin complet...\n');
  const { chemin, liensUtilises } = genererCheminComplet(liens, pagesExclues);

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

  // Générer l'inventaire des e2eID
  console.log('🔍 Génération de l\'inventaire des e2eID...\n');
  let inventory: E2eIdInventoryItem[] = [];
  try {
    inventory = generateE2eIdInventory();
  } catch (error) {
    console.warn('⚠️  Impossible de charger l\'inventaire des e2eID, utilisation d\'une liste vide');
    console.warn(`   Erreur: ${error}`);
    inventory = [];
  }
  const activeE2eIds = inventory; // Tous les items ont un e2eID non null
  console.log(`📋 ${activeE2eIds.length} e2eID actifs détectés\n`);

  // Générer le code du test
  console.log('📝 Génération du code du test E2E...\n');
  const pages = plan.pages as { url: string; titre?: string }[];
  const codeTest = genererContenuSpecE2E(chemin, liens, pages, inventory);

  // Validation : tous les e2eID utilisés dans le scénario doivent exister dans l'app
  const footerE2eIds = getFooterE2eIds();
  const validation = validateE2eIdsConsistency(codeTest, inventory, footerE2eIds, pages, liens);
  if (!validation.ok) {
    console.error('❌ Incohérence des e2eID détectée :');
    console.error(`   ${validation.message}`);
    console.error(`   e2eID orphelins (présents dans le test, absents de l'app) : ${validation.orphelins.join(', ')}`);
    console.error("\n   Vérifiez que les composants appliquent bien l'attribut e2eid issus des données (pas de valeur en dur qui écrase).");
    process.exit(1);
  }
  console.log('✅ Validation e2eID : tous les e2eID du scénario existent dans l\'app (inventaire + footer + header)\n');

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
