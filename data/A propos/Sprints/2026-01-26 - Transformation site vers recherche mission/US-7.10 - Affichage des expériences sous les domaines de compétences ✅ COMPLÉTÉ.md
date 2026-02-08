# US-7.10 : Affichage des expériences sous les domaines de compétences

## En tant que visiteur/recruteur

## Je souhaite consulter les expériences et apprentissages associés à chaque domaine de compétence

## Afin de disposer de preuves concrètes des compétences prétendues et mieux comprendre l'expérience d'Alain

# Critères d'acceptation

## CA1 - CA1 - Fichier de données expériences
- Le fichier `data/bibliotheque/experienceEtApprentissage.json` existe déjà
- Structure avec IDs numériques uniques pour chaque élément
- Chaque élément contient : `id`, `type`, `titre`, `description`, `periode`
- Types supportés : "Expériences et apprentissages", "Formations et certifications", "Engagements et Pro Bono", "Réalisations notables"

## CA2 - CA2 - Association expériences aux domaines
- Le fichier `data/bibliotheque/domaines.json` contient un champ `experiences` (tableau d'IDs) pour chaque domaine
- Les domaines référencent les expériences via leurs IDs numériques
- Une expérience peut être associée à plusieurs domaines (relation many-to-many)

## CA3 - CA3 - Intégration dans le JSON exposé
- La méthode dans `utils/` qui expose les domaines (via `readDomaines()` et `resolvePageReferences()`) charge et inclut les expériences associées
- Les expériences sont intégrées dans le JSON qui permet de construire les pages web
- Le format JSON final contient les expériences pour chaque domaine résolu

## CA4 - CA4 - Modification du render pour affichage
- Le composant `DomaineDeCompetences.tsx` est modifié pour afficher les expériences
- Les expériences s'affichent sous le bloc contenant les 3 compétences
- Les expériences s'affichent dans toute la largeur du container "Domaine de compétences"

## CA5 - CA5 - Nouveau style CSS "Expérience"
- Création d'un nouveau style CSS pour les expériences
- **Police** : un peu plus petite que les autres textes
- **Format** : texte à puces (liste)
- **Date** : en italique et entre crochets `[date]`
- **Titre** : en gras
- **Description** : en normal (texte régulier)

## CA6 - CA6 - Structure d'affichage
- Les expériences sont groupées par type si nécessaire
- Chaque expérience affiche : `[periode]` **titre** - description
- Format de liste à puces pour toutes les expériences d'un domaine

## CA7 - CA7 - Gestion des cas limites
- Si un domaine n'a pas d'expériences associées, rien n'est affiché (pas de section vide)
- Si une expérience référencée n'existe pas dans le fichier, elle est ignorée (pas d'erreur)
- Les périodes null ou vides sont gérées (affichage sans date si absente)

**Résultat attendu :**
- Chaque domaine de compétence affiche ses expériences associées sous les 3 compétences
- Les expériences sont présentées de manière lisible avec dates, titres en gras et descriptions
- Preuve concrète des compétences pour renforcer la crédibilité auprès des recruteurs