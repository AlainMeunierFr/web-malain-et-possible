# language: fr

Fonctionnalité: Page À propos du site

  Scénario: Affichage initial de la page À propos du site
    Étant donné que je suis sur la page "À propos du site"
    Alors je vois 4 sections avec leurs titres
    Et les sections sont masquées par défaut
    Et je vois les titres "À propos du site", "Definition of Done", "Journal de bord" et "Cours"

  Scénario: Déroulement d'une section par clic
    Étant donné que je suis sur la page "À propos du site"
    Et que la section "Contexte" est masquée
    Quand je clique sur le titre "Contexte"
    Alors la section "Contexte" est déroulée
    Et je peux voir son contenu

  Scénario: Masquage d'une section déroulée par clic
    Étant donné que je suis sur la page "À propos du site"
    Et que la section "Contexte" est déroulée
    Quand je clique sur le titre "Contexte"
    Alors la section "Contexte" est masquée
    Et je ne peux plus voir son contenu

  Scénario: Affichage dynamique du journal de bord
    Étant donné que je suis sur la page "À propos du site"
    Quand je déroule la section "Journal de bord"
    Alors je vois la liste des fichiers journaux du dossier JOURNAL_DE_BORD
    Et chaque fichier journal est affiché avec sa date

  Scénario: Affichage dynamique des cours
    Étant donné que je suis sur la page "À propos du site"
    Quand je déroule la section "Cours"
    Alors je vois la liste des fichiers cours du dossier JOURNAL_DE_BORD/COURS
    Et chaque fichier cours est affiché avec son titre
