/**
 * API Route : Contenu complet d'une US du sprint en cours (US-11.6).
 * GET /api/sprint-board/us/[usId]
 * Retourne { id, titre, content } (content = markdown brut) ou 404.
 */

import { NextResponse } from 'next/server';
import { readUsContent } from '../../../../../utils/server';

/** Contenu de l'US fictive affichée quand toutes les US sont terminées */
const MOCK_US_CONTENT = {
  id: 'US-9000.0',
  titre: 'Prendre un café bien mérité ☕',
  content: `**En tant que** binôme humain-IA performant

**Je souhaite** célébrer cette productivité exceptionnelle

**Afin de** prouver que TDD + IA = vélocité maximale 🚀

---

# Critères d'acceptation

### CA1 - Le sprint est terminé
- [x] Toutes les US ont été livrées
- [x] Le board Kanban affiche uniquement des cartes dans "Fait"
- [x] Le Lead Dev peut enfin respirer

### CA2 - La qualité est au rendez-vous
- [x] Cycle TDD respecté : RED → GREEN → REFACTOR
- [x] Couverture de tests > 80%
- [x] Pas de code sans test
- [x] Principes SOLID appliqués

### CA3 - Le processus a été suivi
- [x] User Stories validées avant développement
- [x] Scénarios BDD écrits en français
- [x] Revue de code effectuée à chaque étape
- [x] Journal de bord mis à jour

### CA4 - La célébration peut commencer
- [ ] ☕ Café préparé
- [ ] 🎉 Moment de satisfaction savouré
- [ ] 📋 Prochaine US identifiée (ou pas, c'est les vacances)

---

*Cette US fictive apparaît quand le backlog est vide. Bravo !*
`,
};

export async function GET(
  _request: Request,
  context: { params: Promise<{ usId: string }> }
) {
  const { usId } = await context.params;
  if (!usId || !/^US-\d+\.\d+$/i.test(usId)) {
    return NextResponse.json(
      { error: 'Paramètre usId invalide (attendu US-X.Y)' },
      { status: 400 }
    );
  }
  
  // Cas spécial : US fictive quand toutes les US sont terminées
  if (usId === 'US-9000.0') {
    return NextResponse.json(MOCK_US_CONTENT);
  }
  
  const data = readUsContent(usId);
  if (!data) {
    return NextResponse.json(
      { error: 'US introuvable', id: usId },
      { status: 404 }
    );
  }
  return NextResponse.json(data);
}
