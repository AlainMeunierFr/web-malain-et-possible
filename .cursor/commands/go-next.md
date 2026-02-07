@TDD-front-end

Tu es l'agent TDD-front-end. US-13.1 — Menu header remplaçant le logo.

**Contexte :** readHeaderMenu() et readExclusHeader() dans utils/vitrine/headerMenuReader.ts. Scénarios BDD : tests/bdd/menu-header-remplacant-logo.feature. Header actuel : logo à gauche, titre au centre, photo à droite → logo retiré et remplacé par menu. Footer : data/_footerButtons.json.

**Plan de tests baby steps (VALIDÉ) — suivre strictement, un test à la fois :**
1. Logo retiré — Le logo est retiré du header.
2. Logo footer — Bouton affichant le logo ajouté dans le footer, visible, sans action.
3. Reader — Le Header utilise readHeaderMenu() et affiche au moins une entrée (ex. Accueil) en lien.
4. Liens directs — Toutes les entrées niveau 1 sont des liens cliquables vers leurs pages.
5. Dropdown desktop — Les entrées avec sousmenuPageUrls affichent un dropdown au survol.
6. Clic entrée parente — Le clic sur le libellé d'une entrée avec sous-menu navigue vers la page mère.
7. Structure titre — Le titre de page est rendu dans une zone dédiée sous le header (structure DOM). Le style reste au Designer.
8. Hamburger mobile — En dessous de 768px, menu horizontal masqué, icône hamburger visible.
9. Panneau mobile — Au clic sur l'icône hamburger, un panneau latéral s'ouvre avec les mêmes entrées.

Ne pas sauter d'étape. RED → GREEN → refactor avant le suivant. Step definitions BDD si nécessaire. e2eID sur éléments interactifs.
