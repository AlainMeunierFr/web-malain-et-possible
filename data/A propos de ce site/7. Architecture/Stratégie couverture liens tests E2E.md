### Stratégie de couverture des liens dans les tests end-to-end

#### Introduction

Dans un contexte de développement web moderne, garantir que tous les liens et éléments interactifs d'un site sont testés dans les scénarios end-to-end représente un défi récurrent. Les approches traditionnelles consistent généralement à maintenir manuellement des tests E2E, ce qui entraîne rapidement des écarts entre le code et les tests, des oublis de liens, et une maintenance coûteuse.

Le besoin identifié est triple :
1. **Assurer la couverture complète** : Tous les liens et éléments interactifs du site doivent être testés automatiquement
2. **Maintenir la synchronisation** : Les tests doivent rester à jour avec l'évolution du code sans intervention manuelle
3. **Forcer la décision** : Identifier systématiquement les éléments interactifs et forcer le développeur à décider s'ils doivent être testés ou exclus

Pour répondre à ces besoins, une stratégie en boucle fermée a été mise en place, où les tests d'intégration jouent un rôle central : ils détectent, vérifient, et surtout **forcent l'action** du développeur lorsque des écarts sont détectés. Cette approche, peu courante dans les projets standards, transforme les tests d'intégration en garde-fous actifs plutôt qu'en simples vérifications passives.

#### Résumé

Cette stratégie repose sur un processus en deux phases principales, orchestrées entièrement par des tests d'intégration :

**Phase 1 : Identification et qualification des éléments interactifs**
Les tests d'intégration audient le site pour détecter tous les éléments interactifs (boutons, liens, vidéos, etc.). Pour chaque élément, ils vérifient la présence d'un identifiant unique (e2eID). Si un élément n'a pas d'identifiant, le test échoue et génère un fichier d'audit listant tous les éléments concernés. Le développeur doit alors arbitrer chaque élément : soit lui attribuer un identifiant (pour l'intégrer dans les tests), soit l'exclure explicitement. Une fois l'arbitrage effectué, le système génère automatiquement les identifiants manquants directement dans le code source. À l'issue de ce processus, tous les éléments interactifs ont un identifiant unique ou sont explicitement exclus des tests.

**Phase 2 : Construction automatique du scénario E2E**
Les tests d'intégration audient ensuite les liens internes du site pour construire un plan de navigation. Un algorithme glouton génère un scénario de base qui parcourt tous les liens détectés. Ce scénario est ensuite enrichi automatiquement : à chaque page visitée, tous les éléments interactifs présents sont ajoutés au scénario. Le résultat est un scénario E2E unique qui passe par tous les liens et teste tous les éléments interactifs souhaités.

**Rôle central des tests d'intégration**
Chaque étape de ce processus est contrôlée par des tests d'intégration. Si une étape échoue, le développeur est contraint d'agir : arbitrer les nouveaux éléments interactifs, corriger les identifiants manquants, ou mettre à jour le scénario. Les tests ne se contentent pas de vérifier : ils forcent la décision et la correction.

---

#### Phase 1 : Identification et qualification des éléments interactifs

##### Étape 1 : Audit du site pour détecter les éléments interactifs

Les tests d'intégration parcourent automatiquement le code source du site pour identifier tous les éléments interactifs :
- Boutons dans les fichiers JSON de contenu
- Liens dans les composants React
- Vidéos, appels à l'action, domaines de compétences
- Nouveaux types d'éléments interactifs détectés via leurs propriétés

Cette détection est exhaustive et couvre tous les formats de contenu utilisés dans le site.

##### Étape 2 : Contrôle de la présence d'identifiants uniques

Pour chaque élément interactif détecté, les tests vérifient la présence d'un identifiant unique (e2eID). Cet identifiant permet de cibler précisément l'élément dans les tests automatisés.

##### Étape 3 : Arbitrage des éléments sans identifiant

Lorsqu'un élément interactif n'a pas d'identifiant, le test d'intégration échoue et génère un fichier d'audit listant tous les éléments concernés.

**Fichier d'audit avec instructions et localisation précise** : Ce fichier d'audit (`e2e-ids-pending.json`) est structuré pour guider efficacement le développeur dans sa décision. Pour chaque élément, il contient :
- **Localisation précise** : fichier source, numéro de ligne (pour React), ou chemin dans le JSON (pour les fichiers de contenu)
- **Type d'élément** : bouton, lien, vidéo, etc., pour comprendre le contexte
- **Description** : extrait du code ou description lisible pour faciliter l'identification
- **Instructions claires** : explication des actions possibles (attribuer un identifiant ou exclure)
- **Métadonnées** : compteur maximum actuel, prochain identifiant disponible

Le développeur doit alors prendre une décision explicite pour chaque élément en modifiant le fichier d'audit :
- **Attribuer un identifiant** (`"action": "add"`) : l'élément sera intégré dans le scénario de test, un identifiant sera généré automatiquement
- **Exclure explicitement** (`"action": "null"`) : l'élément sera marqué comme exclu des tests, avec `e2eID: null` dans le code

