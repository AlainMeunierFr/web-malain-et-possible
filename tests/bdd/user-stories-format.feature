# language: fr

Fonctionnalité: Affichage formaté des User Stories avec typeDeContenu

  Scénario: Détection d'une User Story par son titre H2
    Étant donné un fichier Markdown contenant "## Titre US"
    Quand le parser analyse le fichier
    Alors le bloc est détecté comme une User Story
    Et le titre "Titre US" est extrait

  Scénario: Attribution typeDeContenu aux éléments de liste sous une US
    Étant donné un fichier Markdown avec une User Story complète :
      """
      #### US-1.1 : Affichage initial
      - **En tant que** Visiteur du site
      - **Je souhaite** Voir une page s'afficher
      - **Afin de** Vérifier que le site fonctionne
      - **Critères d'acceptation** :
        - La page affiche "Hello World"
      """
    Quand le parser analyse le fichier
    Alors l'élément "- **En tant que**" a `typeDeContenu: "En tant que"`
    Et l'élément "- **Je souhaite**" a `typeDeContenu: "Je souhaite"`
    Et l'élément "- **Afin de**" a `typeDeContenu: "Afin de"`
    Et l'élément "- **Critères d'acceptation** :" a `typeDeContenu: "Critères d'acceptation"`

  Scénario: Pas d'attribution typeDeContenu si les 4 éléments ne sont pas présents
    Étant donné un fichier Markdown avec une User Story incomplète :
      """
      #### US-1.1 : Affichage initial
      - **En tant que** Visiteur du site
      - **Je souhaite** Voir une page s'afficher
      """
    Quand le parser analyse le fichier
    Alors l'élément "- **En tant que**" n'a pas de `typeDeContenu`
    Et l'élément "- **Je souhaite**" n'a pas de `typeDeContenu`

  Scénario: Pas d'attribution typeDeContenu si les éléments ne sont pas sous un titre d'US
    Étant donné un fichier Markdown avec des listes normales :
      """
      # Partie normale
      - **En tant que** Visiteur
      - **Je souhaite** Voir quelque chose
      - **Afin de** Faire quelque chose
      - **Critères d'acceptation** :
        - Un critère
      """
    Quand le parser analyse le fichier
    Alors aucun élément n'a de `typeDeContenu` attribué

  Scénario: Affichage formaté d'une User Story
    Étant donné que je suis sur la page "À propos du site"
    Et j'affiche le dossier "1. A propos du projet"
    Et que la section "User Stories" est déroulée
    Quand je vois une User Story avec les éléments formatés
    Alors "**En tant que** Visiteur du site" est affiché sur une seule ligne
    Et "**Je souhaite** Voir une page s'afficher" est affiché sur une seule ligne
    Et "**Afin de** Vérifier que le site fonctionne" est affiché sur une seule ligne
    Et "**Critères d'acceptation** :" est affiché en gras
    Et les éléments sont espacés de manière lisible

  Scénario: Test d'intégration - Validation du fichier User Stories.md
    Étant donné le fichier "A propos de ce site/1. A propos du projet/User Stories.md"
    Quand le test d'intégration s'exécute
    Alors le fichier est validé selon la syntaxe attendue
    Et si une User Story ne respecte pas la syntaxe, le test échoue
    Et le build est bloqué si le test échoue

  Scénario: Test d'intégration - Détection d'une US incomplète
    Étant donné le fichier "User Stories.md" contient :
      """
      #### US-1.1 : Titre
      - **En tant que** Visiteur
      - **Je souhaite** Voir quelque chose
      """
    Quand le test d'intégration s'exécute
    Alors le test détecte que l'US est incomplète (manque "Afin de" et "Critères d'acceptation")
    Et le test échoue avec un message d'erreur clair
