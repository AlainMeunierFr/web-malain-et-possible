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

Lorsqu'un élément interactif n'a pas d'identifiant, le test d'intégration échoue et génère un fichier d'audit listant tous les éléments concernés. Le développeur doit alors prendre une décision explicite pour chaque élément :
- **Attribuer un identifiant** : l'élément sera intégré dans le scénario de test
- **Exclure explicitement** : l'élément sera marqué comme exclu des tests

Cette étape d'arbitrage est obligatoire : le test ne passera pas tant que tous les éléments n'ont pas été traités.

##### Étape 4 : Génération automatique des identifiants

Une fois l'arbitrage effectué, le système génère automatiquement les identifiants manquants directement dans le code source. Les éléments exclus sont également marqués explicitement. À l'issue de ce processus, tous les éléments interactifs ont un identifiant unique ou sont explicitement exclus des tests.

**Résultat de la Phase 1** : Un inventaire complet et qualifié de tous les éléments interactifs du site, chacun ayant un statut clair (testé ou exclu).

---

#### Phase 2 : Construction automatique du scénario E2E

##### Étape 5 : Audit des liens internes au site

Les tests d'intégration analysent le site pour détecter tous les liens internes entre les pages :
- Liens depuis les appels à l'action
- Liens depuis les boutons de compétences
- Liens depuis le footer et le header
- Tous les chemins de navigation possibles

Cette analyse génère un plan de navigation complet qui reflète fidèlement la structure réelle du site.

##### Étape 6 : Construction du scénario de base via algorithme glouton

À partir du plan de navigation, un algorithme glouton construit un scénario de test qui parcourt tous les liens détectés. L'algorithme commence par la page d'accueil et suit les liens disponibles, en s'assurant que chaque lien est utilisé au moins une fois. Le résultat est un chemin optimal qui couvre tous les liens du site.

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
- Le scénario E2E (via un hook pre-commit)
- Les identifiants manquants (via les tests d'intégration)

Cette régénération automatique garantit que le scénario reste synchronisé avec l'évolution du code, sans intervention manuelle supplémentaire.

---

#### Avantages de cette stratégie

1. **Couverture garantie** : Tous les éléments interactifs sont identifiés et qualifiés systématiquement
2. **Décision forcée** : Le développeur ne peut pas ignorer un élément interactif : il doit explicitement décider de le tester ou de l'exclure
3. **Synchronisation automatique** : Le scénario E2E se met à jour automatiquement avec l'évolution du code
4. **Traçabilité** : Toutes les décisions sont documentées (identifiants attribués, éléments exclus)
5. **Maintenance minimale** : Une fois le processus en place, la maintenance est réduite au strict minimum
6. **Approche peu courante** : Cette stratégie transforme les tests d'intégration en garde-fous actifs plutôt qu'en simples vérifications passives, ce qui est rare dans les projets standards

---

#### Conclusion

Cette stratégie garantit que :
- ✅ Tous les éléments interactifs sont identifiés et qualifiés (testé ou exclu)
- ✅ Tous les liens internes sont audités et intégrés dans le scénario E2E
- ✅ Le scénario E2E couvre automatiquement tous les éléments souhaités
- ✅ Les tests d'intégration forcent la décision et la correction lorsque des écarts sont détectés
- ✅ Le système reste synchronisé avec l'évolution du code grâce à la régénération automatique

Le système forme une boucle fermée entièrement orchestrée par les tests d'intégration : ils détectent, vérifient, forcent la décision, et régénèrent automatiquement. Cette approche, où les tests d'intégration jouent un rôle actif de garde-fou plutôt qu'un rôle passif de vérification, permet d'atteindre un niveau de fiabilité et de maintenabilité rarement atteint avec les approches traditionnelles.
