# Tests d'intégration qui corrigent automatiquement les fichiers tout en préservant les métadonnées

## Introduction

Dans la plupart des projets, les tests d'intégration vérifient l'état du système et signalent les problèmes, mais ne les corrigent pas. Si un fichier de configuration est obsolète ou incohérent, le test échoue et le développeur doit corriger manuellement. Cette approche crée une charge de maintenance et des risques d'oubli.

Le besoin identifié est triple :
1. **Synchronisation automatique** : Les fichiers de configuration doivent rester synchronisés avec le code source
2. **Préservation du travail manuel** : Les métadonnées utiles ajoutées manuellement (coordonnées, numéros, etc.) doivent être préservées
3. **Correction intelligente** : La correction doit être contextuelle et respecter les intentions du développeur

Pour répondre à ces besoins, un système de tests d'intégration qui corrigent automatiquement les fichiers a été mis en place. Ces tests auditent les fichiers, détectent les incohérences, et les corrigent automatiquement tout en préservant les métadonnées existantes. Cette approche crée une collaboration harmonieuse entre automatisation et intervention humaine.

## Résumé

Cette stratégie repose sur trois mécanismes interconnectés :

**1. Audit automatique des fichiers**
Les tests d'intégration parcourent le code source pour détecter l'état réel du système (pages Next.js, liens internes, etc.) et comparent avec les fichiers de configuration existants (ex: `Pages-Et-Lien.json`).

