# language: fr
Feature: API Vitrine via Swagger
  En tant que consommateur technique du site (robot, développeur)
  Je souhaite disposer d'une API REST documentée pour accéder aux données du site vitrine
  Afin de consommer les données de manière programmatique

  # ============================================================================
  # CA1 - Paramètre mode obligatoire (erreur 400 si absent)
  # ============================================================================

  Scenario Outline: Erreur 400 si mode manquant sur endpoint non-feuille
    Given l'API Vitrine est disponible
    When je fais une requête GET sur "<endpoint>" sans paramètre mode
    Then la réponse a le statut 400
    And la réponse contient le message d'erreur "Missing required parameter: mode"
    And la réponse contient le hint "Use ?mode=refs or ?mode=full"

    Examples:
      | endpoint                      |
      | /api/vitrine/pages            |
      | /api/vitrine/pages/index      |
      | /api/vitrine/profils          |
      | /api/vitrine/profils/agile    |
      | /api/vitrine/domaines         |
      | /api/vitrine/domaines/strategie-et-transformations |
      | /api/vitrine/competences      |
      | /api/vitrine/competences/conduite-du-changement    |

  Scenario Outline: Erreur 400 si mode invalide sur endpoint non-feuille
    Given l'API Vitrine est disponible
    When je fais une requête GET sur "<endpoint>" avec le paramètre mode "<mode_invalide>"
    Then la réponse a le statut 400
    And la réponse contient une erreur de mode invalide

    Examples:
      | endpoint               | mode_invalide |
      | /api/vitrine/pages     | invalid       |
      | /api/vitrine/profils   | complete      |
      | /api/vitrine/domaines  | all           |

  # ============================================================================
  # CA2 - Mode refs (paradigme relationnel)
  # ============================================================================

  Scenario: Mode refs sur /profils retourne des slugs FK pour les domaines
    Given l'API Vitrine est disponible
    When je fais une requête GET sur "/api/vitrine/profils/agile" avec le paramètre mode "refs"
    Then la réponse a le statut 200
    And la réponse contient un objet profil avec les propriétés "slug", "titre", "jobTitles", "cvPath", "domaines"
    And la propriété "domaines" est un tableau de chaînes (slugs)

  Scenario: Mode refs sur /domaines retourne des slugs FK pour les compétences
    Given l'API Vitrine est disponible
    When je fais une requête GET sur "/api/vitrine/domaines/strategie-et-transformations" avec le paramètre mode "refs"
    Then la réponse a le statut 200
    And la réponse contient un objet domaine avec les propriétés "slug", "titre", "contenu", "competences"
    And la propriété "competences" est un tableau de chaînes (slugs)

  Scenario: Mode refs sur /competences retourne des slugs FK pour les expériences
    Given l'API Vitrine est disponible
    When je fais une requête GET sur "/api/vitrine/competences/conduite-du-changement" avec le paramètre mode "refs"
    Then la réponse a le statut 200
    And la réponse contient un objet compétence avec les propriétés "slug", "titre", "description", "experiences"
    And la propriété "experiences" est un tableau de chaînes (ids)

  Scenario: Mode refs sur /pages retourne la liste avec slug et type
    Given l'API Vitrine est disponible
    When je fais une requête GET sur "/api/vitrine/pages" avec le paramètre mode "refs"
    Then la réponse a le statut 200
    And la réponse contient un tableau de pages
    And chaque page a les propriétés "slug" et "type"

  # ============================================================================
  # CA3 - Mode full (paradigme objet)
  # ============================================================================

  Scenario: Mode full sur /profils retourne l'arbre complet profil→domaines→compétences→expériences
    Given l'API Vitrine est disponible
    When je fais une requête GET sur "/api/vitrine/profils/agile" avec le paramètre mode "full"
    Then la réponse a le statut 200
    And la réponse contient un objet profil avec l'arbre complet
    And la propriété "domaines" est un tableau d'objets domaine
    And chaque domaine contient une propriété "competences" qui est un tableau d'objets
    And chaque compétence contient une propriété "experiences" qui est un tableau d'objets

  Scenario: Mode full sur /domaines retourne l'arbre domaine→compétences→expériences
    Given l'API Vitrine est disponible
    When je fais une requête GET sur "/api/vitrine/domaines/strategie-et-transformations" avec le paramètre mode "full"
    Then la réponse a le statut 200
    And la propriété "competences" est un tableau d'objets compétence
    And chaque compétence contient une propriété "experiences" résolue en objets

  Scenario: Mode full sur /pages retourne le contenu complet de chaque page
    Given l'API Vitrine est disponible
    When je fais une requête GET sur "/api/vitrine/pages/index" avec le paramètre mode "full"
    Then la réponse a le statut 200
    And la réponse contient le contenu complet de la page

  # ============================================================================
  # CA5 - Endpoints feuilles (mode ignoré/optionnel)
  # ============================================================================

  Scenario Outline: Endpoints feuilles fonctionnent sans paramètre mode
    Given l'API Vitrine est disponible
    When je fais une requête GET sur "<endpoint>" sans paramètre mode
    Then la réponse a le statut 200

    Examples:
      | endpoint                         |
      | /api/vitrine/experiences         |
      | /api/vitrine/detournements       |
      | /api/vitrine/temoignages         |
      | /api/vitrine/version             |

  Scenario: Endpoint feuille /experiences retourne toutes les expériences triées par date
    Given l'API Vitrine est disponible
    When je fais une requête GET sur "/api/vitrine/experiences"
    Then la réponse a le statut 200
    And la réponse contient un tableau d'expériences
    And chaque expérience a les propriétés "id", "categorie", "description", "periode"

  Scenario: Endpoint feuille /experiences/{id} retourne une expérience spécifique
    Given l'API Vitrine est disponible
    And il existe une expérience avec l'id "11"
    When je fais une requête GET sur "/api/vitrine/experiences/11"
    Then la réponse a le statut 200
    And la réponse contient l'expérience avec l'id "11"

  Scenario: Endpoint feuille /temoignages retourne tous les témoignages
    Given l'API Vitrine est disponible
    When je fais une requête GET sur "/api/vitrine/temoignages"
    Then la réponse a le statut 200
    And la réponse contient un tableau de témoignages
    And chaque témoignage a les propriétés "auteur", "role", "contenu"

  Scenario: Endpoint feuille /version retourne la version du site
    Given l'API Vitrine est disponible
    When je fais une requête GET sur "/api/vitrine/version"
    Then la réponse a le statut 200
    And la réponse contient la version du site

  Scenario: Endpoints feuilles ignorent le paramètre mode s'il est fourni
    Given l'API Vitrine est disponible
    When je fais une requête GET sur "/api/vitrine/experiences" avec le paramètre mode "refs"
    Then la réponse a le statut 200
    And la réponse contient un tableau d'expériences

  # ============================================================================
  # CA6 - Documentation Swagger
  # ============================================================================

  Scenario: La spécification OpenAPI est accessible
    Given l'API Vitrine est disponible
    When je fais une requête GET sur "/api/vitrine/openapi.json"
    Then la réponse a le statut 200
    And la réponse contient une spécification OpenAPI valide

  # ============================================================================
  # CA7 - Compatibilité contrat Node.js / REST
  # ============================================================================

  Scenario Outline: Le JSON mode=full est identique à readPageData() Node.js
    Given l'API Vitrine est disponible
    And le résultat de readPageData("<fichier_json>") est connu
    When je fais une requête GET sur "<endpoint>" avec le paramètre mode "full"
    Then la réponse a le statut 200
    And le JSON de la réponse est strictement identique au résultat de readPageData("<fichier_json>")

    Examples:
      | fichier_json         | endpoint                          |
      | index.json           | /api/vitrine/pages/index          |
      | mes-profils.json     | /api/vitrine/pages/mes-profils    |
      | profil-agile.json    | /api/vitrine/profils/agile        |
