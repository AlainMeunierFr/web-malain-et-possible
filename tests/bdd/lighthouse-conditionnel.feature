# language: fr
@lighthouse-conditionnel
Fonctionnalité: Scores Lighthouse avec exécution conditionnelle (US-12.7)
  En tant que développeur ou mainteneur du projet
  Je souhaite avoir les scores Lighthouse intégrés aux métriques avec exécution conditionnelle
  Afin de suivre performance, accessibilité, bonnes pratiques et SEO sans ralentir l'exécution quotidienne

  # CA1 & CA2 - Condition d'exécution basée sur lastLighthouseRun

  Scénario: Première exécution Lighthouse quand aucun timestamp n'existe
    Étant donné que le fichier history.json ne contient pas de champ "lastLighthouseRun"
    Quand j'exécute la collecte des métriques
    Alors Lighthouse s'exécute via l'API PageSpeed Insights
    Et le champ "lastLighthouseRun" est ajouté au fichier history.json avec la date actuelle au format ISO 8601

  Scénario: Exécution Lighthouse quand le délai de 7 jours est dépassé
    Étant donné que le fichier history.json contient "lastLighthouseRun" datant de plus de 7 jours
    Quand j'exécute la collecte des métriques
    Alors Lighthouse s'exécute via l'API PageSpeed Insights
    Et le champ "lastLighthouseRun" est mis à jour avec la date actuelle
    Et un message de log indique "Lighthouse running: last run X days ago"

  Scénario: Lighthouse non exécuté quand le délai de 7 jours n'est pas atteint
    Étant donné que le fichier history.json contient "lastLighthouseRun" datant de moins de 7 jours
    Quand j'exécute la collecte des métriques
    Alors Lighthouse ne s'exécute pas
    Et les scores Lighthouse existants sont conservés
    Et un message de log indique "Lighthouse skipped: last run X days ago"

  # CA3 - Scores collectés (4 catégories)

  Scénario: Collecte des 4 scores Lighthouse
    Étant donné que Lighthouse doit s'exécuter (délai dépassé ou première exécution)
    Quand l'API PageSpeed Insights répond avec succès
    Alors les 4 scores suivants sont collectés et stockés :
      """
      Performance
      Accessibilité
      Bonnes pratiques
      SEO
      """
    Et chaque score est un entier compris entre 0 et 100
    Et les scores sont stockés dans un objet "lighthouse" du fichier de métriques

  # CA4 - URL cible

  Scénario: Analyse sur l'URL de production
    Étant donné que Lighthouse doit s'exécuter
    Quand l'API PageSpeed Insights est appelée
    Alors l'URL analysée est "https://www.malain-et-possible.fr"

  # CA5 - Affichage dans MetricsCompact avec code couleur

  Scénario: Affichage des scores Lighthouse dans la section Autres indicateurs
    Étant donné que les métriques contiennent des scores Lighthouse valides
    Quand j'accède à la page "/a-propos-du-site?view=metrics"
    Alors je vois les 4 scores Lighthouse dans la section "Autres indicateurs"
    Et chaque score affiche son libellé (Performance, Accessibilité, Bonnes pratiques, SEO)

  Scénario: Score affiché en vert quand supérieur ou égal à 90
    Étant donné que les métriques contiennent un score Lighthouse "Performance" valant 95
    Quand j'accède à la page "/a-propos-du-site?view=metrics"
    Alors le score "Performance" est affiché avec un indicateur vert

  Scénario: Score affiché en orange quand compris entre 50 et 89
    Étant donné que les métriques contiennent un score Lighthouse "Accessibilité" valant 75
    Quand j'accède à la page "/a-propos-du-site?view=metrics"
    Alors le score "Accessibilité" est affiché avec un indicateur orange

  Scénario: Score affiché en rouge quand inférieur à 50
    Étant donné que les métriques contiennent un score Lighthouse "SEO" valant 45
    Quand j'accède à la page "/a-propos-du-site?view=metrics"
    Alors le score "SEO" est affiché avec un indicateur rouge

  # CA6 - Fallback en cas d'échec

  Scénario: Affichage NC quand l'API PageSpeed Insights échoue
    Étant donné que Lighthouse doit s'exécuter
    Quand l'API PageSpeed Insights échoue ou est indisponible
    Alors les scores Lighthouse sont marqués comme "NC" (Non Calculé)
    Et aucune erreur bloquante n'est levée
    Et la collecte des métriques continue normalement
    Et un message de warning est logué avec la raison de l'échec

  Scénario: Scores NC affichés correctement sur la page metrics
    Étant donné que les métriques contiennent "NC" pour les scores Lighthouse
    Quand j'accède à la page "/a-propos-du-site?view=metrics"
    Alors les scores Lighthouse ne sont pas affichés dans "Autres indicateurs"

  # CA7 - Compatibilité environnements
  # Note : Ce CA est technique (API HTTP = universellement compatible).
  # Il ne se prête pas à un scénario BDD comportemental car il s'agit d'une
  # contrainte d'implémentation vérifiable par le fait que les autres scénarios
  # fonctionnent sans dépendance Chrome (l'API PageSpeed Insights est appelée via HTTP).
