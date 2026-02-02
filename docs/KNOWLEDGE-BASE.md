# Base de Connaissance du Projet "Malain et Possible"

*Généré le 2 février 2026 par l'IA Lead Dev après lecture de 67 fichiers de journaux (Architecture, Questions/Arbitrages, Journal de bord, Cours)*

---

## 1. Vue d'Ensemble du Projet

### Identité
- **Nom** : Web Malain et Possible
- **Type** : Site web personnel / Portfolio professionnel
- **Propriétaire** : Alain Meunier
- **Stack** : Next.js 16, TypeScript, React, Jest, Cucumber.js (BDD), Playwright (E2E)
- **Hébergement** : Vercel
- **Dépôt** : GitHub `web-malain-et-possible`

### Objectif
Site vitrine professionnel multi-profils (CPO, COO, Coach Agile, CTO) avec une approche architecturale rigoureuse inspirée de l'artisanat logiciel.

### Expérience Parallèle
Ce projet existe en **deux versions** :
1. **Version itérative** (ce dépôt) : TDD/BDD strict, 400+ tests, 91%+ couverture
2. **Version expérimentale** (clone) : Code généré directement depuis les US

---

## 2. Architecture du Projet

### 2.1 Architecture Hexagonale appliquée à Next.js

**Principe fondamental** : Séparation claire entre :

- **Backend Pur** (`utils/`) : Logique métier isolée, testable en CLI, sans dépendance React/Next.js
- **Backend Next.js** (`app/`, `components/`) : Génération HTML, Server/Client Components

**Avantages obtenus** :
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

### 2.2 Architecture Unifiée pour le Parsing Markdown

**Un seul parser** (`parseMarkdownContent()`) pour tous les types de fichiers MD :
- Journaux
- "A propos de ce site"
- Cours
- Documentation

