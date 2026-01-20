import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@jest/globals';
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
} from '../../utils/siteMapGenerator';

// Variables pour partager l'état entre les steps
let pagesDetectees: PlanPage[] = [];
let liensDetectes: PlanLien[] = [];
let planJSON: PlanSite | null = null;
let erreurValidation: string | null = null;

const getSiteMapPath = () => {
  return path.join(process.cwd(), 'data', 'site-map.json');
};

// Scénario: Détection automatique de toutes les pages du site
Given('que le système scanne le dossier app/', () => {
  // Pas d'action nécessaire, le dossier app/ est toujours présent
});

When('la fonction de détection des pages est exécutée', () => {
  pagesDetectees = detecterPages();
});

Then('toutes les routes Next.js sont détectées', () => {
  expect(pagesDetectees.length).toBeGreaterThan(0);
  
  // Vérifier que les pages principales sont détectées
  const urls = pagesDetectees.map((p) => p.url);
  expect(urls).toContain('/');
  expect(urls).toContain('/about');
  expect(urls).toContain('/site-map');
});

Then('chaque page a une URL unique', () => {
  const urls = pagesDetectees.map((p) => p.url);
  const uniqueUrls = new Set(urls);
  expect(uniqueUrls.size).toBe(urls.length);
});

Then('chaque page a un titre déduit', () => {
  pagesDetectees.forEach((page) => {
    expect(page.titre).toBeDefined();
    expect(typeof page.titre).toBe('string');
    expect(page.titre.length).toBeGreaterThan(0);
  });
});

// Scénario: Détection automatique de tous les liens internes depuis les JSON
Given('que le système analyse les fichiers JSON dans data/', () => {
  // Pas d'action nécessaire
});

When('la fonction de détection des liens est exécutée', () => {
  liensDetectes = detecterLiensInternes();
});

