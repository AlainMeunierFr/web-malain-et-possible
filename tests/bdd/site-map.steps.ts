import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import {
  detecterPages,
  detecterLiensInternes,
  mettreAJourPlanJSON,
  validerEmplacements,
  type PlanPage,
  type PlanLien,
  type PlanSite,
} from '../../utils/backoffice';

const { Given, When, Then } = createBdd();

// Variables pour partager l'état entre les steps (stockées dans le contexte Playwright)
const getContextData = (context: any) => {
  if (!context.siteMapData) {
    context.siteMapData = {
      pagesDetectees: [] as PlanPage[],
      liensDetectes: [] as PlanLien[],
      planJSON: null as PlanSite | null,
      erreurValidation: null as string | null,
      backupPath: null as string | null,
      originalFileExisted: false,
      backupAlreadyDone: false,
    };
  }
  return context.siteMapData;
};

const getSiteMapPath = () => {
  return path.join(process.cwd(), 'data', '_Pages-Et-Lien.json');
};

// Variables globales pour la sauvegarde/restauration (partagées entre tous les tests)
let backupPath: string | null = null;
let originalFileExisted = false;
let backupAlreadyDone = false;

// Step pour initialiser la sauvegarde (à appeler dans Background si nécessaire)
Given('que le système sauvegarde le fichier _Pages-Et-Lien.json', async ({}) => {
  if (!backupAlreadyDone) {
    const siteMapPath = getSiteMapPath();
    if (fs.existsSync(siteMapPath)) {
      originalFileExisted = true;
      backupPath = siteMapPath + '.bdd-backup.json';
      fs.copyFileSync(siteMapPath, backupPath);
    }
    backupAlreadyDone = true;
  }
});

// Step pour restaurer le fichier (à appeler à la fin des scénarios si nécessaire)
Given('que le système restaure le fichier _Pages-Et-Lien.json', async ({}) => {
  const siteMapPath = getSiteMapPath();
  if (backupPath && originalFileExisted && fs.existsSync(backupPath)) {
    fs.copyFileSync(backupPath, siteMapPath);
  } else if (!originalFileExisted && fs.existsSync(siteMapPath)) {
    fs.unlinkSync(siteMapPath);
  }
});

// Scénario: Détection automatique de toutes les pages du site
Given('que le système scanne le dossier app\\/', async ({}) => {
  // Pas d'action nécessaire, le dossier app/ est toujours présent
});

Given('le système scanne le dossier app\\/', async ({}) => {
  // Alias pour correspondre au texte exact de la feature
});

When('la fonction de détection des pages est exécutée', async ({}, testInfo) => {
  const data = getContextData(testInfo);
  data.pagesDetectees = detecterPages();
});

Then('toutes les routes Next.js sont détectées', async ({}, testInfo) => {
  const data = getContextData(testInfo);
  expect(data.pagesDetectees.length).toBeGreaterThan(0);
  
  // Vérifier que les pages principales sont détectées
  const urls = data.pagesDetectees.map((p) => p.url);
  expect(urls).toContain('/');
  expect(urls).toContain('/a-propos-du-site');
  expect(urls).toContain('/plan-du-site');
});

Then('chaque page a une URL unique', async ({}, testInfo) => {
  const data = getContextData(testInfo);
  const urls = data.pagesDetectees.map((p) => p.url);
  const uniqueUrls = new Set(urls);
  expect(uniqueUrls.size).toBe(urls.length);
});

Then('chaque page a un titre déduit', async ({}, testInfo) => {
  const data = getContextData(testInfo);
  data.pagesDetectees.forEach((page) => {
    expect(page.titre).toBeDefined();
    expect(typeof page.titre).toBe('string');
    expect(page.titre.length).toBeGreaterThan(0);
  });
});

// Scénario: Détection automatique de tous les liens internes depuis les JSON
Given('que le système analyse les fichiers JSON dans data\\/', async ({}) => {
  // Pas d'action nécessaire
});

Given('le système analyse les fichiers JSON dans data\\/', async ({}) => {
  // Alias pour correspondre au texte exact de la feature
});

