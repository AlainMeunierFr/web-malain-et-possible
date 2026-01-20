### Sprint Goal
Développer la structure hiérarchique et le responsive du site vitrine (carte de visite) en reprenant le contenu d'une version existante développée sous Bubble.

#### US-3.1 : Affichage d'un Domaine de compétences mockup sur la page d'accueil
- **En tant que** Product Manager
- **Je souhaite** Voir s'afficher sur la page d'accueil un "Domaine de compétences" avec ses 3 compétences (données mockup)
- **Afin de** Valider la structure et la mise en page d'un Domaine de compétences avant de développer les autres types de contenu
- **Critères d'acceptation** :
- Un fichier JSON `data/index.json` contient un objet "Domaine de compétences" mockup avec ses propriétés (titre, contenu, items)
- Chaque compétence contient ses propriétés (titre, image, description, bouton optionnel)
- Le JSON est chargé depuis le backend pur et affiché sur la page d'accueil via un composant React
- **CSS responsive** :
  - Un bloc conteneur principal qui régule la largeur selon les contraintes responsive : écran trop large = contrainte la largeur / écran pas assez large = écriture en plus petit
  - Premier sous-bloc horizontal qui prend toute la largeur pour le "Domaine de compétences" :
    - Ligne 1 : le titre en gras
    - Ligne 2 : le texte en normal
  - Second bloc qui contient 3 sous-blocs pour chacune des compétences :
    - Ligne 1 : le titre
    - Ligne 2 : l'image
    - Ligne 3 : le texte (contenant éventuellement du gras sur certains mots)
- Les données mockup sont réalistes mais factices (texte lorem ipsum, images placeholder, etc.)

#### US-3.2 : Navigation depuis les boutons "En savoir plus..." vers des pages dédiées
- **En tant que** Visiteur du site
- **Je souhaite** Pouvoir cliquer sur un bouton "En savoir plus..." d'une compétence pour accéder à une page dédiée contenant plus d'informations
- **Afin de** Découvrir en détail les domaines de compétences qui m'intéressent
- **Critères d'acceptation** :
- Les boutons "En savoir plus..." sont cliquables et affichent un style de lien/bouton cohérent
- Le clic sur un bouton "En savoir plus..." redirige vers une page dédiée correspondante
- Les pages dédiées affichent le contenu complet du domaine de compétences depuis un fichier JSON spécifique
- La navigation fonctionne pour au moins 3 domaines : "Stratégie" → page Robustesse, "Conduite du changement" → page Conduite du changement, "Détournement vidéo" → page Détournement vidéo
- Les pages dédiées utilisent la même structure et le même composant que la page d'accueil pour l'affichage

