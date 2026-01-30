# language: fr

Fonctionnalité: Board KanBan du sprint en cours (container sprintEnCours) — US-11.5
  En tant que visiteur ou membre du projet qui consulte la page « A propos de ce site » en mode tableau de bord
  Je souhaite que le container « sprint en cours » affiche un board KanBan du sprint en cours (colonnes A faire / agents / Fait, cartes US, décomptes)
  Afin de visualiser l'état des User Stories du sprint et l'agent actif (US en cours)

  Contexte:
    Étant donné que je suis sur la page "A propos de ce site"
    Et que menu.json contient une ligne avec Titre "Sprint en cours", Type "container", Parametre "sprintEnCours"
    Et j'ai cliqué sur la ligne de menu "Sprint en cours" dans la bande horizontale

  Scénario: Le Sprint Goal est affiché en haut de la zone en TexteLarge
    Étant donné que le sprint en cours possède un fichier "00 - Sprint goal et contexte.md" avec un Sprint Goal
    Quand le contenu du container sprintEnCours s'affiche
    Alors je vois le Sprint Goal lu depuis "00 - Sprint goal et contexte.md" en haut de la zone
    Et le Sprint Goal est affiché en style TexteLarge

  Scénario: Le tableau a les colonnes A faire, agents (workflow), Fait avec un décompte sous chaque titre
    Étant donné le dossier .cursor/agents contient une liste de <fichiers>
    Quand le contenu du container sprintEnCours s'affiche
    Alors je vois un tableau avec une colonne "A faire" en première position
    Et je vois les colonnes des agents, pour chaque <fichier> dans l'ordre du workflow
    Et je vois une colonne "Fait" en dernière position
    Et sous chaque titre de colonne un décompte est affiché

  Scénario: Chaque US du sprint est représentée par une carte dans la bonne colonne selon son état
    Étant donné que le sprint en cours contient des US (fichiers US-X.Y)
    Quand le contenu du container sprintEnCours s'affiche
    Alors chaque US du sprint est représentée par une carte
    Et une carte dont le nom de fichier contient "✅ COMPLÉTÉ" est dans la colonne "Fait"
    Et la carte dont l'ID est dans "US en cours.md" est dans la colonne de l'agent actif (état "En cours")
    Et les autres cartes sont dans la colonne "A faire"

  Scénario: La colonne A faire affiche le décompte des cartes
    Quand le contenu du container sprintEnCours s'affiche
    Alors le décompte de la colonne "A faire" affiche le nombre de cartes "A faire" dans cette colonne

  Scénario: Chaque colonne agent affiche la WIP Limit 0/1 ou 1/1
    Quand le contenu du container sprintEnCours s'affiche
    Alors le décompte de chaque colonne agent affiche la WIP Limit
    Et la WIP Limit est "0/1" lorsqu'il n'y a pas de carte "En cours" dans cette colonne
    Et la WIP Limit est "1/1" lorsqu'il y a la carte "En cours" dans cette colonne

  Scénario: La colonne Fait affiche le décompte des cartes
    Quand le contenu du container sprintEnCours s'affiche
    Alors le décompte de la colonne "Fait" affiche le nombre de cartes "Fait" dans cette colonne
