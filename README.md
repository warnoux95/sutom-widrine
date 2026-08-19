# Sutom des widrine

Jeu de lettres en ligne (et en français) basé sur Wordle, personnalisé autour des **prénoms féminins**. Le jeu se joue à l'adresse :

**https://warnoux95.github.io/sutom-widrine/**

## Le jeu

- Le joueur doit **deviner le prénom** (9 lettres, fixe : `PHILOMENE`) en **6 essais maximum**.
- Chaque proposition doit être un **prénom féminin de 9 lettres** présent dans le dictionnaire intégré au code.
- Chaque lettre reçoit un statut coloré : **rose** (bien placée), **orange** (mal placée), **crème** (non trouvée).
- Un **chronomètre** est toujours affiché au-dessus de la grille.
- Le **classement des joueurs** (essais, meilleur temps, mot trouvé) est stocké dans un Gist privé et consultable sur [`classement.html`](https://warnoux95.github.io/sutom-widrine/classement.html), protégé par mot de passe.

## Développement local

### Prérequis

- Node.js (pour compiler le TypeScript et lancer le serveur de dev)

### Lancer

```sh
npm install
npm run start:dev     # compilation auto + serveur sur http://localhost:4200
```

Ou en production locale :

```sh
npm install
npm start
```

## Déploiement (GitHub Pages)

Le site est hébergé sur **GitHub Pages** (branche `gh-pages` du dépôt `warnoux95/sutom-widrine`).

```sh
./deploy.sh
```

Ce script compile le TypeScript, copie le contenu de `public/` dans la branche `gh-pages` et pousse avec `--force`. Après le push, le CDN peut mettre ~10 minutes à servir la nouvelle version.

> ⚠️ Le token GitHub du classement **n'est jamais déposé dans le dépôt** (GitHub le révoque). Il est chargé par la page depuis un script externe HTTPS : `https://hivtoolsresistance.com/token.js` (voir `tech.md`).

## Documentation

- `tech.md` — commandes utiles, API du Gist, classement, déploiement
- `my_game.md` — compréhension complète du projet (règles et architecture)
- `docs/MettreAJourLeDictionnaire.md` — ajouter un prénom au dictionnaire
- `docs/CreerListeMotsATrouver.md` — liste des mots à trouver (instance d'origine)
- `docs/InstallerUneInstance.md` — installer une instance

## Remerciements

- Le jeu original SUTOM, sur lequel cette instance est basée : https://sutom.nocle.fr (dictionnaire Grammalecte, remerciements à GaranceAmarante et à toutes les personnes qui contribuent).