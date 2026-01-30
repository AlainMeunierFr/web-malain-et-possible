# language: fr
Fonctionnalité: Affichage des valeurs correctes des métriques sur la page Metrics (US-12.1)
  En tant que développeur ou Lead Dev qui consulte la page Metrics
  Je souhaite que les métriques affichent la valeur réelle calculée (ou NC) et jamais de valeur inventée
  Afin d'avoir un tableau de bord fiable

  Scénario: Type Coverage affiché quand la valeur est calculée
    Étant donné que les métriques collectées contiennent une valeur numérique pour Type Coverage
    Quand j'accède à la page "/metrics"
    Alors je vois dans la section "Qualité du code" une carte "Type Coverage"
    Et la carte affiche un pourcentage entier (valeur réelle, pas un placeholder)

  Scénario: Type Coverage absent ou NC quand non calculé
    Étant donné que les métriques collectées contiennent "NC" pour Type Coverage
    Quand j'accède à la page "/metrics"
    Alors la section "Qualité du code" n'affiche pas la carte "Type Coverage"

  Scénario: Score Lighthouse affiché quand la valeur est calculée
    Étant donné que les métriques collectées contiennent une valeur numérique pour le score Lighthouse
    Quand j'accède à la page "/metrics"
    Alors je vois dans la section "Performance" une carte "Score Lighthouse"
    Et la carte affiche un nombre entre 0 et 100 (valeur réelle, pas un placeholder)

  Scénario: Score Lighthouse absent ou NC quand non calculé
    Étant donné que les métriques collectées contiennent "NC" pour le score Lighthouse
    Quand j'accède à la page "/metrics"
    Alors la section "Performance" n'affiche pas la carte "Score Lighthouse"

  Scénario: Métriques non calculées sans valeur inventée
    Étant donné que les métriques collectées contiennent "NC" pour Complexité cyclomatique, Index de maintenabilité et Dette technique
    Quand j'accède à la page "/metrics"
    Alors les cartes "Complexité cyclomatique", "Index de maintenabilité" et "Dette technique" sont absentes de la section "Qualité du code"
    Ou chacune affiche "NC" (aucune valeur inventée)
