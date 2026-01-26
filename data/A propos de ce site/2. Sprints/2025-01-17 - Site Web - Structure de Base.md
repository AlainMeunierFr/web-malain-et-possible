# Sprint Goal
Mettre en place un CI/CD pour publie les fondations d'un site Web exposé sur Internet.

## US-1.1 : Affichage initial "Hello World" ✅ COMPLÉTÉ
- **En tant que** Visiteur du site
- **Je souhaite** Voir une page "Hello World" s'afficher
- **Afin de** Vérifier que le site fonctionne et que le déploiement CI/CD est opérationnel
- **Critères d'acceptation** :
- La page d'accueil affiche "Hello World"
- Le site se déploie automatiquement sur Vercel après chaque commit
- Aucune erreur de build

---

## US-1.2 : Page avec header, footer, logo et photo ✅ COMPLÉTÉ
- **En tant que** Visiteur du site
- **Je souhaite** Voir une page avec un header fixe en haut, un footer fixe en bas, un logo en haut à gauche et une photo en haut à droite
- **Afin de** Avoir une structure de base cohérente pour le site
- **Critères d'acceptation** :
- Le header est fixe en haut avec une hauteur responsive (8.75vh, minimum 78px)
- Le footer est fixe en bas avec une hauteur responsive (5.47vh, minimum 53px)
- **Le logo et la photo sont des éléments du header (pas du contenu de la page)** :
  - Le logo flotte au-dessus du header en haut à gauche (position absolue, déborde vers le bas)
  - La photo flotte au-dessus du header en haut à droite (position absolue, déborde vers le bas)
- Les proportions sont calculées de façon responsive
- La couleur bleue (#0070C0) est définie comme variable CSS `--BleuFonce`
- Le logo a une marge de 10 pixels par raport au haut et au bord gauche du navigateur
- La photo a une marge de 10 pixels par raport au haut et au bord droite du navigateur
- Le contenu de la page commence à 120px du haut pour éviter d'être masqué par le header
- Le contenu de la page ne descend pas en dessous de 60px du bas pour éviter d'être masqué par le footer
- Cette règle s'applique à toutes les pages du site (règle globale)
- **Z-index du header** :
  - Le header doit avoir un z-index suffisamment élevé (minimum 1000) pour rester au-dessus du contenu qui scroll
  - Le contenu qui scroll doit passer DESSOUS le header, pas par-dessus
  - Le header doit avoir un arrière-plan opaque pour masquer le contenu

---

## US-1.3 : Boutons footer configurables via JSON ✅ COMPLÉTÉ
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

## US-1.4a : Navigation vers la page "À propos de moi" ✅ COMPLÉTÉ
- **En tant que** Visiteur du site
- **Je souhaite** Pouvoir accéder à une page "À propos de moi" en cliquant sur la photo
- **Afin de** Découvrir des informations sur la personne
- **Critères d'acceptation** :
- La photo en haut à droite est cliquable
- Un clic sur la photo redirige vers la page "À propos de moi"
- Un tooltip "À propos de moi" apparaît au survol de la photo
- Le header et le footer sont présents sur toutes les pages (factorisés dans layout)

---

## US-1.4b : Navigation vers la page "HomePage" ✅ COMPLÉTÉ
- **En tant que** Visiteur du site
- **Je souhaite** Pouvoir accéder à une page "HomePage" en cliquant sur le logo
- **Afin de** Revenir à l'accueil du site
- **Critères d'acceptation** :
- Le logo en haut à gauche est cliquable
- Un clic sur le logo redirige vers la page "HomePage"
- Un tooltip "Accueil" apparaît au survol de le logo
- Le header et le footer sont présents sur toutes les pages (factorisés dans layout)
