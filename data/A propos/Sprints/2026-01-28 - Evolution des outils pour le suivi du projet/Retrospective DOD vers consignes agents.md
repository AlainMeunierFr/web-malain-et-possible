### Rapport de rétrospective — DOD vers consignes des agents (2026-01-28)

**Objectif de la rétrospective** : Faire évoluer la Definition of Done (DOD) en la portant moins dans des fichiers DOD dédiés et davantage dans les **consignes explicites des agents** Cursor (Lead-dev, US, BDD, TDD-back-end, TDD-front-end), pour que les règles soient appliquées au bon moment par le bon agent, sans surcharger les prompts.

#### Contexte

- La DOD du projet était répartie dans plusieurs fichiers (DOD Équipe, Back-End, Front-End, Lead Dev, UI et UX). Une synthèse avait identifié ce qui **figurait déjà** dans les consignes des agents, ce qui **manquait**, ce qui était **implicite** ou **obsolète**.
- Constat : consignes trop détaillées alourdissent les prompts ; certaines formulations courtes (ex. « TDD strict ») suffisent à sous-entendre un ensemble de pratiques. L’objectif était de **renforcer où c’était risqué** et d’**ajouter uniquement ce qui manquait**, en restant synthétique.

#### Décisions prises

1. **Déjà figurant** : Ajouter des rappels courts là où il y avait un risque d’implicite (processus de validation, vérifications, couverture, cohérence BDD, conception avant implémentation).
2. **Implicite** : Ne rien modifier (Git, recherche codebase, todos, architecture DDD/backend pur) — considérés comme acquis dans le contexte Cursor.
3. **Manquant** : Ajouter explicitement **Revue** (Lead-dev), **refactorisation des scénarios BDD** non conformes à l’US (agent BDD), **discussion des détails d’implémentation avant de coder** (agent TDD-back-end), **stratégie Boy Scout** (Lead-dev veille). Le **journal** reste géré par le Lead-dev en fin d’US ; pas de détail supplémentaire dans les autres agents.
4. **Obsolète** : Ne rien changer (règles journal H1/H2, arbitrages–cours, validation MD, bloc UI/UX à intégrer).

#### Réalisations

- **Lead-dev** : Processus (reformulation et validation explicite avant étape suivante) ; exigence de BDD validés par le PO/utilisateur ; couverture minimale (ex. 90 %) aux étapes TDD ; build et tests OK avant de marquer `done`. Section « Tu fais » enrichie : Vérifications (linters, build, tests), Revue (DoD du profil, Clean Code, cohérence BDD ; corriger le mineur, retourner le non conforme), Stratégie Boy Scout (faire nettoyer en passant si le code ne respecte pas les consignes).
- **BDD** : `# language: fr` en première ligne des .feature en français ; cohérence des scénarios avec l’US en cours et les existants ; refactorisation des scénarios présents dans le code et non conformes à l’US en cours.
- **TDD-back-end** : Discussion avec l’utilisateur des détails d’implémentation avant de coder ; progression du simple au complexe ; cas de robustesse (fichiers, JSON, chemins).
- **TDD-front-end** : Validation par l’utilisateur de la mise en page (ou de l’approche) avant implémentation pour une nouvelle page ou un nouveau type de contenu.

#### Résultat

Les consignes des agents (fichiers `.cursor/agents/`) intègrent désormais les éléments de DOD jugés critiques, sous forme de phrases courtes et actionnables. Les fichiers DOD ont été supprimés ; les agents appliquent les règles au fil de l’eau (GO NEXT, livrables, revue, Boy Scout). Rapport rédigé le 2026-01-28.
