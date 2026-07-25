# Quill

Application web de gestion de tables aléatoires pour le JDR :
consulter, tirer, importer et exporter des tables (figurants, trésors, noms…).

Local-only : les données vivent dans le navigateur (IndexedDB), pas de serveur.

## Lancer

npm install
npm run dev

## Structure

- `apps/web` — l'application (Vite + React + TS + Dexie)
- `examples/` — jeux de données au format d'import

## Commits

npm run commit    # czg, format Conventional Commits imposé par commitlint