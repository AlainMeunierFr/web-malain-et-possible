# US-3.13 : Unification des boutons avec constantes CSS ✅ COMPLÉTÉ

- **En tant que** Développeur
- **Je souhaite** Avoir des constantes CSS globales pour tous les styles de boutons
- **Afin de** Maintenir une cohérence visuelle et faciliter la maintenance

- **Critères d'acceptation** :
- **Constantes CSS** : Définition de constantes CSS dans `globals.css` avec préfixe `--Bouton*` :
  - `--BoutonCouleurFond`
  - `--BoutonCouleurTexte`
  - `--BoutonCouleurFondHover`
  - `--BoutonCouleurTexteHover`
  - `--BoutonCouleurFondActive`
  - `--BoutonCouleurTexteActive`
- **Unification** : Tous les composants de boutons utilisent ces constantes :
  - `Footer.module.css`
  - `GroupeBoutons.module.css`
  - `CallToAction.module.css`
  - `VideoDetournement.module.css`
  - `DomaineDeCompetences.module.css`
- **Inversion des états** : Les états hover et active sont inversés pour les boutons standards (hover = état actif, active = état par défaut)
- **Cohérence** : Tous les boutons du site ont maintenant le même comportement visuel
- **Maintenance** : Modification d'un style de bouton se fait en un seul endroit (dans `globals.css`)