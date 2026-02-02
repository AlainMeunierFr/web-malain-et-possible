# Page Raw — Guide pour le Designer

La page `/raw` affiche le contenu du site en HTML sémantique **sans feuille de style**. Elle sert de référence pour appliquer une présentation (Designer humain ou IA) : chaque concept métier est identifiable dans le DOM par sa **classe racine** et, pour les listes, par l’attribut **data-layout**.

## Convention de nommage

- **Un concept = une classe racine** sur l’élément conteneur.
- **camelCase** : un seul mot quand c’est possible (`hero`, `titre`, `video`), sinon plusieurs mots en camelCase (`domaineDeCompetence`, `listeDesPages`, `texteLarge`).
- Les sous-éléments reprennent le nom du concept : `.hero .titre`, `.domaineDeCompetence .titre`, `.competence .description`, etc.

## Liste des concepts (classe racine)

| Concept | Classe racine | Description |
|--------|----------------|-------------|
| hero | `.hero` | Bandeau d’accueil (titre, sous-titre, description, CTA, vidéo) |
| titre | `.titre` | Titre de section (bande bleue) |
| titreDePage | `.titreDePage` | Titre de la page (affiché dans le header) |
| texteLarge | `.texteLarge` | Bloc de texte avec paragraphes |
| video | `.video` | Incrustation YouTube |
| domaineDeCompetence | `.domaineDeCompetence` | Bloc domaine (titre, contenu, compétences, expériences) |
| competence | `.competence` | Carte compétence (titre, description, auteur, bouton, image) |
| experienceEtApprentissage | `.experienceEtApprentissage` | Ligne d’expérience (catégorie, description, période) |
| callToAction | `.callToAction` | Bouton d’action principal |
| groupeDeBoutons | `.groupeBoutons` | Groupe de boutons (icônes, liens) |
| listeDesPages | `.listeDesPages` | Plan du site (liens par zone) |
| blocsProfils | `.blocsProfils` | Grille de profils professionnels |
| profil | `.profil` | Carte profil (titre, job titles, CV, lien) |
| temoignages | `.temoignages` | Liste de témoignages |
| temoignage | `.temoignage` | Carte témoignage (photo, nom, fonction, texte) |
| listeDeDetournementsVideo | `.videoDetournement` | Liste de détournements vidéo |
| detournementVideo | `.detournementVideo` | Carte détournement (titre, pitch, date, vidéos) |

## Layouts (data-layout)

Les conteneurs de listes exposent un attribut **data-layout** pour indiquer la mise en page attendue (responsive : afficher les éléments côte à côte quand la largeur le permet).

| Conteneur | data-layout | Rôle |
|-----------|-------------|------|
| listeDeProfils (blocsProfils) | `4 columns x 1 row` | Grille 4 colonnes × 1 ligne |
| listeDeTemoignages (temoignages) | `2 columns x N rows` | Grille 2 colonnes × N lignes |
| domaineDeCompetence.competences | `3 columns x 1 row` | Grille 3 compétences en ligne |
| listeDesExperiencesEtApprentissages | `accordeon, X rows` | Bloc accordéon : liste fermée par défaut, ouverture/fermeture au clic (X lignes) |
| listeDeDetournementsVideo | `X rows` | Liste verticale, X lignes |
| listeDesPages | `draw with page properties` | Rendu selon les propriétés des pages (zone, ordre) |
| droits d'auteur (VideoDetournement) | `tooltip, droits d'auteur` | Bouton « i » → popup / tooltip au clic pour afficher le texte des droits d'auteur |

Le Designer peut cibler par exemple `[data-layout="4 columns x 1 row"]` pour appliquer une grille 4 colonnes, `[data-layout="accordeon, X rows"]` pour le bloc expériences (accordéon), ou `[data-layout="tooltip, droits d'auteur"]` pour le popup droits d'auteur.

**Effets purement visuels** (alternance de fond entre blocs, fond vidéo, taille des boutons, etc.) : à confier au Designer ; les classes sont déjà en place (ex. `.domaineDeCompetence.light`, `.video.light`, `.groupeBoutons.tailleGrande`).

## Hiérarchie des titres

- **Premier h1** : nom de la page (sur `/raw` = « Raw — DOM sans feuille de style », dans le header).
- **Par page logique** : au moins un h1 (TitreDePage dans le header, ou hero.titre pour la Home).
- **Sections** : h2, h3, h4 selon le niveau (domaine, compétence, expérience, etc.).
