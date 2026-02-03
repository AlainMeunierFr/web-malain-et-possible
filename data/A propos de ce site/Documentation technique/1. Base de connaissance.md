# Base de Connaissance du Projet "Malain et Possible"

*Généré le 2 février 2026 par l'IA Lead Dev après lecture de 67 fichiers de journaux*

---

## Introduction

Ce document est organisé en **3 parties** distinctes :

| Partie | Public | Contenu |
|--------|--------|---------|
| **Partie 1** | Développeurs | Comment coder : agents, TDD/BDD, workflow, bonnes pratiques |
| **Partie 2** | Rédacteurs/Utilisateurs | Comment utiliser : CMS JSON, types de données, noms canoniques, hiérarchie |
| **Partie 3** | Ops/Maintenance | Outils de suivi : métriques, E2E, "A propos du site", plan du site |

---

# PARTIE 1 : PRATIQUES DE PROGRAMMATION

*Comment coder — Guide du développeur*

---

## 1.1 Vue d'Ensemble Technique

### Stack Technique
- **Framework** : Next.js 16, TypeScript, React
- **Tests** : Jest (TDD), Cucumber.js (BDD), Playwright (E2E)
- **Hébergement** : Vercel
- **Dépôt** : GitHub `web-malain-et-possible`

### Architecture Hexagonale appliquée à Next.js

**Principe fondamental** : Séparation claire entre :

- **Backend Pur** (`utils/`) : Logique métier isolée, testable en CLI, sans dépendance React/Next.js
- **Backend Next.js** (`app/`, `components/`) : Génération HTML, Server/Client Components

**Avantages** :
- Testabilité maximale (tests sans mocks complexes)
- Réutilisabilité du code (CLI, tests, composants, API)
- Séparation des préoccupations claire

**Convention** : Les fichiers du backend pur commencent par un commentaire explicite :

```typescript
/**
 * Backend pur : [Description]
 * Cette logique est réutilisable et testable en ligne de commande
 */
```

---

## 1.2 Workflow et Agents

### Commandes Lead Dev

**Deux commandes uniquement** :
- **GO US** : Commencer une nouvelle User Story (invoque l'agent @US)
- **GO NEXT** : Avancer d'un cran (revue → corrections/passage à l'étape suivante)

### Tunnel Obligatoire

```
US → BDD → TDD-back-end → TDD-front-end → done
```

### Agents Disponibles

| Agent | Rôle | Périmètre |
|-------|------|-----------|
| **Lead Dev** | Orchestration, revue | Ne code pas directement |
| **US** | Reformule en User Story | Critères d'acceptation |
| **BDD** | Écrit scénarios Gherkin | Fichiers `.feature` dans `tests/bdd/` |
| **TDD-back-end** | Logique métier | `utils/` uniquement |
| **TDD-front-end** | Interface utilisateur | `app/`, `components/` |
| **Designer** | CSS uniquement | Hors tunnel, à la demande |

---

## 1.3 TDD Strict

### Cycle Obligatoire

**RED → GREEN → REFACTOR**, un test à la fois, toujours le plus simple possible.

### Structure des Tests avec Progression Visible

```typescript
describe('nomFonction - Approche TDD (simple → complexe)', () => {
  describe('ITÉRATION 1 : Le cas le plus simple', () => { /* ... */ });
  describe('ITÉRATION 2 : Ajouter une deuxième fonctionnalité', () => { /* ... */ });
  // ...
});
```

### Validation JSON avec Détection de Types Inconnus

Les tests d'intégration détectent les types présents dans les JSON mais non gérés dans le code. Le test échoue avec un message actionnable : implémenter le type ou le supprimer.

### Tests d'Intégration qui Modifient le Code

**Approche originale** : Les TI ne se contentent pas de vérifier — ils :
- Génèrent automatiquement les e2eID manquants dans les fichiers JSON/React
- Mettent à jour `_Pages-Et-Lien.json` en préservant les métadonnées
- Forcent la décision du développeur (arbitrage obligatoire)

---

## 1.4 Pre-commit Hooks

Régénération automatique des artefacts avant chaque commit :
- Scénario E2E (`parcours-complet-liens.spec.ts`)
- Plan du site (`_Pages-Et-Lien.json`)
- Métriques

---

## 1.5 Bonnes Pratiques de Code