**2. Détection d'incohérences**
Les tests identifient les écarts entre l'état réel et les fichiers de configuration :
- Pages manquantes (détectées dans le code mais absentes du fichier)
- Pages obsolètes (présentes dans le fichier mais n'existent plus dans le code)
- Liens manquants ou obsolètes
- Titres à jour (extraits depuis les JSON de contenu)

**3. Correction automatique avec préservation**
Les tests corrigent automatiquement les fichiers en :
- Ajoutant les éléments manquants
- Supprimant les éléments obsolètes
- Mettant à jour les valeurs qui doivent être synchronisées (titres)
- Préservant les métadonnées utiles (coordonnées x/y, numéros, etc.)

Cette approche combine audit automatique et correction intelligente qui respecte le travail manuel du développeur, créant une collaboration harmonieuse entre automatisation et intervention humaine.

---

## Audit automatique des fichiers

### Détection de l'état réel

Les tests d'intégration parcourent le code source pour détecter l'état réel du système :

**Détection des pages** :
```typescript
export const detecterPages = (): PlanPage[] => {
  // Parcourt app/ pour détecter toutes les pages Next.js
  // Extrait les titres depuis les fichiers JSON de contenu correspondants
  // Retourne la liste complète des pages avec leurs URLs et titres
};
```

**Détection des liens** :
```typescript
export const detecterLiensInternes = (): PlanLien[] => {
  // Parcourt les fichiers JSON pour détecter les CallToAction
  // Détecte les boutons de compétences
  // Détecte les liens du footer (présents sur toutes les pages)
  // Retourne la liste complète des liens internes
};
```

**Résultat** : Un inventaire complet et à jour de l'état réel du système.

### Comparaison avec les fichiers existants

Les tests comparent l'état réel avec les fichiers de configuration :

**Lecture du fichier existant** :
```typescript
const siteMapPath = path.join(process.cwd(), 'data', 'Pages-Et-Lien.json');
let planExistant: PlanSite | null = null;

if (fs.existsSync(siteMapPath)) {
  const contenu = fs.readFileSync(siteMapPath, 'utf8');
  planExistant = JSON.parse(contenu);
}
```

**Comparaison** :
```typescript
// Pages manquantes
const pagesManquantes = pages.filter((p) => !urlsPagesExistantes.has(p.url));

// Pages obsolètes
const pagesObsolètes = planExistant.pages.filter((p) => !urlsPagesDetectees.has(p.url));

// Liens manquants
const liensManquants = liens.filter((l) => !liensExistantsUrls.has(`${l.source}->${l.destination}`));

// Liens obsolètes
const liensObsolètes = planExistant.liens.filter((l) => !liensDetectesUrls.has(`${l.source}->${l.destination}`));
```

**Résultat** : Liste précise des incohérences détectées.

---

## Détection d'incohérences

### Types d'incohérences détectées

**1. Pages manquantes**
Pages détectées dans le code mais absentes du fichier de configuration.

**Exemple** : Une nouvelle page `/nouvelle-page` est créée dans `app/nouvelle-page/page.tsx`, mais n'est pas dans `Pages-Et-Lien.json`.

**2. Pages obsolètes**
Pages présentes dans le fichier mais qui n'existent plus dans le code.

**Exemple** : Une page `/ancienne-page` est supprimée du code, mais reste dans `Pages-Et-Lien.json`.

**3. Titres obsolètes**
Titres dans le fichier qui ne correspondent plus aux titres extraits depuis les JSON de contenu.

**Exemple** : Le titre d'une page change dans `index.json`, mais `Pages-Et-Lien.json` contient encore l'ancien titre.

**4. Liens manquants**
Liens détectés dans le code mais absents du fichier.

**Exemple** : Un nouveau CallToAction est ajouté, créant un nouveau lien, mais ce lien n'est pas dans `Pages-Et-Lien.json`.

**5. Liens obsolètes**
Liens présents dans le fichier mais qui n'existent plus dans le code.

**Exemple** : Un CallToAction est supprimé, mais le lien correspondant reste dans `Pages-Et-Lien.json`.

### Messages d'erreur détaillés

Les incohérences sont signalées avec des messages détaillés :

```typescript
if (erreursDetectees.length > 0) {
  console.warn('\n⚠️ ERREURS D\'INTÉGRITÉ DÉTECTÉES DANS Pages-Et-Lien.json :');
  erreursDetectees.forEach((erreur) => {
    console.warn(`  - ${erreur}`);
  });
  console.warn('🔧 Correction automatique en cours...\n');
}
```

**Exemple de sortie** :
```
⚠️ ERREURS D'INTÉGRITÉ DÉTECTÉES DANS Pages-Et-Lien.json :
  - Pages manquantes (2) : /nouvelle-page, /autre-page
  - Liens obsolètes (3) : /ancienne-page->/autre-page, ...
  - Titres obsolètes (1) : /page-existante
🔧 Correction automatique en cours...
```

---

## Correction automatique avec préservation

### Principe : préserver ce qui est utile

La correction automatique préserve les métadonnées utiles ajoutées manuellement par le développeur :

**Métadonnées préservées** :
- **Coordonnées (x, y)** : Positions des pages pour l'affichage visuel
- **Numéros** : Numéros d'ordre pour l'affichage
- **Flag "dessiner"** : Indication si la page doit être dessinée
- **e2eIDs** : Identifiants de test associés à la page
- **Labels des liens** : Labels personnalisés des liens

**Métadonnées mises à jour** :
- **Titres** : Extraits depuis les JSON de contenu (source de vérité)

### Algorithme de mise à jour

**Pour les pages** :
```typescript
// Pour chaque page détectée
for (const pageDetectee of pages) {
  // Rechercher la page par son URL dans le plan existant
  const pageExistante = planExistant.pages.find((p) => p.url === pageDetectee.url);
  
  if (pageExistante) {
    // Page existe déjà : conserver TOUTES les valeurs existantes sauf le titre
    pagesMisesAJour.push({
      url: pageExistante.url,
      titre: pageDetectee.titre, // ← Seule valeur mise à jour depuis l'algo
      x: pageExistante.x,         // ← Préservé
      y: pageExistante.y,         // ← Préservé
      numero: pageExistante.numero, // ← Préservé
      dessiner: pageExistante.dessiner || 'Oui', // ← Préservé ou défaut
      e2eIDs: pageExistante.e2eIDs, // ← Préservé
    });
  } else {
    // Page n'existe pas : créer une nouvelle page
    pagesMisesAJour.push({
      url: pageDetectee.url,
      titre: pageDetectee.titre,
      x: null,  // ← À définir manuellement si nécessaire
      y: null,  // ← À définir manuellement si nécessaire
      dessiner: 'Oui', // ← Valeur par défaut
    });
  }
}
```

**Pour les liens** :
```typescript
// Pour chaque lien détecté
for (const lienDetecte of liens) {
  // Vérifier si le lien existe déjà
  const lienExistant = planExistant.liens.find(
    (l) => l.source === lienDetecte.source && l.destination === lienDetecte.destination
  );
  
  if (lienExistant) {
    liensMisesAJour.push(lienExistant); // ← Conserver le label existant
  } else {
    liensMisesAJour.push(lienDetecte); // ← Nouveau lien
  }
}
```

**Résultat** : Les métadonnées utiles sont préservées, seules les valeurs qui doivent être synchronisées sont mises à jour.

---

## Exemples concrets

### Exemple 1 : Ajout d'une nouvelle page

**État initial** :
- Code : Page `/nouvelle-page` créée dans `app/nouvelle-page/page.tsx`
- Fichier : `Pages-Et-Lien.json` ne contient pas cette page

**Détection** :
```
⚠️ ERREURS D'INTÉGRITÉ DÉTECTÉES :
  - Pages manquantes (1) : /nouvelle-page
🔧 Correction automatique en cours...
```

**Correction automatique** :
```json
{
  "pages": [
    {
      "url": "/nouvelle-page",
      "titre": "Nouvelle page",  // ← Extrait depuis le JSON de contenu
      "x": null,                  // ← À définir manuellement si nécessaire
      "y": null,                  // ← À définir manuellement si nécessaire
      "dessiner": "Oui"           // ← Valeur par défaut
    }
  ]
}
```

**Résultat** : La page est ajoutée automatiquement, le développeur peut ensuite ajouter les coordonnées manuellement si nécessaire.

### Exemple 2 : Mise à jour d'un titre avec préservation des métadonnées

**État initial** :
- Code : Titre de `/` changé dans `index.json` : "Mon parcours, mes transformations"
- Fichier : `Pages-Et-Lien.json` contient l'ancien titre : "Ancien titre"
- Métadonnées : `x: 500, y: 600, numero: 42, dessiner: "Non", e2eIDs: ['e2e1', 'e2e2']`

**Détection** :
```
⚠️ ERREURS D'INTÉGRITÉ DÉTECTÉES :
  - Titres obsolètes (1) : /
🔧 Correction automatique en cours...
```

**Correction automatique** :
```json
{
  "pages": [
    {
      "url": "/",
      "titre": "Mon parcours, mes transformations", // ← Mis à jour
      "x": 500,      // ← Préservé
      "y": 600,      // ← Préservé
      "numero": 42,  // ← Préservé
      "dessiner": "Non",        // ← Préservé
      "e2eIDs": ["e2e1", "e2e2"] // ← Préservé
    }
  ]
}
```

**Résultat** : Le titre est mis à jour, toutes les métadonnées utiles sont préservées.

### Exemple 3 : Suppression d'une page obsolète

**État initial** :
- Code : Page `/ancienne-page` supprimée (fichier `app/ancienne-page/page.tsx` n'existe plus)
- Fichier : `Pages-Et-Lien.json` contient encore cette page

**Détection** :
```
⚠️ ERREURS D'INTÉGRITÉ DÉTECTÉES :
  - Pages obsolètes (1) : /ancienne-page
🔧 Correction automatique en cours...
```

**Correction automatique** :
- La page `/ancienne-page` est supprimée du fichier
- Les liens vers cette page sont également supprimés automatiquement

**Résultat** : Le fichier reste cohérent avec le code, les éléments obsolètes sont supprimés.

---

## Avantages de cette approche

### 1. Synchronisation automatique

Les fichiers de configuration restent synchronisés avec le code source :
- **Détection automatique** : Les changements dans le code sont détectés automatiquement
- **Correction automatique** : Les fichiers sont mis à jour sans intervention manuelle
- **Pas d'oubli** : Impossible d'oublier de mettre à jour un fichier de configuration

### 2. Préservation du travail manuel

Les métadonnées utiles ajoutées manuellement sont préservées :
- **Coordonnées** : Les positions des pages pour l'affichage visuel sont conservées
- **Numéros** : Les numéros d'ordre sont préservés
- **Labels personnalisés** : Les labels des liens sont conservés
- **Collaboration harmonieuse** : L'automatisation respecte le travail manuel

### 3. Correction intelligente

La correction est contextuelle et respecte les intentions :
- **Mise à jour sélective** : Seules les valeurs qui doivent être synchronisées sont mises à jour
- **Valeurs par défaut** : Les valeurs par défaut sont appliquées intelligemment (ex: `dessiner: "Oui"`)
- **Suppression automatique** : Les éléments obsolètes sont supprimés automatiquement

### 4. Charge mentale réduite

Le développeur n'a plus à se soucier de la synchronisation :
- **Pas de maintenance manuelle** : Les fichiers sont mis à jour automatiquement
- **Focus sur le code** : Le développeur peut se concentrer sur le code, pas sur la synchronisation
- **Confiance** : Le système garantit que les fichiers sont toujours à jour

---

## Comparaison avec les approches traditionnelles

### Approche traditionnelle

Dans les projets classiques, les fichiers de configuration sont maintenus manuellement :

```typescript
// ❌ Approche traditionnelle
// Développeur ajoute une nouvelle page
// Développeur doit se rappeler de mettre à jour Pages-Et-Lien.json manuellement
// Risque d'oubli, de désynchronisation, d'erreurs
```

**Problèmes** :
- Maintenance manuelle fastidieuse
- Risque d'oubli et de désynchronisation
- Charge mentale pour le développeur

### Approche avec correction automatique

```typescript
// ✅ Correction automatique
// Développeur ajoute une nouvelle page
// Test d'intégration détecte automatiquement la nouvelle page
// Test corrige automatiquement Pages-Et-Lien.json
// Métadonnées utiles préservées
```

**Avantages** :
- Synchronisation automatique
- Préservation du travail manuel
- Charge mentale réduite

---

## Conclusion

Cette stratégie garantit que :
- ✅ Les fichiers de configuration restent synchronisés avec le code source automatiquement
- ✅ Les métadonnées utiles ajoutées manuellement sont préservées
- ✅ La correction est intelligente et contextuelle
- ✅ La charge mentale du développeur est réduite

La combinaison d'audit automatique et de correction intelligente qui respecte le travail manuel crée une collaboration harmonieuse entre automatisation et intervention humaine. Cette approche, bien que peu courante dans les projets standards où les fichiers sont maintenus manuellement, permet d'atteindre un niveau de synchronisation et de maintenabilité rarement atteint avec les approches traditionnelles.

Le système devient un partenaire intelligent : il détecte les incohérences, les corrige automatiquement, et préserve le travail manuel utile, créant une base de données de configuration toujours à jour et cohérente, sans effort supplémentaire pour le développeur.
