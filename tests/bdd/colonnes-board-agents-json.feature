# language: fr

Fonctionnalité: Colonnes du board basées sur agents.json — US-12.2
  En tant que visiteur ou membre du projet qui consulte le tableau de bord « A propos »
  Je souhaite que la liste des colonnes (agents) du board soit construite à partir du fichier agents.json
  Afin de garantir le même affichage des colonnes en local et sur Vercel

  Contexte:
    Étant donné que je suis sur la page "A propos"
    Et que menu.json contient une ligne avec Titre "Sprint en cours", Type "container", Parametre "sprintEnCours"
    Et j'ai cliqué sur la ligne de menu "Sprint en cours" dans la bande horizontale

  Scénario: Les colonnes du board sont construites à partir de agents.json
    Étant donné que le fichier agents.json existe et contient une liste d'agents
    Quand le contenu du container sprintEnCours s'affiche
    Alors je vois un tableau avec une colonne "A faire" en première position
    Et je vois au moins une colonne agent
    Et je vois une colonne "Fait" en dernière position
    Et sous chaque titre de colonne un décompte est affiché

  Scénario: Si agents.json est absent, le board n'affiche que les colonnes A faire et Fait
    Étant donné que le fichier agents.json est absent
    Et que je suis sur la page "A propos"
    Et que menu.json contient une ligne avec Titre "Sprint en cours", Type "container", Parametre "sprintEnCours"
    Et j'ai cliqué sur la ligne de menu "Sprint en cours" dans la bande horizontale
    Quand le contenu du container sprintEnCours s'affiche
    Alors je vois exactement les colonnes "A faire" et "Fait"
    Et je ne vois aucune colonne agent
    Et je restaure le fichier agents.json
