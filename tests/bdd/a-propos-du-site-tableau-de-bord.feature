# language: fr

Fonctionnalité: Page « A propos de ce site » en tableau de bord (mode Agile)
  En tant que visiteur ou membre du projet qui consulte la page « A propos de ce site »
  Je souhaite voir cette page organisée comme un tableau de bord du projet, en mode management visuel Agile
  Afin d'avoir une vue d'ensemble structurée (dossiers exposés) et un emplacement dédié pour le sprint en cours

  Contexte:
    Étant donné que la page "A propos de ce site" existe à l'URL /a-propos-du-site
    Et que le fichier data/A propos de ce site/menu.json existe et définit des lignes de menu
    Et que le fichier menu.json contient les lignes de menu suivantes :
      """
      | Titre                     | Numéro | Type     | Parametre                                              |
      | A propos du projet        | 1      | Path     | data/A propos de ce site/md/A propos du projet         |
      | Sprint en cours           | 2      | container| sprintEnCours                                          |
      | Definition Of Done (DOD)  | 3      | Path     | data/A propos de ce site/md/Definition of Done (DOD)   |
      | Consignes aux agents      | 4      | Path     | .cursor/agents                                         |
      """

  Scénario: Bande horizontale des lignes de menu en haut de page
    Étant donné que je suis sur la page "A propos de ce site"
    Quand la page se charge
    Alors je vois une bande horizontale en haut de la page
    Et la bande affiche les lignes de menu définies dans data/A propos de ce site/menu.json
    Et les lignes de menu sont listées horizontalement (onglets, pills ou liens côte à côte)
    Et les lignes de menu sont triées par <Numéro>

  Scénario: La bande affiche les lignes de menu décrites dans le Contexte (menu.json)
    Étant donné que je suis sur la page "A propos de ce site"
    Quand la page se charge
    Alors la bande horizontale affiche le <titre> des lignes de menu décrites dans le fichier menu.json (contenu du Contexte)

  Scénario: Présence d'un espace réservé pour le sprint en cours
    Étant donné que je suis sur la page "A propos de ce site"
    Quand la page se charge
    Alors je vois un espace dédié sous la bande horizontale
    Et cet espace est réservé pour afficher le <type> correspondant au menu sélectionné
    Et cet espace est présent et identifiable (placeholder)

  Plan du scénario: Clic sur une ligne de menu de type Path ouvre une sous-page avec arbre fichiers MD
    Étant donné que je suis sur la page "A propos de ce site"
    Et que menu.json contient une ligne avec Titre "<Titre>", Type "Path", Parametre "<Parametre>"
    Quand je clique sur la ligne de menu "<Titre>" dans la bande horizontale
    Alors une sous-page s'affiche
    Et la sous-page affiche pour ce chemin : H2 = nom de chaque fichier MD contenu dans le dossier
    Et la sous-page affiche pour chaque fichier MD : H3 et suivants = contenu du fichier MD

    Exemples:
      | Titre                     | Parametre                                              |
      | A propos du projet        | data/A propos de ce site/md/A propos du projet         |
      | Definition Of Done (DOD)  | data/A propos de ce site/md/Definition of Done (DOD)   |
      | Consignes aux agents      | .cursor/agents                                          |

  # Comportement détaillé du contenu (board KanBan) : voir a-propos-du-site-board-kanban.feature (US-11.5)
  Scénario: Clic sur une ligne de menu de type container affiche le contenu dans la zone sous la bande
    Étant donné que je suis sur la page "A propos de ce site"
    Et que menu.json contient une ligne avec Titre "Sprint en cours", Type "container", Parametre "sprintEnCours"
    Quand je clique sur la ligne de menu "Sprint en cours" dans la bande horizontale
    Alors le contenu du container sprintEnCours s'affiche dans la zone sous la bande
    Et l'URL ne change pas vers une page de visualisation de dossier

  Plan du scénario: Une seule page de visualisation paramétrée pour les lignes de type Path
    Étant donné que le site expose les lignes de menu définies dans menu.json
    Quand je clique sur la ligne de menu "<Titre>" de type Path
    Alors l'URL ou la route correspond à une page de visualisation de dossier avec le paramètre correspondant à "<Parametre>"
    Et il n'y a pas une page web distincte par ligne de menu mais une seule page paramétrée

    Exemples:
      | Titre                     | Parametre                                              |
      | A propos du projet        | data/A propos de ce site/md/A propos du projet         |
      | Definition Of Done (DOD)  | data/A propos de ce site/md/Definition of Done (DOD)   |
      | Consignes aux agents      | .cursor/agents                                          |

  Plan du scénario: Accès direct à la visualisation d'un dossier par paramètre (lignes Path de menu.json)
    Étant donné que la page de visualisation de dossier accepte un paramètre (route dynamique ou query)
    Quand j'accède à l'URL correspondant au Parametre "<Parametre>" d'une ligne de menu de type Path
    Alors la page affiche le contenu du dossier ou répertoire correspondant à "<Parametre>"
    Et je vois les fichiers MD du dossier avec H2 = nom du fichier et H3+ = contenu

    Exemples:
      | Parametre                                              |
      | data/A propos de ce site/md/A propos du projet         |
      | data/A propos de ce site/md/Definition of Done (DOD)   |
      | .cursor/agents                                          |

  # US-11.4 — Affichage Path avec dossiers et accordéon à la racine

  Scénario: À la racine d'un Path la page affiche fichiers MD en H1 et dossiers en H1 avec accordéon
    Étant donné que je suis sur la page de visualisation d'un Path qui contient à la racine des fichiers MD et des dossiers
    Quand la page se charge
    Alors les fichiers MD à la racine du Path sont affichés en H1
    Et les dossiers à la racine du Path sont affichés en H1 avec un contrôle accordéon (dépliable/repliable)

  Scénario: Un clic sur un dossier à la racine déplie ou replie la section (accordéon)
    Étant donné que je suis sur la page de visualisation d'un Path avec au moins un dossier à la racine
    Quand je clique sur le dossier ou sur le titre H1 du dossier
    Alors la section du dossier se déplie ou se replie (comportement accordéon)
    Et le contenu du dossier est visible lorsque la section est dépliée

  Scénario: Dans un dossier déplié les fichiers MD sont en H2 et le contenu en H3+
    Étant donné que je suis sur la page de visualisation d'un Path avec un dossier contenant des fichiers MD
    Et le dossier est déplié
    Quand la page affiche le contenu du dossier
    Alors les fichiers MD du dossier sont listés en H2 (titre = nom du fichier ou titre du document)
    Et le contenu de chaque fichier MD est affiché en H3, H4, etc. selon la structure du markdown

  Scénario: L'accordéon est utilisable au clavier
    Étant donné que je suis sur la page de visualisation d'un Path avec au moins un dossier à la racine
    Quand je donne le focus au contrôle accordéon d'un dossier (tab ou navigation clavier)
    Alors je peux activer le contrôle pour déplier ou replier la section au clavier (Entrée ou Espace)

  Scénario: L'état déplié ou replié de l'accordéon est indiqué
    Étant donné que je suis sur la page de visualisation d'un Path avec au moins un dossier à la racine
    Quand la page se charge
    Alors chaque contrôle accordéon indique visuellement son état (déplié ou replié)
    Et l'état est exposé aux technologies d'assistance (aria-expanded ou équivalent)
