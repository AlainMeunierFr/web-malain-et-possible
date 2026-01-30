# US-7.11 : Home Hero – Mise en page premier écran (vidéo à droite, texte et CTAs à gauche)

- **En tant que** visiteur sur la home
- **Je souhaite** voir en un coup d’œil ton nom, ta disponibilité, un résumé de profil, les deux actions (CV et contact) et la vidéo
- **Afin de** comprendre le message et les CTAs sans scroll

- **Critères d’acceptation** :

- **CA1 - Mise en page desktop** :
  - **Gauche** : nom (Alain Meunier) ; sous-titre type "Disponible pour…" ; résumé de profil (court, dérivé de l’existant) ; lien "Télécharger mon CV" avec icône PDF → page "Mes Profils" ; lien contact "Discutons" → page contact / faisons-connaissance
  - **Droite** : vidéo de présentation (même contenu qu’aujourd’hui)
  - **En dessous du bloc hero** : rien (pas de contenu sous la vidéo sur le premier écran)

- **CA2 - Premier écran** :
  - Le bloc hero (gauche + droite) tient dans le viewport sans scroll obligatoire pour en voir l’essentiel

- **CA3 - Responsive** :
  - Même contenu sur mobile/tablette : ordre et mise en page adaptés (ex. texte puis vidéo, ou colonnes empilées)

- **CA4 - Données** :
  - Contenu issu de l’existant (hero + video dans `index.json`) ; pas de nouveau type de donnée
  - Le long texte actuel sous la vidéo n’est plus affiché sur la home (déplacé sur la page "Mes Profils", cf. US-7.12)

- **CA5 - CTA contact** :
  - Libellé du bouton/lien contact : **"Discutons"** (et non "On discute ?")

**Résultat attendu :**
- Home hero en mise en page gauche (texte + CTAs) / droite (vidéo), 0 scroll en dessous
- Un CTA "Télécharger mon CV" → page Mes Profils ; un CTA "Discutons" → contact
- Responsive

---