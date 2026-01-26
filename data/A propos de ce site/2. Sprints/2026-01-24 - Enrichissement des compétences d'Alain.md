# Sprint Goal
Enrichir le site avec une page dédiée présentant les compétences techniques d'Alain en ingénierie logiciel, permettant aux visiteurs de découvrir ses domaines d'expertise en développement, pratiques d'équipe et architectures.

---

## US-6.5 : Page dédiée "Ingénierie logiciel"

- **En tant que** visiteur du site
- **Je souhaite** accéder à une page dédiée au thème "Ingénierie logiciel"
- **Afin de** découvrir en détail 3 nouveaux domaines de compétence d'Alain

- **Critères d'acceptation** :

- **CA1 - Navigation depuis la page d'accueil** :
  - Le bouton "En savoir plus" du domaine "Ingénierie logiciel" sur la page d'accueil redirige vers `/ingenierie-logiciel` au lieu de `/a-propos-du-site`

- **CA2 - Intégration dans le plan du site** :
  - La nouvelle page apparaît automatiquement dans le plan du site grâce au test d'intégration existant

- **CA3 - Structure de la page** :
  - La page affiche un titre "Ingénierie logiciel" en haut
  - Chaque domaine de compétence a une description
  - Chaque compétence a une image et un texte descriptif (textes dans le JSON à leur emplacement normal)

- **CA4 - Navigation depuis Vibe Coding** :
  - La compétence "Vibe Coding" a un bouton "En savoir plus..." qui redirige vers `/a-propos-du-site`

- **CA5 - Architecture technique** :
  - La page est créée dans `app/ingenierie-logiciel/page.tsx` suivant le pattern des autres pages (ex: `app/transformation/page.tsx`)
  - Un fichier JSON `data/ingenierie-logiciel.json` contient la structure de la page (comme `data/transformation.json`, `data/robustesse.json`)
  - La route `/ingenierie-logiciel` est ajoutée dans `constants/routes.ts` pour cohérence
  - La page utilise le même composant `PageContentRenderer` et la même structure que les autres pages

- **CA6 - Responsive** :
  - La page est responsive (mobile et desktop) comme les autres pages avec domaines de compétences
  - Les domaines de compétences alternent les fonds (blanc/bleu clair) comme sur la page d'accueil

- **CA7 - Contenu temporaire** :
  - Les images sont des placeholders temporaires (n'importe quelle image disponible dans le JSON) en attendant les images finales
  - Les textes descriptifs sont des placeholders temporaires (quelques mots inspirés du titre) pour faciliter le contrôle de mise en page

- **CA8 - Tests** :
  - Le test d'intégration `siteMapGenerator.integration.test.ts` détecte automatiquement la nouvelle page

**Domaines de compétences à afficher :**

1. **Développeur**
   - 4D
   - no-code
   - Vibe Coding

2. **Expérience en équipe**
   - BDD
   - TDD
   - CI/CD

3. **Autres pratiques connues**
   - CleanCode
   - Architecture Hexagonale
   - CQRS:ES
