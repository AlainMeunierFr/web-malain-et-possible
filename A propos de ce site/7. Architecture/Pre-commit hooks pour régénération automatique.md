### Pre-commit hooks pour régénération automatique des artefacts

#### Introduction

Dans la plupart des projets, les artefacts générés (scénarios de test, plans de site, etc.) doivent être régénérés manuellement après chaque modification du code source. Cette approche crée un risque d'oubli et de désynchronisation entre le code source et les artefacts générés.

Le besoin identifié est triple :
1. **Synchronisation garantie** : Les artefacts doivent être toujours synchronisés avec le code source
2. **Charge mentale réduite** : Le développeur ne doit pas se souvenir de régénérer les artefacts
3. **Automatisation** : La régénération doit être automatique et transparente

Pour répondre à ces besoins, un système de pre-commit hooks a été mis en place : utilisation de hooks pre-commit pour régénérer automatiquement les artefacts (scénarios E2E, plan de site) avant chaque commit, garantissant que ces fichiers sont toujours synchronisés avec le code source.

#### Résumé

Cette stratégie repose sur trois mécanismes interconnectés :

**1. Script de régénération**
Un script (`generate-e2e-scenario.ts`) génère automatiquement les artefacts à partir du code source (ex: `Pages-Et-Lien.json` → `parcours-complet-liens.spec.ts`).

**2. Hook pre-commit**
Un hook pre-commit (`pre-commit-generate-e2e.ts`) exécute automatiquement le script de régénération avant chaque commit.

**3. Intégration dans le workflow**
Le hook est intégré dans le workflow Git via `package.json` (`precommit` script), garantissant que la régénération se fait automatiquement.

Cette approche élimine le risque d'oublier de régénérer les artefacts et garantit que le dépôt contient toujours des fichiers à jour, sans effort supplémentaire pour le développeur.

---

#### Script de régénération

##### Génération automatique des scénarios E2E

Le script `generate-e2e-scenario.ts` génère automatiquement le scénario E2E complet :

**Entrée** : `data/Pages-Et-Lien.json` (plan du site avec pages et liens)

**Sortie** : `tests/end-to-end/parcours-complet-liens.spec.ts` (scénario Playwright complet)

**Processus** :
1. Lecture de `Pages-Et-Lien.json`
2. Génération d'un chemin optimal (algorithme glouton)
3. Ajout des éléments interactifs manquants
4. Génération du code Playwright
5. Écriture dans `parcours-complet-liens.spec.ts`

**Résultat** : Scénario E2E toujours synchronisé avec le plan du site.

##### Autres artefacts

D'autres artefacts peuvent être régénérés automatiquement :
- Plan de site (`Pages-Et-Lien.json`) : Mis à jour automatiquement par les tests d'intégration
- Métriques : Collectées automatiquement lors du build
- Documentation : Générée automatiquement à partir des fichiers Markdown

---

#### Hook pre-commit

##### Script pre-commit

Le script `pre-commit-generate-e2e.ts` exécute la régénération avant chaque commit :

```typescript
const main = () => {
  console.log('🔄 Génération automatique du plan de test E2E avant commit...\n');

  const scriptPath = path.join(process.cwd(), 'scripts', 'generate-e2e-scenario.ts');
  
  try {
    execSync(`npx ts-node "${scriptPath}"`, { 
      stdio: 'inherit',
      encoding: 'utf8',
      cwd: process.cwd(),
    });
    
    console.log('\n✅ Plan de test E2E généré avec succès');
  } catch (error: any) {
    console.error('\n❌ Erreur lors de la génération du plan de test E2E');
    // Ne pas bloquer le commit, juste avertir
    process.exit(0);
  }
};
```

**Comportement** :
- Exécution automatique avant chaque commit
- Avertissement en cas d'erreur (ne bloque pas le commit)
- Message clair pour le développeur

##### Intégration dans package.json

Le hook est déclenché via le script `precommit` dans `package.json` :

```json
{
  "scripts": {
    "precommit": "ts-node scripts/pre-commit-generate-e2e.ts"
  }
}
```

**Utilisation** : Le script peut être appelé manuellement (`npm run precommit`) ou automatiquement via un outil comme Husky.

---

#### Intégration dans le workflow

##### Workflow Git

Le hook s'intègre naturellement dans le workflow Git :

**Avant le commit** :
1. Le développeur fait `git commit`
2. Le hook pre-commit est déclenché automatiquement
3. Le script de régénération est exécuté
4. Les artefacts sont mis à jour
5. Le commit se poursuit normalement

**Résultat** : Les artefacts sont toujours à jour dans le dépôt, sans effort du développeur.

##### Gestion des erreurs

