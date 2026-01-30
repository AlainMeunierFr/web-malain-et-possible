# US-7.7 : Ajouter "Faisons connaissance" dans le footer ✅ COMPLÉTÉ

- **En tant que** visiteur du site
- **Je veux** accéder rapidement à la page "Faisons connaissance" depuis le footer
- **Afin de** pouvoir prendre contact avec Alain Meunier et planifier un échange

- **Critères d'acceptation :**

- **CA1 - Bouton Calendrier dans le footer :**
  - Un bouton avec l'icône "Calendrier" est présent dans le footer
  - Le bouton est positionné à gauche du bouton "Email" (Mail)

- **CA2 - Infobulle :**
  - Au survol, une infobulle affiche "faisons connaissance"

- **CA3 - Navigation :**
  - Le clic sur le bouton redirige vers "/faisons-connaissance"

- **CA4 - Plan du site :**
  - Dans le plan du site, la page "Faisons connaissance" est dans la zone "Footer" (au lieu de "Autres")

**Résultat attendu :**
- Le bouton "Calendrier" est accessible depuis toutes les pages via le footer
- Navigation fluide vers la page de contact
- Cohérence avec les autres boutons du footer

## US-7.7 : ✅ Complétée

**Livrables :**
- ✅ Commande `FAISONS_CONNAISSANCE` ajoutée dans `constants/routes.ts`
- ✅ Mapping dans `utils/buttonHandlers.ts` pour la navigation
- ✅ Icône `Calendar` ajoutée dans `components/FooterButton.tsx`
- ✅ Bouton configuré dans `data/_footerButtons.json` avec tooltip "faisons connaissance"
- ✅ Zone "Footer" assignée à `/faisons-connaissance` dans le plan du site
- ✅ Tests unitaires créés et passent

**Résultat :**
- Le bouton "Calendrier" est présent dans le footer, à gauche du bouton "Email"
- L'infobulle "faisons connaissance" s'affiche au survol
- Le clic redirige vers "/faisons-connaissance"
- La page "Faisons connaissance" est dans la zone "Footer" dans le plan du site

---