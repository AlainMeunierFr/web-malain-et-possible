### Epic 1 : Site Web - Structure de Base

#### Sprint Goal
Mettre en place la structure de base du site web avec header, footer, logo et photo, configurer le CI/CD pour un déploiement automatique sur Vercel, et implémenter une navigation fonctionnelle vers la page "À propos de moi", afin d'avoir une base solide et déployable pour les développements ultérieurs.

#### US-1.1 : Affichage initial "Hello World"
- **En tant que** Visiteur du site
- **Je souhaite** Voir une page "Hello World" s'afficher
- **Afin de** Vérifier que le site fonctionne et que le déploiement CI/CD est opérationnel
- **Critères d'acceptation** :
- La page d'accueil affiche "Hello World"
- Le site se déploie automatiquement sur Vercel après chaque commit
- Aucune erreur de build

---

#### US-1.2 : Page avec header, footer, logo et photo
- **En tant que** Visiteur du site
- **Je souhaite** Voir une page avec un header fixe en haut, un footer fixe en bas, un logo en haut à gauche et une photo en haut à droite
- **Afin de** Avoir une structure de base cohérente pour le site
- **Critères d'acceptation** :
- Le header est fixe en haut avec une hauteur responsive (8.75vh, minimum 78px)
- Le footer est fixe en bas avec une hauteur responsive (5.47vh, minimum 53px)
- Le logo flotte au-dessus du header en haut à gauche (position absolue, déborde vers le bas)
- La photo flotte au-dessus du header en haut à droite (position absolue, déborde vers le bas)
- Les proportions sont calculées de façon responsive
- La couleur bleue (#0070C0) est définie comme variable CSS `--BleuFonce`

---

#### US-1.3 : Boutons footer configurables via JSON
- **En tant que** Product Manager
- **Je souhaite** Pouvoir ajouter/modifier des boutons dans le footer via un fichier JSON
- **Afin de** Faciliter l'ajout de nouveaux boutons sans modifier le code
- **Critères d'acceptation** :
- Les boutons sont définis dans un fichier JSON (`data/footerButtons.json`)
- Chaque bouton a : une icône, une commande, une URL, un tooltip
- Les boutons sont affichés verticalement centrés dans le footer
- Les boutons sont positionnés à 11px du bord droit
- Les icônes ont une hauteur de 60% de la hauteur du footer
- Un clic sur un bouton exécute l'action associée (navigation interne, lien externe, ou popup)

---

#### US-1.4 : Navigation vers la page "À propos de moi"
- **En tant que** Visiteur du site
- **Je souhaite** Pouvoir accéder à une page "À propos de moi" en cliquant sur la photo
- **Afin de** Découvrir des informations sur la personne
- **Critères d'acceptation** :
- La photo en haut à droite est cliquable
- Un clic sur la photo redirige vers la page "À propos de moi"
- Un tooltip "À propos de moi" apparaît au survol de la photo
- Le header et le footer sont présents sur toutes les pages (factorisés dans layout)

---

### Epic 2 : Page "À propos de ce site" - Backend (Construction progressive du JSON)

#### Sprint Goal
Construire un backend robuste qui lit, parse et valide les fichiers Markdown du répertoire "A propos de ce site" pour générer un JSON structuré avec la hiérarchie complète (Chapitre → Section → Partie → Sous-partie → Bloc), en garantissant la qualité des données via des validations strictes (pas de H1/H2, hiérarchie cohérente, minimum 2 sections par chapitre) et en détectant les types de contenu spéciaux (Prompt, Résultat technique).

#### US-2.1 : Lecture des dossiers du répertoire "A propos de ce site"
- **En tant que** Système backend
- **Je souhaite** Lire la liste des dossiers présents dans "A propos de ce site"
- **Afin de** Construire la structure hiérarchique des chapitres
- **Critères d'acceptation** :
- La fonction retourne un tableau avec les noms des dossiers
- Les fichiers (non-dossiers) sont ignorés
- Les dossiers vides sont ignorés
- Les dossiers ne contenant que des fichiers à ignorer sont ignorés aussi (#US-2.1)

---

#### US-2.2 : Lecture des fichiers Markdown dans chaque dossier
- **En tant que** Système backend
- **Je souhaite** Lire tous les fichiers Markdown (.md) présents dans chaque dossier
- **Afin de** Construire la liste des sections pour chaque chapitre
- **Critères d'acceptation** :
- Seuls les fichiers avec l'extension .md sont lus
- Les fichiers non-MD sont ignorés
- Les fichiers MD vides sont ignorés
- Les dossiers ne contenant que des fichiers à ignorer sont ignorés aussi (#US-2.1)

---

#### US-2.3 : Parsing de la hiérarchie (Parties, Sous-parties, Blocs)
- **En tant que** Système backend
- **Je souhaite** Extraire la structure hiérarchique complète d'un fichier MD : parties (###), sous-parties (####) et blocs (#####)
- **Afin de** Construire la structure hiérarchique Partie → Sous-partie → Bloc
- **Critères d'acceptation** :
- **Parties (###)** : Chaque titre ### est détecté comme une partie, le titre est extrait, le contenu est extrait jusqu'à la prochaine partie ou fin de fichier
- **Sous-parties (####)** : Chaque titre #### est détecté comme une sous-partie, le titre est extrait, le contenu est extrait jusqu'à la prochaine sous-partie, partie ou fin de fichier
- **Blocs (#####)** : Chaque titre ##### est détecté comme un bloc, le titre est extrait, le contenu est extrait jusqu'au prochain bloc, sous-partie, partie ou fin de fichier
- La hiérarchie est respectée : Bloc dans Sous-partie, Sous-partie dans Partie

---

#### US-2.4 : Détection des blocs "Prompt" et "Résultat technique"
- **En tant que** Système backend
- **Je souhaite** Identifier les blocs avec les titres "##### Prompt" et "##### Résultat technique" et leur contenu
- **Afin de** Leur attribuer un typeDeContenu spécial pour le style CSS
- **Critères d'acceptation** :
- Un bloc avec le titre exact "##### Prompt" a `typeDeContenu: "Prompt"`
- Un bloc avec le titre exact "##### Résultat technique" a `typeDeContenu: "Résultat technique"`
- Le contenu (texte, paragraphes, listes) d'un bloc "Prompt" a aussi `typeDeContenu: "Prompt"` pour l'affichage en bleu clair
- Les autres blocs n'ont pas de typeDeContenu

---

#### US-2.5 : Parsing du contenu texte (paragraphes, listes) dans une partie/sous-partie/bloc
- **En tant que** Système backend
- **Je souhaite** Extraire les paragraphes, listes à puce et listes numérotées dans le contenu
- **Afin de** Construire le JSON avec le contenu textuel structuré
- **Critères d'acceptation** :
- Chaque ligne de texte (non vide, non titre, non liste) est un paragraphe
- Chaque ligne commençant par "- " est un item de liste à puce
- Chaque ligne commençant par "1. ", "2. ", etc. est un item de liste numérotée
- Les éléments consécutifs sont regroupés (paragraphes ensemble, listes ensemble)
- Les éléments sont dans l'ordre d'apparition dans le fichier

---

#### US-2.6 : Validation - Interdiction des titres H1 et H2 dans les fichiers MD
- **En tant que** Développeur
- **Je souhaite** Détecter et rejeter les fichiers MD contenant des titres H1 (#) ou H2 (##)
- **Afin de** Garantir une structure cohérente et éviter les erreurs de hiérarchie
- **Critères d'acceptation** :
- Un fichier avec au moins un H1 déclenche une erreur de compilation
- Un fichier avec au moins un H2 déclenche une erreur de compilation
- L'erreur indique clairement le fichier problématique

---

#### US-2.7 : Validation - Interdiction des H4 sans H3 précédent
- **En tant que** Développeur
- **Je souhaite** Détecter et rejeter les fichiers MD contenant un H4 (####) sans H3 (###) précédent
- **Afin de** Garantir une hiérarchie de titres cohérente
- **Critères d'acceptation** :
- Un fichier avec un H4 sans H3 déclenche une erreur de compilation
- L'erreur indique clairement le fichier problématique
- Les blocs de code markdown (```) sont ignorés lors de la détection

---

#### US-2.8 : Validation - Minimum 2 sections par chapitre
- **En tant que** Développeur
- **Je souhaite** Détecter et rejeter les dossiers contenant un seul fichier MD valide
- **Afin de** Garantir que chaque chapitre contient au moins 2 sections
- **Critères d'acceptation** :
- Un dossier avec un seul fichier MD valide déclenche une erreur de compilation
- L'erreur suggère de créer au moins "2 sections" dans "le chapitre"
- Les dossiers sans fichiers MD valides ne sont pas affichés (pas d'erreur)

---

#### US-2.9 : Génération du JSON avec structure hiérarchique complète
- **En tant que** Système backend
- **Je souhaite** Générer un JSON avec la structure Chapitre → Section → Partie → Sous-partie → Bloc
- **Afin de** Exposer les données structurées pour le frontend
- **Critères d'acceptation** :
- Le JSON contient un tableau "chapitres"
- Chaque chapitre contient un tableau "sections"
- Chaque section contient un tableau "parties"
- Chaque partie contient un tableau "sousParties"
- Chaque sous-partie contient un tableau "blocs"
- Chaque élément a les propriétés nécessaires (nom, titre, contenu, contenuParse, typeDeContenu, etc.)

---

#### Sprint Goal
Créer une interface utilisateur complète et interactive pour la page "À propos de ce site" qui affiche toute la hiérarchie du contenu (H1 à H5) avec un système d'accordéon pour la navigation, un rendu markdown de qualité (paragraphes, listes, styles), et une présentation visuelle claire (masquage des titres techniques, fond bleu clair pour les prompts, tailles de police adaptées), en utilisant les Server Components pour le SEO.

#### US-3.1 : Récupération des données via Server Component
- **En tant que** Système frontend
- **Je souhaite** Récupérer le JSON structuré depuis le backend pur via un Server Component
- **Afin de** Générer le HTML complet côté serveur pour le SEO et faciliter le travail des crawlers
- **Critères d'acceptation** :
- Le Server Component (`app/about-site/page.tsx`) appelle `readAboutSiteStructure()` côté serveur
- Le JSON est généré par le backend pur (raison pédagogique d'architecture)
- Le HTML complet est généré côté serveur avec tout le contenu
- Les données sont passées au Client Component via props (pas de fetch côté client)
- L'API route (`/api/about-site`) est conservée pour debug/tests

---

#### US-3.2 : Accordéon pour H1 et H2
- **En tant que** Visiteur de la page "À propos de ce site"
- **Je souhaite** Pouvoir déplier/replier les chapitres (H1) et sections (H2) avec un système d'accordéon
- **Afin de** Naviguer facilement dans le contenu sans être submergé
- **Critères d'acceptation** :
- Les chapitres (H1) ont un accordéon (masqué par défaut)
- Les sections (H2) ont aussi un accordéon (masqué par défaut)
- Un clic sur un titre masque/affiche son contenu
- Une icône indique l'état (déplié/replié)
- Les animations sont fluides

---

#### US-3.3 : Affichage de la hiérarchie complète (H3, H4, H5)
- **En tant que** Visiteur de la page "À propos de ce site"
- **Je souhaite** Voir la structure complète du contenu avec les parties (H3), sous-parties (H4) et blocs (H5)
- **Afin de** Comprendre la structure du contenu
- **Critères d'acceptation** :
- Les parties sont affichées en H3
- Les sous-parties sont affichées en H4 (sauf si typeDeContenu spécial)
- Les blocs sont affichés en H5 (sauf si typeDeContenu spécial)
- La hiérarchie visuelle est claire (marges gauches progressives)

---

#### US-3.4 : Masquage des titres "Prompt" et "Résultat technique"
- **En tant que** Visiteur de la page "À propos de ce site"
- **Je souhaite** Ne pas voir les titres "Prompt" et "Résultat technique" affichés
- **Afin de** Avoir une présentation plus claire et moins répétitive
- **Critères d'acceptation** :
- Les titres "##### Prompt" ne sont pas affichés (mais présents dans le JSON pour SEO)
- Les titres "##### Résultat technique" ne sont pas affichés (mais présents dans le JSON pour SEO)
- Le contenu des blocs est toujours affiché

---

#### US-3.5 : Fond bleu clair pour le contenu des prompts
- **En tant que** Visiteur de la page "À propos de ce site"
- **Je souhaite** Voir le contenu des prompts avec un fond bleu clair
- **Afin de** Identifier visuellement les prompts dans les journaux
- **Critères d'acceptation** :
- Le contenu des blocs avec `typeDeContenu === "Prompt"` a un fond bleu clair
- Le texte reste lisible (noir sur bleu clair)
- Les listes et paragraphes dans les prompts ont aussi le fond bleu clair

---

#### US-3.6 : Affichage du contenu (paragraphes, listes)
- **En tant que** Visiteur de la page "À propos de ce site"
- **Je souhaite** Voir les paragraphes, listes à puce et listes numérotées correctement formatés
- **Afin de** Lire le contenu facilement
- **Critères d'acceptation** :
- Les paragraphes sont affichés avec un style de texte lisible
- Les listes à puce affichent des puces (disc)
- Les listes numérotées affichent des numéros (1, 2, 3...)
- Les items sont indentés correctement
- Les marges gauches sont progressives (H1: 0px, H2: 10px, H3: 20px, H4: 30px, texte: 35px, listes: 40px)

---

#### US-3.7 : Tailles de police adaptées à la lecture
- **En tant que** Visiteur de la page "À propos de ce site"
- **Je souhaite** Voir un texte de taille adaptée à la lecture (style blog/article)
- **Afin de** Lire le contenu confortablement
- **Critères d'acceptation** :
- Les tailles de police sont réduites (style blog)
- H1 : 1.2rem
- H2 : 1.05rem
- H3 : 1rem
- H4 : 0.95rem
- Paragraphes/listes : 0.9rem