**Hiérarchie unifiée** :
- H1 = Chapitre (représenté par un dossier)
- H2 = Section (représenté par un fichier MD)
- H3 = Partie (### dans le fichier MD)
- H4 = Sous-partie (#### dans le fichier MD)
- H5 = Bloc (##### dans le fichier MD)

**Spécificités via attributs** : `typeDeContenu`, `estPrompt`, `estResultatTechnique`

### 2.3 Système CMS basé sur JSON

Tout le contenu du site est défini dans des fichiers JSON (`data/`) :
- `index.json`, `mes-profils.json`, `profil-*.json`
- `_site-identity.json` (identité SEO)
- `_Pages-Et-Lien.json` (plan du site)
- `_footerButtons.json` (boutons du footer)
- `_temoignages.json`, `_bibliotheque.json`

**Règle de nommage** : Un seul nom canonique par type de contenu, identique sur toutes les couches (JSON, TypeScript, CSS).

---

## 3. Méthodologie de Développement

### 3.1 Workflow Lead Dev

**Deux commandes uniquement** :
- **GO US** : Commencer une nouvelle User Story (invoque l'agent @US)
- **GO NEXT** : Avancer d'un cran (revue → corrections/passage à l'étape suivante)

**Tunnel obligatoire** : US → BDD → TDD-back-end → TDD-front-end → done

### 3.2 TDD Strict avec Progression Visible

Les tests sont structurés avec des commentaires explicites :
```typescript
describe('nomFonction - Approche TDD (simple → complexe)', () => {
  describe('ITÉRATION 1 : Le cas le plus simple', () => { /* ... */ });
  describe('ITÉRATION 2 : Ajouter une deuxième fonctionnalité', () => { /* ... */ });
  // ...
});
```

**Cycle strict** : RED → GREEN → REFACTOR, un test à la fois, toujours le plus simple possible.

### 3.3 Validation JSON avec Détection de Types Inconnus

Les tests d'intégration détectent les types présents dans les JSON mais non gérés dans le code. Le test échoue avec un message actionnable : implémenter le type ou le supprimer.

### 3.4 Tests d'Intégration qui Modifient le Code

**Approche originale** : Les TI ne se contentent pas de vérifier — ils :
- Génèrent automatiquement les e2eID manquants dans les fichiers JSON/React
- Mettent à jour `_Pages-Et-Lien.json` en préservant les métadonnées (coordonnées, zones)
- Forcent la décision du développeur (arbitrage obligatoire)

### 3.5 Pre-commit Hooks

Régénération automatique des artefacts avant chaque commit :
- Scénario E2E (`parcours-complet-liens.spec.ts`)
- Plan du site (`_Pages-Et-Lien.json`)
- Métriques

---

## 4. Système de Métriques

### 4.1 Collecte Automatique

Script `collect-metrics-simple.ts` collectant :
- Tests (unitaires, intégration, BDD, E2E) avec durées mesurées via `Date.now()`
- Couverture (lines, statements, functions, branches)
- Qualité (ESLint, Type Coverage → actuellement "NC")
- Taille (fichiers, lignes, composants, pages)
- Dépendances (total, vulnérabilités)
- Performance (build time, lighthouse → actuellement "NC")

### 4.2 Historique et Tendances

- 100 snapshots maximum (`public/metrics/history.json`)
- Tendances calculées automatiquement (↗️ up, ↘️ down, → stable)
- Dashboard visuel sur `/metrics`

### 4.3 Métriques "NC"

Les métriques non calculables (Type Coverage, Complexité Cyclomatique, Lighthouse) affichent "NC" au lieu de valeurs fictives hardcodées.

---

## 5. Stratégie E2E

### 5.1 Couverture des Liens

**Phase 1** : Détection et qualification des éléments interactifs
- Audit automatique du site
- Génération des e2eID manquants
- Arbitrage obligatoire (testé ou exclu explicitement)

**Phase 2** : Construction du scénario E2E
- Algorithme glouton optimisé (chaque page visitée une seule fois)
- Enrichissement automatique avec les éléments interactifs
- Mécanismes de fallback (plan du site, logo header)

### 5.2 Plages Réservées pour les e2eID

Pour éviter les conflits entre système déterministe (liens plan du site) et séquentiel :
- **Plage 1** : `l600-l749` (150 numéros)
- **Plage 2** : `l800-l949` (150 numéros)

---

## 6. Décisions Architecturales Majeures

### 6.1 Nommage Canonique
Un seul nom par type de contenu sur toutes les couches. Préfixe `ui-` pour les éléments de structure (layout, wrapper) non définis dans les JSON.

### 6.2 Containers Implicites
Chaque propriété a un container implicite `[nomCanonique].cont` avec type hiérarchique `--c`.

### 6.3 Metadata Centralisées
Les metadata SEO sont définies dans les JSON de contenu, pas dans les pages. Helper `metadataBuilder.ts` génère les metadata Next.js.

### 6.4 JSON-LD via CMS
Les données structurées SEO sont lues depuis `data/_site-identity.json`, pas hardcodées dans le code.

### 6.5 Mode Lecture
Composant `ModeLectureRenderer` affichant la hiérarchie du contenu avec types sémantiques (h1 → h5, containers, répétiteurs).

---

## 7. Points de Vigilance

### 7.1 Tests Préexistants en Échec
Certains tests peuvent échouer pour des raisons antérieures à la session courante. Toujours distinguer les régressions introduites des problèmes préexistants.

### 7.2 Chemins Path Traversal
Validation obligatoire dans `aboutSiteReader.ts` et `api/images/[type]/[filename]/route.ts`.

### 7.3 Sécurité
- Hash SHA-256 pour les mots de passe (migration depuis MD5)
- Headers CSP, HSTS, X-Content-Type-Options configurés dans `next.config.ts`
- XSS corrigées (plus de `dangerouslySetInnerHTML` pour le contenu utilisateur)

### 7.4 Génération Plan du Site
Exécutée automatiquement lors du build pour éviter un plan vide sur Vercel.

---

## 8. Agents Disponibles

| Agent | Rôle |
|-------|------|
| **Lead Dev** | Orchestration, revue, ne code pas directement |
| **US** | Reformule en User Story avec critères d'acceptation |
| **BDD** | Écrit les scénarios Gherkin (`.feature`) |
| **TDD-back-end** | Implémente la logique métier dans `utils/` |
| **TDD-front-end** | Implémente l'UI dans `app/`, `components/` |
| **Designer** | CSS uniquement, invoqué à la demande (hors tunnel) |

---

## 9. Bonnes Pratiques Établies

1. **Lire avant d'écrire** : Toujours utiliser `Read` avant `StrReplace`
2. **Tests d'abord** : Cycle RED → GREEN → REFACTOR strict
3. **Journal immédiat** : Mise à jour du journal de bord après chaque modification
4. **Commit descriptif** : Message expliquant le "pourquoi" via HEREDOC
5. **Lint après édition** : Vérifier les erreurs sur les fichiers modifiés
6. **Build avant clôture** : Lancer build et tests complets à l'étape `done`
7. **Parallélisation** : Appels d'outils indépendants en parallèle

---

*Cette base de connaissance est un instantané au 2 février 2026. Elle doit être mise à jour régulièrement.*
