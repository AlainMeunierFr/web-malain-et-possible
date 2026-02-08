# US-7.2 : Section HERO orientée recherche d'emploi

## En tant que visiteur/recruteur

## Je souhaite voir immédiatement que le site est orienté recherche d'emploi

## Afin de comprendre rapidement la disponibilité et les intentions d'Alain

# Critères d'acceptation

## CA1 - Scénarios BDD : Voir `tests/bdd/hero-section-recherche-emploi.feature` (20 scénarios)

## CA2 - CA1 - Section HERO principale
- La section HERO remplace le contenu actuel en haut de la page d'accueil
- Titre : "Alain Meunier"
- Sous-titre : "Je recherche un projet stimulant (CDI ou freelance)"
- Description de la valeur apportée (texte épuré, voir CA4)
- 1 bouton principal : "On discute ?" qui redirige vers `/faisons-connaissance`

## CA3 - CA2 - Nouveau type de contenu "Profil"
- Création d'un nouveau type d'élément `profil` dans le système de contenu
- Structure JSON pour un profil :
```json
{
"type": "profil",
"titre": "Titre du profil (type de mission)",
"jobTitles": ["Job Title 1", "Job Title 2", ...],
"slug": "slug-du-profil",
"route": "/profil/slug-du-profil",
"cvPath": "/data/CV/slug-du-profil.pdf"
}
```
- Le type `profil` est ajouté dans `utils/indexReader.ts`
- Nouveau composant `ProfilContainer.tsx` pour afficher un profil

## CA4 - CA3 - Containers de profils dans la HERO
- 4 containers de profils affichés dans la HERO en disposition 4x1 (4 colonnes côte à côte sur desktop)
- Chaque container affiche :
- **Titre** : Type de mission (ex: "Produit logiciel")
- **Liste de Job Titles** : Liste en plus petit pour mots-clés et adaptation aux vocables préférés des lecteurs
- **Bouton d'accès** : Bouton pour accéder à la page de profil correspondante (texte à définir)
- **Bouton CV** : Bouton "Voir mon CV" pour télécharger le CV spécifique à ce profil

- Les 4 profils avec valeurs par défaut (voir fichier PROPOSITIONS-VALEURS-PROFILS.md) :
1. **Produit logiciel** (slug: `cpo`)
- Job Titles : CPO - Chief Product Officer, HOP - Head of Product, Product Manager, Product Owner
- Route : `/profil/cpo`
- CV Path : `/data/CV/cpo.pdf`

2. **Opérations** (slug: `coo`)
- Job Titles : COO - Chief Operation Officer, HOO - Head of Operation, Directeur opérationnel
- Route : `/profil/coo`
- CV Path : `/data/CV/coo.pdf`

3. **Transformation Agile** (slug: `agile`)
- Job Titles : Transformation Agile, Coach Agile, Scrum Master, Product Owner
- Route : `/profil/agile`
- CV Path : `/data/CV/agile.pdf`

4. **Technologie** (slug: `cto`)
- Job Titles : CTO - Chief Technology Officer, HTO - Head of Technology, Directeur Technique
- Route : `/profil/cto`
- CV Path : `/data/CV/cto.pdf`

## CA5 - CA4 - Description de la valeur
- Texte épuré (version finale à valider) :
> "25 ans d'expérience à transformer des idées en produits logiciels qui génèrent de la valeur. J'ai équipé 15% des radiologues libéraux français avec mon premier produit. Passionné par la résolution de problèmes complexes, je combine rigueur technique et leadership humain. Mon parcours d'entrepreneur m'a appris que les meilleures solutions naissent de l'engagement des équipes. Je recherche un projet long terme où je pourrai contribuer à la stratégie et à la transformation des organisations."

## CA6 - CA5 - Réorganisation du contenu de la page d'accueil
- La page d'accueil (Home) ne contient que :
1. Section HERO avec les 4 containers de profils
2. CallToAction "On discute ?" (redirige vers `/faisons-connaissance`)
3. Vidéo "Mon parcours, mes transformations"
4. Texte large actuellement sous la vidéo
- Tous les domaines de compétences sont déplacés sur les sous-pages de profils (`/profil/cpo`, `/profil/coo`, `/profil/agile`, `/profil/cto`)
- Les autres éléments (témoignages, etc.) peuvent être conservés ou déplacés selon décision ultérieure

## CA7 - CA6 - Structure de dossiers
- Création du dossier `public/CV/` pour stocker les CV par profil (fichiers statiques servis par Next.js)
- Les CV seront créés plus tard (pas dans le scope de cette US)
- Les chemins dans les JSON de profils pointent vers `/CV/[slug].pdf` (ex: `/CV/cpo.pdf`)

## CA8 - CA7 - Composant React HeroSection
- Nouveau composant `HeroSection.tsx` avec :
- Affichage du titre, sous-titre et description
- Bouton "On discute ?"
- 4 containers de profils (utilisant le composant `ProfilContainer.tsx`)
- Type `hero` ajouté dans `utils/indexReader.ts`
- Intégration dans `PageContentRenderer.tsx`

## CA9 - CA8 - Design et responsive
- Respect de la charte graphique actuelle du site
- Design responsive (80% des visiteurs seront sur mobile)
- Sur desktop : disposition 4x1 (4 colonnes côte à côte, aucun profil n'a plus de valeur que les autres)
- Sur mobile : empilement vertical des containers de profils (un sous l'autre)

## CA10 - CA9 - Structure JSON de la HERO
- Nouveau type d'élément `hero` dans les JSON de pages
- Structure JSON pour la HERO :
```json
{
"type": "hero",
"titre": "Alain Meunier",
"sousTitre": "Je recherche un projet stimulant (CDI ou freelance)",
"description": "Texte de description...",
"boutonPrincipal": {
"texte": "On discute ?",
"action": "/faisons-connaissance"
},
"profils": [
{ "type": "profil", "titre": "...", "jobTitles": [...], "slug": "...", "route": "...", "cvPath": "..." },
...
]
}
```