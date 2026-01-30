# Sprint Goal

Remplacer le générateur automatique de scénario E2E par un assistant graphique sur la page Maintenance (environnement de développement), avec distinction prod/dev pour l'accès (Photo → mot de passe en prod, assistant en dev).

---

## US : Assistant graphique de construction de scénario E2E

- **En tant que** responsable qualité ou développeur qui fait évoluer les scénarios E2E
- **Je veux** construire un scénario de test (parcours de liens) via un assistant graphique sur la page Maintenance en environnement de développement
- **Afin de** définir moi-même les parcours à tester avec une vision claire du plan du site et des liens restant à couvrir

**Contexte :** L'image « Photo » en haut à droite dans le header sert d'entrée vers la Maintenance (court clic).

---

### A. Suppression du générateur automatique

- **A1** Tout code qui génère automatiquement un scénario E2E est supprimé (script, commande, références).
- **A2** Aucun scénario n'est généré sans action explicite de l'utilisateur dans l'assistant graphique.

---

### B. Accès à la page Maintenance et distinction prod / dev

- **B1** Le système distingue l'environnement de **production** et l'environnement de **développement** (variable d'environnement, config ou mécanisme équivalent).

- **B2** **Production**
  - L'image en haut à droite dans le header (« Photo ») sert d'entrée vers la Maintenance (court clic).
  - Un clic sur cette image impose la **saisie du mot de passe**.
  - Si le mot de passe est **correct** : la page Maintenance affiche l'**œuf de Pâques** actuel (comportement inchangé).
  - Si le mot de passe est **incorrect** : message d'erreur et pas d'accès au contenu.

- **B3** **Développement**
  - Un clic sur la même image « Photo » (header, en haut à droite), **sans demande de mot de passe**, affiche la page Maintenance avec l'**assistant de construction de scénario**.
  - L'assistant affiche :
    - Le **plan du site** selon les mêmes règles que le `siteMapGenerator` (réutilisation du code ou de la logique existante).
    - Une liste **« Liens à parcourir »** : liens inter-pages dérivés du plan du site (même source que `siteMapGenerator` / `_Pages-Et-Lien.json`), affichée sur le côté.
    - Une liste **« Chemin parcouru »** : liste ordonnée des pages visitées dans le scénario en cours.

---

### C. Règles visuelles et interactivité du plan du site (dev)

- **C1** **Page courante et pages accessibles**
  - À l'arrivée sur l'assistant : la page **Accueil** est la page courante (**BleuFoncé**).
  - Les **pages accessibles** depuis la page courante (d'après le plan du site) sont en **BleuClair**.
  - **Seules les pages en BleuClair sont cliquables** ; les autres ne le sont pas.

- **C2** **Clic sur une page accessible (BleuClair)**
  Lorsque l'utilisateur clique sur une page en BleuClair :
  - le clic est **ajouté au scénario** (une nouvelle étape est enregistrée) ;
  - la page cliquée **devient BleuFoncé** (nouvelle page courante) ;
  - les **pages accessibles depuis cette nouvelle page courante** deviennent **BleuClair** ;
  - **seules les pages BleuClair restent cliquables** ;
  - le **lien correspondant** (source → destination) est **retiré de la liste « Liens à parcourir »** ;
  - la **page de destination** est **ajoutée à la liste « Chemin parcouru »**.

- **C3** **Bouton « Générer scénario »**
  - Un bouton dédié, libellé **« Générer scénario »**, permet de générer le scénario à partir du parcours construit.
  - **Tant que la liste « Liens à parcourir » n'est pas vide**, le bouton est **désactivé**.
  - **Lorsque la liste « Liens à parcourir » est vide**, le bouton **s'active**.
  - Au clic : le scénario est généré au **même emplacement**, sous le **même nom** et dans le **même format** qu'actuellement, avec **toutes les spécifications** nécessaires pour que l'extension de test (Playwright) puisse trouver et exécuter le scénario.

- **C4** **Annulation**
  - Un bouton **« Annuler »** permet de **revenir en arrière** d'une étape (dernier clic retiré du scénario, page courante et liste « Liens à parcourir » mises à jour en conséquence).
  - Un bouton **« Tout annuler »** permet de **revenir au départ** : scénario vidé, page courante = Accueil, liste « Liens à parcourir » réinitialisée selon le plan du site, liste « Chemin parcouru » vidée.

---

### D. Définition des listes et cohérence avec le plan

- **D1** La liste **« Liens à parcourir »** est dérivée du **plan du site** (même source que `siteMapGenerator` / `_Pages-Et-Lien.json`). Un lien est retiré de cette liste lorsqu'il a été **utilisé dans le parcours** (clic correspondant). Elle contient les **liens inter-pages** (source → destination), et non la liste des e2eID.
- **D2** La liste **« Chemin parcouru »** affiche, dans l'ordre, les **pages visitées** (étapes du scénario en cours).
- **D3** L'utilisateur peut **repasser par un chemin déjà utilisé** ; il doit en revanche **vider la liste « Liens à parcourir »** (en parcourant tous les liens requis) pour pouvoir activer le bouton « Générer scénario ».

---

### E. Format et emplacement du scénario généré

- **E1** Le scénario généré est écrit au **même emplacement**, sous le **même nom** et dans le **même format** que le scénario E2E actuel (ex. `tests/end-to-end/parcours-complet-liens.spec.ts` ou équivalent).
- **E2** Le contenu du fichier respecte **toutes les spécifications** attendues par l'extension de test (Playwright) pour que le scénario soit **détecté et exécutable** (structure des étapes, sélecteurs, e2eid, etc., alignés sur l'existant).
