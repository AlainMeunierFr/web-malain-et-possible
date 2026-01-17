# Journal de bord - Documentation

Ce dossier contient :
- **Les journaux de bord quotidiens** : Un fichier par jour au format `YYYY-MM-DD.md`
- **Les cours/formations** : Dans le sous-dossier `COURS/`

## Structure

```
JOURNAL_DE_BORD/
├── README.md (ce fichier)
├── YYYY-MM-DD.md (journal du jour)
├── YYYY-MM-DD.md (journal d'un autre jour)
└── COURS/
    ├── FORMATION_GIT.md
    └── ... (autres cours)
```

## Format des journaux quotidiens

Chaque fichier journal contient :
- **Total des prompts** : Nombre de prompts de la journée
- **Principales réalisations** : Liste des accomplissements majeurs
- **Les prompts** : Tous les prompts dans l'ordre chronologique avec :
  - Le texte exact du prompt
  - Le résultat technique (ce qui a été fait)

## Format des cours

Les cours sont des documents pédagogiques en Markdown qui expliquent :
- Les concepts théoriques
- Les pratiques
- Les exemples pratiques
- Les ressources supplémentaires

## Processus automatique

À chaque prompt :
1. Vérification de l'existence du fichier journal du jour
2. Création du fichier si nécessaire (`YYYY-MM-DD.md`)
3. Ajout du prompt dans le journal avec le format standard

À chaque question théorique/formation :
1. Création du dossier `COURS/` si nécessaire
2. Création d'un fichier dans `COURS/` avec le contenu pédagogique
