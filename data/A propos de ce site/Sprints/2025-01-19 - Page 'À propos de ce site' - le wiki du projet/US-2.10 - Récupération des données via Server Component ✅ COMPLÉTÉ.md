# US-2.10 : Récupération des données via Server Component ✅ COMPLÉTÉ

## En tant que Système frontend

## Je souhaite Récupérer le JSON structuré depuis le backend pur via un Server Component

## Afin de Générer le HTML complet côté serveur pour le SEO et faciliter le travail des crawlers

# Critères d'acceptation

- Le Server Component (`app/about-site/page.tsx`) appelle `readAboutSiteStructure()` côté serveur
- Le JSON est généré par le backend pur (raison pédagogique d'architecture)
- Le HTML complet est généré côté serveur avec tout le contenu
- Les données sont passées au Client Component via props (pas de fetch côté client)
- L'API route (`/api/about-site`) est conservée pour debug/tests