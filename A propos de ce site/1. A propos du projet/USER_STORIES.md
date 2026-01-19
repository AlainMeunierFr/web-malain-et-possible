# User Stories extraites des journaux

## Epic 1 : Site Web - Fonctionnalités Générales

### US-1.1 : Affichage initial "Hello World"
#### En tant que
Visiteur du site

#### Je souhaite
Voir une page "Hello World" s'afficher

#### Afin de
Vérifier que le site fonctionne et que le déploiement CI/CD est opérationnel

#### Critères d'acceptation :
- La page d'accueil affiche "Hello World"
- Le site se déploie automatiquement sur Vercel après chaque commit
- Aucune erreur de build

---

### US-1.2 : Navigation vers la page d'accueil
#### En tant que
Visiteur du site

#### Je souhaite
Pouvoir retourner à la page d'accueil en cliquant sur le logo

#### Afin de
Naviguer facilement dans le site

#### Critères d'acceptation :
- Le logo en haut à gauche est cliquable
- Un clic sur le logo redirige vers la page d'accueil
- Un tooltip "Home page" apparaît au survol du logo

---

### US-1.3 : Navigation vers la page "À propos de moi"
#### En tant que
Visiteur du site

#### Je souhaite
Pouvoir accéder à la page "À propos de moi" en cliquant sur la photo

#### Afin de
Découvrir des informations sur la personne

#### Critères d'acceptation :
- La photo en haut à droite est cliquable
- Un clic sur la photo redirige vers la page "À propos de moi"
- Un tooltip "À propos de moi" apparaît au survol de la photo

---

### US-1.4 : Accès à l'email depuis le footer
#### En tant que
Visiteur du site

#### Je souhaite
Pouvoir envoyer un email en cliquant sur le bouton email du footer

#### Afin de
Contacter la personne directement

#### Critères d'acceptation :
- Le bouton email est visible dans le footer
- Un clic ouvre le client email avec l'adresse pré-remplie
- Un tooltip "M'envoyer un email" apparaît au survol

---

### US-1.5 : Accès à la chaîne YouTube depuis le footer
#### En tant que
Visiteur du site

#### Je souhaite
Pouvoir accéder à la chaîne YouTube en cliquant sur le bouton YouTube du footer

#### Afin de
Consulter les vidéos de la chaîne

#### Critères d'acceptation :
- Le bouton YouTube est visible dans le footer
- Un clic ouvre la chaîne YouTube dans un nouvel onglet
- Un tooltip "Accéder à ma chaîne YouTube" apparaît au survol

---

### US-1.6 : Accès au profil LinkedIn depuis le footer
#### En tant que
Visiteur du site

#### Je souhaite
Pouvoir accéder au profil LinkedIn en cliquant sur le bouton LinkedIn du footer

#### Afin de
Consulter le profil professionnel

#### Critères d'acceptation :
- Le bouton LinkedIn est visible dans le footer
- Un clic ouvre le profil LinkedIn dans un nouvel onglet
- Un tooltip "Accéder à mon profil Linkedin" apparaît au survol

---

### US-1.7 : Accès au plan du site depuis le footer
#### En tant que
Visiteur du site

#### Je souhaite
Pouvoir consulter le plan du site en cliquant sur le bouton "Plan du site" du footer

#### Afin de
Comprendre la structure du site et naviguer facilement

#### Critères d'acceptation :
- Le bouton "Plan du site" est visible dans le footer
- Un clic redirige vers la page "Plan du site"
- Un tooltip "Consulter le plan du site" apparaît au survol

---

### US-1.8 : Header et Footer présents sur toutes les pages
#### En tant que
Visiteur du site

#### Je souhaite
Toujours voir le header en haut et le footer en bas, quelle que soit la page consultée

#### Afin de
Avoir accès aux fonctions de navigation depuis n'importe quelle page

#### Critères d'acceptation :
- Le header est fixe en haut de toutes les pages
- Le footer est fixe en bas de toutes les pages
- Les boutons de navigation fonctionnent depuis toutes les pages

---

## Epic 2 : Page "À propos de ce site" - Backend

### US-2.1 : Lecture des dossiers du répertoire "A propos de ce site"
#### En tant que
Système backend

#### Je souhaite
Lire la liste des dossiers présents dans "A propos de ce site"

#### Afin de
Construire la structure hiérarchique des chapitres

#### Critères d'acceptation :
- La fonction retourne un tableau avec les noms des dossiers
- Les fichiers (non-dossiers) sont ignorés
- Les dossiers vides sont ignorés