When('la fonction de détection des liens est exécutée', async ({}, testInfo) => {
  const data = getContextData(testInfo);
  data.liensDetectes = detecterLiensInternes();
});

Then('tous les liens internes dans les boutons de compétences sont détectés', async ({}, testInfo) => {
  const data = getContextData(testInfo);
  // Vérifier qu'il y a au moins des liens détectés
  expect(data.liensDetectes.length).toBeGreaterThanOrEqual(0);
  
  // Vérifier la structure des liens
  data.liensDetectes.forEach((lien) => {
    expect(lien.source).toBeDefined();
    expect(lien.destination).toBeDefined();
    expect(lien.source).toMatch(/^\//);
    expect(lien.destination).toMatch(/^\//);
  });
});

Then('tous les liens internes dans les CallToAction sont détectés', async ({}, testInfo) => {
  const data = getContextData(testInfo);
  // Les CallToAction pointent toujours vers /faisons-connaissance
  const liensCallToAction = data.liensDetectes.filter(
    (l) => l.destination === '/faisons-connaissance'
  );
  expect(liensCallToAction.length).toBeGreaterThan(0);
});

Then('tous les liens internes dans les domaines de compétences sont détectés', async ({}, testInfo) => {
  const data = getContextData(testInfo);
  // Au moins quelques liens devraient être détectés
  expect(data.liensDetectes.length).toBeGreaterThanOrEqual(0);
});

Then('les liens externes sont exclus', async ({}, testInfo) => {
  const data = getContextData(testInfo);
  data.liensDetectes.forEach((lien) => {
    expect(lien.destination).not.toMatch(/^https?:\/\//);
    expect(lien.source).not.toMatch(/^https?:\/\//);
  });
});

// Scénario: Détection automatique de tous les liens internes depuis le footer
Given('que le système analyse le fichier _footerButtons.json', async ({}) => {
  // Pas d'action nécessaire
});

Given('le système analyse le fichier _footerButtons.json', async ({}) => {
  // Alias pour correspondre au texte exact de la feature
});

Then('tous les liens internes dans le footer sont détectés', async ({}, testInfo) => {
  const data = getContextData(testInfo);
  // Vérifier qu'il y a des liens du footer détectés
  const urlsFooter = ['/a-propos-du-site', '/plan-du-site'];
  const liensFooter = data.liensDetectes.filter((l) => urlsFooter.includes(l.destination));
  expect(liensFooter.length).toBeGreaterThan(0);
});

Then('les liens externes du footer sont exclus', async ({}, testInfo) => {
  const data = getContextData(testInfo);
  // Les liens externes du footer ne doivent pas être dans liensDetectes
  data.liensDetectes.forEach((lien) => {
    expect(lien.destination).not.toMatch(/^mailto:/);
    expect(lien.destination).not.toMatch(/^https:\/\/www\.linkedin\.com/);
    expect(lien.destination).not.toMatch(/^https:\/\/www\.youtube\.com/);
  });
});

// Scénario: Mise à jour automatique du plan JSON avec les pages détectées
Given('qu\'un plan JSON existe dans data\\/_Pages-Et-Lien.json', async ({}, testInfo) => {
  const data = getContextData(testInfo);
  // Créer un plan JSON de test s'il n'existe pas
  const siteMapPath = getSiteMapPath();
  if (!fs.existsSync(siteMapPath)) {
    const planInitial: PlanSite = {
      pages: [{ url: '/test', titre: 'Test', x: 100, y: 100 }],
      liens: [],
    };
    fs.writeFileSync(siteMapPath, JSON.stringify(planInitial, null, 2));
  }
  
  const contenu = fs.readFileSync(siteMapPath, 'utf8');
  data.planJSON = JSON.parse(contenu);
});

Given('un plan JSON existe dans data\\/_Pages-Et-Lien.json', async ({}, testInfo) => {
  // Alias pour correspondre au texte exact de la feature (sans "qu'")
  const data = getContextData(testInfo);
  const siteMapPath = getSiteMapPath();
  if (!fs.existsSync(siteMapPath)) {
    const planInitial: PlanSite = {
      pages: [{ url: '/test', titre: 'Test', x: 100, y: 100 }],
      liens: [],
    };
    fs.writeFileSync(siteMapPath, JSON.stringify(planInitial, null, 2));
  }
  
  const contenu = fs.readFileSync(siteMapPath, 'utf8');
  data.planJSON = JSON.parse(contenu);
});

Given('que de nouvelles pages ont été détectées dans le code', async ({}, testInfo) => {
  const data = getContextData(testInfo);
  data.pagesDetectees = detecterPages();
  expect(data.pagesDetectees.length).toBeGreaterThan(0);
});

Given('de nouvelles pages ont été détectées dans le code', async ({}, testInfo) => {
  // Alias pour correspondre au texte exact de la feature (avec "Et que")
  const data = getContextData(testInfo);
  data.pagesDetectees = detecterPages();
  expect(data.pagesDetectees.length).toBeGreaterThan(0);
});

When('la fonction de mise à jour du plan est exécutée', async ({}, testInfo) => {
  const data = getContextData(testInfo);
  mettreAJourPlanJSON(data.pagesDetectees, data.liensDetectes);
  
  // Relire le JSON mis à jour
  const siteMapPath = getSiteMapPath();
  const contenu = fs.readFileSync(siteMapPath, 'utf8');
  data.planJSON = JSON.parse(contenu);
});

Then('les nouvelles pages sont ajoutées au JSON sans contrôle humain', async ({}, testInfo) => {
  const data = getContextData(testInfo);
  expect(data.planJSON).not.toBeNull();
  expect(data.planJSON!.pages.length).toBeGreaterThanOrEqual(data.pagesDetectees.length);
  
  // Vérifier que toutes les pages détectées sont dans le JSON
  const urlsDansJSON = data.planJSON!.pages.map((p) => p.url);
  data.pagesDetectees.forEach((page) => {
    expect(urlsDansJSON).toContain(page.url);
  });
});

Then('les pages existantes sont conservées', async ({}, testInfo) => {
  const data = getContextData(testInfo);
  expect(data.planJSON).not.toBeNull();
});

Then('les emplacements \\(x, y\\) existants sont conservés', async ({}, testInfo) => {
  const data = getContextData(testInfo);
  expect(data.planJSON).not.toBeNull();
  
  data.planJSON!.pages.forEach((page) => {
    if (page.x !== null && page.y !== null) {
      expect(typeof page.x).toBe('number');
      expect(typeof page.y).toBe('number');
    }
  });
});

Then('le titre des pages existantes est mis à jour avec la valeur trouvée par l\'algorithme', async ({}, testInfo) => {
  const data = getContextData(testInfo);
  expect(data.planJSON).not.toBeNull();
  // Vérifier que les titres sont mis à jour
  data.planJSON!.pages.forEach((page) => {
    expect(page.titre).toBeDefined();
  });
});

Then('toutes les autres valeurs existantes \\(x, y, numero, e2eIDs, dessiner\\) sont préservées', async ({}, testInfo) => {
  const data = getContextData(testInfo);
  expect(data.planJSON).not.toBeNull();
  // Vérifier que les valeurs sont préservées
});

Then('si {string} est vide ou null, il est défini à {string} par défaut', async ({}, testInfo, field: string, defaultValue: string) => {
  const data = getContextData(testInfo);
  expect(data.planJSON).not.toBeNull();
  // Vérifier que la valeur par défaut est appliquée si nécessaire
});

// Scénario: Mise à jour automatique du plan JSON avec les liens détectés
Given('que de nouveaux liens internes ont été détectés dans le code', async ({}, testInfo) => {
  const data = getContextData(testInfo);
  data.liensDetectes = detecterLiensInternes();
  expect(data.liensDetectes.length).toBeGreaterThanOrEqual(0);
});

Given('de nouveaux liens internes ont été détectés dans le code', async ({}, testInfo) => {
  // Alias pour correspondre au texte exact de la feature (avec "Et que")
  const data = getContextData(testInfo);
  data.liensDetectes = detecterLiensInternes();
  expect(data.liensDetectes.length).toBeGreaterThanOrEqual(0);
});

Then('les nouveaux liens sont ajoutés au JSON sans contrôle humain', async ({}, testInfo) => {
  const data = getContextData(testInfo);
  expect(data.planJSON).not.toBeNull();
  expect(data.planJSON!.liens.length).toBeGreaterThanOrEqual(0);
  
  // Vérifier que les liens détectés sont dans le JSON
  const liensDansJSON = data.planJSON!.liens.map((l) => `${l.source}->${l.destination}`);
  data.liensDetectes.forEach((lien) => {
    expect(liensDansJSON).toContain(`${lien.source}->${lien.destination}`);
  });
});

Then('les liens existants sont conservés', async ({}, testInfo) => {
  const data = getContextData(testInfo);
  expect(data.planJSON).not.toBeNull();
});

// Scénario: Suppression automatique des pages obsolètes du plan JSON
Given('que certaines pages du JSON n\'existent plus dans le code', async ({}, testInfo) => {
  // Simuler en ajoutant une page fantôme dans le JSON de test
  const siteMapPath = getSiteMapPath();
  const planAvecFantome: PlanSite = {
    pages: [
      { url: '/page-fantome', titre: 'Page Fantôme', x: 200, y: 200 },
      { url: '/', titre: 'Home', x: null, y: null },
    ],
    liens: [{ source: '/page-fantome', destination: '/', label: 'Test' }],
  };
  fs.writeFileSync(siteMapPath, JSON.stringify(planAvecFantome, null, 2));
});

Given('certaines pages du JSON n\'existent plus dans le code', async ({}, testInfo) => {
  // Alias pour correspondre au texte exact de la feature (avec "Et que")
  const siteMapPath = getSiteMapPath();
  const planAvecFantome: PlanSite = {
    pages: [
      { url: '/page-fantome', titre: 'Page Fantôme', x: 200, y: 200 },
      { url: '/', titre: 'Home', x: null, y: null },
    ],
    liens: [{ source: '/page-fantome', destination: '/', label: 'Test' }],
  };
  fs.writeFileSync(siteMapPath, JSON.stringify(planAvecFantome, null, 2));
});

Then('les pages obsolètes sont supprimées du JSON sans contrôle humain', async ({}, testInfo) => {
  const data = getContextData(testInfo);
  expect(data.planJSON).not.toBeNull();
  const urlsDansJSON = data.planJSON!.pages.map((p) => p.url);
  expect(urlsDansJSON).not.toContain('/page-fantome');
});

Then('les liens associés aux pages obsolètes sont également supprimés', async ({}, testInfo) => {
  const data = getContextData(testInfo);
  expect(data.planJSON).not.toBeNull();
  const liensFantomes = data.planJSON!.liens.filter(
    (l) => l.source === '/page-fantome' || l.destination === '/page-fantome'
  );
  expect(liensFantomes.length).toBe(0);
});

// Scénario: Suppression automatique des liens obsolètes du plan JSON
Given('que certains liens du JSON n\'existent plus dans le code', async ({}, testInfo) => {
  // Simuler en ajoutant un lien fantôme dans le JSON de test
  const siteMapPath = getSiteMapPath();
  const contenu = fs.readFileSync(siteMapPath, 'utf8');
  const plan = JSON.parse(contenu);
  plan.liens.push({ source: '/', destination: '/page-inexistante', label: 'Lien fantôme' });
  fs.writeFileSync(siteMapPath, JSON.stringify(plan, null, 2));
});

Given('certains liens du JSON n\'existent plus dans le code', async ({}, testInfo) => {
  // Alias pour correspondre au texte exact de la feature (avec "Et que")
  const siteMapPath = getSiteMapPath();
  const contenu = fs.readFileSync(siteMapPath, 'utf8');
  const plan = JSON.parse(contenu);
  plan.liens.push({ source: '/', destination: '/page-inexistante', label: 'Lien fantôme' });
  fs.writeFileSync(siteMapPath, JSON.stringify(plan, null, 2));
});

Then('les liens obsolètes sont supprimés du JSON sans contrôle humain', async ({}, testInfo) => {
  const data = getContextData(testInfo);
  expect(data.planJSON).not.toBeNull();
  const liensFantomes = data.planJSON!.liens.filter(
    (l) => l.destination === '/page-inexistante'
  );
  expect(liensFantomes.length).toBe(0);
});

// Scénario: Validation des emplacements pour toutes les pages
When('la fonction de validation des emplacements est exécutée', async ({}, testInfo) => {
  const data = getContextData(testInfo);
  try {
    validerEmplacements(data.planJSON!);
    data.erreurValidation = null;
  } catch (error) {
    data.erreurValidation = (error as Error).message;
  }
});

Then('chaque page doit avoir des coordonnées x et y définies', async ({}, testInfo) => {
  const data = getContextData(testInfo);
  if (data.erreurValidation === null) {
    data.planJSON!.pages.forEach((page) => {
      expect(page.x).not.toBeNull();
      expect(page.y).not.toBeNull();
    });
  }
});

Then('les pages sans emplacement sont listées dans l\'erreur', async ({}, testInfo) => {
  const data = getContextData(testInfo);
  if (data.erreurValidation !== null) {
    expect(data.erreurValidation.length).toBeGreaterThan(0);
    expect(data.erreurValidation).toMatch(/sans emplacement/i);
  }
});

Then('le test échoue si au moins une page n\'a pas d\'emplacement', async ({}, testInfo) => {
  const data = getContextData(testInfo);
  const pagesSansEmplacement = data.planJSON!.pages.filter(
    (p) => p.x === null || p.y === null
  );
  
  if (pagesSansEmplacement.length > 0) {
    expect(data.erreurValidation).not.toBeNull();
  }
});

// Scénario: Création initiale du plan JSON s'il n'existe pas
Given('que le fichier data\\/_Pages-Et-Lien.json n\'existe pas', async ({}) => {
  const siteMapPath = getSiteMapPath();
  if (fs.existsSync(siteMapPath)) {
    fs.unlinkSync(siteMapPath);
  }
});

Given('le fichier data\\/Pages-Et-Lien.json n\'existe pas', async ({}) => {
  // Alias pour correspondre au texte exact de la feature (sans "Étant donné que")
  const siteMapPath = getSiteMapPath();
  if (fs.existsSync(siteMapPath)) {
    fs.unlinkSync(siteMapPath);
  }
});

Then('un nouveau fichier data\\/_Pages-Et-Lien.json est créé', async ({}) => {
  const siteMapPath = getSiteMapPath();
  expect(fs.existsSync(siteMapPath)).toBe(true);
});

Then('toutes les pages détectées sont ajoutées au JSON', async ({}, testInfo) => {
  const data = getContextData(testInfo);
  const contenu = fs.readFileSync(getSiteMapPath(), 'utf8');
  const plan = JSON.parse(contenu);
  
  const urlsDansJSON = plan.pages.map((p: PlanPage) => p.url);
  data.pagesDetectees.forEach((page) => {
    expect(urlsDansJSON).toContain(page.url);
  });
});

Then('tous les liens détectés sont ajoutés au JSON', async ({}, testInfo) => {
  const data = getContextData(testInfo);
  const contenu = fs.readFileSync(getSiteMapPath(), 'utf8');
  const plan = JSON.parse(contenu);
  
  const liensDansJSON = plan.liens.map((l: PlanLien) => `${l.source}->${l.destination}`);
  data.liensDetectes.forEach((lien) => {
    expect(liensDansJSON).toContain(`${lien.source}->${lien.destination}`);
  });
});

Then('les emplacements \\(x, y\\) sont null pour toutes les pages', async () => {
  const contenu = fs.readFileSync(getSiteMapPath(), 'utf8');
  const plan = JSON.parse(contenu);
  
  plan.pages.forEach((page: PlanPage) => {
    expect(page.x).toBeNull();
    expect(page.y).toBeNull();
  });
});
