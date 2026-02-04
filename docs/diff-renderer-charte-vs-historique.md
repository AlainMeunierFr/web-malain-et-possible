# Diff : DOM cible (/charte) vs Renderer historique

Ce document liste les différences entre le DOM défini dans `/charte` (référence visuelle) et le DOM produit par les composants historiques. C'est un pense-bête pour la migration.

---

## 1. HeroSection

### DOM cible (/charte)
```html
<div class="hero">
  <h1 class="contenu titre">...</h1>
  <h2 class="contenu sousTitre">...</h2>
  <p class="contenu description">
    ... avec <br /> pour sauts de ligne, <strong> pour gras ...
  </p>
  <div class="groupeBoutons" data-layout="1 column, centered">
    <a class="bouton callToAction">Discutons</a>
    <a class="lien ensavoirplus">Mes profils</a>
  </div>
</div>
```

### Renderer actuel (HeroSection.tsx)
```html
<section class="hero" data-layout="2 columns">
  <div class="heroGauche">
    <h1 class="hero titre">...</h1>
    <p class="hero sousTitre">...</p>  <!-- --st (sous-titre) au lieu de h2 -->
    <p class="hero description">...</p>
    <div class="ui-heroCtas">
      <Link class="lienInterne">Télécharger mon CV</Link>
      <Link class="bouton hero callToAction">...</Link>
    </div>
  </div>
  <div class="heroDroite">...</div>
</section>
```

### Différences à corriger
| Élément | Cible | Historique | Action |
|---------|-------|------------|--------|
| Container | `<div class="hero">` | `<section class="hero">` | Harmoniser |
| Classes titre | `contenu titre` | `hero titre` | Choisir convention |
| groupeBoutons | `data-layout="1 column, centered"` | `ui-heroCtas` | Ajouter data-layout |
| Ordre boutons | CTA puis "Mes profils" | CV puis CTA | Inverser ordre |
| Texte bouton 2 | "Mes profils" | "Télécharger mon CV" | Selon JSON |

---

## 2. Profils (BlocsProfils + ProfilContainer)

### DOM cible (/charte)
```html
<div class="listeDeProfils" data-layout="4 columns x 1 row">
  <div class="profil">
    <h2 class="profil titre">...</h2>
    <ul class="profil jobTitles">
      <li class="profil jobTitle">...</li>
    </ul>
    <a class="profil route bouton">Voir le profil</a>
    <a class="profil cvPath lien">Télécharger le CV</a>
  </div>
</div>
```

### Renderer historique (BlocsProfils.tsx)
```html
<section class="blocsProfils" data-layout="4 columns x 1 row">
  <div class="profil">
    <Link class="profil route ui-card">
      <h2 class="profil titre">...</h2>
      <ul class="profil jobTitles">...</ul>
      <span class="profil route lienInterne">...</span>
    </Link>
    <a class="profil cvPath">...</a>
  </div>
</section>
```

### Différences à corriger
| Élément | Cible | Historique | Action |
|---------|-------|------------|--------|
| Container | `listeDeProfils` | `blocsProfils` | Renommer classe |
| Bouton route | `<a class="bouton">` séparé | Dans le `<Link>` card | Restructurer |
| Lien CV | `class="lien"` | Pas de classe `lien` | Ajouter classe |

---

## 3. DomaineDeCompetences

### DOM cible (/charte)
```html
<div class="domaineDeCompetence">
  <h2 class="contenu titre">...</h2>
  <p class="contenu contenu">...</p>  <!-- marges 16% -->
  <p class="contenu auteur">...</p>   <!-- aligné à droite -->
  <div class="competences" data-layout="3 columns x 1 row">
    <div class="competence">
      <h3 class="contenu titre">...</h3>
      <div class="contenu image">
        <img src="/api/images/json/..." />  <!-- centré, 50% -->
      </div>
      <p class="contenu description">...</p>
      <p class="contenu auteur">...</p>  <!-- aligné à droite -->
      <a class="bouton lien">...</a>     <!-- centré -->
    </div>
  </div>
</div>
```

### Renderer historique (DomaineDeCompetences.tsx)
```html
<div class="domaineDeCompetence">
  <div class="header">
    <h2 class="domaineDeCompetence titre">...</h2>
    <p class="domaineDeCompetence contenu">...</p>
    <p class="domaineDeCompetence auteur">...</p>
  </div>
  <div class="competencesContainer" data-layout="3 columns x 1 row">
    <div class="competenceCard competence">
      <h3 class="competence titre">...</h3>
      <div class="competence description">...</div>
      <p class="competence auteur">...</p>
      <div class="boutonContainer">
        <Link class="lienInterne bouton competence bouton">...</Link>
      </div>
      <div class="competence image">
        <Image ... width={72} height={72} />
      </div>
    </div>
  </div>
</div>
```

### Différences à corriger
| Élément | Cible | Historique | Action |
|---------|-------|------------|--------|
| Header wrapper | Pas de wrapper (ou `detournementVideo-header`) | `<div class="header">` | Renommer pour éviter conflit avec .header du site |
| Compétences container | `competences` | `competencesContainer` | Renommer |
| Classes | `contenu titre` | `domaineDeCompetence titre` | Harmoniser |
| Ordre image | Après titre, avant description | Après bouton | Réordonner |
| Taille image | 50% du container | 72x72 fixe | CSS responsive |
| Image centrée | `align-self: center` | Non | Ajouter CSS |
| Auteur aligné | `text-align: right` | Non | Ajouter CSS |
| Bouton centré | `align-self: center` | Dans `boutonContainer` | Simplifier |

---

## 4. Témoignages

### DOM cible (/charte)
```html
<div class="temoignage">
  <div class="contenu temoin">
    <div class="contenu photo">[Photo]</div>
    <div class="contenu temoinTexte">
      <h3 class="contenu nom">...</h3>
      <p class="contenu fonction note">...</p>
    </div>
  </div>
  <div class="contenu temoignage">
    <p>...</p>
  </div>
</div>
```

### À vérifier dans Temoignages.tsx
- Structure DOM similaire ?
- Classes CSS identiques ?

---

## 5. CSS à conserver

Les styles CSS suivants ont été définis dans `content-styles.css` et doivent être conservés :

```css
/* Hero : espacement */
.hero { display: flex; flex-direction: column; gap: 1rem; }

/* Groupe de boutons : empilés et centrés */
[data-layout="1 column, centered"] { 
  display: flex; flex-direction: column; align-items: center; gap: 0.75rem; 
}

/* Domaine : marges latérales */
.domaineDeCompetence > .contenu { padding-left: 16%; padding-right: 16%; }
.domaineDeCompetence > .auteur { text-align: right; padding-right: 16%; }

/* Compétence : layout */
.competence { display: flex; flex-direction: column; gap: 0.5rem; padding: 0.75rem; }
.competence .image { align-self: center; max-width: 50%; }
.competence .auteur { text-align: right; }
.competence .bouton { align-self: center; }

/* Profil : layout pour aligner boutons */
.profil { display: flex; flex-direction: column; height: 100%; }
.profil .actions { margin-top: auto; display: flex; flex-direction: column; align-items: center; }
```

---

## Prochaines étapes

1. **Choisir une convention de nommage** : `contenu titre` vs `hero titre` vs `domaineDeCompetence titre`
2. **Migrer les composants** un par un vers le DOM cible
3. **Tester sur /charte** après chaque migration
4. **Supprimer le HTML hardcodé** de /charte une fois les composants migrés
