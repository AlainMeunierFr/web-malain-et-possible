# US-5.1 : Extension des tests d'intégration pour tous les fichiers Markdown ✅ COMPLÉTÉ

## En tant que Développeur

## Je souhaite Avoir des tests d'intégration qui valident TOUS les fichiers Markdown dans "A propos de ce site"

## Afin de Détecter les erreurs de structure (H1/H2 interdits, formatage incorrect) avant qu'elles ne causent des problèmes au runtime

# Critères d'acceptation

## CA1 - Validation existante à maintenir
- Le test `aboutSiteReader.integration.test.ts` valide déjà tous les MD et détecte les H1/H2 interdits
- Cette validation doit continuer à fonctionner

## CA2 - Extension de la validation
- Vérifier que tous les fichiers MD peuvent être parsés sans erreur
- Vérifier qu'aucun fichier MD n'est vide
- Vérifier que les fichiers respectent l'encodage UTF-8
- Compter le nombre de fichiers MD validés (doit être > 0)

## CA3 - Gestion des erreurs
- Si un fichier contient un H1 ou H2 → Test échoue avec message explicite indiquant le fichier et la ligne
- Si un fichier ne peut pas être lu → Test échoue avec message explicite
- Tous les fichiers MD doivent passer la validation pour que le test soit vert

## CA4 - Couverture
- Test d'intégration existant : `tests/integration/aboutSiteReader.integration.test.ts`
- Parcours récursif de tous les sous-dossiers dans "A propos de ce site"
- Exclusion de `node_modules` et `.next`