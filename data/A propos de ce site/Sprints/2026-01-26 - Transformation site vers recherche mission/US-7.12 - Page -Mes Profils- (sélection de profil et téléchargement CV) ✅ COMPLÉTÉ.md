# US-7.12 : Page "Mes Profils" (sélection de profil et téléchargement CV)

- **En tant que** visiteur qui a cliqué sur "Télécharger mon CV" (ou qui arrive sur "Mes Profils")
- **Je souhaite** voir les 4 profils avec pour chacun un titre, les intitulés de poste, un lien "Télécharger le CV" (PDF) et un lien "En savoir plus"
- **Afin de** choisir un profil et télécharger le CV correspondant ou aller vers le détail du profil

- **Critères d’acceptation** :

- **CA1 - Structure de la page** :
  - Page dédiée "Mes Profils" (ou équivalent), accessible depuis le lien "Télécharger mon CV" du hero (US-7.11)

- **CA2 - 4 blocs profil** :
  - Pour chaque profil (CPO, COO, Agile, CTO) : titre du profil ; liste des job titles (comme actuellement) ; lien "Télécharger le CV" avec icône PDF → PDF du profil ; bouton (ou lien) "En savoir plus…" → page du profil (`/profil/cpo`, etc.)
  - Données issues de l’existant (`hero.profils` dans `index.json` : titre, jobTitles, route, cvPath)

- **CA3 - Contenu sous les 4 blocs** :
  - En dessous des 4 blocs : affichage possible du texte qui était sous la vidéo sur la home (ex. `texteLarge` actuel), pour les visiteurs qui veulent en savoir plus sans aller sur une page profil

- **CA4 - Responsive** :
  - Mise en page adaptée (blocs empilés ou en grille selon la largeur)

- **CA5 - CTA contact sur la page** :
  - Optionnel : rappel du lien "Discutons" (même destination que dans le hero) pour ceux qui sont sur la page et préfèrent contacter avant de télécharger

**Résultat attendu :**
- Une page "Mes Profils" avec 4 blocs (titre, job titles, CV PDF, En savoir plus), puis éventuellement le texte déplacé depuis la home
- Parcours : Hero → "Télécharger mon CV" → choix de profil → téléchargement ou détail
- Responsive

---

## Notes techniques

- Les IDs sont générés en slug depuis les titres (ex: "Stratégie et transformations" → "strategie-et-transformations")
- Compatibilité ascendante : les pages sans références continuent de fonctionner
- Le format JSON final envoyé au render est identique à l'actuel (pas de changement côté frontend)
- Architecture DDD : séparation claire entre Domain (bibliothèque) et Application (pages)