#### US-3.3 : Enrichissement des pages avec de nouveaux types de contenu
- **En tant que** Visiteur du site
- **Je souhaite** Voir différents types de contenu sur les pages (titres, vidéos, textes d'introduction) en plus des domaines de compétences
- **Afin de** Avoir une expérience de navigation plus riche et variée avec différents formats de présentation
- **Critères d'acceptation** :
- Le JSON n'est plus une liste de "domaine de compétence". Le JSON devient "contenu de page", lequel contient, pour compatibilité ascendante, la liste actuelle de "Domaine de compétence". Mais ce JSON va pouvoir contenir d'autres types que nous allons définir ensuite.
- **Nouveau Type "Titre"** :
  - Data : un texte
  - CSS : une bande bleue foncée qui fait toute la largeur de la page contenant le texte en h1
- **Nouveau type "Vidéo"** :
  - Data : URL YouTube / Lancement automatique = Oui/Non
  - CSS : incrustation de vidéo YouTube
- **Nouveau Type "Texte large"** :
  - Data : un texte
  - CSS : un texte qui se comporte comme le titre d'un domaine de compétence (947 de largeur max) mais qui n'a pas "3 compétences"

#### US-3.4 : Contact - Call to Action et page "Faisons connaissance"
- **En tant que** Visiteur du site
- **Je souhaite** Pouvoir accéder à une page "Faisons connaissance" depuis un bouton d'action visible en bas de toutes les pages
- **Afin de** Entrer en contact avec Alain et découvrir comment collaborer
- **Critères d'acceptation** :
- **Type de contenu "callToAction"** :
  - Un nouveau type de contenu "callToAction" est défini dans `TypeElementContenu` avec une interface `ElementCallToAction` contenant un champ "action" (string) pour le texte du bouton
  - Ce type est ajouté à l'union type `ElementContenu` dans `utils/indexReader.ts`
  - Le composant `PageContentRenderer` gère le rendu de ce nouveau type de contenu
- **Ajout dans les JSON** :
  - Un élément `callToAction` avec `action: "Faisons connaissance..."` est ajouté à la fin du tableau `contenu` de tous les fichiers JSON de pages (`index.json`, `Conduite du changement.json`, `Détournement vidéo.json`, `Robustesse.json`)
- **Rendu CSS du bouton** :
  - Le bouton a le même style que "En savoir plus..." : bordure bleue (`rgba(0, 112, 192, 1)`), police 'Clint Marker', fond transparent, effet hover (fond bleu, texte blanc)
  - La largeur maximale du bouton est de 947px (identique à un "Domaine de compétence")
  - Le bouton est centré dans son conteneur
  - Le design est responsive (mobile-first)
- **Comportement du bouton** :
  - Un clic sur le bouton "Faisons connaissance..." redirige vers la page "/faisons-connaissance"
  - La navigation utilise Next.js Link pour une navigation optimisée
- **Page "Faisons connaissance"** :
  - La page "/faisons-connaissance" affiche le contenu de contact
  - Le contenu est basé sur le fichier HTML d'exemple "Malain et possible - Faisons connaissance.html"
  - La page est responsive et utilise la même structure que les autres pages du site (Header/Footer partagés)

#### US-3.5 : Page "Faisons connaissance" - Affichage et comportement des boutons de contact
- **En tant que** Visiteur du site
- **Je souhaite** Voir une page "Faisons connaissance" avec des boutons de contact clairs et accessibles organisés en groupes
- **Afin de** Facilement entrer en contact avec Alain selon différents modes (déjeuner, visio, téléphone, email, réseaux sociaux)

- **Critères d'acceptation** :

- **Titre de la page** :
  - La page affiche un titre "Faisons connaissance"

- **Nouveau type de contenu "Groupe de boutons"** :
  - Un nouveau type de contenu "groupeBoutons" est défini dans `TypeElementContenu` avec une interface `ElementGroupeBoutons`
  - Un groupe de boutons contient :
    - `taille` : "petite" ou "grande"
    - `boutons` : tableau de boutons
  - Chaque bouton contient : `icone` (string), `texte` (string optionnel), `url` (string), `command` (string optionnel)
  - Le type est ajouté à l'union type `ElementContenu` dans `utils/indexReader.ts`
  - Le composant `PageContentRenderer` gère le rendu de ce nouveau type de contenu

- **Groupe de boutons "grands" (verticaux)** :
  - Un groupe de boutons de taille "grande" s'affiche verticalement
  - Chaque bouton large affiche une icône et un titre
  - Les boutons sont empilés verticalement (flex-direction: column)
  - 3 boutons dans ce groupe :
    1. Icône "UtensilsCrossed" (couverts) + texte "Déjeuner aux alentours de Lyon" + URL "http://localhost:3000/about-site"
    2. Icône "Video" (visioconférence) + texte "30mn de visio" + URL "http://localhost:3000/about-site"
    3. Icône "Phone" (téléphone) + texte "+33 6.21.03.12.65" + URL "tel:+33621031265"
  - Sur smartphone, le bouton téléphone déclenche un appel (`tel:`)

- **Groupe de boutons "petits" (horizontaux)** :
  - Un groupe de boutons de taille "petite" s'affiche horizontalement
  - Les boutons sont sans texte, icône uniquement (comme le footer)
  - Les boutons sont alignés horizontalement (flex-direction: row)
  - 3 boutons dans ce groupe :
    1. Icône "Mail" + URL "mailto:alain@maep.fr"
    2. Icône "Youtube" + URL "https://www.youtube.com/@m-alain-et-possible"
    3. Icône "Linkedin" + URL "https://www.linkedin.com/in/alain-meunier-maep/"

- **Couleur du texte inversée** :
  - Les boutons du footer sont blancs sur fond BleuFonce
  - Les boutons de la page "Faisons connaissance" sont BleuFonce sur fond blanc (ou fond clair)
  - La couleur du texte est donc inversée par rapport au footer

- **Architecture des données** :
  - Un fichier JSON `data/faisons-connaissance.json` définit le contenu de la page
  - Structure : tableau `contenu` contenant des éléments de type "titre" et "groupeBoutons"
  - La page utilise `readPageData` pour charger le JSON
  - Réutilisation de la logique des boutons du footer (ButtonGroup, ButtonItem) avec paramètre de taille
  - Factorisation des composants de boutons pour éviter la duplication

- **Composants réutilisables** :
  - Factorisation avec le footer : réutilisation de la logique de boutons (icône, URL, command)
  - Adaptation du rendu selon la taille du groupe (petite = horizontal sans texte, grande = vertical avec icône et texte)
  - Adaptation de la couleur selon le contexte (footer = blanc sur bleu, page = bleu sur blanc)

#### US-3.6 : Amélioration de l'affichage des "Critères d'acceptation" dans le wiki
- **En tant que** Lecteur du wiki du site
- **Je souhaite** Voir les "Critères d'acceptation" des User Stories structurés hiérarchiquement avec des thèmes de critères en gras et des critères normaux
- **Afin de** Mieux comprendre l'organisation et la hiérarchie des critères d'acceptation

- **Critères d'acceptation** :

- **Détection du format dans le parseur** :
  - Le parseur Markdown détecte les éléments de type "Critères d'acceptation" dans les User Stories
  - Une section "Critères d'acceptation" commence par la ligne `- **Critères d'acceptation** :` (avec `typeDeContenu: "Critères d'acceptation"`)
  - Cette section se termine soit :
    - À la prochaine User Story (ligne commençant par `#### US-`)
    - À un séparateur `---`
    - À la fin de la sous-partie (H4)
  - Dans cette section "Critères d'acceptation" :
    - Si une ligne commence par `- **` : c'est un "Thème de critère" (puce de niveau 1, texte en gras)
    - Sinon (ligne commence par `- ` sans `**` au début) : c'est un "Critère" (puce de niveau 2, texte normal, indenté sous le thème précédent)
  - Les critères sont imbriqués sous leur thème de critère correspondant (le dernier thème rencontré)

- **Structure de données** :
  - Les éléments de type "Critères d'acceptation" sont enrichis avec une structure hiérarchique
  - Les thèmes de critères et les critères sont distingués et structurés dans le JSON généré

- **Affichage CSS dans le wiki** :
  - Les thèmes de critères (niveau 1) : puce de niveau 1, texte en gras (style `**texte**` rendu en `<strong>`)
  - Les critères (niveau 2) : puce de niveau 2 (indentée), texte normal
  - Hiérarchie visuelle claire entre thèmes et critères (indentation)

- **Comportement implicite de l'IA** :
  - Lorsque j'écris une User Story dans le wiki, je respecte cette structure dans la section "Critères d'acceptation" :
    - `- **Thème de critère**` pour les thèmes (ex: `- **CSS responsive** :`)
    - `- Critère normal` (sans `**` au début) pour les critères sous ce thème
  - La règle est ajoutée dans la DOD "Comportement implicite de l'IA" (section sur l'écriture des User Stories)

#### US-3.7 : Reprise du contenu manquant avec les types de contenu existants
- **En tant que** Visiteur du site
- **Je souhaite** Voir tout le contenu de l'ancien site repris dans le nouveau site en utilisant les types de contenu déjà implémentés (titre, video, texteLarge, domaineDeCompetence, callToAction, groupeBoutons)
- **Afin de** Avoir un site complet avec tout le contenu de l'ancien site disponible

- **Critères d'acceptation** :

- **Analyse du contenu manquant** :
  - Comparer le contenu de l'ancien site avec le contenu actuel du nouveau site
  - Identifier les éléments de contenu qui ne sont pas encore repris
  - Lister les éléments qui peuvent être créés avec les types de contenu existants (titre, video, texteLarge, domaineDeCompetence, callToAction, groupeBoutons)

- **Reprise du contenu** :
  - Créer les fichiers JSON nécessaires pour les pages manquantes
  - Utiliser les types de contenu existants pour structurer le contenu
  - Respecter la structure hiérarchique et l'ordre du contenu de l'ancien site
  - Vérifier que tous les textes, images et liens sont correctement repris

- **Validation** :
  - Toutes les pages de l'ancien site ont leur équivalent dans le nouveau site
  - Le contenu est fidèle à l'original (textes, images, structure)
  - Les types de contenu utilisés sont appropriés et cohérents

#### US-3.8a : Création du type de contenu "témoignage"
- **En tant que** Visiteur du site
- **Je souhaite** Voir des témoignages de clients ou partenaires sur le site
- **Afin de** Avoir une preuve sociale et crédibilité pour les services proposés

- **Critères d'acceptation** :

- **Structure de données** :
  - Définir l'interface TypeScript `ElementTemoignage` dans `utils/indexReader.ts`
  - Structure : `type: 'temoignage'`, `auteur` (string), `fonction` (string optionnel), `entreprise` (string optionnel), `texte` (string), `photo` (string optionnel pour URL d'image)
  - Ajouter le type à l'union type `ElementContenu`

- **Composant React** :
  - Créer le composant `Temoignage.tsx` avec son CSS module `Temoignage.module.css`
  - Intégrer le composant dans `PageContentRenderer`
  - Le témoignage affiche : photo (si présente), texte, auteur, fonction/entreprise

- **CSS** :
  - Design cohérent avec le reste du site
  - Responsive (mobile-first)
  - Mise en page claire et lisible

- **Tests** :
  - Tests unitaires pour le composant `Temoignage`
  - Tests pour la lecture du JSON avec type "temoignage"

#### US-3.8b : Création du type de contenu "portfolio détournements"
- **En tant que** Visiteur du site
- **Je souhaite** Voir une galerie de détournements vidéo avec des images et des liens vers les vidéos
- **Afin de** Découvrir les réalisations créatives d'Alain

- **Critères d'acceptation** :

- **Structure de données** :
  - Définir l'interface TypeScript `ElementPortfolioDetournements` dans `utils/indexReader.ts`
  - Structure : `type: 'portfolioDetournements'`, `items` (tableau d'objets)
  - Chaque item contient : `titre` (string), `image` (string pour URL), `videoUrl` (string optionnel pour URL YouTube), `description` (string optionnel)
  - Ajouter le type à l'union type `ElementContenu`

- **Composant React** :
  - Créer le composant `PortfolioDetournements.tsx` avec son CSS module `PortfolioDetournements.module.css`
  - Intégrer le composant dans `PageContentRenderer`
  - La galerie affiche les items en grille responsive

- **CSS** :
  - Grille responsive (mobile-first)
  - Images avec effet hover si lien vidéo présent
  - Design cohérent avec le reste du site

- **Tests** :
  - Tests unitaires pour le composant `PortfolioDetournements`
  - Tests pour la lecture du JSON avec type "portfolioDetournements"

#### US-3.9 : Conservation des URLs de l'ancien site
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

#### US-3.10a : Génération automatique du plan du site et validation de conformité
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

#### US-3.10b : Rendu visuel du plan du site (futur)
- **En tant que** Visiteur du site
- **Je souhaite** Voir une visualisation graphique du plan du site avec des rectangles (pages) et des flèches (liens)
- **Afin de** Naviguer facilement et découvrir tout le contenu disponible

- **Note** : Cette US sera traitée après US-3.10a, une fois la structure de données validée

#### US-3.10 : Création de la page "Plan du site" (version originale - reportée)
- **Note** : Cette US originale a été décomposée en US-3.10a (structure) et US-3.10b (rendu visuel)

- **Critères d'acceptation** (version originale - référence future) :

- **JSON** :
  - Un fichier JSON decrit le plan du site
  - Des objets de type "Page", avec un "Tites" et "URL" liste les pages
  - Des objets de type "Lien", avec "Page source" et "Page destination" listes les chemins d'une page vers l'autres
  
- **Test d'intégration** :
  - Un test d'intégration vérfifie que toutes les pages sont listées
  - Un test d'intégration vérifie que toutes liens entre pages sont listés
  - Les liens dans le "header" et le "footer" ne doivent pas être oubliés
  - Seuls les liens interne au site sont géré. Les liens externes ne font pris en compte

- **Structure de la page** :
  - La page "Plan du site" est accessible via la route `/site-map`
  - La page affiche un rectangle avec le nom de la page au milieu (centré en hauteur et largeur) pour représenter les de objets de type "Page"
  - Une flèche relie le rectangle A vers le rectangle B si un lien ou bouton permet de passer de A à B pour représenter les objets de type "Lien"
  - Chaque rectangle est un bouton clicable vers la page correspondante
  - Utiliser une librarie SVG
  - Il faudra explorer, discuter et arbitrer d'une solution pour placer les rectangles et rendre le plan lisible (bibliothèque SVG + coordonnées relative des rectangles à ajouter dans le JSON ?)

- **Design et accessibilité** :
  - Le design est cohérent avec le reste du site (Header/Footer partagés)
  - La page est responsive (mobile-first)
  - La structure est claire et facile à parcourir