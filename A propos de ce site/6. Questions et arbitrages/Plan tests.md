### Plan de correction des tests

#### Format source des journaux

Format source (AVANT ajustement) :
```markdown
##### Partie (H3)
###### Sous-partie (H4)
####### Prompt (H5)
Texte
####### Résultat technique (H5)
Texte
```

Format après ajustement :
```markdown
###### Partie (H4)
####### Sous-partie (H5)
######## Prompt (H6)
Texte
######## Résultat technique (H6)
Texte
```

#### Structure unifiée

```
ParsedJournal
└── parties: Partie[]
    └── titre: "Partie"  ← h3 (correspond à ###### après ajustement)
        └── sousParties: SousPartie[]
            └── titre: "Sous-partie"  ← h4 (correspond à ####### après ajustement)
                └── blocs: Bloc[]
                    └── titre: "Prompt"  ← h5 (correspond à ######## après ajustement)
                        ├── typeDeContenu: "Prompt"
                        └── contenuParse: [...]
```

#### Tests à corriger

Les tests utilisent `##### ` pour les sections, mais après ajustement, cela devient `###### `. Il faut adapter les tests pour utiliser la nouvelle structure `parties` au lieu de `sections`.
