# US-3.9 : Conservation des URLs de l'ancien site ✅ COMPLÉTÉ
- **En tant que** Visiteur ayant des liens vers l'ancien site
- **Je souhaite** Que toutes les URLs de l'ancien site (partagées dans des CV, lettres de motivation, etc.) fonctionnent à l'identique dans le nouveau site
- **Afin de** Ne pas perdre les liens existants et maintenir la continuité de référencement

- **Critères d'acceptation** :

- **Inventaire des URL à cloner** :
    - `https://m-alain-et-possible.fr/`
    - `https://m-alain-et-possible.fr/a-propos`
    - `https://m-alain-et-possible.fr/detournement-video`
    - `https://m-alain-et-possible.fr/faisons-connaissance`
    - `https://m-alain-et-possible.fr/management-de-produit-logiciel`
    - `https://m-alain-et-possible.fr/portfolio-detournements`
    - `https://m-alain-et-possible.fr/pour_aller_plus_loin`
    - `https://m-alain-et-possible.fr/site-map`
    - `https://m-alain-et-possible.fr/transformation`
    
   - **Cas 1 - URLs identiques (route existe avec le même nom)** :
    - Vérifier que la route fonctionne correctement
    - Aucune action nécessaire si la route existe déjà avec le bon nom
  - **Cas 2 - Pages existantes mais avec un nom différent (à renommer)** :
    - Renommer les dossiers/routes Next.js pour correspondre aux URLs de l'ancien site
    - Créer des redirections 301 depuis l'ancienne route vers la nouvelle route (si nécessaire)
    - Mettre à jour les références dans le code (constants/routes.ts, liens internes, etc.)
  - **Cas 3 - Pages qui n'existent pas encore (créer des pages "En construction")"** :
    - Créer les routes Next.js manquantes
    - Créer des pages "En construction" avec un design cohérent
    - Les pages affichent un message indiquant que le contenu est en cours de développement
    - Structure : Header/Footer partagés, message centré, design responsive

- **Redirections et routes** :
  - Créer toutes les routes Next.js correspondant aux anciennes URLs
  - Implémenter des redirections 301 si nécessaire (pour SEO, quand une route a été renommée)
  - Vérifier que toutes les ressources (images, fichiers) sont accessibles aux mêmes chemins relatifs

- **Validation** :
  - Toutes les URLs de l'ancien site sont accessibles dans le nouveau site
  - Les redirections fonctionnent correctement (test manuel + vérification HTTP 301)
  - Les pages "En construction" sont accessibles et affichent un message clair
  - Aucun lien cassé pour les visiteurs ayant des liens vers l'ancien site

# US-3.10a : Génération automatique du plan du site et validation de conformité ✅ COMPLÉTÉ
- **En tant que** Développeur
- **Je souhaite** Avoir un test d'intégration qui génère automatiquement un plan du site (pages + liens internes) et valide sa conformité avec un JSON de référence
- **Afin de** Maintenir automatiquement le plan du site à jour et préparer la structure pour le rendu visuel futur

- **Critères d'acceptation** :

- **Détection automatique des pages** :
  - Une fonction détecte automatiquement toutes les pages Next.js dans le dossier `app/`
  - Chaque page détectée a son URL (chemin relatif) et un titre déduit (depuis le fichier JSON associé ou le nom de la route)
  - Les pages détectées incluent : HomePage (/), /about, /site-map, /transformation, /robustesse, /detournement-video, /faisons-connaissance, /management-de-produit-logiciel, /portfolio-detournements, /pour_aller_plus_loin

- **Détection automatique des liens internes** :
  - Une fonction détecte automatiquement tous les liens internes entre pages :
    - Liens dans les boutons de compétences (dans les JSON de pages)
    - Liens dans les CallToAction (toujours vers /faisons-connaissance)
    - Liens dans les boutons du footer (via footerButtons.json)
    - Liens dans le header (si présents)
    - Liens dans les boutons des domaines de compétences
  - Seuls les liens internes au site sont pris en compte (commençant par `/` et non externes)
  - Chaque lien est représenté par un couple (page source, page destination)

