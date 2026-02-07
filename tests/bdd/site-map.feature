# language: fr

Fonctionnalité: Génération automatique du plan du site et validation de conformité

  Scénario: Détection automatique de toutes les pages du site
    Étant donné que le système scanne le dossier app/
    Quand la fonction de détection des pages est exécutée
    Alors toutes les routes Next.js sont détectées
    Et chaque page a une URL unique
    Et chaque page a un titre déduit

  Scénario: Détection automatique de tous les liens internes depuis les JSON
    Étant donné que le système analyse les fichiers JSON dans data/
    Quand la fonction de détection des liens est exécutée
    Alors tous les liens internes dans les boutons de compétences sont détectés
    Et tous les liens internes dans les CallToAction sont détectés
    Et tous les liens internes dans les domaines de compétences sont détectés
    Et les liens externes sont exclus

  Scénario: Détection automatique de tous les liens internes depuis le footer
    Étant donné que le système analyse le fichier _footerButtons.json
    Quand la fonction de détection des liens est exécutée
    Alors tous les liens internes dans le footer sont détectés
    Et les liens externes du footer sont exclus

  Scénario: Mise à jour automatique du plan JSON avec les pages détectées
    Étant donné qu'un plan JSON existe dans data/_Pages-Liens-Et-Menus.json
    Et que de nouvelles pages ont été détectées dans le code
    Quand la fonction de mise à jour du plan est exécutée
    Alors les nouvelles pages sont ajoutées au JSON sans contrôle humain
    Et les pages existantes sont conservées
    Et les emplacements (x, y) existants sont conservés
    Et le titre des pages existantes est mis à jour avec la valeur trouvée par l'algorithme
    Et toutes les autres valeurs existantes (x, y, numero, e2eIDs, dessiner) sont préservées
    Et si "dessiner" est vide ou null, il est défini à "Oui" par défaut

  Scénario: Mise à jour automatique du plan JSON avec les liens détectés
    Étant donné qu'un plan JSON existe dans data/_Pages-Liens-Et-Menus.json
    Et que de nouveaux liens internes ont été détectés dans le code
    Quand la fonction de mise à jour du plan est exécutée
    Alors les nouveaux liens sont ajoutés au JSON sans contrôle humain
    Et les liens existants sont conservés

  Scénario: Suppression automatique des pages obsolètes du plan JSON
    Étant donné qu'un plan JSON existe dans data/_Pages-Liens-Et-Menus.json
    Et que certaines pages du JSON n'existent plus dans le code
    Quand la fonction de mise à jour du plan est exécutée
    Alors les pages obsolètes sont supprimées du JSON sans contrôle humain
    Et les liens associés aux pages obsolètes sont également supprimés

  Scénario: Suppression automatique des liens obsolètes du plan JSON
    Étant donné qu'un plan JSON existe dans data/_Pages-Liens-Et-Menus.json
    Et que certains liens du JSON n'existent plus dans le code
    Quand la fonction de mise à jour du plan est exécutée
    Alors les liens obsolètes sont supprimés du JSON sans contrôle humain

  Scénario: Validation des emplacements pour toutes les pages
    Étant donné qu'un plan JSON existe dans data/_Pages-Liens-Et-Menus.json
    Quand la fonction de validation des emplacements est exécutée
    Alors chaque page doit avoir des coordonnées x et y définies
    Et les pages sans emplacement sont listées dans l'erreur
    Et le test échoue si au moins une page n'a pas d'emplacement

  Scénario: Création initiale du plan JSON s'il n'existe pas
    Étant donné que le fichier data/__Pages-Liens-Et-Menus.json n'existe pas
    Quand la fonction de mise à jour du plan est exécutée
    Alors un nouveau fichier data/__Pages-Liens-Et-Menus.json est créé
    Et toutes les pages détectées sont ajoutées au JSON
    Et tous les liens détectés sont ajoutés au JSON
    Et les emplacements (x, y) sont null pour toutes les pages
