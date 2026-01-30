# language: fr
# US : Assistant graphique de construction de scénario E2E sur la page Maintenance

Fonctionnalité: Assistant graphique de construction de scénario E2E
  En tant que responsable qualité ou développeur qui fait évoluer les scénarios E2E
  Je veux construire un scénario de test (parcours de liens) via un assistant graphique sur la page Maintenance en environnement de développement
  Afin de définir moi-même les parcours à tester avec une vision claire du plan du site et des liens restant à couvrir

  Contexte: L'image "Photo" en haut à droite dans le header sert d'entrée vers la Maintenance (court clic)

  # --- A. Suppression du générateur automatique ---
  Scénario: Aucun code ne génère automatiquement un scénario E2E
    Étant donné que le projet est configuré
    Alors il n'existe pas de script ou commande qui génère automatiquement un scénario E2E sans action explicite de l'utilisateur

  Scénario: Aucun scénario généré sans action utilisateur dans l'assistant
    Étant donné que l'assistant de construction de scénario n'a pas été utilisé pour générer un scénario
    Alors aucun fichier de scénario E2E n'a été créé ou modifié automatiquement

  # --- B. Accès à la page Maintenance, prod vs dev ---
  Scénario: En production, un clic sur Photo demande le mot de passe
    Étant donné que l'environnement est la production
    Quand je clique sur l'image Photo dans le header (en haut à droite)
    Alors une saisie de mot de passe m'est demandée
    Et je n'accède pas au contenu Maintenance sans mot de passe valide

  Scénario: En production, mot de passe correct affiche l'œuf de Pâques
    Étant donné que l'environnement est la production
    Et que j'ai cliqué sur l'image Photo dans le header
    Quand je saisis le mot de passe correct
    Alors la page Maintenance affiche l'œuf de Pâques (comportement actuel)

  Scénario: En production, mot de passe incorrect affiche une erreur
    Étant donné que l'environnement est la production
    Et que j'ai cliqué sur l'image Photo et que la saisie du mot de passe est affichée
    Quand je saisis un mot de passe incorrect
    Alors un message d'erreur est affiché
    Et je n'accède pas au contenu de la page Maintenance

  Scénario: En développement, un clic sur Photo affiche l'assistant sans mot de passe
    Étant donné que l'environnement est le développement
    Quand je clique sur l'image Photo dans le header (en haut à droite)
    Alors la page Maintenance affiche l'assistant de construction de scénario
    Et aucune saisie de mot de passe n'est demandée

  Scénario: En développement, l'assistant affiche le plan du site et les deux listes
    Étant donné que l'environnement est le développement
    Et que j'ai accédé à la page Maintenance via un clic sur Photo
    Alors je vois le plan du site (mêmes règles que le siteMapGenerator)
    Et je vois une liste "Liens à parcourir" sur le côté
    Et je vois une liste "Chemin parcouru" (pages visitées dans l'ordre)

  # --- C. Règles visuelles et interactivité ---
  Scénario: À l'arrivée, Accueil est BleuFoncé et pages accessibles en BleuClair
    Étant donné que je suis sur l'assistant de construction de scénario (environnement développement)
    Alors la page Accueil est affichée en BleuFoncé (page courante)
    Et les pages accessibles depuis Accueil (d'après le plan du site) sont en BleuClair
    Et seules les pages en BleuClair sont cliquables

  Scénario: Clic sur une page BleuClair met à jour page courante et listes
    Étant donné que je suis sur l'assistant avec une page courante en BleuFoncé et des pages accessibles en BleuClair
    Quand je clique sur une page en BleuClair
    Alors la page cliquée devient BleuFoncé (nouvelle page courante)
    Et les pages accessibles depuis cette nouvelle page courante deviennent BleuClair
    Et seules les pages BleuClair restent cliquables
    Et le lien correspondant est retiré de la liste "Liens à parcourir"
    Et la page de destination est ajoutée à la liste "Chemin parcouru"

  Scénario: Bouton Générer scénario désactivé tant que Liens à parcourir non vide
    Étant donné que je suis sur l'assistant de construction de scénario
    Et que la liste "Liens à parcourir" n'est pas vide
    Alors le bouton "Générer scénario" est désactivé

  Scénario: Bouton Générer scénario s'active quand Liens à parcourir est vide
    Étant donné que je suis sur l'assistant de construction de scénario
    Et que la liste "Liens à parcourir" est vide (tous les liens ont été parcourus)
    Alors le bouton "Générer scénario" est actif (cliquable)
    Et son libellé est "Générer scénario"

  Scénario: Bouton Annuler retire la dernière étape
    Étant donné que je suis sur l'assistant et que le chemin parcouru contient au moins une étape
    Quand je clique sur le bouton "Annuler"
    Alors la dernière étape est retirée du scénario
    Et la page courante et la liste "Liens à parcourir" sont mises à jour en conséquence

  Scénario: Bouton Tout annuler réinitialise l'assistant
    Étant donné que je suis sur l'assistant avec un chemin parcouru non vide ou des liens déjà retirés
    Quand je clique sur le bouton "Tout annuler"
    Alors le scénario en cours est vidé
    Et la page courante redevient Accueil
    Et la liste "Liens à parcourir" est réinitialisée selon le plan du site
    Et la liste "Chemin parcouru" est vidée

  # --- D. Définition des listes ---
  Scénario: Liens à parcourir est dérivée du plan du site
    Étant donné que je suis sur l'assistant de construction de scénario
    Alors la liste "Liens à parcourir" contient les liens inter-pages (source → destination) issus du plan du site (même source que siteMapGenerator)
    Et un lien est retiré de cette liste lorsqu'il a été utilisé dans le parcours (clic correspondant)

  Scénario: Chemin parcouru affiche les pages visitées dans l'ordre
    Étant donné que je suis sur l'assistant et que j'ai effectué au moins un clic sur une page BleuClair
    Alors la liste "Chemin parcouru" affiche dans l'ordre les pages visitées (étapes du scénario en cours)

  # --- E. Format et emplacement du scénario généré ---
  Scénario: Génération produit un fichier au même emplacement et format qu'actuellement
    Étant donné que je suis sur l'assistant avec la liste "Liens à parcourir" vide
    Quand je clique sur le bouton "Générer scénario"
    Alors un fichier de scénario E2E est créé ou mis à jour au même emplacement que le scénario actuel
    Et le nom du fichier et le format sont identiques au scénario E2E actuel

  Scénario: Le scénario généré est exploitable par Playwright
    Étant donné qu'un scénario a été généré via le bouton "Générer scénario"
    Alors le fichier généré respecte toutes les spécifications attendues par Playwright
    Et l'extension de test (Playwright) peut trouver et exécuter le scénario
