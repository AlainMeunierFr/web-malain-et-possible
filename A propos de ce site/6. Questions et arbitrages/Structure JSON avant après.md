### Structure JSON Avant et Après le changement de format

#### ANCIEN FORMAT (avant correction du format)

##### Markdown source
```markdown
#### Création du site

##### Création du projet Next.js
####### Prompt
Affiche "Hello World"
####### Résultat technique
Création du projet Next.js
```

##### Après ajustement des niveaux (dans journalReader)
```markdown
##### Création du site          ← H3 (était H2)

###### Création du projet Next.js  ← H4 (était H3)
######## Prompt                      ← H6 (était H5)
Affiche "Hello World"
######## Résultat technique          ← H6 (était H5)
Création du projet Next.js
```

##### Structure JSON générée
```
ParsedJournal
└── sections: JournalSection[]
    └── [0]
        ├── title: "Création du site"          ← H3 après ajustement (était H2 source)
        ├── content: ""                        ← Contenu libre (vide ici)
        └── prompts: JournalPrompt[]
            └── [0]
                ├── title: "Création du projet Next.js"  ← H4 après ajustement (était H3 source)
                ├── text: "Affiche \"Hello World\""      ← Contenu après "######## Prompt"
                └── technicalResult: "Création du projet Next.js"  ← Contenu après "######## Résultat technique"
```

##### Affichage dans MarkdownRenderer
```
<h3>Création du site</h3>              ← Section affichée (pertinente)
<h4>Création du projet Next.js</h4>    ← Titre de prompt
<Prompt>Affiche "Hello World"</Prompt>
<TechnicalResult>Création du projet Next.js</TechnicalResult>
```

---

#### NOUVEAU FORMAT (après correction du format)

##### Markdown source
```markdown
##### Création du site

###### Création du projet Next.js
####### Prompt
Affiche "Hello World"
####### Résultat technique
Création du projet Next.js
```

##### Après ajustement des niveaux (dans journalReader)
```markdown
###### Création du site               ← H4 (était H3 source) - "Partie"

####### Création du projet Next.js     ← H5 (était H4 source) - "Sous-partie"
######## Prompt                         ← H6 (était H5 source)
Affiche "Hello World"
######## Résultat technique             ← H6 (était H5 source)
Création du projet Next.js
```

##### Structure JSON générée
```
ParsedJournal
└── sections: JournalSection[]
    └── [0]
        ├── title: "Création du site"          ← H4 après ajustement (était H3 source) - "Partie"
        ├── content: ""                        ← Contenu libre (vide ici)
        └── prompts: JournalPrompt[]
            └── [0]
                ├── title: "Création du projet Next.js"  ← H5 après ajustement (était H4 source) - "Sous-partie"
                ├── text: "Affiche \"Hello World\""      ← Contenu après "######## Prompt"
                └── technicalResult: "Création du projet Next.js"  ← Contenu après "######## Résultat technique"
```

##### Affichage actuel dans MarkdownRenderer (PROBLÈME)
```
<h3>Création du site</h3>              ← ❌ "Partie" affichée (pas pertinente, c'est juste un conteneur)
<h4>Création du projet Next.js</h4>    ← ✅ Titre de prompt
<Prompt>Affiche "Hello World"</Prompt>
<TechnicalResult>Création du projet Next.js</TechnicalResult>
```

##### Affichage souhaité dans MarkdownRenderer (CORRIGÉ)
```
<h4>Création du projet Next.js</h4>    ← ✅ Titre de prompt (sans la "Partie")
<Prompt>Affiche "Hello World"</Prompt>
<TechnicalResult>Création du projet Next.js</TechnicalResult>
```

---

#### COMPARAISON

##### Structure JSON
**Identique** : La structure JSON (`ParsedJournal` → `JournalSection[]` → `JournalPrompt[]`) n'a pas changé.

**Différence sémantique** :
- **Avant** : `section.title` = vraie section du journal (ex: "Création du site")
- **Maintenant** : `section.title` = "Partie" = conteneur logique pour regrouper les prompts (ex: "Création du site")

##### Parser
**Changement détection** :
- **Avant** : Sections détectées à `##### ` (H3 après ajustement)
- **Maintenant** : Sections détectées à `###### ` (H4 après ajustement)

##### Affichage
**Changement nécessaire** :
- **Avant** : Afficher `section.title` était pertinent
- **Maintenant** : Ne PAS afficher `section.title` car c'est juste un conteneur logique

---

#### CONCLUSION

**Le JSON a la même structure** mais la sémantique de `section.title` a changé :
- **Avant** : `section.title` = élément à afficher
- **Maintenant** : `section.title` = métadonnée de structure (pas à afficher)

**La correction** : Supprimer l'affichage de `section.title` dans `MarkdownRenderer.tsx` (lignes 23-28)
