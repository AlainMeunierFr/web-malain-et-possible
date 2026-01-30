# US-6.9 : Ajout de boutons YouTube pour certaines compétences ✅ COMPLÉTÉ

- **En tant que** visiteur du site
- **Je souhaite** pouvoir accéder à des vidéos YouTube depuis certaines compétences
- **Afin de** approfondir ma compréhension via des ressources vidéo

- **Critères d'acceptation** :

- **CA1 - Boutons YouTube ajoutés** :
  - La compétence "BDD" a un bouton "En savoir plus..." qui ouvre un lien externe vers la vidéo YouTube `https://youtu.be/vV_heigVAUo`
  - La compétence "TDD" a un bouton "En savoir plus..." qui ouvre un lien externe vers la vidéo YouTube `https://youtu.be/yiCpfd-kz3g?si=NaUgMAUsHQByLTRd`
  - La compétence "CQRS:ES" a un bouton "En savoir plus..." qui ouvre un lien externe vers la vidéo YouTube `https://youtu.be/S1V4t7SXXCU`

- **CA2 - Détection automatique des URLs externes** :
  - Le composant `DomaineDeCompetences.tsx` détecte automatiquement les URLs externes (commençant par `http://` ou `https://`)
  - Si URL externe → utilisation d'un `<a>` avec `target="_blank"` et `rel="noopener noreferrer"`
  - Si URL interne → utilisation du composant `Link` de Next.js (comportement existant)

- **CA3 - Sécurité** :
  - Tous les liens externes ont `rel="noopener noreferrer"` pour la sécurité
  - Les liens s'ouvrent dans un nouvel onglet

- **CA4 - Cohérence** :
  - Les boutons "En savoir plus..." ont le même style visuel qu'avant
  - Seul le comportement change selon le type d'URL (interne vs externe)

**Résultat attendu** :
- Les visiteurs peuvent accéder facilement aux vidéos YouTube depuis les compétences concernées
- Les liens internes continuent de fonctionner normalement avec la navigation Next.js
- Sécurité garantie pour les liens externes