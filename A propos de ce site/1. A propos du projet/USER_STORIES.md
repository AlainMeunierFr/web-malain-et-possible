# User Stories extraites des journaux

## Epic 1 : Structure et Organisation du Site

### US-1.1 : Affichage des sections du site avec accordion
#### En tant que
Visiteur du site

#### Je souhaite
Pouvoir consulter les différentes sections ("À propos du site", "Journal de bord", "Cours") avec un système d'accordion qui permet de masquer/afficher le contenu

#### Afin de
Naviguer facilement dans le contenu sans être submergé par toutes les informations en même temps

#### Critères d'acceptation :
- Les sections principales (h1) ont un accordion (masqué par défaut)
- Les sous-sections (h2) ont aussi un accordion (masqué par défaut)
- Un clic sur un titre masque/affiche son contenu
- Le contenu est lu dynamiquement depuis les dossiers "A propos de ce site"

---

### US-1.2 : Affichage uniforme du contenu Markdown
#### En tant que
Visiteur du site

#### Je souhaite
Que tous les fichiers Markdown (Journaux, Cours, DOD) s'affichent avec la même structure et le même style CSS

#### Afin de
Avoir une expérience de lecture cohérente et professionnelle, quel que soit le type de contenu consulté

#### Critères d'acceptation :
- Tous les fichiers MD utilisent la même hiérarchie HTML (h1 → h2 → h3 → h4 → h5)
- Le CSS s'applique de façon identique quelque soit la nature du fichier
- Des attributs spéciaux (typeDeContenu) permettent d'appliquer des styles spécifiques (ex: fond bleu clair pour les prompts)
- Le parseur MD est unifié pour tous les types de fichiers

---

## Epic 2 : Architecture Technique

### US-2.1 : Séparation backend pur / frontend
#### En tant que
Développeur

#### Je souhaite
Avoir une séparation claire entre la logique métier (backend pur) et la présentation (frontend)

#### Afin de
Pouvoir tester la logique métier indépendamment, réutiliser le code en ligne de commande, et éviter les problèmes d'hydratation React

#### Critères d'acceptation :
- Les fonctions backend pur sont dans `utils/` et sont testables en ligne de commande
- Les API routes Next.js exposent le JSON via HTTP (stratégie B)
- Les Client Components font un `fetch` pour obtenir le JSON
- Le CSS applique les styles, pas la génération HTML côté serveur

---

### US-2.2 : Architecture unifiée pour tous les types de fichiers MD
#### En tant que
Développeur

#### Je souhaite
Que tous les types de fichiers MD (Journaux, Cours, DOD) utilisent la même structure JSON et le même parseur

#### Afin de
Maintenir un code cohérent, faciliter l'évolution, et garantir que le CSS s'applique uniformément

#### Critères d'acceptation :
- Structure JSON unifiée : Chapitre (h1) → Section (h2) → Partie (h3) → Sous-partie (h4) → Bloc (h5)
- Un seul parseur MD générique pour tous les types de fichiers
- Des attributs spéciaux (typeDeContenu) permettent de gérer les cas particuliers (Prompt, Résultat technique)
- Les spécificités (ex: journaux) sont gérées via une version "dérivée" du parseur

---

## Epic 3 : Affichage et Présentation

### US-3.1 : Affichage des prompts avec style spécial
#### En tant que
Visiteur du site

#### Je souhaite
Que les sections "Prompt" soient affichées avec un fond bleu clair pour les distinguer visuellement

#### Afin de
Identifier rapidement les prompts dans les journaux et comprendre la structure du dialogue avec l'IA

#### Critères d'acceptation :
- Les blocs avec `typeDeContenu === "Prompt"` ont un fond bleu clair
- Les titres "Prompt" et "Résultat technique" sont masqués en affichage (mais présents dans le JSON pour SEO)
- Le style est appliqué via CSS uniquement, pas via attributs HTML conditionnels

---

### US-3.2 : Espacement correct du contenu
#### En tant que
Visiteur du site

#### Je souhaite
Que le contenu ne soit pas masqué par le header fixe en haut ni par le footer fixe en bas

#### Afin de
Pouvoir lire tout le contenu sans avoir à scroller pour voir les parties cachées

#### Critères d'acceptation :
- Le contenu a un `padding-top` qui compense la hauteur du header fixe
- Le contenu a un `padding-bottom` qui compense la hauteur du footer fixe
- Les marges sont calculées de façon responsive (max(50px, 5.47vh) pour le footer, max(80px, 8.75vh) pour le header)

---

## Epic 4 : Qualité et Tests

### US-4.1 : Tests unitaires pour toutes les fonctions backend
#### En tant que
Développeur

#### Je souhaite
Que toutes les fonctions dans `utils/` aient des tests unitaires

#### Afin de
Garantir la qualité du code et pouvoir refactoriser en toute confiance

#### Critères d'acceptation :
- Chaque fonction dans `utils/` a au moins un test unitaire
- Les tests suivent l'approche TDD (RED → GREEN → REFACTOR)
- Les tests sont écrits du simple au complexe
- Les tests sont maintenus à jour avec le code

---

### US-4.2 : Tests BDD pour les fonctionnalités métier
#### En tant que
Product Manager / Développeur

#### Je souhaite
Avoir des scénarios BDD qui décrivent le comportement attendu du site du point de vue utilisateur

