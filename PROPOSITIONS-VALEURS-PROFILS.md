# Propositions de valeurs par défaut pour les profils

## Profil 1 : Produit logiciel

**Titre :** "Produit logiciel"

**Job Titles :**
- CPO - Chief Product Officer
- HOP - Head of Product
- Product Manager
- Product Owner

**Slug :** `cpo`

**Route :** `/profil/cpo`

**CV Path :** `/CV/cpo.pdf` (à créer plus tard, dans `public/CV/`)

---

## Profil 2 : Opérations

**Titre :** "Opérations"

**Job Titles :**
- COO - Chief Operation Officer
- HOO - Head of Operation
- Directeur opérationnel

**Slug :** `coo`

**Route :** `/profil/coo`

**CV Path :** `/data/CV/coo.pdf` (à créer plus tard)

---

## Profil 3 : Transformation Agile

**Titre :** "Transformation Agile"

**Job Titles :**
- Transformation Agile
- Coach Agile
- Scrum Master
- Product Owner

**Slug :** `agile`

**Route :** `/profil/agile`

**CV Path :** `/data/CV/agile.pdf` (à créer plus tard)

---

## Profil 4 : Technologie

**Titre :** "Technologie"

**Job Titles :**
- CTO - Chief Technology Officer
- HTO - Head of Technology
- Directeur Technique

**Slug :** `cto`

**Route :** `/profil/cto`

**CV Path :** `/data/CV/cto.pdf` (à créer plus tard)

---

## Structure JSON proposée pour le type "profil"

```json
{
  "type": "profil",
  "titre": "Produit logiciel",
  "jobTitles": [
    "CPO - Chief Product Officer",
    "HOP - Head of Product",
    "Product Manager",
    "Product Owner"
  ],
  "slug": "cpo",
  "route": "/profil/cpo",
  "cvPath": "/CV/cpo.pdf"
}
```
