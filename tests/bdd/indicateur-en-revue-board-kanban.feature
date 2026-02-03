# language: fr

Fonctionnalité: Indicateur visuel "en revue" sur le board Kanban — US-12.3
  En tant que utilisateur du board Kanban Sprint
  Je souhaite voir un indicateur visuel sur la carte US lorsqu'elle est en phase de revue par le Lead Dev
  Afin de comprendre immédiatement que l'US est entre deux étapes et attend validation

  Contexte:
    Étant donné que je suis sur la page "A propos de ce site"
    Et que menu.json contient une ligne avec Titre "Sprint en cours", Type "container", Parametre "sprintEnCours"
    Et j'ai cliqué sur la ligne de menu "Sprint en cours" dans la bande horizontale

  # CA1 - Marquage de l'état "en revue" dans US en cours.md

  Scénario: Le fichier US en cours.md accepte un suffixe -review sur l'étape
    Étant donné que le fichier "US en cours.md" contient l'étape "BDD-review"
    Quand je lis le fichier "US en cours.md"
    Alors l'étape est reconnue comme un état intermédiaire "en revue"
    Et l'étape de base est "BDD"

  Scénario: Les étapes valides avec suffixe -review sont reconnues
    Étant donné que le fichier "US en cours.md" contient une étape avec suffixe "-review"
    Quand l'étape est l'une des suivantes :
      """
      US-review
      BDD-review
      TDD-back-end-review
      TDD-front-end-review
      """
    Alors l'étape est reconnue comme valide avec état "en revue"

  # CA2 - Lecture de l'état "en revue" par sprintBoardReader

  Scénario: La fonction de lecture détecte le suffixe -review et expose enRevue
    Étant donné que le fichier "US en cours.md" contient l'étape "TDD-back-end-review"
    Quand sprintBoardReader lit les données du sprint
    Alors l'US en cours expose "enRevue: true"
    Et l'étape de base exposée est "TDD-back-end"

  Scénario: Une étape sans suffixe -review expose enRevue à false
    Étant donné que le fichier "US en cours.md" contient l'étape "BDD"
    Quand sprintBoardReader lit les données du sprint
    Alors l'US en cours expose "enRevue: false"
    Et l'étape de base exposée est "BDD"

  # CA3 - Affichage de l'indicateur visuel sur la carte

  Scénario: Un badge apparaît sur la carte US quand enRevue est true
    Étant donné que le fichier "US en cours.md" contient l'étape "BDD-review"
    Quand le contenu du container sprintEnCours s'affiche
    Alors la carte de l'US en cours affiche un indicateur "en revue" (icône 🔍)
    Et l'indicateur est visible mais discret

  Scénario: L'indicateur disparaît quand l'étape passe au suivant
    Étant donné que le fichier "US en cours.md" contient l'étape "TDD-back-end"
    Quand le contenu du container sprintEnCours s'affiche
    Alors la carte de l'US en cours n'affiche pas d'indicateur "en revue"

  Scénario: L'indicateur disparaît quand l'étape est done
    Étant donné que le fichier "US en cours.md" contient l'étape "done"
    Quand le contenu du container sprintEnCours s'affiche
    Alors la carte de l'US dans la colonne "Fait" n'affiche pas d'indicateur "en revue"

  # CA4 - Cohérence avec le workflow existant

  Scénario: L'indicateur n'affecte pas le positionnement de la carte dans la colonne
    Étant donné que le fichier "US en cours.md" contient l'étape "BDD-review"
    Quand le contenu du container sprintEnCours s'affiche
    Alors la carte de l'US en cours est positionnée dans la colonne "BDD"
    Et la carte affiche l'indicateur "en revue"

  Scénario: Le clic sur une carte avec indicateur en revue ouvre la modale normalement
    Étant donné que le fichier "US en cours.md" contient l'étape "TDD-front-end-review"
    Et le contenu du container sprintEnCours s'affiche
    Quand je clique sur la carte de l'US en cours
    Alors la modale de détail de l'US s'ouvre normalement

  Scénario: Les US sans suffixe -review s'affichent normalement sans indicateur
    Étant donné que le sprint contient plusieurs US
    Et que l'US en cours a l'étape "BDD" (sans suffixe)
    Quand le contenu du container sprintEnCours s'affiche
    Alors aucune carte n'affiche l'indicateur "en revue"