Cette étape d'arbitrage est obligatoire : le test ne passera pas tant que tous les éléments n'ont pas été traités. Le fichier d'audit sert de point de contrôle, de documentation des décisions prises, et de guide pour le développeur, rendant le processus d'arbitrage aussi simple et clair que possible.

##### Étape 4 : Génération automatique des identifiants

Une fois l'arbitrage effectué, le système génère automatiquement les identifiants manquants directement dans le code source. Les identifiants suivent une convention de nommage cohérente (préfixe par type d'élément) qui facilite leur identification et leur maintenance. Les éléments exclus sont également marqués explicitement dans le code.

**Suppression automatique du fichier d'audit** : Une fois tous les éléments traités (identifiants générés ou éléments exclus), le système relance automatiquement la détection pour vérifier qu'il n'y a plus d'éléments en attente. Si tous les éléments ont été correctement traités, le fichier d'audit est automatiquement supprimé. Cette suppression confirme que le processus est complet et que tous les éléments interactifs ont été qualifiés. Si le fichier d'audit persiste, cela signifie qu'il reste des éléments non arbitrés, et le test continuera d'échouer jusqu'à ce que tous les éléments soient traités.

**Résultat de la Phase 1** : Un inventaire complet et qualifié de tous les éléments interactifs du site, chacun ayant un statut clair (testé ou exclu), avec tous les identifiants générés directement dans le code source. L'absence du fichier d'audit confirme que le processus est terminé.

---

#### Phase 2 : Construction automatique du scénario E2E

##### Étape 5 : Audit des liens internes au site

Les tests d'intégration analysent le site pour détecter tous les liens internes entre les pages :
- Liens depuis les appels à l'action
- Liens depuis les boutons de compétences
- Liens depuis le footer et le header
- Tous les chemins de navigation possibles

Cette analyse génère un plan de navigation complet qui reflète fidèlement la structure réelle du site. Ce plan est mis à jour automatiquement tout en préservant les métadonnées existantes permettant ainsi de maintenir la cohérence entre l'audit automatique et ce que le développeur jugerait utile d'ajouter.

##### Étape 6 : Construction du scénario de base via algorithme glouton

À partir du plan de navigation, un algorithme glouton construit un scénario de test qui parcourt tous les liens détectés. L'algorithme commence par la page d'accueil et suit les liens disponibles, en s'assurant que chaque lien est utilisé au moins une fois. Le résultat est un chemin optimal qui couvre tous les liens du site.

**Mécanismes de fallback pour la robustesse** : Le scénario généré inclut des mécanismes de fallback pour gérer les cas où un lien n'est pas trouvé directement par son label (par exemple, si plusieurs liens partagent le même texte). Le scénario tente plusieurs stratégies alternatives :
- Navigation via le plan du site (footer) : si le lien n'est pas trouvé directement, le scénario navigue vers le plan du site qui contient tous les liens du site
- Navigation via le logo du header : le logo permet de revenir à l'accueil, d'où on peut naviguer vers n'importe quelle page

**Détection des incohérences** : Si aucun de ces mécanismes ne permet de trouver le lien, le test échoue avec une erreur explicite. Cette approche permet de détecter des problèmes importants :
- Des pages "cachées" qui ne sont accessibles par aucun chemin de navigation
- Des liens oubliés vers des pages importantes qui ne sont pas présentes dans le plan du site
- Des incohérences entre le plan de navigation audité et la réalité du site

En échouant plutôt qu'en utilisant une navigation directe, le test force le développeur à corriger ces incohérences, garantissant ainsi que tous les liens du plan de navigation sont réellement accessibles et que le plan reflète fidèlement la structure du site.

##### Étape 7 : Enrichissement avec les éléments interactifs

Le scénario de base est ensuite enrichi automatiquement : à chaque page visitée dans le scénario, tous les éléments interactifs présents sur cette page sont ajoutés au test. Ces éléments sont testés lors de leur première apparition dans le parcours, évitant ainsi les doublons tout en garantissant une couverture complète.

##### Étape 8 : Scénario E2E complet

Le résultat final est un scénario E2E unique qui :
- Parcourt tous les liens internes du site
- Teste tous les éléments interactifs souhaités (ceux qui ont un identifiant)
- Reste synchronisé avec l'évolution du code grâce à la régénération automatique

**Résultat de la Phase 2** : Un scénario E2E complet et à jour qui couvre automatiquement tous les liens et éléments interactifs souhaités.

---

#### Étape 9 : Contrôle continu via tests d'intégration

##### Rôle des tests d'intégration

Tout ce processus est orchestré et contrôlé par des tests d'intégration. Chaque étape est vérifiée, et si une étape échoue, le développeur est contraint d'agir :

- **Si des éléments interactifs sans identifiant sont détectés** : le test échoue et génère un fichier d'audit. Le développeur doit arbitrer chaque élément avant de pouvoir continuer.