1. **Lire avant d'écrire** : Toujours utiliser `Read` avant `StrReplace`
2. **Tests d'abord** : Cycle RED → GREEN → REFACTOR strict
3. **Journal immédiat** : Mise à jour du journal de bord après chaque modification
4. **Commit descriptif** : Message expliquant le "pourquoi"
5. **Lint après édition** : Vérifier les erreurs sur les fichiers modifiés
6. **Build avant clôture** : Lancer build et tests complets à l'étape `done`
7. **Parallélisation** : Appels d'outils indépendants en parallèle

---

## 1.6 Points de Vigilance Développeur

### Tests Préexistants en Échec
Certains tests peuvent échouer pour des raisons antérieures à la session courante. Toujours distinguer les régressions introduites des problèmes préexistants.

### Sécurité
- Hash SHA-256 pour les mots de passe (migration depuis MD5)
- Headers CSP, HSTS, X-Content-Type-Options configurés dans `next.config.ts`
- XSS corrigées (plus de `dangerouslySetInnerHTML` pour le contenu utilisateur)
- Validation Path Traversal obligatoire dans `aboutSiteReader.ts` et `api/images/`

---

# PARTIE 2 : FONCTIONNEMENT DU SITE VITRINE

*Comment utiliser — Manuel du rédacteur*

---

## 2.1 Identité du Site

- **Nom** : Web Malain et Possible
- **Type** : Site vitrine professionnel / Portfolio multi-profils
- **Profils** : CPO, COO, Coach Agile, CTO
- **Propriétaire** : Alain Meunier

---

## 2.2 Système CMS basé sur JSON

Tout le contenu du site est défini dans des fichiers JSON situés dans `data/` :

| Fichier | Rôle |
|---------|------|
| `index.json` | Page d'accueil |
| `mes-profils.json` | Liste des profils |
| `profil-*.json` | Détail de chaque profil |
| `_site-identity.json` | Identité SEO (Person, WebSite pour JSON-LD) |
| `_Pages-Et-Lien.json` | Plan du site et liens |
| `_footerButtons.json` | Boutons du footer |
| `_temoignages.json` | Témoignages |
| `_bibliotheque.json` | Ressources documentaires |

---

## 2.3 Types de Données (TypesDeContenu)

Chaque élément dans les JSON a un `typeDeContenu` qui détermine son rendu :

| Type | Description |
|------|-------------|
| `hero` | Bloc principal en haut de page |
| `titreDePage` | Titre H1 de la page |
| `texte` | Paragraphe simple |
| `citation` | Bloc citation |
| `callToAction` | Bouton d'action |
| `video` | Vidéo intégrée |
| `competence` | Bloc de compétence |
| `temoignage` | Témoignage client |
| ... | (liste extensible) |

**Règle** : Le type doit être implémenté dans le code. Sinon, le build échoue avec un message explicite.

---

## 2.4 Noms Canoniques

**Règle fondamentale** : Un seul nom par type de contenu, **identique sur toutes les couches** :

| Couche | Exemple |
|--------|---------|
| JSON | `"typeDeContenu": "hero"` |
| TypeScript | `type: 'hero'` |
| CSS | `.hero { ... }` |

**Préfixe `ui-`** : Pour les éléments de structure (layout, wrapper) non définis dans les JSON.

**Containers implicites** : Chaque propriété a un container `[nomCanonique].cont` avec type hiérarchique `--c`.

---

## 2.5 Hiérarchie du Contenu

### Pour les Pages du Site

Structure implicite des pages générées :

- **Page** = Composant React
- **Sections** = Blocs de contenu (hero, texte, callToAction...)
- **Éléments** = Composants individuels

### Pour le Contenu Markdown ("A propos du site", Journaux, Cours)

Hiérarchie unifiée :

| Niveau | Markdown | Représentation |
|--------|----------|----------------|
| H1 | `#` | Chapitre (dossier) |
| H2 | `##` | Section (fichier MD) |
| H3 | `###` | Partie (dans le fichier) |
| H4 | `####` | Sous-partie |
| H5 | `#####` | Bloc |

**Spécificités via attributs** : `typeDeContenu`, `estPrompt`, `estResultatTechnique`

---

## 2.6 Parsing Markdown Unifié

**Un seul parser** (`parseMarkdownContent()`) pour tous les types de fichiers MD :
- Journaux de bord
- "A propos de ce site"
- Cours
- Documentation

