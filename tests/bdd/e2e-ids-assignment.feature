# language: fr

Fonctionnalité: Attribution automatique des e2eID pour tests e2e
  En tant que développeur
  Je veux des identifiants e2e auto-générés avec préfixes typés
  Afin de garantir la testabilité et la traçabilité

  Contexte:
    Étant donné que les fichiers JSON de contenu existent dans "data/"

  Scénario: Génération des e2eID avec compteur global
    Étant donné un JSON contenant 2 videos
    Et un JSON contenant 1 callToAction
    Et un JSON contenant 3 boutons
    Et un JSON contenant 2 boutons de compétences
    Quand je génère les e2eID automatiquement
    Alors les e2eID générés doivent être dans l'ordre : "v1", "v2", "a3", "b4", "b5", "b6", "c7", "c8"
    Et le compteur global doit être à 8

  Scénario: Respect des préfixes par type d'élément
    Étant donné un JSON avec des éléments de différents types
    Quand je génère les e2eID automatiquement
    Alors les videos doivent avoir le préfixe "v"
    Et les callToAction doivent avoir le préfixe "a"
    Et les boutons doivent avoir le préfixe "b"
    Et les boutons de compétences doivent avoir le préfixe "c"

  Scénario: Format des e2eID généré respecte le pattern
    Étant donné un JSON avec des éléments interactifs
    Quand je génère les e2eID automatiquement
    Alors chaque e2eID doit respecter le format "{prefix}{number}"
    Et le prefix doit être une lettre unique
    Et le number doit être un entier positif

  Scénario: Préservation des e2eID existants
    Étant donné un JSON avec un élément ayant déjà un e2eID "v99"
    Quand je génère les e2eID automatiquement
    Alors l'e2eID "v99" doit être préservé
    Et les nouveaux e2eID ne doivent pas écraser les existants

  Scénario: Détection de doublons d'e2eID
    Étant donné un JSON avec deux éléments ayant le même e2eID "b3"
    Quand je lance la validation des e2eID
    Alors la validation doit échouer
    Et le message d'erreur doit indiquer "e2eID en doublon : b3"
    Et le message doit lister les 2 éléments concernés avec leur localisation

  Scénario: Export de l'inventaire des e2eID
    Étant donné un JSON avec des éléments ayant des e2eID
    Quand je génère l'inventaire des e2eID
    Alors un fichier "test-results/e2e-ids-inventory.json" doit être créé
    Et il doit contenir pour chaque e2eID :
      | Champ    | Description                        |
      | e2eID    | L'identifiant e2e                  |
      | type     | Le type d'élément                  |
      | source   | Le fichier JSON source             |
      | texte    | Le texte/label de l'élément        |
    Et le fichier doit contenir un résumé avec le nombre total d'éléments par type

  Scénario: Tous les éléments interactifs ont un e2eID unique
    Étant donné tous les fichiers JSON du dossier "data/"
    Quand je valide les e2eID de tous les éléments interactifs
    Alors chaque video doit avoir un e2eID
    Et chaque callToAction doit avoir un e2eID
    Et chaque bouton doit avoir un e2eID
    Et chaque bouton de compétence doit avoir un e2eID
    Et tous les e2eID doivent être uniques dans l'ensemble du site

  Scénario: Compteur global incrémente correctement
    Étant donné un JSON vide
    Quand j'ajoute une video avec e2eID auto-généré
    Alors l'e2eID doit être "v1"
    Quand j'ajoute un callToAction avec e2eID auto-généré
    Alors l'e2eID doit être "a2"
    Quand j'ajoute un bouton avec e2eID auto-généré
    Alors l'e2eID doit être "b3"
    Et le compteur global doit être à 3

  Scénario: Attribution automatique dans un fichier JSON complet
    Étant donné le fichier "data/index.json" sans e2eID
    Quand je lance le script d'attribution automatique
    Alors tous les éléments interactifs doivent avoir un e2eID
    Et le fichier doit être mis à jour avec les nouveaux e2eID
    Et un backup du fichier original doit être créé
    Et l'inventaire doit être exporté dans "test-results/e2e-ids-inventory.json"
