### VÃ©rification Mapping URLs - Ancien site vs Nouveau site

#### URLs de l'ancien site Ã  cloner :
1. / (home)
2. /a-propos
3. /detournement-video
4. /faisons-connaissance
5. /management-de-produit-logiciel
6. /portfolio-detournements
7. /pour_aller_plus_loin (avec underscore)
8. /site-map
9. /transformation

#### URLs actuelles du nouveau site :
1. / âœ… (home - index.json)
2. /about â“ (wiki, redirige depuis /about-site, mais l'ancien n'avait pas /about)
3. /a-propos â“ (redirection 301 vers /, mais l'ancien avait une vraie page)
4. /detournement-video âœ…
5. /faisons-connaissance âœ…
6. /management-de-produit-logiciel âœ…
7. /portfolio-detournements âœ…
8. /pour_aller_plus_loin âœ… (avec underscore comme l'ancien)
9. /site-map âœ…
10. /transformation âœ…
11. /robustesse (nouveau, n'existe pas dans l'ancien)

#### Points Ã  vÃ©rifier :
- /a-propos : Redirection 301 vers /, mais l'ancien site avait une vraie page
- /about : N'existait pas dans l'ancien site, maintenant c'est le wiki
