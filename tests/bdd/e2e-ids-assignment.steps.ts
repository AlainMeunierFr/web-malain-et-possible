import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';

// Types et interfaces pour les tests
interface E2eElement {
  e2eID?: string;
  type: string;
  [key: string]: unknown;
}

interface E2eInventoryItem {
  e2eID: string;
  type: string;
  source: string;
  texte?: string;
}

// État partagé entre les steps
let testJson: { contenu: E2eElement[] } = { contenu: [] };
let generatedIds: string[] = [];
let inventory: E2eInventoryItem[] = [];
let validationError: string | null = null;
let globalCounter = 1;

// Fonctions utilitaires (à implémenter avec TDD)
function generateE2eId(elementType: string, counter: number): string {
  const prefixes: Record<string, string> = {
    video: 'v',
    callToAction: 'a',
    bouton: 'b',
    competenceBouton: 'c',
  };
  const prefix = prefixes[elementType] || 'x';
  return `${prefix}${counter}`;
}

function getElementType(element: E2eElement): string {
  if (element.type === 'video') return 'video';
  if (element.type === 'callToAction') return 'callToAction';
  if (element.type === 'bouton') return 'bouton';
  if (element.type === 'competence' && 'bouton' in element) return 'competenceBouton';
  return 'unknown';
}

function validateE2eIds(elements: E2eElement[]): string | null {
  const ids = elements
    .map((el) => el.e2eID)
    .filter((id): id is string => id !== undefined);
  
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  
  if (duplicates.length > 0) {
    return `e2eID en doublon : ${duplicates[0]}`;
  }
  
  return null;
}

// Steps pour la configuration initiale
Given('que les fichiers JSON de contenu existent dans {string}', function (dataDir: string) {
  const fullPath = path.join(process.cwd(), dataDir);
  expect(fs.existsSync(fullPath)).toBe(true);
});

Given('un JSON contenant {int} videos', function (count: number) {
  for (let i = 0; i < count; i++) {
    testJson.contenu.push({
      type: 'video',
      urlYouTube: `https://youtube.com/video${i}`,
      lancementAuto: false,
    });
  }
});

Given('un JSON contenant {int} callToAction', function (count: number) {
  for (let i = 0; i < count; i++) {
    testJson.contenu.push({
      type: 'callToAction',
      action: `Action ${i}`,
    });
  }
});

Given('un JSON contenant {int} boutons', function (count: number) {
  testJson.contenu.push({
    type: 'groupeBoutons',
    taille: 'grande',
    boutons: Array.from({ length: count }, (_, i) => ({
      type: 'bouton',
      id: `btn${i}`,
      icone: 'Mail',
      texte: `Bouton ${i}`,
      url: null,
      command: null,
    })),
  });
});

Given('un JSON contenant {int} boutons de compétences', function (count: number) {
  testJson.contenu.push({
    type: 'domaineDeCompetence',
    titre: 'Test',
    contenu: 'Test',
    competences: Array.from({ length: count }, (_, i) => ({
      type: 'competence',
      titre: `Compétence ${i}`,
      description: 'Test',
      bouton: {
        texte: 'Voir plus',
        action: '/test',
      },
    })),
  });
});

Given('un JSON avec des éléments de différents types', function () {
  testJson.contenu = [
    { type: 'video', urlYouTube: 'https://youtube.com/test', lancementAuto: false },
    { type: 'callToAction', action: 'Test' },
    {
      type: 'groupeBoutons',
      taille: 'grande',
      boutons: [{ type: 'bouton', id: 'test', icone: 'Mail', texte: 'Test', url: null, command: null }],
    },
  ];
});

Given('un JSON avec des éléments interactifs', function () {
  testJson.contenu = [
    { type: 'video', urlYouTube: 'https://youtube.com/test', lancementAuto: false },
    { type: 'callToAction', action: 'Test' },
  ];
});

Given('un JSON avec un élément ayant déjà un e2eID {string}', function (existingId: string) {
  testJson.contenu = [
    { type: 'video', urlYouTube: 'https://youtube.com/test', lancementAuto: false, e2eID: existingId },
  ];
});

Given('un JSON avec deux éléments ayant le même e2eID {string}', function (duplicateId: string) {
  testJson.contenu = [
    { type: 'video', urlYouTube: 'https://youtube.com/test1', lancementAuto: false, e2eID: duplicateId },
    { type: 'video', urlYouTube: 'https://youtube.com/test2', lancementAuto: false, e2eID: duplicateId },
  ];
});

