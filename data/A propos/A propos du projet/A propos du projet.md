# Plan de l'article
1. Introduction
2. Product Goal
3. Exprimer un besoin (User Story)
4. Conserver les spécifications (BDD)
5. Faire émerger le code (TDD)
6. TDD Strict (Red-Green-Refactor)
7. Bénéfices des tests
8. Contrôle qualité
9. Clean Code
10. Domain-Driven Design (DDD)
11. Architecture Hexagonale
12. Back-End Métier
13. Documentation des API
14. Front-End
15. Séparation contenu/présentation
16. CI/CD
17. Documentation technique détaillée
18. Sprint en cours et principes Kanban
19. Configuration IA et pair programming avec l’IA
20. Métriques : management visuel des délivrables
21. Annexes

# 1. Introduction
Développer un logiciel robuste, maintenable et évolutif nécessite une approche structurée. Ces pratiques visent à **clarifier les besoins**, **réduire les erreurs** et **faciliter la collaboration** entre tous les acteurs, qu'ils soient techniques ou non.

Même pour un projet personnel, même pour apprendre, je considère que le minimum est :
- CI/CD : le code est versionné, testé et déployable
- TDD : les tests guident le code
- un historique clair sur GitHub
- un déploiement rapide dans un environnement accessible à des utilisateurs réels (testeurs, amis, tiers)
- des itérations courtes et du feedback rapide
Le code n'est pas écrit « pour moi seul », mais pour être :
- lu
- compris
- critiqué
- amélioré

Je suis particulièrement attaché à la capacité du code à exprimer l'intention métier.
je trouve puissant que les intentions soient "dans le code source".
C'est pourquoi j'aime utiliser des scénarios BDD en Gherkin un langage compréhensible par des non-développeurs
Ce principe est mal connu donc mal aimé.

L'exemple de la **connexion à un site web** sert ici de **fil conducteur pédagogique** pour illustrer chaque concept — ce n'est pas une fonctionnalité de ce site vitrine.
 
---
# 2. Product Goal
En tant que manager technico/fonctionnel, je souhaite améliorer ma capacité à interagir efficacement avec les développeurs en construisant un site web personnel qui démontre ma compréhension des pratiques du software craftsmanship moderne (TDD, BDD, Clean Code, DDD).
L'objectif n'est pas de devenir développeur, mais de développer une compréhension concrète des enjeux techniques, de la qualité du code, et de l'expression du métier dans le code source, afin de mieux dialoguer, challenger et collaborer avec les équipes de développement.
Le site sert de laboratoire d'apprentissage où l'IA est utilisée comme partenaire pédagogique pour accélérer cette remise à niveau, tout en garantissant que je maîtrise chaque ligne de code produite.

# 3. Exprimer un besoin (User Story)
**Théorie :**
Une **User Story (US)** est une description simple et compréhensible d'une fonctionnalité, rédigée du point de vue de l'utilisateur. Elle permet de formaliser un besoin et sert de base aux échanges entre les parties prenantes. Les **critères d'acceptation** précisent les conditions à remplir pour que la fonctionnalité soit considérée comme validée. Ils sont rédigés de manière à être **testables** et **compréhensibles par tous**, y compris les non-techniciens. Une US est considérée terminée lorsqu'elle respecte la **Definition of Done** du projet (tests, revue, pas de régression).

**Valider le besoin avant de coder :** reformuler la demande, valider la User Story et les scénarios BDD avec les parties prenantes avant toute écriture de code.

**Exemple User Storie :**
```User Storie
En tant qu'utilisateur,
Je souhaite me connecter à mon compte avec mon email et mon mot de passe,
Afin de accéder à mes informations personnelles.

Critères d'acceptation :
- L'email doit être au format valide (ex. : `monemail@chezmoi.fr`).
- Si l'email est vide afficher le message "L'email est obligatoire".
- Le mot de passe doit contenir au moins 8 caractères, 1 majuscule, et 1 chiffre (ex. : `motMotDePasse1`).
- Si le mot de passe est vide, afficher le message "Le mot de passe est obligatoire".
- Si les identifiants sont valides, rediriger vers le tableau de bord.
- Sinon, afficher le message "Email ou mot de passe incorrect".
```
---