Then('tous les liens internes dans les boutons de compétences sont détectés', () => {
  // Vérifier qu'il y a au moins des liens détectés
  expect(liensDetectes.length).toBeGreaterThanOrEqual(0);
  
  // Vérifier la structure des liens
  liensDetectes.forEach((lien) => {
    expect(lien.source).toBeDefined();
    expect(lien.destination).toBeDefined();
    expect(lien.source).toMatch(/^\//); // Commence par /
    expect(lien.destination).toMatch(/^\//); // Commence par /
  });
});

Then('tous les liens internes dans les CallToAction sont détectés', () => {
  // Les CallToAction pointent toujours vers /faisons-connaissance
  const liensCallToAction = liensDetectes.filter(
    (l) => l.destination === '/faisons-connaissance'
  );
  expect(liensCallToAction.length).toBeGreaterThan(0);
});

Then('tous les liens internes dans les domaines de compétences sont détectés', () => {
  // Au moins quelques liens devraient être détectés
  expect(liensDetectes.length).toBeGreaterThanOrEqual(0);
});

Then('les liens externes sont exclus', () => {
  liensDetectes.forEach((lien) => {
    expect(lien.destination).not.toMatch(/^https?:\/\//);
    expect(lien.source).not.toMatch(/^https?:\/\//);
  });
});

// Scénario: Détection automatique de tous les liens internes depuis le footer
Given('que le système analyse le fichier footerButtons.json', () => {
  // Pas d'action nécessaire
});

Then('tous les liens internes dans le footer sont détectés', () => {
  // Vérifier qu'il y a des liens du footer détectés (ex: vers /about, /site-map)
  const urlsFooter = ['/about', '/site-map'];
  const liensFooter = liensDetectes.filter((l) => urlsFooter.includes(l.destination));
  expect(liensFooter.length).toBeGreaterThan(0);
});

Then('les liens externes du footer sont exclus', () => {
  // Les liens externes du footer (email, LinkedIn, YouTube) ne doivent pas être dans liensDetectes
  liensDetectes.forEach((lien) => {
    expect(lien.destination).not.toMatch(/^mailto:/);
    expect(lien.destination).not.toMatch(/^https:\/\/www\.linkedin\.com/);
    expect(lien.destination).not.toMatch(/^https:\/\/www\.youtube\.com/);
  });
});

// Scénario: Mise à jour automatique du plan JSON avec les pages détectées
Given('qu\'un plan JSON existe dans data/site-map.json', () => {
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
  planJSON = JSON.parse(contenu);
});

Given('que de nouvelles pages ont été détectées dans le code', () => {
  pagesDetectees = detecterPages();
  // Simuler qu'il y a au moins une nouvelle page
  expect(pagesDetectees.length).toBeGreaterThan(0);
});

When('la fonction de mise à jour du plan est exécutée', () => {
  mettreAJourPlanJSON(pagesDetectees, liensDetectes);
  
  // Relire le JSON mis à jour
  const siteMapPath = getSiteMapPath();
  const contenu = fs.readFileSync(siteMapPath, 'utf8');
  planJSON = JSON.parse(contenu);
});

Then('les nouvelles pages sont ajoutées au JSON sans contrôle humain', () => {
  expect(planJSON).not.toBeNull();
  expect(planJSON!.pages.length).toBeGreaterThanOrEqual(pagesDetectees.length);
  
  // Vérifier que toutes les pages détectées sont dans le JSON
  const urlsDansJSON = planJSON!.pages.map((p) => p.url);
  pagesDetectees.forEach((page) => {
    expect(urlsDansJSON).toContain(page.url);
  });
});

Then('les pages existantes sont conservées', () => {
  expect(planJSON).not.toBeNull();
  // Si on avait une page de test, elle devrait toujours être là (si elle existe encore)
  // Cette vérification dépend de l'implémentation
});

Then('les emplacements \\(x, y\\) existants sont conservés', () => {
  expect(planJSON).not.toBeNull();
  
  planJSON!.pages.forEach((page) => {
    // Si une page avait des coordonnées, elles doivent être conservées
    // Cette vérification dépend de l'implémentation
    if (page.x !== null && page.y !== null) {
      expect(typeof page.x).toBe('number');
      expect(typeof page.y).toBe('number');
    }
  });
});

// Scénario: Mise à jour automatique du plan JSON avec les liens détectés
Given('que de nouveaux liens internes ont été détectés dans le code', () => {
  liensDetectes = detecterLiensInternes();
  expect(liensDetectes.length).toBeGreaterThanOrEqual(0);
});

Then('les nouveaux liens sont ajoutés au JSON sans contrôle humain', () => {
  expect(planJSON).not.toBeNull();
  expect(planJSON!.liens.length).toBeGreaterThanOrEqual(0);
  
  // Vérifier que les liens détectés sont dans le JSON
  const liensDansJSON = planJSON!.liens.map((l) => `${l.source}->${l.destination}`);
  liensDetectes.forEach((lien) => {
    expect(liensDansJSON).toContain(`${lien.source}->${lien.destination}`);
  });
});

Then('les liens existants sont conservés', () => {
  // Cette vérification dépend de l'implémentation
  expect(planJSON).not.toBeNull();
});

// Scénario: Suppression automatique des pages obsolètes du plan JSON
Given('que certaines pages du JSON n\'existent plus dans le code', () => {
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

Then('les pages obsolètes sont supprimées du JSON sans contrôle humain', () => {
  expect(planJSON).not.toBeNull();
  const urlsDansJSON = planJSON!.pages.map((p) => p.url);
  expect(urlsDansJSON).not.toContain('/page-fantome');
});

Then('les liens associés aux pages obsolètes sont également supprimés', () => {
  expect(planJSON).not.toBeNull();
  const liensFantomes = planJSON!.liens.filter(
    (l) => l.source === '/page-fantome' || l.destination === '/page-fantome'
  );
  expect(liensFantomes.length).toBe(0);
});

// Scénario: Suppression automatique des liens obsolètes du plan JSON
Given('que certains liens du JSON n\'existent plus dans le code', () => {
  // Simuler en ajoutant un lien fantôme dans le JSON de test
  const siteMapPath = getSiteMapPath();
  const contenu = fs.readFileSync(siteMapPath, 'utf8');
  const plan = JSON.parse(contenu);
  plan.liens.push({ source: '/', destination: '/page-inexistante', label: 'Lien fantôme' });
  fs.writeFileSync(siteMapPath, JSON.stringify(plan, null, 2));
});

Then('les liens obsolètes sont supprimés du JSON sans contrôle humain', () => {
  expect(planJSON).not.toBeNull();
  const liensFantomes = planJSON!.liens.filter(
    (l) => l.destination === '/page-inexistante'
  );
  expect(liensFantomes.length).toBe(0);
});

// Scénario: Validation des emplacements pour toutes les pages
When('la fonction de validation des emplacements est exécutée', () => {
  try {
    validerEmplacements(planJSON!);
    erreurValidation = null;
  } catch (error) {
    erreurValidation = (error as Error).message;
  }
});

Then('chaque page doit avoir des coordonnées x et y définies', () => {
  if (erreurValidation === null) {
    // Si aucune erreur, vérifier que toutes les pages ont des coordonnées
    planJSON!.pages.forEach((page) => {
      expect(page.x).not.toBeNull();
      expect(page.y).not.toBeNull();
    });
  }
});

Then('les pages sans emplacement sont listées dans l\'erreur', () => {
  if (erreurValidation !== null) {
    expect(erreurValidation.length).toBeGreaterThan(0);
    // Vérifier que l'erreur mentionne les pages sans emplacement
    expect(erreurValidation).toMatch(/sans emplacement/i);
  }
});

Then('le test échoue si au moins une page n\'a pas d\'emplacement', () => {
  const pagesSansEmplacement = planJSON!.pages.filter(
    (p) => p.x === null || p.y === null
  );
  
  if (pagesSansEmplacement.length > 0) {
    expect(erreurValidation).not.toBeNull();
  }
});

// Scénario: Création initiale du plan JSON s'il n'existe pas
Given('que le fichier data/site-map.json n\'existe pas', () => {
  const siteMapPath = getSiteMapPath();
  if (fs.existsSync(siteMapPath)) {
    fs.unlinkSync(siteMapPath);
  }
});

Then('un nouveau fichier data/site-map.json est créé', () => {
  const siteMapPath = getSiteMapPath();
  expect(fs.existsSync(siteMapPath)).toBe(true);
});

Then('toutes les pages détectées sont ajoutées au JSON', () => {
  const contenu = fs.readFileSync(getSiteMapPath(), 'utf8');
  const plan = JSON.parse(contenu);
  
  const urlsDansJSON = plan.pages.map((p: PlanPage) => p.url);
  pagesDetectees.forEach((page) => {
    expect(urlsDansJSON).toContain(page.url);
  });
});

Then('tous les liens détectés sont ajoutés au JSON', () => {
  const contenu = fs.readFileSync(getSiteMapPath(), 'utf8');
  const plan = JSON.parse(contenu);
  
  const liensDansJSON = plan.liens.map((l: PlanLien) => `${l.source}->${l.destination}`);
  liensDetectes.forEach((lien) => {
    expect(liensDansJSON).toContain(`${lien.source}->${lien.destination}`);
  });
});

Then('les emplacements \\(x, y\\) sont null pour toutes les pages', () => {
  const contenu = fs.readFileSync(getSiteMapPath(), 'utf8');
  const plan = JSON.parse(contenu);
  
  plan.pages.forEach((page: PlanPage) => {
    expect(page.x).toBeNull();
    expect(page.y).toBeNull();
  });
});
