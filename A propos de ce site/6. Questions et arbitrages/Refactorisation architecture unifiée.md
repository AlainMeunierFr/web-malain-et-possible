### Plan de refactorisation : Architecture unifiée avec typeDeContenu

#### Objectif

Unifier l'architecture avec une seule clé `typeDeContenu` (au lieu de booléens) pour tous les types de fichiers MD.

#### Nouvelle structure JSON

```
ParsedFolder
└── chapitres: Chapitre[]
    └── nom: string  ← h1 (dossier)
        └── sections: Section[]
            └── nom: string  ← h2 (fichier MD)
                └── parties: Partie[]
                    └── titre: string  ← h3 (###)
                        ├── contenuParse: ContenuElement[]
                        └── sousParties: SousPartie[]
                            └── titre: string  ← h4 (####)
                                ├── contenuParse: ContenuElement[]
                                ├── typeDeContenu?: string  ← "Prompt", "Résultat technique" (pour masquer titre)
                                └── blocs: Bloc[]  ← ✅ NOUVEAU NIVEAU
                                    └── titre: string  ← h5 (#####)
                                        ├── contenuParse: ContenuElement[]
                                        └── typeDeContenu?: string  ← "Prompt", "Résultat technique" (pour style bleu clair)
```

#### Changements

##### Interfaces

**Avant** :
```typescript
interface SousPartie {
  estSpecial?: boolean;
}

interface Bloc {
  estPrompt?: boolean;
  estResultatTechnique?: boolean;
}
```

**Après** :
```typescript
interface SousPartie {
  typeDeContenu?: string;  // "Prompt", "Résultat technique", undefined
}

interface Bloc {
  typeDeContenu?: string;  // "Prompt", "Résultat technique", undefined
}
```

##### Utilisation

- `typeDeContenu === "Prompt"` → Masquer titre (SousPartie) + Fond bleu clair (Bloc)
- `typeDeContenu === "Résultat technique"` → Masquer titre (SousPartie)
- `typeDeContenu === undefined` → Affichage normal

#### Étapes de refactorisation

1. Définir nouvelles interfaces avec `typeDeContenu`
2. Ajouter niveau `Bloc` (h5) dans `aboutSiteReader.ts`
3. Adapter parser pour détecter `typeDeContenu` ("Prompt", "Résultat technique")
4. Unifier `journalMarkdownParser.ts` avec la même structure
5. Adapter composants React pour utiliser `typeDeContenu`
6. Adapter CSS avec `[data-type-contenu="Prompt"]`
7. Mettre à jour les tests
8. Publier
