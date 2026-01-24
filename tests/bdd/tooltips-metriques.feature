# language: fr
Fonctionnalité: Tooltips informatifs pour les métriques
  En tant que décideur consultant la page Métriques
  Je veux disposer d'explications pédagogiques sur chaque métrique via des info-bulles
  Afin de comprendre la signification business de chaque indicateur technique

  Contexte:
    Étant donné que je suis sur la page "/metrics"
    Et que les métriques sont chargées et affichées

  Scénario: CA1 - Configuration externe des tooltips via JSON
    Étant donné que le fichier "data/tooltips-metrics.json" existe
    Quand je charge la configuration des tooltips
    Alors toutes les 20 métriques doivent avoir leur configuration tooltip
    Et chaque configuration doit contenir "title", "description", et "interpretation"
    Et le contenu doit être modifiable sans toucher au code source

  Scénario: CA2 - Indicateur visuel sur chaque métrique
    Étant donné que je consulte une métrique quelconque
    Quand j'observe le bloc bleu de la métrique
    Alors je dois voir une icône "ℹ" à côté du titre
    Et l'icône doit avoir un cursor "help" au survol
    Et le design doit être cohérent avec l'interface existante

  Scénario: CA3 - Affichage tooltip au survol
    Étant donné que je vois l'icône "ℹ" d'une métrique
    Quand je survole l'icône avec ma souris
    Alors une tooltip doit apparaître avec le contenu pédagogique
    Et la tooltip doit contenir le terme technique + explication
    Et la tooltip doit contenir une grille d'interprétation

  Scénario: CA3 - Support clavier pour l'accessibilité
    Étant donné que je navigue au clavier
    Quand je donne le focus à l'icône "ℹ" (Tab)
    Alors la tooltip doit s'afficher
    Et elle doit disparaître quand je quitte le focus

  Scénario: CA4 - Priorité z-index maximale
    Étant donné qu'une tooltip est affichée
    Quand je vérifie la superposition avec autres éléments
    Alors la tooltip doit être au-dessus de TOUS les éléments de la page
    Et elle ne doit être masquée par aucun bloc, section ou carte
    Et elle doit avoir une priorité z-index maximale

  Scénario: CA5 - Gestion intelligente de l'affichage
    Étant donné qu'une tooltip est affichée près du bord d'écran
    Quand la tooltip déborderait de la zone d'affichage
    Alors elle doit se repositionner automatiquement
    Et rester entièrement visible dans la zone d'affichage

  Scénario: CA6 - Couverture complète des 19 métriques
    Étant donné que j'accède à la page des métriques
    Quand je recense toutes les tooltips disponibles
    Alors je dois trouver exactement 20 tooltips fonctionnelles
    Et chaque métrique doit avoir sa tooltip spécifique :
      | Métrique |
      | Complexité Cyclomatique |
      | Scénarios BDD |
      | Tests Unitaires |
      | Tests Intégration |
      | Steps E2E |
      | Erreurs ESLint |
      | Warnings ESLint |
      | Type Coverage |
      | Couverture Lignes |
      | Couverture Statements |
      | Couverture Fonctions |
      | Couverture Branches |
      | Fichiers Total |
      | Lignes de Code |
      | Composants |
      | Pages |
      | Dépendances Total |
      | Vulnérabilités |
      | Taille Bundle |
      | Temps de Build |

  Scénario: Performance - Chargement des tooltips
    Étant donné que j'accède à la page des métriques
    Quand les tooltips se chargent
    Alors le temps de chargement ne doit pas dépasser 100ms
    Et l'affichage des tooltips doit être fluide

  Scénario: Responsive - Tooltips sur mobile
    Étant donné que je consulte la page sur un écran mobile (≤768px)
    Quand j'active une tooltip
    Alors elle doit s'adapter à la taille de l'écran
    Et ne pas déborder de la zone d'affichage mobile