- **Si des identifiants ne sont pas testés dans le scénario E2E** : le test échoue avec un message détaillé listant les identifiants manquants. Le développeur doit s'assurer que ces éléments sont bien présents dans le scénario.

- **Si le plan de navigation est obsolète** : le test échoue et met à jour automatiquement le plan. Le développeur doit vérifier que les changements sont corrects.

##### Forcer la décision

L'aspect clé de cette stratégie est que les tests d'intégration ne se contentent pas de signaler des problèmes : ils **forcent la décision** du développeur. Un test qui échoue bloque la progression tant que le problème n'est pas résolu. Cette approche garantit que :

- Aucun élément interactif n'est oublié
- Tous les éléments sont explicitement qualifiés (testé ou exclu)
- Le scénario E2E reste toujours à jour
- Les décisions sont tracées et documentées

##### Automatisation et régénération

Une fois les décisions prises et les corrections effectuées, le système régénère automatiquement :
- Le plan de navigation (via les tests d'intégration)
- Le scénario E2E (via un hook pre-commit qui s'exécute avant chaque commit)
- Les identifiants manquants (via les tests d'intégration)

**Hook pre-commit pour synchronisation automatique** : Un hook pre-commit s'exécute automatiquement avant chaque commit Git. Ce hook régénère le scénario E2E à partir du plan de navigation le plus récent, garantissant que le scénario est toujours synchronisé avec les derniers changements du code. Cette synchronisation se fait de manière transparente : le développeur n'a pas besoin de se rappeler de régénérer manuellement le scénario. Si la régénération échoue, le commit peut être bloqué (selon la configuration), forçant ainsi le développeur à corriger les problèmes avant de pouvoir commiter. Cette approche garantit que le scénario E2E dans le dépôt est toujours à jour et reflète fidèlement l'état actuel du site.

Cette régénération automatique garantit que le scénario reste synchronisé avec l'évolution du code, sans intervention manuelle supplémentaire.

##### Vérification de couverture complète

Un test d'intégration dédié vérifie systématiquement que tous les identifiants existants sont bien présents dans le scénario E2E. Cette vérification compare l'inventaire complet de tous les identifiants (extraits du code source) avec les identifiants référencés dans le scénario E2E généré.

**Message d'erreur détaillé et actionnable** : Si des identifiants manquent, le test échoue avec un message d'erreur structuré et actionnable qui :
- Liste précisément tous les identifiants non testés, groupés par source (JSON, composants React, constantes)
- Indique pour chaque identifiant manquant sa localisation exacte (fichier, chemin dans le JSON, ou ligne dans le composant React)
- Fournit des statistiques de couverture (total d'identifiants, nombre testés, nombre manquants, pourcentage de couverture)
- Donne des instructions claires pour corriger le problème (comment ajouter les tests manquants dans le scénario)

Cette vérification garantit qu'aucun élément interactif qualifié pour les tests n'est oublié dans le scénario final. Le message d'erreur détaillé permet au développeur de comprendre rapidement quels éléments doivent être ajoutés et où les trouver dans le code source.

---

#### Avantages de cette stratégie

1. **Couverture garantie** : Tous les éléments interactifs sont identifiés et qualifiés systématiquement
2. **Décision forcée** : Le développeur ne peut pas ignorer un élément interactif : il doit explicitement décider de le tester ou de l'exclure
3. **Synchronisation automatique** : Le scénario E2E se met à jour automatiquement avec l'évolution du code
4. **Traçabilité** : Toutes les décisions sont documentées (identifiants attribués, éléments exclus)
5. **Maintenance minimale** : Une fois le processus en place, la maintenance est réduite au strict minimum
6. **Approche peu courante** : Cette stratégie combine plusieurs pratiques rares : les tests d'intégration modifient automatiquement le code source de l'application (génération d'identifiants dans les fichiers JSON et React), créent une boucle fermée complète (détection → arbitrage → correction automatique → vérification), et forcent systématiquement la décision du développeur. Cette combinaison est peu courante dans les projets standards, où les tests restent généralement en lecture seule et se contentent de signaler les problèmes sans les corriger automatiquement.

---

#### Conclusion

Cette stratégie garantit que :
- ✅ Tous les éléments interactifs sont identifiés et qualifiés (testé ou exclu)
- ✅ Tous les liens internes sont audités et intégrés dans le scénario E2E
- ✅ Le scénario E2E couvre automatiquement tous les éléments souhaités
- ✅ Les tests d'intégration forcent la décision et la correction lorsque des écarts sont détectés
- ✅ Le système reste synchronisé avec l'évolution du code grâce à la régénération automatique

Le système forme une boucle fermée entièrement orchestrée par les tests d'intégration : ils détectent, vérifient, forcent la décision, modifient automatiquement le code source, et régénèrent les artefacts. Cette approche, où les tests d'intégration modifient directement le code de l'application (et pas seulement les fichiers de test) et créent une boucle complète de correction automatique, est peu courante dans les projets standards. Elle permet d'atteindre un niveau de fiabilité et de maintenabilité rarement atteint avec les approches traditionnelles où les tests restent en lecture seule.
