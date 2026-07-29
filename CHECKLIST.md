# Quill — Checklist de développement

App web local-only de gestion de tables aléatoires pour JDR.
**Stack** : Vite + React + TypeScript + Dexie (IndexedDB). Pas de serveur.

> Convention : `[ ]` à faire, `[x]` fait. Les ⭐ sont les jalons — des points où l'app tourne vraiment. Les 💬 signalent les étapes où tu peux me redemander le détail.

---

## Phase 0 — Décider et spécifier

Avant toute ligne de code. Objectif : ne plus avoir à réfléchir pendant que tu codes.

- [X] Écrire `examples/figurants.md` à la main (~15 entrées)
  - titre de la table en `#`, entrées en `- `
  - ce fichier est à la fois **la spec du format d'import** et **la fixture des tests**
- [X] Décider du nom des concepts en anglais dans le code : `RollTable`, `Entry`, `roll`
  - un seul vocabulaire, partout : code, commits, UI
- [ ] Lister à la main 3 écrans max : Accueil (liste des tables) / Détail table / Import
  - un croquis papier suffit, mais fais-le

---

## Phase 1 — Socle du projet

- [x] git initialisé, `.gitignore`
- [x] czg + commitlint + husky (hook `commit-msg`)
- [x] Mettre à jour les scopes dans `commitlint.config.js` :
      `['tables', 'entries', 'roll', 'import', 'export', 'db', 'ui', 'deps']`
- [x] `npm create vite@latest . -- --template react-ts`
- [x] Vérifier que `npm run dev` affiche la page Vite par défaut
- [x] Prettier + ESLint 💬
- [x] `lint-staged` sur un hook `pre-commit` 💬
- [x] `README.md` : 3 lignes — ce que fait l'app, comment la lancer
- [x] Nettoyer le boilerplate Vite (logos, CSS de démo)
- [x] **Commit** : `chore: initialise le projet vite + react + ts`

---

## Phase 2 — Apprendre Dexie (sans construire l'app)

Étape volontairement séparée. Tu ne veux pas découvrir Dexie *et* designer ton app
en même temps — ce sont deux difficultés distinctes.

- [x] `npm install dexie dexie-react-hooks`
- [x] Créer `src/db.ts` avec les deux stores (`rollTables`, `entries`) 💬
  - ⚠️ ne pas nommer un store `tables` : collision avec `Dexie.tables`
  - la string dans `.stores()` ne liste que **les index**, pas tous les champs
- [x] Ouvrir l'onglet **Application > IndexedDB** des devtools et repérer la base `quill`
  - garde-le ouvert pendant tout le projet, c'est ton meilleur outil de debug
- [x] Dans un composant jetable, faire tourner les 4 opérations à la main :
  - [ ] `db.rollTables.add({...})` → vérifier dans les devtools
  - [ ] `db.rollTables.toArray()` → afficher dans la console
  - [ ] `db.entries.where('tableId').equals(1).toArray()` → la requête indexée
  - [ ] `db.rollTables.delete(id)`
- [x] Remplacer la lecture par `useLiveQuery()` et constater la réactivité automatique
- [x] Écrire `src/seed.ts` : insère 2 tables de démo si la base est vide
- [x] Ajouter un bouton temporaire « reset base » (`db.delete()` puis reload) — tu vas t'en servir souvent
- [ ] **Commit** : `feat(db): met en place le schéma dexie et le seed`

---

## Phase 3 — Bout en bout ⭐

Le jalon qui compte. Tant qu'il n'est pas franchi, l'architecture est théorique.

- [ ] Routing minimal 💬 (React Router, ou un simple `useState` sur 2 vues — suffisant au début)
- [ ] Écran **Accueil** : liste des tables du seed
- [ ] Clic sur une table → écran **Détail** : nom + liste des entrées
- [ ] Bouton retour
- [ ] ⭐ **JALON : une table du seed s'affiche dans le navigateur**
- [ ] **Commit** : `feat(tables): affiche la liste et le détail des tables`

---

## Phase 4 — Le cœur métier : le tirage

C'est la fonctionnalité pour laquelle l'app existe. Elle mérite d'être soignée.

- [ ] `src/lib/roll.ts` — fonction pure, sans React, sans Dexie 💬
  - [ ] tirer 1 élément
  - [ ] tirer N éléments **sans remise** (le cas par défaut : pas deux fois le même figurant)
  - [ ] option **avec remise**
  - [ ] gérer `weight` (entrées plus ou moins rares)
  - [ ] cas limites : table vide, N > nombre d'entrées