# 4. Conserver les spécifications (BDD)
**Théorie :**
Les **BDD (Behavior-Driven Development)** transforment les User Stories en **scénarios concrets**, écrits dans un langage accessible à tous. Ces scénarios deviennent des **tests automatisés**, intégrés au code source pour garantir la conformité aux besoins. Dans ce projet, les scénarios Gherkin sont rédigés en **français** pour rester accessibles à tous les acteurs.

**Scénario Gherkin :**
```gherkin
Fonctionnalité : Connexion utilisateur

  Contexte :
    L'utilisateur est sur la page de connexion.

  Scénario : Email et mot de passe obligatoires
    Étant donné que l'utilisateur ne saisit ni email ni mot de passe,
    Quand il clique sur "Se connecter",
    Alors le système affiche "Email et mot de passe obligatoires."

  Scénario : Email ou mot de passe incorrect
    Étant donné que l'utilisateur saisit "monemail@chezmoi.fr" et "CestUneErreur",
    Quand il clique sur "Se connecter",
    Alors le système affiche "Email ou mot de passe incorrect."

  Scénario : Connexion réussie
    Étant donné que l'utilisateur saisit "monemail@chezmoi.fr" et "motMotDePasse1",
    Quand il clique sur "Se connecter",
    Alors il est redirigé vers son tableau de bord.
```

---

# 5. Faire émerger le code (TDD)
**Théorie :**
Le **TDD (Test-Driven Development)** consiste à écrire un **test avant d'écrire le code**. Cela permet de rester concentré sur l'objectif fonctionnel et de valider immédiatement que le code répond au besoin. Dans ce projet, le TDD s'applique à tout nouveau code ou modification, y compris les corrections techniques ; une couverture de tests suffisante est visée pour maintenir la qualité.

**Exemple (TypeScript) :**
```typescript
// Test pour vérifier que la connexion échoue si le mot de passe est incorrect
test("Connexion échoue avec un mot de passe incorrect", () => {
  const resultat = verifierConnexion("monemail@chezmoi.fr", "CestUneErreur");
  expect(resultat).toBe("Email ou mot de passe incorrect");
});
```

---

