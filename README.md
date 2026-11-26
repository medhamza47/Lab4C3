# Lab 4 — Signals et cycle de vie

Avec Node.js 22 (22.12 ou plus récent sur cette version majeure), exécuter `npm install`, puis `npm start`. Ouvrir http://localhost:4200.

## Réflexion

Un signal représente une valeur actuelle et synchronise le template. Un Observable représente un flux dans le temps. Le flux de recherche utilise le délai de RxJS puis met à jour un signal, qui recalculera la liste filtrée.

Le service expose un signal en lecture seule et produit de nouveaux tableaux lors des mutations. Les valeurs calculées dérivent de cette liste. L’effet journalise les changements. `takeUntilDestroyed` coupe automatiquement l’abonnement quand le composant est détruit.