---

### US-2.2 : Lecture des fichiers Markdown dans chaque dossier
#### En tant que
Système backend

#### Je souhaite
Lire tous les fichiers Markdown (.md) présents dans chaque dossier

#### Afin de
Construire la liste des sections pour chaque chapitre

#### Critères d'acceptation :
- Seuls les fichiers avec l'extension .md sont lus
- Les fichiers non-MD sont ignorés
- Les fichiers MD vides sont ignorés

---

### US-2.3 : Validation - Interdiction des titres H1 et H2 dans les fichiers MD
#### En tant que
Système backend

#### Je souhaite
Détecter et rejeter les fichiers MD contenant des titres H1 (#) ou H2 (##)

#### Afin de
Garantir une structure cohérente et éviter les erreurs de hiérarchie

#### Critères d'acceptation :
- Un fichier avec au moins un H1 déclenche une erreur de compilation
- Un fichier avec au moins un H2 déclenche une erreur de compilation
- L'erreur indique clairement le fichier problématique

---

### US-2.4 : Validation - Interdiction des H4 sans H3 précédent
#### En tant que
Système backend

#### Je souhaite
Détecter et rejeter les fichiers MD contenant un H4 (####) sans H3 (###) précédent

#### Afin de
Garantir une hiérarchie de titres cohérente

#### Critères d'acceptation :
- Un fichier avec un H4 sans H3 déclenche une erreur de compilation
- L'erreur indique clairement le fichier problématique
- Les blocs de code markdown (```) sont ignorés lors de la détection

---

### US-2.5 : Validation - Minimum 2 sections par chapitre
#### En tant que
Système backend

#### Je souhaite
Détecter et rejeter les dossiers contenant un seul fichier MD valide

#### Afin de
Garantir que chaque chapitre contient au moins 2 sections

#### Critères d'acceptation :
- Un dossier avec un seul fichier MD valide déclenche une erreur de compilation
- L'erreur suggère de créer au moins "2 sections" dans "le chapitre"
- Les dossiers sans fichiers MD valides ne sont pas affichés (pas d'erreur)

---

### US-2.6 : Parsing des parties (###) dans un fichier MD
#### En tant que
Système backend

#### Je souhaite
Extraire toutes les parties (titres ###) d'un fichier MD

#### Afin de
Construire la structure hiérarchique Partie → Sous-partie → Bloc

#### Critères d'acceptation :
- Chaque titre ### est détecté comme une partie
- Le titre de la partie est extrait (texte après ###)
- Le contenu de la partie est extrait jusqu'à la prochaine partie ou fin de fichier

---

### US-2.7 : Parsing des sous-parties (####) dans une partie
#### En tant que
Système backend

#### Je souhaite
Extraire toutes les sous-parties (titres ####) d'une partie

#### Afin de
Construire la structure hiérarchique complète

#### Critères d'acceptation :
- Chaque titre #### est détecté comme une sous-partie
- Le titre de la sous-partie est extrait (texte après ####)
- Le contenu de la sous-partie est extrait jusqu'à la prochaine sous-partie, partie ou fin de fichier

---

### US-2.8 : Parsing des blocs (#####) dans une sous-partie
#### En tant que
Système backend

#### Je souhaite
Extraire tous les blocs (titres #####) d'une sous-partie

#### Afin de
Construire la structure hiérarchique complète jusqu'au niveau bloc

#### Critères d'acceptation :
- Chaque titre ##### est détecté comme un bloc
- Le titre du bloc est extrait (texte après #####)
- Le contenu du bloc est extrait jusqu'au prochain bloc, sous-partie, partie ou fin de fichier

---

### US-2.9 : Détection des blocs "Prompt" et "Résultat technique"
#### En tant que
Système backend

#### Je souhaite
Identifier les blocs avec les titres "##### Prompt" et "##### Résultat technique"

#### Afin de
Leur attribuer un typeDeContenu spécial pour le style CSS

#### Critères d'acceptation :
- Un bloc avec le titre exact "##### Prompt" a `typeDeContenu: "Prompt"`
- Un bloc avec le titre exact "##### Résultat technique" a `typeDeContenu: "Résultat technique"`
- Les autres blocs n'ont pas de typeDeContenu

---

### US-2.10 : Parsing du contenu texte (paragraphes) dans une partie/sous-partie/bloc
#### En tant que
Système backend

#### Je souhaite
Extraire les paragraphes de texte normal dans le contenu d'une partie, sous-partie ou bloc

#### Afin de
Construire le JSON avec le contenu textuel structuré

#### Critères d'acceptation :
- Chaque ligne de texte (non vide, non titre, non liste) est un paragraphe
- Les paragraphes consécutifs sont regroupés
- Les paragraphes sont dans l'ordre d'apparition dans le fichier

---

### US-2.11 : Parsing des listes à puce (-) dans une partie/sous-partie/bloc
#### En tant que
Système backend

#### Je souhaite
Extraire les listes à puce (lignes commençant par -) dans le contenu

#### Afin de
Construire le JSON avec les listes structurées

#### Critères d'acceptation :
- Chaque ligne commençant par "- " est un item de liste
- Les items consécutifs sont regroupés en une liste
- Les listes sont dans l'ordre d'apparition dans le fichier

---

### US-2.12 : Parsing des listes numérotées (1. 2. ...) dans une partie/sous-partie/bloc
#### En tant que
Système backend

#### Je souhaite
Extraire les listes numérotées (lignes commençant par "1. ", "2. ", etc.) dans le contenu

#### Afin de
Construire le JSON avec les listes numérotées structurées

#### Critères d'acceptation :
- Chaque ligne commençant par "1. ", "2. ", etc. est un item de liste numérotée
- Les items consécutifs sont regroupés en une liste numérotée
- Les listes sont dans l'ordre d'apparition dans le fichier

---

### US-2.13 : Génération du JSON avec structure hiérarchique complète
#### En tant que
Système backend

#### Je souhaite
Générer un JSON avec la structure Chapitre → Section → Partie → Sous-partie → Bloc

#### Afin de
Exposer les données structurées pour le frontend

#### Critères d'acceptation :
- Le JSON contient un tableau "chapitres"
- Chaque chapitre contient un tableau "sections"
- Chaque section contient un tableau "parties"
- Chaque partie contient un tableau "sousParties"
- Chaque sous-partie contient un tableau "blocs"
- Chaque élément a les propriétés nécessaires (nom, titre, contenu, etc.)

---

## Epic 3 : Page "À propos de ce site" - Frontend

### US-3.1 : Affichage des chapitres (H1) avec accordion
#### En tant que
Visiteur de la page "À propos de ce site"

#### Je souhaite
Voir la liste des chapitres avec possibilité de les déplier/replier

#### Afin de
Naviguer facilement dans le contenu sans être submergé

#### Critères d'acceptation :
- Les chapitres sont affichés en H1
- Par défaut, tous les chapitres sont repliés
- Un clic sur un chapitre le déplie/replie
- Une icône indique l'état (déplié/replié)

---

### US-3.2 : Affichage des sections (H2) avec accordion
#### En tant que
Visiteur de la page "À propos de ce site"

#### Je souhaite
Voir la liste des sections dans un chapitre avec possibilité de les déplier/replier

#### Afin de
Naviguer facilement dans le contenu d'un chapitre

#### Critères d'acceptation :
- Les sections sont affichées en H2
- Par défaut, toutes les sections sont repliées
- Un clic sur une section la déplie/replie
- Une icône indique l'état (déplié/replié)

---

### US-3.3 : Affichage des parties (H3)
#### En tant que
Visiteur de la page "À propos de ce site"

#### Je souhaite
Voir les titres des parties (H3) dans une section

#### Afin de
Comprendre la structure du contenu

#### Critères d'acceptation :
- Les parties sont affichées en H3
- Les titres des parties sont visibles
- La hiérarchie visuelle est claire (marge gauche différente)

---

### US-3.4 : Affichage des sous-parties (H4)
#### En tant que
Visiteur de la page "À propos de ce site"

#### Je souhaite
Voir les titres des sous-parties (H4) dans une partie

#### Afin de
Comprendre la structure détaillée du contenu

#### Critères d'acceptation :
- Les sous-parties sont affichées en H4
- Les titres des sous-parties sont visibles (sauf si typeDeContenu spécial)
- La hiérarchie visuelle est claire (marge gauche différente)

---

### US-3.5 : Masquage des titres "Prompt" et "Résultat technique"
#### En tant que
Visiteur de la page "À propos de ce site"

#### Je souhaite
Ne pas voir les titres "Prompt" et "Résultat technique" affichés

#### Afin de
Avoir une présentation plus claire et moins répétitive

#### Critères d'acceptation :
- Les titres "##### Prompt" ne sont pas affichés (mais présents dans le JSON pour SEO)
- Les titres "##### Résultat technique" ne sont pas affichés (mais présents dans le JSON pour SEO)
- Le contenu des blocs est toujours affiché

---

### US-3.6 : Fond bleu clair pour le contenu des prompts
#### En tant que
Visiteur de la page "À propos de ce site"

#### Je souhaite
Voir le contenu des prompts avec un fond bleu clair

#### Afin de
Identifier visuellement les prompts dans les journaux

#### Critères d'acceptation :
- Le contenu des blocs avec `typeDeContenu === "Prompt"` a un fond bleu clair
- Le texte reste lisible (noir sur bleu clair)
- Les listes et paragraphes dans les prompts ont aussi le fond bleu clair

---

### US-3.7 : Affichage des paragraphes de texte
#### En tant que
Visiteur de la page "À propos de ce site"

#### Je souhaite
Voir les paragraphes de texte normalement formatés

#### Afin de
Lire le contenu facilement

#### Critères d'acceptation :
- Les paragraphes sont affichés avec un style de texte lisible
- Les paragraphes ont un espacement vertical approprié
- La marge gauche est supérieure à celle des titres

---

### US-3.8 : Affichage des listes à puce
#### En tant que
Visiteur de la page "À propos de ce site"

#### Je souhaite
Voir les listes à puce avec des puces visibles

#### Afin de
Lire les listes facilement

#### Critères d'acceptation :
- Les listes à puce affichent des puces (disc)
- Les items sont indentés correctement
- La marge gauche est supérieure à celle des paragraphes

---

### US-3.9 : Affichage des listes numérotées
#### En tant que
Visiteur de la page "À propos de ce site"

#### Je souhaite
Voir les listes numérotées avec des numéros visibles

#### Afin de
Lire les listes numérotées facilement

#### Critères d'acceptation :
- Les listes numérotées affichent des numéros (1, 2, 3...)
- Les items sont indentés correctement
- La marge gauche est supérieure à celle des paragraphes

---

### US-3.10 : Espacement pour éviter le chevauchement avec le header
#### En tant que
Visiteur de la page "À propos de ce site"

#### Je souhaite
Voir tout le contenu sans qu'il soit masqué par le header fixe

#### Afin de
Pouvoir lire tout le contenu sans avoir à scroller pour voir les parties cachées

#### Critères d'acceptation :
- Le contenu a un padding-top qui compense la hauteur du header
- Le calcul est responsive (max(80px, 8.75vh) + 2rem)
- Aucun contenu n'est masqué sous le header

---

### US-3.11 : Espacement pour éviter le chevauchement avec le footer
#### En tant que
Visiteur de la page "À propos de ce site"

#### Je souhaite
Voir tout le contenu sans qu'il soit masqué par le footer fixe

#### Afin de
Pouvoir lire tout le contenu jusqu'en bas

#### Critères d'acceptation :
- Le contenu a un padding-bottom qui compense la hauteur du footer
- Le calcul est responsive (max(50px, 5.47vh) + 2rem)
- Aucun contenu n'est masqué sous le footer

---

### US-3.12 : Marges gauches progressives pour la hiérarchie
#### En tant que
Visiteur de la page "À propos de ce site"

#### Je souhaite
Voir une indentation progressive selon le niveau hiérarchique

#### Afin de
Comprendre visuellement la structure du contenu

#### Critères d'acceptation :
- H1 : marge gauche 0px
- H2 : marge gauche 10px
- H3 : marge gauche 20px
- H4 : marge gauche 30px
- Texte normal : marge gauche 35px
- Listes : marge gauche 40px
- Les marges sont fixes en pixels (pas en rem/em) pour le responsive

---

### US-3.13 : Tailles de police adaptées à la lecture
#### En tant que
Visiteur de la page "À propos de ce site"

#### Je souhaite
Voir un texte de taille adaptée à la lecture (style blog/article)

#### Afin de
Lire le contenu confortablement

#### Critères d'acceptation :
- Les tailles de police sont réduites (style blog)
- H1 : 1.2rem
- H2 : 1.05rem
- H3 : 1rem
- H4 : 0.95rem
- Paragraphes/listes : 0.9rem

---

### US-3.14 : Récupération du JSON via API
#### En tant que
Système frontend

#### Je souhaite
Récupérer le JSON structuré depuis une API route

#### Afin de
Avoir une séparation claire entre backend et frontend

#### Critères d'acceptation :
- Le Client Component fait un `fetch('/api/about-site')`
- L'API route retourne le JSON généré par le backend pur
- Un état de chargement est affiché pendant le fetch
- Les erreurs sont gérées et affichées

---
