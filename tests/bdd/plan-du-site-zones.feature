# language: fr

Fonctionnalité: Plan du site organisé par zones
  En tant que visiteur du site
  Je souhaite voir le plan du site organisé par zones logiques
  Afin de comprendre rapidement la structure du site et naviguer efficacement

  Scénario: Affichage du titre "Plan du site"
    Étant donné que je suis sur la page plan-du-site
    Quand la page se charge
    Alors je vois "Plan du site" dans la têtière

  Scénario: Organisation des pages par zones - Ligne 1 HomePage
    Étant donné que le plan du site contient des pages avec zone "HomePage"
    Quand je consulte la page plan-du-site
    Alors je vois toutes les pages "HomePage" affichées horizontalement sur la ligne 1

  Scénario: Organisation des pages par zones - Ligne 2 Profils
    Étant donné que le plan du site contient des pages avec zone "Profils"
    Quand je consulte la page plan-du-site
    Alors je vois toutes les pages "Profils" affichées horizontalement sur la ligne 2
    Et il y a un padding entre la ligne 1 et la ligne 2

  Scénario: Organisation des pages par zones - Ligne 3 Autres et Footer
    Étant donné que le plan du site contient des pages avec zone "Autres" et "Footer"
    Quand je consulte la page plan-du-site
    Alors je vois toutes les pages "Autres" affichées verticalement dans la colonne gauche de la ligne 3
    Et je vois toutes les pages "Footer" affichées verticalement dans la colonne droite de la ligne 3
    Et il y a un padding entre la ligne 2 et la ligne 3

  Scénario: Pages masquées non affichées
    Étant donné qu'une page a la zone "Masqué"
    Quand je consulte la page plan-du-site
    Alors cette page n'est pas affichée

  Scénario: Conservation de la zone lors de la mise à jour du générateur
    Étant donné qu'une page a une zone définie dans _Pages-Liens-Et-Menus.json
    Quand le générateur met à jour le plan du site
    Alors la propriété zone de cette page est conservée

  Scénario: Attribution des zones aux pages existantes
    Étant donné que le plan du site contient les pages suivantes :
      | Titre                                              | Zone      |
      | Home                                               | HomePage  |
      | Produit logiciel                                   | Profils   |
      | Opérations                                         | Profils   |
      | Transformation Agile                               | Profils   |
      | Technologie                                        | Profils   |
      | Détournement de scènes cultes du cinéma            | Autres    |
      | Portfolio de detournements vidéos                  | Autres    |
      | Pour aller plus loin, je vous propose une expérience... | Autres |
      | metrics                                            | Footer    |
      | a-propos                                   | Footer    |
    Quand je consulte la page plan-du-site
    Alors chaque page est affichée dans sa zone correspondante
