### Clarification US-3.10a - Réponses

#### Questions posées et réponses

**1. Le test doit-il créer le fichier JSON s'il n'existe pas ?**
- ✅ **OUI** - Le test doit créer le fichier `data/site-map.json` s'il n'existe pas encore

**2. Aura-t-on besoin de régénérer les emplacements (x, y) ?**
- ❌ **NON** - Le code ne fixe pas les emplacements
- Les emplacements sont **toujours fixés manuellement par un humain**
- Le code **ne propose pas de valeurs par défaut** pour les emplacements
- Quand une nouvelle page est ajoutée, ses emplacements (x, y) sont initialisés à `null`
- C'est à l'humain de remplir manuellement ces valeurs dans le JSON

**3. Veut-on un script CLI séparé ?**
- ❓ **PAS COMPRIS** - Clarification nécessaire :
  - Question posée : "Veut-on un script CLI séparé ?"
  - Intention : Est-ce qu'on veut une commande en ligne de commande (`npm run generate-sitemap`) en plus du test ?
  - Si pas de besoin, on ne crée pas de script CLI séparé
  - Le test d'intégration suffit pour mettre à jour le JSON

**4. L'utilitaire est-il vraiment nécessaire ?**
- ❌ **NON** - L'utilitaire de génération n'est pas nécessaire
- Raison : Le test d'intégration fait déjà tout le travail nécessaire :
  - ✅ Détecte les pages
  - ✅ Détecte les liens
  - ✅ Met à jour le JSON automatiquement
  - ✅ Crée le JSON s'il n'existe pas
- **Conclusion** : L'utilitaire de génération peut être supprimé des critères d'acceptation

#### Décisions prises

1. ✅ **Le test crée le JSON s'il n'existe pas** - Scénario BDD déjà prévu
2. ✅ **Les emplacements sont toujours manuels** - Pas de valeurs par défaut, pas de génération automatique
3. ✅ **Pas d'utilitaire de génération** - Inutile car le test fait tout
4. ⚠️ **Question 3 (script CLI) à clarifier** : Aucun script CLI séparé n'est nécessaire si le test suffit

#### Implémentation attendue

- Le test détecte automatiquement toutes les pages et liens
- Le test met à jour le JSON automatiquement (ajout/suppression de pages/liens)
- Le test crée le JSON s'il n'existe pas (avec x: null, y: null pour toutes les pages)
- Le test valide que chaque page a un emplacement (x et y non null)
- Si une page n'a pas d'emplacement, le test échoue avec un message clair
- **L'humain doit ensuite remplir manuellement les emplacements dans le JSON**
