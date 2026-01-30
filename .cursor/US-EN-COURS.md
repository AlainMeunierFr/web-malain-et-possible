# US en cours

Une seule US à la fois. Ce fichier indique l’US en cours et **l’étape du workflow** en cours.

- **Ligne 1** (après ce bloc) : référence de l’US (ex. `US-7.11`).
- **Ligne 2** (optionnel) : titre court de l’US.
- **Ligne 3** : étape du workflow : `US` | `BDD` | `TDD-back-end` | `TDD-front-end` | (vide ou `done` quand l’US est terminée).

Si le fichier ne contient aucune référence (vide ou uniquement ce en-tête), il n’y a **aucune US en cours**.

---

## 3 commandes uniquement

1. **GO US** – Commencer une nouvelle US. L’agent **@US** prend le **contexte de la conversation** pour formuler l’US + CA. Met à jour ce fichier : référence (si connue), titre (optionnel), étape = `US`.
2. **US VALIDÉE** (ou **US COMPLÈTE**, ou **US COMPLEXE**) – Acter que l’US est validée par l’utilisateur. Met à jour ce fichier : étape = `BDD` (et référence + titre si pas encore renseignés). Aucun agent n’est invoqué ; on est prêt pour GO NEXT.
3. **GO NEXT** – Avancer d’une étape : US → BDD → TDD back-end → TDD front-end. **Avant chaque GO NEXT**, le **lead-dev** contrôle que tout a été respecté pour l’étape en cours. **Si ce n’est pas le cas** : faire itérer (redemander à l’agent ou à l’utilisateur). **Sinon** : changer l’étape dans ce fichier et passer à l’agent suivant (invoquer @BDD, @TDD-back-end ou @TDD-front-end selon l’étape suivante). À la fin (étape TDD-front-end livrée), passer l’étape à `done` ou vider le fichier pour une nouvelle US.

Ordre strict : **US** → **BDD** → **TDD-back-end** → **TDD-front-end**.

**Agents** (fichiers dans `.cursor/agents/`, nom du fichier = @ mention) : `US.md` (@US), `BDD.md` (@BDD), `TDD-back-end.md` (@TDD-back-end), `TDD-front-end.md` (@TDD-front-end), `lead-dev.md` (@lead-dev).

---

US-Assistant-Scenario
Assistant graphique construction scénario E2E
TDD-front-end