- [ ] Test unitaire de `roll.ts` 💬 (fonction pure = test facile, et c'est la logique la plus critique)
- [ ] UI : sélecteur du nombre de résultats + bouton « Tirer »
- [ ] Affichage du résultat, bien lisible (c'est ce que tu regardes en jeu)
- [ ] Bouton « Relancer »
- [ ] Historique des derniers tirages (en mémoire, pas besoin de le persister)
- [ ] **Commit** : `feat(roll): tirage aléatoire avec et sans remise`

---

## Phase 5 — CRUD

- [ ] Ajouter une entrée à une table
- [ ] Supprimer une entrée
- [ ] Éditer le texte d'une entrée
- [ ] Créer une table vide
- [ ] Renommer une table
- [ ] Supprimer une table — **avec confirmation** et suppression des entrées liées 💬
  - pas de contrainte de clé étrangère en IndexedDB : à faire à la main, dans une transaction
- [ ] **Commit** : `feat(entries): ajout, édition et suppression des entrées`

---

## Phase 6 — Import / Export ⭐

L'export n'est pas un confort : en local-only, c'est **ta seule sauvegarde**.

- [ ] `src/lib/parseMarkdown.ts` — fonction pure `string → { name, entries }` 💬
- [ ] Tests unitaires avec `examples/figurants.md` et le fichier tordu de la phase 0
- [ ] UI d'import : coller du texte **et** déposer un fichier
- [ ] Prévisualisation avant validation (nombre d'entrées détectées)
- [ ] `src/lib/toMarkdown.ts` — l'inverse, quasi gratuit
- [ ] Export d'une table → téléchargement `.md`
- [ ] Export **de tout** → un fichier de sauvegarde
- [ ] Appeler `navigator.storage.persist()` au démarrage 💬
  - demande au navigateur de ne pas évincer les données
- [ ] Vérifier le cycle complet : export → reset base → import → données identiques
- [ ] ⭐ **JALON : tes vraies tables sont dans l'app, et sauvegardables**
- [ ] **Commit** : `feat(import): import et export markdown`

---

## Phase 7 — Utilisable au quotidien

À ce stade, utilise l'app en vrai pendant une session de jeu. Note ce qui manque.
Cette liste est indicative — la tienne sera meilleure.

- [ ] Recherche / filtre sur la liste des tables
- [ ] Raccourci clavier pour relancer un tirage (espace ?)
- [ ] Tri des tables (nom, date, usage récent)
- [ ] Soigner l'affichage mobile (c'est là que tu l'utiliseras)
- [ ] Gérer les états vides (aucune table, table sans entrée)
- [ ] Thème sombre (une table de jeu est souvent peu éclairée)

---

## Phase 8 — PWA

Quand tu veux l'avoir sur ton téléphone.

- [ ] `npm install -D vite-plugin-pwa` 💬
- [ ] Manifeste : nom, couleurs, icônes 192 et 512
- [ ] Vérifier le fonctionnement hors ligne (mode avion)
- [ ] Déployer sur Vercel / Netlify / Cloudflare Pages 💬
- [ ] Installer sur le téléphone via « Ajouter à l'écran d'accueil »
- [ ] ⭐ **JALON : l'app tourne hors ligne sur ton téléphone**

---

## Plus tard (à ne pas faire maintenant)

Idées à garder au chaud. Elles sont ici pour sortir de ta tête, pas pour être faites.

- Tables imbriquées : une entrée qui renvoie vers une autre table
- Templates : « un {métier} nommé {prénom} qui {trait} »
- Tirage multi-tables en un clic (générer un PNJ complet)
- Tags et catégories
- Favoris / tables épinglées
- Sync multi-appareils → nécessite un backend, c'est un autre projet
- Migration vers Tauri → seulement si une limite concrète du navigateur te bloque

---

## Rappels

**L'ordre des phases 4 à 7 n'est pas sacré.** Fais d'abord ce qui te donne envie d'ouvrir l'éditeur le lendemain. En solo, la motivation est la ressource rare.

**Commite souvent, petit.** Le hook `commit-msg` te force déjà au bon format.

**Les fonctions pures d'abord** (`roll.ts`, `parseMarkdown.ts`). Elles se testent facilement, elles ne dépendent ni de React ni de Dexie, et ce sont elles qui contiennent la vraie valeur de l'app.

**Le piège du projet solo** : que le setup devienne le projet. Si tu hésites entre coder une fonctionnalité et ajouter un outil, code la fonctionnalité.
