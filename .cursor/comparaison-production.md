# Comparaison visuelle avec la production (avant refacto)

## URL de référence (présentation correcte)

- **Production (Vercel)** : https://web-malain-et-possible.vercel.app/
- **Local (après refacto noms canoniques)** : http://localhost:3000 (lancer `npm run dev`)

**Pages capturées par `npm run screenshot:compare`** (vision d’ensemble) :
- `/` — accueil (hero, CTAs)
- `/mes-profils` — liste des profils
- `/profil/cpo` — page profil (ex. CPO)

---

## Pour la mise en page UI/UX : screenshots (PNG)

Les snapshots ARIA (fichiers `.cursor/snapshot-*.txt`) ne contiennent **aucune info visuelle** : seulement rôles et textes (équivalent à la structure du JSON). Ils ne servent pas à refaire la mise en page.

**Pour comparer et refaire la mise en page**, utiliser les **captures d’écran** :

1. **Une seule commande** :  
   `npm run screenshot:compare`  
   (avec `npm run dev` déjà lancé dans un autre terminal pour le local)

2. **Fichiers générés** dans `.cursor/` (par page : home, mes-profils, profil-cpo) :
   - `screenshot-production-{home|mes-profils|profil-cpo}-viewport.png` et `-full.png` (référence prod)
   - `screenshot-local-{home|mes-profils|profil-cpo}-viewport.png` et `-full.png` (rendu local)

3. **Comparer visuellement** les PNG (prod vs local), puis indiquer à l’assistant les écarts à corriger (ex. « le hero est trop petit », « les cartes profil sont mal alignées »). On ne modifie que les **valeurs CSS**, pas l’architecture des sélecteurs canoniques.

Commandes séparées si besoin :
- `npm run screenshot:prod` → prod uniquement
- `npm run screenshot:local` → local uniquement (dev doit tourner)

---

## Snapshots ARIA (structure uniquement)

Les commandes `npm run snapshot:prod` et `npm run snapshot:local` produisent des fichiers `.cursor/snapshot-*.txt` (arbre d’accessibilité). Utiles pour vérifier la **structure** (rôles, textes), **pas** pour l’organisation visuelle.

---

## MCP Chrome DevTools (comparaison visuelle depuis Cursor)

Le projet utilise **Chrome DevTools MCP** dans Cursor : le serveur s’appelle **`project-0-web-malain-et-possible-chrome-devtools`**. Prérequis : Chrome lancé avec `--remote-debugging-port=9222`. En secours : `npm run screenshot:compare`.

**Workflow efficace** : naviguer vers la prod (`navigate_page`), puis `take_snapshot` (arbre a11y + uids), `take_screenshot` (visuel), `evaluate_script` pour récupérer `getComputedStyle` des éléments clés. Comparer avec le local en faisant de même sur localhost.

---

## Présentation souhaitée (extraite via MCP – prod à 1920×893)

Valeurs mesurées sur **https://web-malain-et-possible.vercel.app/** (viewport 1920×893) pour aligner le local.

**Racine** : `font-size` 19.36px.

**Hero (grille deux colonnes)** : conteneur hero `padding` 58.08px 63.5px, `gap` 38.72px, `display` grid ; deux colonnes égales en largeur et hauteur (~710×419px). Colonne gauche : flex, `justify-content` center. Colonne droite : même hauteur.

**Typo (home)** : h1 38.72px (≈2rem), fontWeight 700, marginBottom 14.52px, textAlign center. h2 14px, fontWeight 500, marginBottom 19.36px. p fontSize 7px (à confirmer), marginBottom 58.08px, maxWidth 1089px.

**CTAs** : lien CV fontSize 18.15px, fontWeight 600, color rgb(0,112,192), underline. Bouton Discutons 19.36px, fontWeight 600, #fff sur rgb(0,112,192), padding 14.52px 29.04px.

**Couleurs** : texte rgb(23,23,23) = Noir ; accent rgb(0,112,192) = CouleurFoncé.

---

## Niveaux de titres (h1–h6) en production (MCP – viewport 1920×893)

Valeurs **graisse, taille, couleur** extraites via `evaluate_script` sur Vercel.

**Page d’accueil** (`/`) :

| Niveau | Taille (font-size) | Graisse (font-weight) | Couleur |
|--------|--------------------|------------------------|--------|
| **h1** | 38.72px            | 700                    | rgb(23, 23, 23) |
| **h2** | 14px               | 500                    | rgb(23, 23, 23) |

Contexte : h1 = hero titre, h2 = hero sous-titre.

**Page profil** (`/profil/cpo`) :

| Niveau | Taille (font-size) | Graisse (font-weight) | Couleur |
|--------|--------------------|------------------------|--------|
| **h1** | 29.04px            | 700                    | rgb(255, 255, 255) |
| **h2** | 33.88px            | 700                    | rgb(23, 23, 23) |
| **h3** | 24.2px             | 700                    | rgb(0, 112, 192) |

Contexte : h1 = titre dans l’en-tête (fond sombre, texte blanc) ; h2 = titres de section dans le contenu ; h3 = titres de sous-section (couleur accent).

**h4, h5, h6** : non présents sur les pages mesurées (accueil, a-propos, profil). À mesurer sur une page qui affiche du contenu markdown avec ces niveaux (ex. sous-page « À propos » avec AboutSiteContent).

---

## Zones à vérifier en priorité

- Hero (titre, sous-titre, description, CTAs, cartes profil)
- Header (titre de page, logo, photo)
- Cartes profil (wrapper, carte, libellés)
- Domaines de compétences, témoignages, détournement vidéo
