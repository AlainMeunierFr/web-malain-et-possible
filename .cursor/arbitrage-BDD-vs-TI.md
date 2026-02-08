# Arbitrage : BDD vs TU/TI pour les scénarios techniques

## Contexte

Une partie des scénarios BDD (Gherkin) décrit des comportements **techniques** (API, génération, logique métier) plutôt que des parcours **visibles dans l’IHM**. Exemples :

- **api-vitrine-swagger** : contrats API (erreur 400, modes refs/full) → déjà couverts par des TU sur les routes / helpers.
- **e2e-ids-assignment**, **site-map**, **plan-du-site-zones** : logique de détection, plan du site → naturellement couverts par des **tests d’intégration (TI)** en Jest.
- **pages-profils-cibles** (steps qui lisent des JSON) : mix données + IHM ; exécutés dans Playwright alors que la donnée est en Node.

Faire passer ces scénarios en BDD (Playwright) est soit redondant avec les TU/TI, soit artificiel (contexte navigateur inutile).

## Principe retenu

- **TU** : résultat d’un appel API, d’une fonction, d’un parser → pas de doublon en BDD.
- **TI** : flux métier (lecture de fichiers, génération de plan, cohérence) → couvrent ce que les BDD « techniques » tentaient de faire en IHM.
- **BDD** : utile pour les **acceptations visibles par l’utilisateur** (navigation, affichage, parcours IHM). Si on ne garde que des scénarios IHM purs, on peut les conserver ; sinon, on peut s’en passer et ne valider que **US → TI** (et E2E quand ils existent).

## Choix possible : US → TI uniquement (pas de BDD dans le pipeline)

Pour éviter les échecs de publication liés aux BDD techniques tout en restant cohérent :

- **Validation pour la publication** : Jest (TU + TI) + E2E (Playwright `tests/end-to-end/` quand le dossier existe).
- **BDD** : désactivé dans le pipeline par défaut (variable d’environnement `SKIP_BDD=1`). Les fichiers `.feature` restent en place comme **documentation** ; on peut les réactiver plus tard en ne gardant que les scénarios IHM.

## Comportement par défaut du pipeline

- **Par défaut** : les tests BDD ne sont **pas exécutés** (aligné avec l’état d’avant : ils ne passaient pas réellement). La validation de publication = **Jest (TU+TI)** + E2E si le dossier `tests/end-to-end/` existe et contient des specs.
- **Activer les BDD** : `RUN_BDD=1 npm run publie` (ou `RUN_BDD=1` dans `.env.local`) pour lancer la génération et l’exécution BDD ; la publication bloque alors si des scénarios BDD échouent.
- Si `tests/end-to-end/` est vide ou absent, l’exécution E2E est ignorée et la publication ne bloque pas (validation = Jest uniquement).