L'approche permet une cohérence de rendu sur tout le site.

---

## 2.7 Mode Lecture

Composant `ModeLectureRenderer` affichant la hiérarchie du contenu avec types sémantiques visibles (H1→H5, containers, répétiteurs). Utile pour comprendre la structure réelle des données.

---

## 2.8 Metadata SEO

### Metadata Pages
Les metadata SEO sont définies dans les JSON de contenu, pas dans les pages. Le helper `metadataBuilder.ts` génère les metadata Next.js.

### JSON-LD
Les données structurées (Schema.org) sont lues depuis `data/_site-identity.json` :
- `Person` : Identité du propriétaire
- `WebSite` : Description du site
- `BreadcrumbList` : Fil d'Ariane (généré dynamiquement)

---

# PARTIE 3 : OUTILS DE SUIVI DU PROJET

*Maintenance et monitoring*

---

## 3.1 Section "A propos du site"

Accessible via `/a-propos-du-site`, cette section expose :
- **Sprints** : Organisation du travail (un dossier par sprint)
- **Definition of Done** : Règles qualité par agent
- **Journaux** : Historique des décisions et travaux
- **Cours** : Documentation technique

Le contenu est stocké dans `data/A propos de ce site/` en Markdown.

---

## 3.2 Journaux de Bord

### Structure
```
data/journaux/
├── 1. Journal de bord/     # Entrées quotidiennes par conversation
├── 2. Cours/               # Documentation technique
├── 3. Questions et arbitrages/  # Décisions architecturales
└── 4. Architecture/        # Pratiques originales documentées
```

### Format des entrées
- Fichier par conversation : `YYYY-MM-DD-NomConversation.md`
- Niveaux H3 → H5 (jamais H1/H2 pour éviter conflits avec la hiérarchie globale)

---

## 3.3 Système de Métriques

### Collecte Automatique

Script `collect-metrics-simple.ts` collectant :

| Catégorie | Métriques |
|-----------|-----------|
| Tests | Unitaires, Intégration, BDD, E2E (avec durées) |
| Couverture | Lines, Statements, Functions, Branches |
| Qualité | ESLint errors, Type Coverage (NC actuellement) |
| Taille | Fichiers, Lignes, Composants, Pages |
| Dépendances | Total, Vulnérabilités |
| Performance | Build time, Lighthouse (NC actuellement) |

### Historique et Tendances
- 100 snapshots maximum (`public/metrics/history.json`)
- Tendances calculées : ↗️ up, ↘️ down, → stable
- Dashboard visuel sur `/metrics`

### Métriques "NC"
Les métriques non calculables affichent "NC" au lieu de valeurs fictives.

---

## 3.4 Stratégie E2E

### Objectif
Couverture complète de tous les liens cliquables du site.

### Phase 1 : Détection et Qualification
- Audit automatique du site
- Génération des e2eID manquants
- Arbitrage obligatoire (testé ou exclu explicitement)

### Phase 2 : Construction du Scénario
- Algorithme glouton optimisé (chaque page visitée une seule fois)
- Enrichissement avec les éléments interactifs
- Mécanismes de fallback (plan du site, logo header)

### Plages Réservées pour les e2eID
Pour éviter les conflits entre système déterministe (liens plan du site) et séquentiel :
- **Plage 1** : `l600-l749` (150 numéros)
- **Plage 2** : `l800-l949` (150 numéros)

---

## 3.5 Plan du Site

### Génération Automatique
- Fichier : `_Pages-Et-Lien.json`
- Régénéré à chaque commit (pre-commit hook)
- Régénéré au build (pour éviter plan vide sur Vercel)

### Contenu
- Toutes les pages du site
- Tous les liens cliquables avec leurs e2eID
- Coordonnées et zones pour les tests E2E

---

## 3.6 Expérience Parallèle

Ce projet existe en **deux versions** :
1. **Version itérative** (ce dépôt) : TDD/BDD strict, 400+ tests, 91%+ couverture
2. **Version expérimentale** (clone) : Code généré directement depuis les US

L'objectif est de comparer les deux approches en termes de qualité, maintenabilité et vélocité.

---

*Cette base de connaissance est un instantané au 2 février 2026. Elle doit être mise à jour régulièrement.*
