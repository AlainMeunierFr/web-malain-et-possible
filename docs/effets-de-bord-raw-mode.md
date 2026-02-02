# Effets de bord — Rendu « Reader Raw » appliqué à toutes les pages

## Hypothèse

En production, on **remplace** le rendu actuel de chaque page par le **même code** que celui qui gère aujourd’hui la page `/raw` : chaque route affiche uniquement le contenu du JSON associé à cette page, en **mode raw** (même structure DOM, même pipeline que /raw). En allant sur `/`, on voit le contenu d’`index.json` en raw ; sur `/faisons-connaissance`, le contenu de `faisons-connaissance.json` en raw ; etc.

---

## 1. Effet positif : plus de hack du titre sur les pages normales

- Sur **chaque page « normale »** (`/`, `/profil/cpo`, `/faisons-connaissance`, etc.), une **seule** page est affichée et un **seul** JSON alimente le rendu.
- Le header reçoit donc **un seul** TitreDePage (ou hero.titre pour la home) via `setPageTitle` : le **premier h1** du document nomme correctement la page.
- Le **problème du hack** (premier h1 = mauvais titre) **ne se pose pas** sur ces pages. Le hack `pathname === '/raw' → titre fixe "Raw — DOM sans feuille de style"` reste nécessaire **uniquement** sur la route `/raw` (ou si on conserve une page raw dédiée).

---

## 2. Comportements perdus (effets de bord)

### 2.1 Interactivité

- **VideoDetournement — popup / tooltip « droits d'auteur »**  
  Aujourd'hui : bouton « i » → clic pour afficher/masquer le texte. Un **data-layout="tooltip, droits d'auteur"** a été ajouté sur le conteneur ; le README raw documente ce layout pour que le Designer applique le style (popup / tooltip au clic).

- **DomaineDeCompetences — accordéon « Expériences et apprentissages »**  
  Aujourd'hui : fermé par défaut, clic pour ouvrir/fermer. Un **data-layout="accordeon, X rows"** est déjà présent sur le conteneur ; le README raw précise que c'est un bloc accordéon (liste fermée par défaut, ouverture/fermeture au clic) pour que le Designer applique le comportement et le style.

### 2.2 Visuels (déjà absents sans CSS)

C'est bien le but : **confier ça au Designer**. Les effets purement visuels (alternance de fond, fond vidéo, taille des boutons) sont à appliquer via les classes déjà en place (ex. `.domaineDeCompetence.light`, `.video.light`, `.groupeBoutons.tailleGrande`).

### 2.3 Comportements conservés

- **Header** : sur chaque page (hors `/raw`), `displayTitle` = TitreDePage du JSON de la page → **correct**, pas de hack.
- **DomaineDeCompetences — shouldDisplayButton** : pathname est la page courante (ex. `/profil/cpo`), donc le bouton « En savoir plus » du profil courant peut être masqué comme aujourd'hui → **conservé**.
- **Liens, fetch plan du site, filtres ListeDesPages, etc.** : même logique que le code raw actuel → **conservés**.

---

## 3. Synthèse

- **Gain** : un seul rendu (raw) partout ; plus de problème de titre sur les pages normales (un JSON = une page = un h1 cohérent).
- **Pertes** : tooltip / popup droits d'auteur, accordéon expériences (ou version non stylée), et tous les effets purement visuels (alternance de fond, tailles, etc.).
- **Hack titre** : restant uniquement pour la route `/raw` (titre fixe dans le header).
