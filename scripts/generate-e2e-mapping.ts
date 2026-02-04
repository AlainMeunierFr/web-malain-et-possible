/**
 * Génère le fichier _e2eIds-mapping.json à partir de detecterLiensInternes()
 * Source unique : les types métier du contenu des pages
 * Format de clé : Source.TypeMétier:Destination
 */

import fs from 'fs';
import path from 'path';
import { detecterLiensInternes } from '../utils/backoffice/generators/siteMapGenerator';

const mappingPath = path.join(process.cwd(), 'data', '_e2eIds-mapping.json');

// Charger le mapping existant pour préserver les e2eID déjà attribués
let existingMapping: Record<string, string> = {};
if (fs.existsSync(mappingPath)) {
  const data = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));
  const { _metadata, ...rest } = data;
  existingMapping = rest;
}

// Compteurs par préfixe pour générer de nouveaux IDs
const counters: Record<string, number> = {};

// Calculer les max actuels depuis les IDs existants
for (const id of Object.values(existingMapping)) {
  if (id === 'null') continue;
  const match = (id as string).match(/^([a-z])(\d+)$/);
  if (match) {
    const [, prefix, num] = match;
    counters[prefix] = Math.max(counters[prefix] || 0, parseInt(num));
  }
}

function getPrefix(typeElement: string | undefined): string {
  switch (typeElement) {
    case 'Header.Logo':
    case 'Header.Photo':
      return 'h';
    case 'Footer.Bouton':
      return 'b';
    case 'Competence':
      return 'c';
    case 'Video':
    case 'Hero.Video':
      return 'v';
    case 'CallToAction':
    case 'Hero.CallToAction':
      return 'a';
    case 'Profil':
      return 'p';
    case 'LienPage':
    case 'Hero.EnSavoirPlus':
      return 'l';
    default:
      return 'x';
  }
}

function getNextId(prefix: string): string {
  counters[prefix] = (counters[prefix] || 0) + 1;
  return prefix + counters[prefix];
}

// Détecter tous les liens avec leurs types métier
const liens = detecterLiensInternes();

// Types d'éléments globaux (même e2eID quelle que soit la page source)
const typesGlobaux = ['Footer.Bouton', 'Header.Logo', 'Header.Photo'];

// Étape 1 : Identifier les groupes de liens globaux (même type + destination)
// et leur attribuer un e2eID unique
const groupesGlobaux = new Map<string, string>(); // clé: "TypeMétier:Destination" -> e2eID

for (const lien of liens) {
  const type = lien.typeElement || 'inconnu';
  const isGlobal = typesGlobaux.includes(type);
  
  if (isGlobal) {
    const groupeKey = `${type}:${lien.destination}`;
    
    // Si ce groupe n'a pas encore d'e2eID, en chercher un existant ou en générer un
    if (!groupesGlobaux.has(groupeKey)) {
      // Chercher dans le mapping existant (format ancien ou nouveau)
      let e2eId: string | null = null;
      
      // Chercher avec le format global
      if (groupeKey in existingMapping) {
        e2eId = existingMapping[groupeKey];
      } else if (lien.e2eID) {
        e2eId = lien.e2eID;
      } else {
        // Chercher une clé existante avec une source quelconque pour ce groupe
        for (const [key, value] of Object.entries(existingMapping)) {
          if (key.endsWith(`.${type}:${lien.destination}`)) {
            e2eId = value;
            break;
          }
        }
      }
      
      // Si pas trouvé, générer un nouvel ID
      if (!e2eId || e2eId === 'null') {
        const prefix = getPrefix(type);
        e2eId = getNextId(prefix);
      }
      
      groupesGlobaux.set(groupeKey, e2eId);
    }
  }
}

// Étape 2 : Générer le mapping avec toutes les clés (une par page source pour les globaux)
const newMapping: Record<string, string> = {};
const stats = { total: 0, avecE2eId: 0, sansE2eId: 0 };

for (const lien of liens) {
  const type = lien.typeElement || 'inconnu';
  const isGlobal = typesGlobaux.includes(type);
  
  // Pour les éléments globaux, créer une clé par page source mais avec le même e2eID
  // Pour les autres, clé normale avec source
  const key = `${lien.source}.${type}:${lien.destination}`;
  
  // Éviter les doublons
  if (key in newMapping) continue;
  
  stats.total++;
  
  if (isGlobal) {
    // Utiliser l'e2eID du groupe global
    const groupeKey = `${type}:${lien.destination}`;
    const e2eId = groupesGlobaux.get(groupeKey)!;
    newMapping[key] = e2eId;
    stats.avecE2eId++;
  } else {
    // Lien de page normal
    if (key in existingMapping) {
      newMapping[key] = existingMapping[key];
      stats.avecE2eId++;
    } else if (lien.e2eID) {
      newMapping[key] = lien.e2eID;
      stats.avecE2eId++;
    } else {
      const prefix = getPrefix(type);
      newMapping[key] = getNextId(prefix);
      stats.sansE2eId++;
    }
  }
}

// Calculer compteurMax
let compteurMax = 0;
for (const id of Object.values(newMapping)) {
  if (id === 'null') continue;
  const match = id.match(/^[a-z](\d+)$/);
  if (match) compteurMax = Math.max(compteurMax, parseInt(match[1]));
}

// Grouper par type pour affichage
const parType = new Map<string, { count: number; examples: string[] }>();
for (const [key, id] of Object.entries(newMapping)) {
  const typeMatch = key.match(/\.([^:]+):/);
  const type = typeMatch ? typeMatch[1] : 'inconnu';
  if (!parType.has(type)) parType.set(type, { count: 0, examples: [] });
  const entry = parType.get(type)!;
  entry.count++;
  if (entry.examples.length < 3) {
    entry.examples.push(`${key} -> ${id}`);
  }
}

// Construire le JSON final avec métadonnées
const output = {
  _metadata: {
    description: "Mapping des e2eID pour les tests E2E",
    format: {
      global: "Source.TypeMétier:Destination (Footer, Header - même e2eID pour toutes les pages source)",
      page: "Source.TypeMétier:Destination (liens de page)"
    },
    note: "Les éléments globaux (Footer, Header) sont présents pour chaque page source, mais partagent le même e2eID. Cela permet à l'assistant de scénario de proposer tous les liens possibles, tout en simplifiant les tests (un seul test par bouton footer/header).",
    types: {
      "Header.Logo": "Logo vers accueil (préfixe h) - global",
      "Footer.Bouton": "Boutons du footer (préfixe b) - global",
      "Competence": "Boutons des compétences (préfixe c)",
      "Hero.CallToAction": "CTA du hero (préfixe a)",
      "Hero.EnSavoirPlus": "Lien 'En savoir plus' du hero (préfixe l)",
      "Profil": "Liens vers les profils (préfixe p)",
      "LienPage": "Liens du plan du site (préfixe l)"
    },
    compteurMax,
    stats
  },
  ...newMapping
};

fs.writeFileSync(mappingPath, JSON.stringify(output, null, 2));

console.log('=== MAPPING GÉNÉRÉ ===');
console.log(`Fichier: ${mappingPath}`);
console.log(`Total: ${stats.total} liens`);
console.log(`Avec e2eID existant: ${stats.avecE2eId}`);
console.log(`Nouveaux e2eID: ${stats.sansE2eId}`);
console.log(`compteurMax: ${compteurMax}`);
console.log('');
console.log('Par type:');
for (const [type, data] of parType) {
  console.log(`  ${type}: ${data.count} liens`);
  if (data.examples.length > 0) {
    console.log(`    Exemples: ${data.examples.join(', ')}`);
  }
}