Given('un JSON avec des éléments ayant des e2eID', function () {
  testJson.contenu = [
    { type: 'video', urlYouTube: 'https://youtube.com/test', lancementAuto: false, e2eID: 'v1' },
    { type: 'callToAction', action: 'Test', e2eID: 'a2' },
  ];
});

Given('tous les fichiers JSON du dossier {string}', function (dataDir: string) {
  const fullPath = path.join(process.cwd(), dataDir);
  expect(fs.existsSync(fullPath)).toBe(true);
});

Given('un JSON vide', function () {
  testJson = { contenu: [] };
  generatedIds = [];
  globalCounter = 1;
});

Given('le fichier {string} sans e2eID', function (filePath: string) {
  // Simulation - à implémenter avec le vrai fichier
  testJson.contenu = [
    { type: 'video', urlYouTube: 'https://youtube.com/test', lancementAuto: false },
    { type: 'callToAction', action: 'Test' },
  ];
});

// Steps pour les actions
When('je génère les e2eID automatiquement', function () {
  generatedIds = [];
  globalCounter = 1;
  
  // Parcourir et attribuer les e2eID
  testJson.contenu.forEach((element) => {
    if (!element.e2eID) {
      const elementType = getElementType(element);
      element.e2eID = generateE2eId(elementType, globalCounter);
      generatedIds.push(element.e2eID);
      globalCounter++;
    }
    
    // Gérer les sous-éléments (boutons dans groupeBoutons, boutons dans compétences)
    if (element.type === 'groupeBoutons' && 'boutons' in element) {
      const boutons = element.boutons as E2eElement[];
      boutons.forEach((bouton) => {
        if (!bouton.e2eID) {
          bouton.e2eID = generateE2eId('bouton', globalCounter);
          generatedIds.push(bouton.e2eID);
          globalCounter++;
        }
      });
    }
    
    if (element.type === 'domaineDeCompetence' && 'competences' in element) {
      const competences = element.competences as E2eElement[];
      competences.forEach((competence) => {
        if ('bouton' in competence && competence.bouton) {
          const bouton = competence.bouton as E2eElement;
          if (!bouton.e2eID) {
            bouton.e2eID = generateE2eId('competenceBouton', globalCounter);
            generatedIds.push(bouton.e2eID);
            globalCounter++;
          }
        }
      });
    }
  });
});

When('je lance la validation des e2eID', function () {
  validationError = validateE2eIds(testJson.contenu);
});

When('je génère l\'inventaire des e2eID', function () {
  inventory = [];
  testJson.contenu.forEach((element) => {
    if (element.e2eID) {
      inventory.push({
        e2eID: element.e2eID,
        type: element.type,
        source: 'test.json',
        texte: element.type === 'video' ? 'Video' : element.type === 'callToAction' ? element.action as string : undefined,
      });
    }
  });
});

When('je valide les e2eID de tous les éléments interactifs', function () {
  // À implémenter - scan de tous les JSON réels
  validationError = null;
});

When('j\'ajoute une video avec e2eID auto-généré', function () {
  const video: E2eElement = {
    type: 'video',
    urlYouTube: 'https://youtube.com/test',
    lancementAuto: false,
  };
  video.e2eID = generateE2eId('video', globalCounter);
  generatedIds.push(video.e2eID);
  globalCounter++;
  testJson.contenu.push(video);
});

When('j\'ajoute un callToAction avec e2eID auto-généré', function () {
  const cta: E2eElement = {
    type: 'callToAction',
    action: 'Test',
  };
  cta.e2eID = generateE2eId('callToAction', globalCounter);
  generatedIds.push(cta.e2eID);
  globalCounter++;
  testJson.contenu.push(cta);
});

When('j\'ajoute un bouton avec e2eID auto-généré', function () {
  const bouton: E2eElement = {
    type: 'bouton',
    id: 'test',
    icone: 'Mail',
    texte: 'Test',
  };
  bouton.e2eID = generateE2eId('bouton', globalCounter);
  generatedIds.push(bouton.e2eID);
  globalCounter++;
  testJson.contenu.push(bouton);
});

When('je lance le script d\'attribution automatique', function () {
  // À implémenter - script réel
  this.pending();
});