#### Afin de
Valider que le site répond bien aux besoins métier et faciliter la communication entre les parties prenantes

#### Critères d'acceptation :
- Les scénarios BDD sont en français (format Gherkin)
- Les scénarios couvrent les fonctionnalités principales (navigation, affichage des contenus)
- Les scénarios sont exécutables avec Cucumber
- Les scénarios sont maintenus à jour avec les évolutions

---

## Epic 5 : Documentation et Traçabilité

### US-5.1 : Journal de bord automatique
#### En tant que
Product Manager

#### Je souhaite
Que tous les prompts et leurs résultats techniques soient automatiquement documentés dans un journal quotidien

#### Afin de
Pouvoir retracer l'évolution du projet, comprendre les décisions prises, et réutiliser les solutions trouvées

#### Critères d'acceptation :
- Un fichier journal est créé chaque jour (format `YYYY-MM-DD.md`)
- Chaque prompt qui modifie le code est ajouté au journal avec son résultat technique
- Le format est standardisé : `### Partie` → `#### Sous-partie` → `##### Prompt` → `##### Résultat technique`
- Le journal est mis à jour automatiquement à chaque prompt

---

### US-5.2 : Documentation des cours théoriques
#### En tant que
Product Manager en formation

#### Je souhaite
Que les explications théoriques soient documentées dans des fichiers de cours

#### Afin de
Pouvoir réviser les concepts appris et partager les connaissances acquises

#### Critères d'acceptation :
- Les prompts théoriques/formation créent un fichier dans `4. Cours/`
- Le format est standardisé avec numérotation chronologique (`##. Titre du cours.md`)
- Le contenu utilise des titres maximum H3 (###)
- Les cours sont référencés dans le journal du jour

---

## Epic 6 : Gestion des Erreurs et Robustesse

### US-6.1 : Gestion des erreurs d'hydratation React
#### En tant que
Développeur

#### Je souhaite
Que le site ne génère pas d'erreurs d'hydratation React

#### Afin de
Garantir une expérience utilisateur fluide et éviter les problèmes de rendu

#### Critères d'acceptation :
- Aucune erreur d'hydratation dans la console
- Le HTML rendu côté serveur correspond exactement au HTML rendu côté client
- L'architecture utilise la stratégie B (API JSON + Client Component) pour éviter les problèmes d'hydratation
- Les attributs HTML conditionnels sont évités ou gérés de façon sûre

---

### US-6.2 : Validation des règles métier
#### En tant que
Product Manager

#### Je souhaite
Que les règles métier soient validées automatiquement lors de la compilation

#### Afin de
Détecter les erreurs de structure dans les fichiers Markdown avant la publication

#### Critères d'acceptation :
- Un fichier MD contenant H1 ou H2 déclenche une erreur de compilation
- Un fichier MD contenant H4 sans H3 déclenche une erreur de compilation
- Un dossier contenant un seul fichier MD valide déclenche une erreur (au moins 2 sections requises)
- Les fichiers vides ou non-MD sont ignorés
- Les erreurs sont claires et indiquent le fichier problématique

---

## Epic 7 : Expérience Utilisateur

### US-7.1 : Navigation intuitive
#### En tant que
Visiteur du site

#### Je souhaite
Pouvoir naviguer facilement entre les différentes pages du site

#### Afin de
Trouver rapidement l'information recherchée

#### Critères d'acceptation :
- Le logo en haut à gauche permet de retourner à la page d'accueil
- La photo en haut à droite permet d'accéder à la page "À propos de moi"
- Les boutons du footer permettent d'accéder aux différentes sections (email, YouTube, LinkedIn, Plan du site)
- Les tooltips expliquent l'action de chaque bouton

---

### US-7.2 : Affichage responsive
#### En tant que
Visiteur du site

#### Je souhaite
Que le site s'affiche correctement sur tous les types d'écrans (desktop, tablette, mobile)

#### Afin de
Pouvoir consulter le site depuis n'importe quel appareil

#### Critères d'acceptation :
- Les marges et espacements sont calculés de façon responsive (vh, vw, max(), clamp())
- Le header et le footer s'adaptent à la taille de l'écran
- Le contenu reste lisible sur petits écrans
- Les images sont optimisées avec `next/image`

---

## Epic 8 : Maintenance et Évolutivité

### US-8.1 : Code propre et maintenable
#### En tant que
Développeur

#### Je souhaite
Que le code soit propre, bien organisé et facile à maintenir

#### Afin de
Pouvoir faire évoluer le site facilement et rapidement

#### Critères d'acceptation :
- Pas de code mort (fichiers et imports inutilisés supprimés)
- Pas de duplication (factorisation des styles et logique commune)
- Composants avec responsabilités uniques (Single Responsibility Principle)
- Noms de variables et fonctions explicites
- Code documenté avec commentaires pédagogiques

---

### US-8.2 : Respect des bonnes pratiques
#### En tant que
Développeur / Product Manager

#### Je souhaite
Que le code respecte les bonnes pratiques de développement (TDD, BDD, Clean Code, etc.)

#### Afin de
Garantir la qualité du code et faciliter la collaboration

#### Critères d'acceptation :
- TDD strict : RED → GREEN → REFACTOR, progression du simple au complexe
- BDD pour les fonctionnalités métier
- Séparation backend pur / frontend
- Tests unitaires pour toutes les fonctions backend
- Pas d'erreurs de linting
- Build réussi sans avertissements critiques
