# Proposition de mise en page — Designer (site RAW)

Document généré par l’agent Designer à partir du brief et des ressources RAW.  
Référence : `docs/prompt-designer-mise-en-page.md`, `app/raw/README.md`, `app/content-styles.css`, `app/globals.css`.

---

## 1. Proposition courte

### Typographie

- **Titres et texte** : police **Outfit** (Regular 400, SemiBold 600, Bold 700), chargée dans `app/globals.css`. Utilisation des tokens sémantiques `--h1-font-size` à `--h4-font-size`, `--p-font-size`, `--n-font-size`, `--a-font-size` pour cohérence et scale responsive (base `html` en `clamp(1rem, 0.25rem + 0.8vw, 3rem)`).
- **Boutons** : police **Clint Marker** disponible ; les styles bouton utilisent `var(--font-sans)` (Outfit) et les tokens `--b-font-size`, `--b-font-weight`, `--BoutonPolice`, etc. dans `app/globals.css`.

### Couleurs et contrastes

- **Couleur principale** : `--CouleurFoncé` (#0070C0), `--CouleurClaire` (#E7F6FF), `--Noir`, `--Blanc` — utilisés pour fonds, textes, boutons, titres de section (bande `.titre` en CouleurClaire).
- **Contraste** : fond clair (`--background`, `--Blanc`), texte `--Noir` / `--foreground` ; liens et accents en `--CouleurFoncé`. Mode clair forcé (`color-scheme: light`) pour lisibilité.

### Grilles et espacements

- **Wrapper page** : `.main` — `padding-top: 120px`, `padding-bottom: 60px` ; `max-width: min(100vw, calc(100vh * 16/9))` sur desktop (aspect ratio ≥1).
- **Blocs centrés** : `.main` centre horizontalement les TypeDeContenus (hero, titre, video, texteLarge, domaineDeCompetence, callToAction, groupeBoutons, listeDesPages, videoDetournement, temoignages, blocsProfils).
- **Hero** : grille 2 colonnes (1fr 1fr) à partir de 769px ; zone gauche (texte + CTAs), zone droite (vidéo). Padding horizontal 1rem (mobile), 4% (desktop) pour ne pas coller aux bords.
- **Profils** : `blocsProfils` — grille 1 col (< 769px), 2 cols (769px–1199px), 4 cols (≥ 1200px) ; `data-layout="4 columns x 1 row"` sur le conteneur.
- **Témoignages** : grille 2 colonnes × N lignes (`data-layout="2 columns x N rows"`).
- **Domaines de compétences** : `competencesContainer` avec `data-layout="3 columns x 1 row"` ; expériences en accordéon (`data-layout="accordeon, X rows"`).
- **Largeur max contenu** : 59.1875rem pour la plupart des blocs ; `--largeurDeTexteMax: 78.125rem` pour le texte long.

### Breakpoints responsive

- **&lt; 769px** : mobile — hero en colonne (texte puis vidéo), profils 1 col, espacements réduits, tailles typo adaptées (ex. `hero.titre` → `--h2-font-size`).
- **≥ 769px** : tablette/desktop — hero 2 colonnes, profils 2 cols, vidéo 50 % largeur dans les blocs `.video` seuls.
- **≥ 1200px** : profils en 4 colonnes.
- **≥ 1920px** : très grands écrans — `max-width` augmentés (87.5rem, 68.75rem, etc.), typo légèrement ajustée pour lisibilité.

### Effets visuels et interactifs

- **Tooltip droits d’auteur** : `data-layout="tooltip, droits d'auteur"` sur `.ui-droitsAuteurContainer` — styles dans `.videoDetournement .ui-popup`, `.ui-alertButton`, `.ui-closeButton`, etc. (déjà présents dans `content-styles.css`).
- **Accordéon expériences** : `data-layout="accordeon, X rows"` — `.domaineDeCompetence .experiencesToggle`, `.experiencesContent`, `.experiencesList` pour ouverture/fermeture et style.
- **Alternance de fond** : `.domaineDeCompetence.light`, `.video.light` — fond `--CouleurClaire` pour varier les blocs.
- **Boutons** : `.groupeBoutons.tailleGrande` — largeur 30rem, texte aligné à gauche ; `.groupeBoutons.taillePetite` — fond transparent.
- **Vidéo** : ratio 16:9 via `padding-bottom: 56.25%` sur `.video .videoWrapper` et `.hero .ui-heroDroite .video .videoWrapper`.

---

## 2. Application dans les fichiers CSS

- **`app/content-styles.css`** : tous les TypeDeContenus sont ciblés par **classes racine** (`.hero`, `.titre`, `.video`, `.texteLarge`, `.domaineDeCompetence`, `.competence`, `.experienceEtApprentissage`, `.callToAction`, `.groupeBoutons`, `.listeDesPages`, `.blocsProfils`, `.profil`, `.temoignages`, `.temoignage`, `.videoDetournement`, `.detournementVideo`) et par sous-classes / conteneurs (ex. `.hero.titre`, `.domaineDeCompetence.light`). Les grilles utilisent les **classes** des composants (ex. `.blocsProfils`, `.temoignages .ui-grid`) ; les attributs `data-layout` sont présents dans le DOM et cohérents avec le guide RAW.
- **Ajustements récents** :
  - **Hero** : padding horizontal 1rem (mobile), 4% (desktop) pour que le contenu ne touche pas les bords.
  - **Vidéo** : `padding-bottom: 56.25%` sur les deux blocs `.video .videoWrapper` (bloc vidéo standalone et vidéo dans le hero) pour conserver le ratio 16:9.
- **`app/globals.css`** : tokens inchangés ; polices Outfit et Clint Marker, couleurs, tailles typo et boutons déjà définis. Aucune modification nécessaire pour cette proposition.

---

## 3. Responsive et accessibilité

- **Responsive** : mobile-first implicite (règles de base puis `@media (min-width: 769px)` et au-dessus) ; empilement vertical sur petit écran, grilles multi-colonnes sur grand écran.
- **Accessibilité** : contraste texte/fond (Noir sur Blanc / CouleurClaire), tailles de police relatives (rem, variables), focus visible sur les contrôles (ex. `.experiencesToggle:focus`). Si des régressions apparaissent sur `/raw`, seuls les fichiers CSS ont été modifiés (structure DOM inchangée).

---

*Dernière mise à jour : 2026-01-31 — Agent Designer*
