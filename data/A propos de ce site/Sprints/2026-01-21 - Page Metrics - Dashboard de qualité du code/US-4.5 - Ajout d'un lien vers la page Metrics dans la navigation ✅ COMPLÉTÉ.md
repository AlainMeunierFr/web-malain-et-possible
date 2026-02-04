# US-4.5 : Ajout d'un lien vers la page Metrics dans la navigation ✅ COMPLÉTÉ

## En tant que Développeur ou Manager

## Je souhaite Accéder facilement à la page Metrics depuis n'importe quelle page du site

## Afin de Consulter les métriques sans avoir à taper l'URL manuellement

# Critères d'acceptation

## CA1 - Statut : ✅ Implémenté et validé avec tests TDD

## CA2 - Ajout d'un lien dans le footer (développeurs)
- ✅ Un bouton "Metrics" est ajouté dans le footer du site (fichier `data/footerButtons.json`)
- ✅ Le bouton est visible uniquement en environnement de développement (`process.env.NODE_ENV === 'development'`) - filtré dans `Footer.tsx`
- ✅ Le bouton redirige vers `/metrics` via la commande `cmd-Metrics` gérée dans `FooterButton.tsx`
- ✅ Icône : Metrics de lucide-react
- ✅ Tooltip : "Consulter les métriques de qualité du code"

## CA3 - Conditions d'affichage
- ✅ Le lien n'est PAS visible en production (filtré dans Footer.tsx ligne 12-14)
- ✅ Le lien est visible en développement
- ✅ Justification : La page Metrics est un outil pour l'équipe de développement, pas pour les visiteurs

## CA4 - Tests
- ✅ Test unitaire ajouté dans `tests/unit/FooterButton.test.tsx`
- ✅ Vérifie que le clic sur le bouton Metrics redirige vers `/metrics`
- ✅ TDD strict : RED → GREEN → REFACTOR respecté