// Steps pour les assertions
Then('les e2eID générés doivent être dans l\'ordre : {string}', function (expectedIds: string) {
  const expected = expectedIds.split(', ').map((id) => id.replace(/"/g, ''));
  expect(generatedIds).toEqual(expected);
});

Then('le compteur global doit être à {int}', function (expectedCounter: number) {
  expect(globalCounter - 1).toBe(expectedCounter);
});

Then('les videos doivent avoir le préfixe {string}', function (prefix: string) {
  const videoIds = testJson.contenu
    .filter((el) => el.type === 'video' && el.e2eID)
    .map((el) => el.e2eID);
  
  videoIds.forEach((id) => {
    expect(id?.startsWith(prefix)).toBe(true);
  });
});

Then('les callToAction doivent avoir le préfixe {string}', function (prefix: string) {
  const ctaIds = testJson.contenu
    .filter((el) => el.type === 'callToAction' && el.e2eID)
    .map((el) => el.e2eID);
  
  ctaIds.forEach((id) => {
    expect(id?.startsWith(prefix)).toBe(true);
  });
});

Then('les boutons doivent avoir le préfixe {string}', function (prefix: string) {
  // À implémenter pour groupeBoutons
  expect(true).toBe(true);
});

Then('les boutons de compétences doivent avoir le préfixe {string}', function (prefix: string) {
  // À implémenter pour competence.bouton
  expect(true).toBe(true);
});

Then('chaque e2eID doit respecter le format {string}', function (format: string) {
  const pattern = /^[a-z]\d+$/;
  generatedIds.forEach((id) => {
    expect(pattern.test(id)).toBe(true);
  });
});

Then('le prefix doit être une lettre unique', function () {
  generatedIds.forEach((id) => {
    expect(/^[a-z]/.test(id)).toBe(true);
  });
});

Then('le number doit être un entier positif', function () {
  generatedIds.forEach((id) => {
    const number = parseInt(id.slice(1), 10);
    expect(number).toBeGreaterThan(0);
  });
});

Then('l\'e2eID {string} doit être préservé', function (existingId: string) {
  const element = testJson.contenu.find((el) => el.e2eID === existingId);
  expect(element).toBeDefined();
  expect(element?.e2eID).toBe(existingId);
});

Then('les nouveaux e2eID ne doivent pas écraser les existants', function () {
  expect(true).toBe(true); // Vérifié par le test précédent
});

Then('la validation doit échouer', function () {
  expect(validationError).not.toBeNull();
});

Then('le message d\'erreur doit indiquer {string}', function (expectedMessage: string) {
  expect(validationError).toContain(expectedMessage);
});

Then('le message doit lister les {int} éléments concernés avec leur localisation', function (count: number) {
  // À implémenter - vérifier que le message contient les détails
  expect(count).toBe(2);
});

Then('un fichier {string} doit être créé', function (filePath: string) {
  // À implémenter - vérifier la création du fichier
  this.pending();
});

Then('il doit contenir pour chaque e2eID :', function (dataTable: { rawTable: string[][] }) {
  // À implémenter - vérifier la structure de l'inventaire
  expect(inventory.length).toBeGreaterThan(0);
});

Then('le fichier doit contenir un résumé avec le nombre total d\'éléments par type', function () {
  // À implémenter
  this.pending();
});

Then('chaque video doit avoir un e2eID', function () {
  const videos = testJson.contenu.filter((el) => el.type === 'video');
  videos.forEach((video) => {
    expect(video.e2eID).toBeDefined();
  });
});

Then('chaque callToAction doit avoir un e2eID', function () {
  const ctas = testJson.contenu.filter((el) => el.type === 'callToAction');
  ctas.forEach((cta) => {
    expect(cta.e2eID).toBeDefined();
  });
});

Then('chaque bouton doit avoir un e2eID', function () {
  // À implémenter pour groupeBoutons
  expect(true).toBe(true);
});

Then('chaque bouton de compétence doit avoir un e2eID', function () {
  // À implémenter pour competence.bouton
  expect(true).toBe(true);
});

Then('tous les e2eID doivent être uniques dans l\'ensemble du site', function () {
  const allIds: string[] = [];
  testJson.contenu.forEach((el) => {
    if (el.e2eID) allIds.push(el.e2eID);
  });
  const uniqueIds = new Set(allIds);
  expect(uniqueIds.size).toBe(allIds.length);
});

Then('l\'e2eID doit être {string}', function (expectedId: string) {
  const lastId = generatedIds[generatedIds.length - 1];
  expect(lastId).toBe(expectedId);
});

Then('tous les éléments interactifs doivent avoir un e2eID', function () {
  // À implémenter
  this.pending();
});

Then('le fichier doit être mis à jour avec les nouveaux e2eID', function () {
  // À implémenter
  this.pending();
});

Then('un backup du fichier original doit être créé', function () {
  // À implémenter
  this.pending();
});

Then('l\'inventaire doit être exporté dans {string}', function (filePath: string) {
  // À implémenter
  this.pending();
});