- **Structure JSON du plan du site** :
  - Un fichier JSON `data/site-map.json` (ou équivalent) décrit le plan du site
  - Structure : `{ pages: [...], liens: [...] }`
  - **Objets "Page"** :
    - `url` : URL de la page (ex: "/", "/about")
    - `titre` : Titre de la page (déduit automatiquement ou fourni manuellement)
    - `x` : Position X pour le rendu futur (optionnel, peut être null)
    - `y` : Position Y pour le rendu futur (optionnel, peut être null)
  - **Objets "Lien"** :
    - `source` : URL de la page source
    - `destination` : URL de la page destination
    - `label` : Texte du lien/bouton (optionnel, pour information)

- **Test d'intégration de conformité** :
  - Un test d'intégration compare le plan détecté automatiquement (depuis le code) avec le plan JSON existant
  - Le test vérifie que :
    - Toutes les pages détectées sont présentes dans le JSON
    - Tous les liens détectés sont présents dans le JSON
    - Les pages qui n'existent plus sont supprimées du JSON sans contrôle humain
    - Les liens qui n'existent plus sont supprimés du JSON sans contrôle humain
    - Les pages nouvelles sont ajoutées du JSON sans contrôle humain
    - Les liens nouveaux sont ajoutés du JSON sans contrôle humain
 
- **Validation des emplacements** :
  - Le test vérifie que chaque page a un emplacement défini (`x` et `y` non null)
  - Si une page n'a pas d'emplacement :
    - Le test **échoue** avec un message indiquant les pages à placer
    - Le test indique qu'un placement manuel est nécessaire (pas de valeurs par défaut proposées)
  - Les emplacements sont toujours fixés manuellement par un humain
  - Cette validation permet de préparer le rendu visuel futur (US-3.10b)

- **Initialisation et régénération du plan** :
  - Si le fichier JSON n'existe pas, le test crée automatiquement un JSON initial avec toutes les pages détectées et tous les liens détectés (emplacements x/y à null)
  - Si le fichier JSON existe déjà :
    - Le test met à jour automatiquement les pages et liens (ajout/suppression) pour rester conforme au code
    - Les emplacements (x, y) existants sont préservés pour les pages qui restent
    - Les nouvelles pages sont ajoutées avec x/y à null (à placer ensuite)
  - Cette approche garantit que le plan JSON reste toujours synchronisé avec le code, seul le positionnement visuel nécessite une intervention humaine

# US-3.10b : Rendu visuel du plan du site ✅ COMPLÉTÉ
- **En tant que** Visiteur du site
- **Je souhaite** Voir une visualisation du plan du site avec des boutons cliquables pour chaque page
- **Afin de** Naviguer facilement et découvrir tout le contenu disponible

- **Critères d'acceptation** :
- **Composant ListeDesPages** : Le composant `ListeDesPages.tsx` affiche les pages du site sous forme de boutons dans une grille
- **Chargement des données** : Les données sont chargées depuis l'API `/api/site-map` qui retourne le plan du site au format JSON
- **Filtrage** : Seules les pages avec `dessiner="Oui"` sont affichées
- **Tri** : Les pages sont triées par `numero` (si présent), sinon par ordre alphabétique du titre
- **Grille responsive** : 
  - Affichage en grille avec 3 colonnes sur desktop (`grid-template-columns: repeat(3, 1fr)`)
  - Une seule colonne sur mobile (≤768px)
  - Espacement uniforme entre les boutons (gap: 1.5rem)
- **Boutons** :
  - Chaque bouton est un lien (`Link` de Next.js) vers la page correspondante
  - Hauteur fixe de 80px pour tous les boutons
  - Utilisation des constantes CSS de boutons (`--BoutonCouleurFondHover`, `--BoutonCouleurTexteHover`, etc.)
  - État normal : fond bleu clair avec texte blanc (aspect "hover" inversé)
  - État hover : fond blanc avec texte bleu (aspect "normal" inversé)
  - Transitions fluides et effets visuels cohérents avec le reste du site
- **Page dédiée** : Route `/plan-du-site` qui affiche le composant `ListeDesPages`
- **Styles CSS** : Fichier `ListeDesPages.module.css` avec styles cohérents avec le reste du site
- **Responsive** : Le composant s'adapte aux différentes tailles d'écran
- **Note** : L'implémentation utilise une grille de boutons plutôt qu'une représentation graphique avec rectangles et flèches, ce qui offre une meilleure accessibilité et une navigation plus directe