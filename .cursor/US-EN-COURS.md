# US en cours

Une seule US à la fois. Ce fichier indique l'US en cours et **l'étape du workflow** en cours.

- **Ligne 1** (après ce bloc) : référence de l'US (ex. `US-7.11`).
- **Ligne 2** (optionnel) : titre court de l'US.
- **Ligne 3** : étape du workflow : `US` | `BDD` | `TDD-back-end` | `TDD-front-end` | (vide ou `done` quand l'US est terminée).

Si le fichier ne contient aucune référence (vide ou uniquement ce en-tête), il n'y a **aucune US en cours**.

---

## 3 commandes uniquement

1. **GO US** – Commencer une nouvelle US. L'agent **@US** prend le **contexte de la conversation** pour formuler l'US + CA. Met à jour ce fichier : référence (si connue), titre (optionnel), étape = `US`.
2. **US VALIDÉE** (ou **US COMPLÈTE**, ou **US COMPLEXE**) – Acter que l'US est validée par l'utilisateur. Met à jour ce fichier : étape = `BDD` (et référence + titre si pas encore renseignés). Aucun agent n'est invoqué ; on est prêt pour GO NEXT.
3. **GO NEXT** – Avancer d'une étape : US → BDD → TDD back-end → TDD front-end. **C'est toujours le lead-dev qui traite GO NEXT** (demandé par l'utilisateur ou par un agent qui a livré, ex. TDD-back-end). Le lead-dev contrôle que tout a été respecté pour l'étape en cours. **Si ce n'est pas le cas** : faire itérer. **Sinon** : changer l'étape dans ce fichier et passer à l'agent suivant. **Après TDD-back-end** : étape = `TDD-front-end` (invoker @TDD-front-end), **jamais** `done`. **Après TDD-front-end** (une fois le front livré et vérifié) : étape = `done`.

Ordre strict : **US** → **BDD** → **TDD-back-end** → **TDD-front-end**.

**Agents** (fichiers dans `.cursor/agents/`, préfixe = ordre d’étape ; @ mention = champ `name` du frontmatter) : `1. Lead-dev.md` (@lead-dev), `2. US.md` (@US), `3. BDD.md` (@BDD), `4. TDD-back-end.md` (@TDD-back-end), `5. TDD-front-end.md` (@TDD-front-end).

---

US-13.1
Menu header remplaçant le logo
done