En cas d'erreur lors de la régénération :
- **Avertissement** : Un message d'erreur est affiché
- **Commit non bloqué** : Le commit peut continuer (pour éviter de bloquer le workflow)
- **Visibilité** : Le développeur est informé que les artefacts ne sont pas à jour

**Alternative** : On pourrait bloquer le commit si nécessaire, mais cela pourrait être trop strict.

---

#### Avantages de cette approche

##### 1. Synchronisation garantie

Les artefacts sont toujours synchronisés avec le code source :
- **Régénération automatique** : Les artefacts sont régénérés avant chaque commit
- **Pas d'oubli possible** : Impossible d'oublier de régénérer les artefacts
- **Cohérence garantie** : Le dépôt contient toujours des fichiers à jour

##### 2. Charge mentale réduite

Le développeur n'a plus à se souvenir de régénérer les artefacts :
- **Automatisation** : Tout est automatique et transparent
- **Focus sur le code** : Le développeur peut se concentrer sur le code, pas sur la maintenance des artefacts
- **Confiance** : Le système garantit que les artefacts sont toujours à jour

##### 3. Maintenance facilitée

La maintenance des artefacts est facilitée :
- **Un seul script** : Un seul script à maintenir pour la régénération
- **Processus clair** : Le processus de régénération est clair et documenté
- **Extensibilité** : Facile d'ajouter de nouveaux artefacts à régénérer

##### 4. Intégration naturelle

Le hook s'intègre naturellement dans le workflow :
- **Transparent** : Le développeur ne remarque pas la régénération (sauf en cas d'erreur)
- **Rapide** : La régénération est rapide et ne ralentit pas significativement le commit
- **Fiable** : Le système est fiable et ne cause pas de problèmes

---

#### Comparaison avec les approches traditionnelles

##### Approche traditionnelle

Dans les projets classiques, les artefacts sont régénérés manuellement :

```bash
# ❌ Approche traditionnelle
# Développeur modifie le code
# Développeur doit se souvenir de régénérer les artefacts
npm run generate-e2e-scenario
git add tests/end-to-end/parcours-complet-liens.spec.ts
git commit
# Risque d'oubli, désynchronisation possible
```

**Problèmes** :
- Maintenance manuelle fastidieuse
- Risque d'oubli et de désynchronisation
- Charge mentale pour le développeur

##### Approche avec pre-commit hooks

```bash
# ✅ Pre-commit hooks
# Développeur modifie le code
git commit  # ← Hook déclenche automatiquement la régénération
# Artefacts toujours à jour, pas d'effort supplémentaire
```

**Avantages** :
- Synchronisation automatique
- Pas de risque d'oubli
- Charge mentale réduite

---

#### Exemples concrets

##### Exemple 1 : Ajout d'une nouvelle page

**Scénario** : Le développeur ajoute une nouvelle page `/nouvelle-page`.

**Workflow** :
1. Modification du code (création de `app/nouvelle-page/page.tsx`)
2. Test d'intégration met à jour `Pages-Et-Lien.json` automatiquement
3. `git commit` déclenche le hook pre-commit
4. Hook exécute `generate-e2e-scenario.ts`
5. `parcours-complet-liens.spec.ts` est régénéré avec la nouvelle page
6. Commit se poursuit avec les fichiers à jour

**Résultat** : Tout est automatique, pas d'effort supplémentaire.

##### Exemple 2 : Modification d'un lien

**Scénario** : Le développeur modifie un lien dans un fichier JSON.

**Workflow** :
1. Modification du fichier JSON
2. `git commit` déclenche le hook pre-commit
3. Hook régénère le scénario E2E avec le nouveau lien
4. Commit se poursuit avec le scénario à jour

**Résultat** : Synchronisation garantie, pas de désynchronisation possible.

##### Exemple 3 : Erreur lors de la régénération

**Scénario** : Une erreur survient lors de la régénération.

**Comportement** :
```
❌ Erreur lors de la génération du plan de test E2E
⚠️  Le commit peut continuer, mais le plan E2E n'est pas à jour
```

**Résultat** : Le développeur est informé, mais le commit n'est pas bloqué (pour éviter de bloquer le workflow).

---

#### Conclusion

Cette stratégie garantit que :
- ✅ Les artefacts sont régénérés automatiquement avant chaque commit
- ✅ La synchronisation avec le code source est garantie
- ✅ La charge mentale du développeur est réduite
- ✅ Le workflow est fluide et transparent

Le système de pre-commit hooks transforme la régénération des artefacts en opération automatique et transparente. Cette approche, bien que peu courante dans les projets standards où les artefacts sont régénérés manuellement, permet d'atteindre un niveau de synchronisation et de maintenabilité rarement atteint avec les approches traditionnelles.

Le système devient un partenaire silencieux : les artefacts sont toujours à jour, sans effort supplémentaire pour le développeur, créant une base de données d'artefacts toujours synchronisée et cohérente.
