### Sprint Goal
Mettre en place un CI/CD pour publie les fondations d'un site Web exposé sur Internet.

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