# 6. TDD Strict (Red-Green-Refactor)
**Théorie :**
Le cycle **Red-Green-Refactor** est au cœur du TDD strict. Il garantit une implémentation **progressive et validée** :
- **Red** : Écrire un test qui échoue (car le code n'existe pas encore).
- **Green** : Écrire le code minimal pour faire passer le test.
- **Refactor** : Améliorer la structure du code sans en altérer le comportement.
Cette approche permet d'obtenir un code **minimal, fonctionnel et maintenable**.

**Exemple (TypeScript) :**
```typescript
// Étape 1 : Test échoue (Red)
test("Connexion réussie avec bon email et mot de passe", () => {
  const resultat = verifierConnexion("monemail@chezmoi.fr", "motMotDePasse1");
  expect(resultat).toBe("Connexion acceptée");
});

// Étape 2 : Code minimal pour passer le test (Green)
function verifierConnexion(email: string, motDePasse: string): string {
  if (email === "monemail@chezmoi.fr" && motDePasse === "motMotDePasse1") {
    return "Connexion acceptée";
  }
  return "Email ou mot de passe incorrect";
}
```

---

# 7. Bénéfices des tests
**Théorie :**
Les tests automatisés permettent de détecter les **effets de bord** (conséquences inattendues) et de maintenir la qualité du logiciel tout au long de son évolution. Ils garantissent que chaque modification du code **ne casse pas les fonctionnalités existantes**, offrant ainsi une **sécurité** et une **confiance** accrues dans le logiciel.

**Exemple (Playwright) :**
```typescript
// Test end-to-end : parcours utilisateur complet
test("Connexion réussie", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("textbox", { name: /email/i }).fill("monemail@chezmoi.fr");
  await page.getByLabel(/mot de passe/i).fill("motMotDePasse1");
  await page.getByRole("button", { name: /se connecter/i }).click();
  await expect(page).toHaveURL(/\/dashboard/);
});
```

---

# 8. Contrôle qualité
**Théorie :**
Les **tests end-to-end** valident l'expérience utilisateur de bout en bout, comme si un vrai utilisateur testait le site. Ils permettent de vérifier que **toutes les couches du logiciel** (front-end, back-end, base de données) fonctionnent correctement ensemble. Dans ce projet, les tests E2E sont réalisés avec **Playwright** (et Playwright BDD avec Gherkin).

**Exemple (Playwright) :**
```typescript
test("De la connexion au tableau de bord", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("textbox", { name: /email/i }).fill("monemail@chezmoi.fr");
  await page.getByLabel(/mot de passe/i).fill("motMotDePasse1");
  await page.getByRole("button", { name: /se connecter/i }).click();
  await expect(page.getByText("Bienvenue sur votre tableau de bord")).toBeVisible();
});
```

---

# 9. Clean Code
**Théorie :**
Le **Clean Code** est un ensemble de pratiques visant à écrire un code **lisible, simple et maintenable**. Cela inclut l'utilisation de **noms explicites**, des **fonctions courtes**, et une **structure claire**. Un code propre est plus facile à comprendre, à modifier et à faire évoluer, ce qui réduit les coûts de maintenance et les risques d'erreurs. Dans ce projet, les noms métier sont en **français** dans le code pour faciliter la lecture et l'échange avec le métier.

**Exemple (TypeScript) :**
```typescript
// ❌ Peu clair
function calc(x: number, y: number): number {
  return x * y;
}

// ✅ Explicite
function calculerMontantTTC(montantHT: number, tauxTVA: number): number {
  return montantHT * (1 + tauxTVA / 100);
}
```

---

# 10. Domain-Driven Design (DDD)
**Théorie :**
Le **Domain-Driven Design (DDD)** place le **domaine métier** au centre de la conception logicielle. Il utilise un **langage ubiquitaire** (partagé par tous les acteurs) pour clarifier les concepts et les processus. Le DDD permet de **modéliser le logiciel en fonction des besoins métiers**, ce qui facilite la communication et réduit les ambiguïtés. Utiliser un **langage métier en français** dans le code (variables, fonctions, types) renforce cette clarté.

**Exemple (TypeScript) :**
```typescript
// ❌ Ambigu
const T = 20;

// ✅ Clair
const tauxDeTVA = 20;
```

---

# 11. Architecture Hexagonale
**Théorie :**
L'**architecture hexagonale** isole le **cœur métier** du logiciel, permettant de le réutiliser via différents canaux (web, mobile, API) **sans duplication de logique**. Elle favorise la **séparation des responsabilités** et facilite les tests et la maintenance. Le cœur métier est indépendant des interfaces utilisateur ou des bases de données, ce qui le rend plus robuste et évolutif.

**Exemple (TypeScript) :**
```typescript
// Cœur métier (indépendant de l'interface)
function verifierMotDePasse(email: string, motDePasse: string): boolean {
  return email === "monemail@chezmoi.fr" && motDePasse === "motMotDePasse1";
}

// Interface web (appelle le cœur métier)
app.post("/login", (req: Request, res: Response) => {
  const { email, motDePasse } = req.body;
  const resultat = verifierMotDePasse(email, motDePasse);
  res.send(resultat ? "Connexion acceptée" : "Email ou mot de passe incorrect");
});
```

---

# 12. Back-End Métier
**Théorie :**
Le **back-end métier** contient la **logique essentielle** du logiciel, indépendante des interfaces utilisateur ou des bases de données. Il centralise les règles métiers et permet de les réutiliser via différents canaux (web, mobile, API). Cela évite la duplication de code et facilite la maintenance.

**Exemple (TypeScript) :**
```typescript
// Logique métier (réutilisable)
function verifierMotDePasse(email: string, motDePasse: string): boolean {
  return email === "monemail@chezmoi.fr" && motDePasse === "motMotDePasse1";
}
```

---

# 13. Documentation des API
**Théorie :**
La **documentation des API** explique comment interagir avec le back-end. Elle utilise des **standards** comme OpenAPI (ex-Swagger) pour décrire les endpoints, les paramètres et les réponses. Une documentation claire permet aux développeurs front-end ou aux partenaires externes de **consommer les API sans ambiguïté**, ce qui facilite l'intégration et réduit les erreurs.

**Exemple (OpenAPI / YAML) :** voir la spécification exposée sur ce site via le module [API OpenAPI](/a-propos?view=openapi).

---

# 14. Front-End
**Théorie :**
Le **front-end** adapte l'interface utilisateur au canal de diffusion (web, mobile, etc.). Il s'appuie sur les données fournies par le back-end pour offrir une **expérience utilisateur optimisée**. Chaque canal a ses propres contraintes techniques et nécessite un code spécifique pour répondre aux attentes des utilisateurs.

**Exemple (React / TypeScript) :**
```tsx
// Composant de connexion pour le web
function LoginForm() {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Appel à l'API de connexion
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} />
      <button type="submit">Se connecter</button>
    </form>
  );
}
```

---

# 15. Séparation contenu/présentation
**Théorie :**
La **séparation entre contenu et présentation** consiste à distinguer la **structure sémantique** (DOM HTML) de son **style visuel** (CSS). Cela permet de modifier l'apparence sans altérer la logique ou le contenu, et facilite la collaboration entre développeurs et designers. Le contenu (DOM) décrit **ce que c'est**, tandis que le CSS décrit **comment ça s'affiche**. Sur ce site, la [Charte graphique](/a-propos/charte) formalise ces choix de présentation.

**Exemple (HTML/CSS) :**
```html
<!-- Contenu sémantique (DOM) -->
<div class="login-form">
  <h1>Connexion</h1>
  <form>
    <input type="email" placeholder="Email" />
    <input type="password" placeholder="Mot de passe" />
    <button>Se connecter</button>
  </form>
</div>
```

```css
/* Présentation (CSS) */
.login-form {
  background: #f5f5f5;
  padding: 20px;
}

.login-form button {
  background: blue;
  color: white;
}
```

---

# 16. CI/CD
**Théorie :**
Le **CI/CD (Intégration et Livraison Continues)** automatise les tests et les déploiements. Cela permet de **livrer rapidement** les nouvelles fonctionnalités aux utilisateurs, tout en garantissant leur qualité. Le code est **toujours prêt à être utilisé**, ce qui facilite la collecte de feedback pour identifier sur des ajustements sont nécessaires.

**Exemple (GitHub Actions) :**
```yaml
name: CI/CD Pipeline

on: [push]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm install
      - run: npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm run build
      - run: npm run deploy
```

---

# 17. Documentation technique détaillée
**Théorie :**
La **documentation technique détaillée** décrit **comment les couches communiquent entre elles**. Elle est essentielle pour que les développeurs et designers puissent travailler efficacement dans leur domaine. Elle inclut des détails sur les **endpoints API**, la **structure du DOM**, et les **classes CSS disponibles**.

**Exemple (Markdown) :** sur ce site, la documentation technique détaillée est accessible via le module [Documentation technique](/a-propos/Documentation%20technique).

---

# 18. Sprint en cours et principes Kanban
**Théorie :**
Le **tableau Sprint en cours** de cette page applique les principes du **Kanban** : visualisation du flux de travail, colonnes correspondant aux étapes (agents du tunnel US → BDD → TDD-back-end → TDD-front-end), et cartes représentant les User Stories. Le **workflow** est explicite — chaque colonne correspond à une étape du processus — et une limite de **WIP (Work In Progress)** peut être appliquée pour éviter la surcharge et favoriser la finition des tâches avant d’en entamer de nouvelles. Sur ce site, le module [Sprint en cours](/a-propos) affiche le board du sprint courant et permet d’ouvrir le détail d’une US en cliquant sur un post-it.

---

# 19. Configuration IA et pair programming avec l’IA
**Théorie :**
Un projet en **pair programming avec l’IA** a des spécificités : les règles de qualité, de nommage et de workflow doivent être **explicites et stables** pour que l’assistant produise un code cohérent. La **configuration des règles** (fichiers de consignes, Definition of Done) et la **spécialisation des agents** (US, BDD, TDD-back-end, TDD-front-end, Designer) permettent de limiter le périmètre de chaque tâche et d’éviter la dilution du contexte. La **contrainte de taille du contexte** des modèles impose de donner à l’IA un cadre clair et ciblé plutôt qu’un mélange de sujets ; des agents dédiés avec des prompts spécialisés y répondent. Sur ce site, le module [Configuration IA](/a-propos/%2E%2Fdata%2FA%20propos%20de%20ce%20site%2FConfiguration%20IA) décrit les agents et les règles utilisées.

---

# 20. Métriques : management visuel des délivrables
**Théorie :**
Les **métriques** offrent un **management visuel** de l’avancement et de la qualité des délivrables : couverture de tests (unitaires, intégration, E2E), qualité du code (linter), taille du code, dépendances, performance. Les afficher de façon centralisée et lisible permet de prendre des décisions basées sur des faits et de détecter rapidement les dérives. Sur ce site, le module [Métriques](/a-propos?view=metrics) regroupe ces indicateurs (tests, couverture, qualité, version) dans un tableau de bord compact.

# 21. Annexes

## Mon parcours : développeur, puis décideur
Je suis un ancien développeur, avec une expérience professionnelle allant de 1995 à 2020, principalement sur l'environnement 4D.
Ce contexte m'a permis de construire de très solides bases en :
- modélisation de données
- conception de bases de données relationnelles
- SQL (un peu rouillé)
- algorithmie et raisonnement logique
En revanche, mon parcours ne m'a pas exposé directement à :
- la programmation orientée objet « pure »
- les design patterns
- les frameworks modernes
- la culture du code issue du software craft
Dès 2010, mon entreprise a financé et j'ai dirigé une équipe de développeurs C#.
Nous avons connu un échec marquant : en trois ans, le projet est devenu un monolithe spaghetti… que nous avons fini par jeter.
Cette expérience a été déterminante.
Elle a conduit l'équipe à une remise en question profonde, puis à l'adoption progressive de pratiques solides :
- BDD & TDD
- Clean Code
- DDD
- architecture hexagonale
- CQRS et Event Sourcing
Aujourd'hui, en tant qu'ancien éditeur de logiciel, j'ai expérimenté la différence entre du code qui fonctionne et du code de qualité.

## Mes arbitrages
- IDE : Cursor
- Langage : TypeScript
- Frontend : Next.js
- Gestion du code : GitHub
- TDD : Jest
- BDD : Cucumber.js
- Hébergement : Vercel

## Ce que j'ai fait
- Installer Cursor
- Installer Git
- Installer NodeJS
- Créer un compte GitHub (que j'ai associé à Cursor)
- Créer un compte Vercel (où j'ai créé un projet associé à mon projet sous GitHub)
- Mon premier promt dans Cursor a été de lui demander d'afficher un "Hello World"
- Après, je n'ai pas arrêté d'enchainer les prompts :
	. pour faire émerger petit à petit de nouveaux contenus sur le site
	. pour lui demander de refactoriser le code
	. pour lui imposer des BDD et TDD
	. pour recevoir une formation sur la syntaxe en TypeScript et le comportement de Next.JS

