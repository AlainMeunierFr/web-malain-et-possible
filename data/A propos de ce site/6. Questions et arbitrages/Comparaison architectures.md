### Comparaison architectures : Actuelle vs Proposée

#### STRUCTURE ACTUELLE

##### "A propos de ce site" (`aboutSiteReader.ts`)

```
AboutSiteStructure
└── chapitres: Chapitre[]
    └── nom: "2. Definition of Done (DOD)"  ← h1 (dossier)
        └── sections: Section[]
            └── nom: "1. Règles générales"  ← h2 (fichier MD)
                └── parties: Partie[]
                    └── titre: "Règles générales"  ← h3 (###)
                        ├── contenuParse: ContenuElement[]
                        └── sousParties: SousPartie[]
                            └── titre: "Tenue du Journal"  ← h4 (####)
                                ├── contenuParse: ContenuElement[]
                                └── estSpecial?: boolean  ← Attribut (pour masquer)
```

**Manque** : Niveau "Bloc" (h5 - #####)

##### Journaux (`journalMarkdownParser.ts`)

```
ParsedJournal
└── sections: JournalSection[]
    └── title: "Démarrage nouvelle journée"  ← ❌ Pas de h1/h2, directement "Partie"
        ├── content: ""                      ← Contenu libre
        └── prompts: JournalPrompt[]
            └── title: "Démarrage nouvelle journée"  ← ❌ Pas de h3, directement "Sous-partie"
                ├── text: "Nouvelle journée..."      ← ❌ Pas de structure Bloc
                └── technicalResult: "Relu les..."   ← ❌ Pas de structure Bloc
```

**Problème** : Structure plate, pas de hiérarchie h1/h2/h3/h4/h5

---

#### STRUCTURE PROPOSÉE (Votre vision)

##### Structure unifiée pour TOUS les fichiers MD

```
ParsedFolder
└── chapitres: Chapitre[]
    └── nom: "2. Definition of Done (DOD)"  ← h1 (dossier)
        └── sections: Section[]
            └── nom: "1. Règles générales"  ← h2 (fichier MD)
                └── parties: Partie[]
                    └── titre: "Règles générales"  ← h3 (###)
                        ├── contenuParse: ContenuElement[]
                        └── sousParties: SousPartie[]
                            └── titre: "Tenue du Journal"  ← h4 (####)
                                ├── contenuParse: ContenuElement[]
                                └── blocs: Bloc[]           ← ✅ NOUVEAU NIVEAU
                                    └── titre: "Journal de bord"  ← h5 (#####)
                                        ├── contenuParse: ContenuElement[]
                                        ├── estPrompt?: boolean              ← Attribut spécial
                                        ├── estResultatTechnique?: boolean   ← Attribut spécial
                                        └── estSpecial?: boolean            ← Attribut pour masquer
```

##### Pour un journal (avec attributs spéciaux)

```
ParsedFolder
└── chapitres[0]
    └── nom: "3. Journal de bord"  ← h1 (dossier)
        └── sections[0]
            └── nom: "2026-01-19"  ← h2 (fichier MD)
                └── parties[0]
                    └── titre: "Démarrage nouvelle journée"  ← h3 (###)
                        └── sousParties[0]
                            └── titre: "Démarrage nouvelle journée"  ← h4 (####)
                                └── blocs[0]
                                    └── titre: "Prompt"  ← h5 (#####)
                                        ├── estPrompt: true              ← ✅ Attribut spécial
                                        ├── estSpecial: true             ← ✅ Masquer titre
                                        └── contenuParse: [
                                                { type: 'paragraph', content: 'Nouvelle journée...' }
                                            ]
                                └── blocs[1]
                                    └── titre: "Résultat technique"  ← h5 (#####)
                                        ├── estResultatTechnique: true   ← ✅ Attribut spécial
                                        ├── estSpecial: true             ← ✅ Masquer titre
                                        └── contenuParse: [
                                                { type: 'paragraph', content: 'Relu les 5 fichiers...' }
                                            ]
```

---

#### COMPARAISON DÉTAILLÉE

| Niveau HTML | Structure proposée | "A propos" actuel | Journaux actuel |
|-------------|-------------------|-------------------|-----------------|
| **h1** | Chapitre (dossier) | ✅ Chapitre | ❌ Pas de chapitre |
| **h2** | Section (fichier MD) | ✅ Section | ❌ Pas de section (directement "Partie") |
| **h3** | Partie (###) | ✅ Partie | ❌ Pas de partie explicite |
| **h4** | Sous-partie (####) | ✅ Sous-partie | ❌ Prompt.title (mais pas structuré comme h4) |
| **h5** | Bloc (#####) | ❌ **MANQUANT** | ❌ Prompt.text/technicalResult (mais pas structuré comme h5) |
| **Attributs** | estPrompt, estResultatTechnique, estSpecial | ✅ estSpecial uniquement | ❌ Pas d'attributs structurés |

---

#### AVANTAGES STRUCTURE UNIFIÉE

##### 1. Un seul parseur MD
- `parseMarkdown()` générique
- Parse h1 → h2 → h3 → h4 → h5
- Détecte automatiquement les attributs spéciaux

##### 2. CSS uniforme
- Un seul fichier CSS pour tous les types
- Styles basés sur h1/h2/h3/h4/h5
- Styles spéciaux via attributs : `[data-est-prompt="true"]`

##### 3. Structure JSON cohérente
- Même hiérarchie pour tous les fichiers MD
- Extensible (nouveaux types de fichiers)
- Attributs comme métadonnées (comme XML)

##### 4. Version "dérivée" pour spécificités
```
parseMarkdown() → ParsedFolder (générique)
    ↓
enrichirPourJournaux(ParsedFolder) → ParsedFolder (avec estPrompt/estResultatTechnique)
```

---

#### RÉPONSE À VOS QUESTIONS

##### Est-ce que le code est actuellement construit ainsi ?

**NON** :
- ❌ Deux structures JSON différentes
- ❌ Deux parseurs différents
- ❌ "A propos" manque le niveau "Bloc" (h5)
- ❌ Journaux : structure plate, pas de hiérarchie complète
- ❌ CSS non unifié

##### Pourquoi la stratégie actuelle serait meilleure ?

**Elle ne l'est pas**. Votre proposition est meilleure car :
- ✅ Un seul parseur (DRY)
- ✅ Structure unifiée
- ✅ CSS uniforme (hiérarchie HTML)
- ✅ Attributs pour spécificités
- ✅ Extensible

---

#### RECOMMANDATION

**Adopter votre structure unifiée** pour :
- Maintenabilité (un seul parseur)
- Cohérence (même structure partout)
- CSS uniforme (hiérarchie HTML respectée)
- Extensibilité (nouveaux types de fichiers)
