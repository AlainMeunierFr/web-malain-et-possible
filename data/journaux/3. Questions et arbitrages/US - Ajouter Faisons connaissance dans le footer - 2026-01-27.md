# US - Ajouter "Faisons connaissance" dans le footer

## User Story

**En tant que** visiteur du site  
**Je veux** accéder rapidement à la page "Faisons connaissance" depuis le footer  
**Afin de** pouvoir prendre contact avec Alain Meunier et planifier un échange

## Contexte

La page "Faisons connaissance" permet aux visiteurs de prendre contact avec Alain Meunier. Actuellement, cette page n'est accessible que via des liens dans le contenu des pages. L'ajouter dans le footer la rendra accessible depuis toutes les pages du site.

## Critères d'acceptation

1. ✅ Un bouton avec l'icône "Calendrier" est présent dans le footer
2. ✅ Le bouton est positionné à gauche du bouton "Email" (Mail)
3. ✅ Au survol, une infobulle affiche "faisons connaissance"
4. ✅ Le clic sur le bouton redirige vers "/faisons-connaissance"
5. ✅ Dans le plan du site, la page "Faisons connaissance" est dans la zone "Footer" (au lieu de "Autres")

## Scénarios BDD (Gherkin)

```gherkin
Fonctionnalité: Accès à "Faisons connaissance" depuis le footer
  En tant que visiteur du site
  Je veux accéder à la page "Faisons connaissance" depuis le footer
  Afin de prendre contact avec Alain Meunier

  Scénario: Affichage du bouton Calendrier dans le footer
    Étant donné que je suis sur n'importe quelle page du site
    Quand je regarde le footer
    Alors je vois un bouton avec l'icône "Calendrier"
    Et le bouton est positionné à gauche du bouton "Email"

  Scénario: Infobulle au survol du bouton Calendrier
    Étant donné que je suis sur n'importe quelle page du site
    Quand je survole le bouton "Calendrier" dans le footer
    Alors une infobulle affiche "faisons connaissance"

  Scénario: Navigation vers "Faisons connaissance"
    Étant donné que je suis sur n'importe quelle page du site
    Quand je clique sur le bouton "Calendrier" dans le footer
    Alors je suis redirigé vers la page "/faisons-connaissance"

  Scénario: Zone Footer dans le plan du site
    Étant donné que le plan du site est généré
    Quand je consulte le plan du site
    Alors la page "Faisons connaissance" est dans la zone "Footer"
```

## Plan d'action technique

### 1. Back-End (Logique métier)

#### 1.1. Ajouter la commande dans les constantes
- **Fichier** : `constants/routes.ts`
- **Action** : Ajouter `FAISONS_CONNAISSANCE: 'cmd-FaisonsConnaissance'` dans `COMMANDS`

#### 1.2. Ajouter la route dans buttonHandlers
- **Fichier** : `utils/buttonHandlers.ts`
- **Action** : Ajouter le mapping `[COMMANDS.FAISONS_CONNAISSANCE]: ROUTES.FAISONS_CONNAISSANCE` dans `commandToRouteMap`

### 2. Front-End (Composants React)

#### 2.1. Ajouter l'icône Calendar dans FooterButton
- **Fichier** : `components/FooterButton.tsx`
- **Action** : 
  - Importer `Calendar` depuis `lucide-react`
  - Ajouter `Calendar` dans `iconMap` avec la clé `"Calendar"`

#### 2.2. Ajouter le bouton dans le JSON de configuration
- **Fichier** : `data/_footerButtons.json`
- **Action** : 
  - Ajouter un nouvel objet bouton avec :
    - `id: "calendar"`
    - `icone: "Calendar"`
    - `command: "cmd-FaisonsConnaissance"`
    - `url: null`
    - `tooltip: "faisons connaissance"`
    - `e2eID: "b9"` (ou le prochain ID disponible)
  - Placer ce bouton **avant** le bouton `email` (premier élément du tableau)

### 3. Plan du site

#### 3.1. Mettre à jour la zone dans siteMapGenerator
- **Fichier** : `utils/siteMapGenerator.ts`
- **Action** : Modifier la logique d'assignation de zone pour que `/faisons-connaissance` soit assigné à `'Footer'` au lieu de `'Autres'`

#### 3.2. Régénérer le plan du site
- **Action** : Exécuter `npx tsx scripts/update-site-map.ts` pour mettre à jour `_Pages-Et-Lien.json`

### 4. Tests

#### 4.1. Tests unitaires FooterButton
- **Fichier** : `tests/unit/FooterButton.test.tsx`
- **Action** : Ajouter un test pour vérifier que l'icône Calendar est rendue correctement

#### 4.2. Tests unitaires buttonHandlers
- **Fichier** : `tests/unit/buttonHandlers.test.ts`
- **Action** : Ajouter un test pour vérifier que `cmd-FaisonsConnaissance` retourne `/faisons-connaissance`

#### 4.3. Tests d'intégration plan du site
- **Fichier** : `tests/integration/siteMapGenerator.integration.test.ts`
- **Action** : Vérifier que `/faisons-connaissance` a la zone `'Footer'`

## Notes techniques

- L'icône "Calendar" de Lucide React est déjà disponible dans le package
- Le système de tooltip utilise l'attribut HTML `title` (déjà implémenté dans `FooterButton.tsx`)
- L'ordre des boutons dans le JSON détermine l'ordre d'affichage dans le footer
- Le e2eID doit être unique et suivre la séquence existante (b9, b10, b11, etc.)
