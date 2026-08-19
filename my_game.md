# Mon jeu — SUTOM / Sutom des widrine (compréhension du projet)

Ce document résume ma compréhension du jeu, aussi bien côté **règles** (ce que vit le joueur) que côté **technique** (comment le code fonctionne).

---

## 1. Le jeu : vue d'ensemble

SUTOM est un **jeu de lettres en ligne, en français**, du même type que Wordle.
Dans cette version, le titre affiché est **Sutom des widrine** et le jeu a été personnalisé autour des **prénoms féminins**.

Le jeu est **100 % statique** : il est déployé sur **GitHub Pages** (branche `gh-pages` du dépôt `warnoux95/sutom-widrine`) et se joue entièrement dans le navigateur, **sans serveur Node**. La logique est écrite en **TypeScript** (dossier `ts/`), compilée en JavaScript (dossier `public/js/`).

Le déploiement se fait via le script `deploy.sh` (compile le TS, copie `public/` dans une branche `gh-pages` et pousse avec `--force`).

---

## 2. Les règles du jeu

### Objectif

- Le joueur doit **deviner le prénom** : `PHILOMENE`.
- Il dispose de **6 essais maximum** (la grille a 6 lignes).
- Le nombre de lettres disponible est de **9 lettres**.

### Comment on joue

- On **saisit un prénom** avec le clavier à l'écran (AZERTY, BÉPO, QWERTY ou QWERTZ) ou avec le clavier physique.
- Une touche **⌫** efface la dernière lettre, la touche **↲** valide le mot.
- Chaque proposition doit être un **prénom présent dans le dictionnaire intégré au code** (prénoms féminins de 9 lettres), de la bonne longueur. Sinon, un message s'affiche (« Ce mot n'est pas dans notre dictionnaire. », « Le mot proposé est trop court. », « Votre mot ne doit contenir que des lettres. »).

### Les couleurs (retour visuel)

Après chaque proposition, chaque lettre reçoit un statut (thème pastel par défaut) :

| Statut | Couleur | Signification |
|---|---|---|
| 🟥 **Bien placée** | rose (`#db4482`) | La lettre est dans le mot **et à la bonne position** |
| 🟡 **Mal placée** | orange (`#ffaa3c`) | La lettre est dans le mot **mais à une autre position** |
| 🟦 **Non trouvée** | crème | La lettre **n'est pas** dans le mot |

- Les **lettres en double** sont gérées correctement (l'algorithme d'analyse compte les occurrences).
- Les accents sont ignorés : les mots sont « nettoyés » (accents supprimés, passage en majuscules) avant analyse.

### Fin de partie

- **Victoire** : quand les 9 lettres sont toutes bien placées → panneau « Félicitations », avec éventuellement une description du prénom (PHILOMENE en a une).
- **Défaite** : après 6 propositions sans trouver → panneau « Perdu » avec un bouton **Rejouer**.
- Le panneau de fin affiche :
  - le **résumé en emojis** (`#SUTOM #numéro X/6` + grille colorée).

### Règles supplémentaires

- Un **chronomètre** démarre au début de la partie et est **toujours affiché au-dessus de la grille** (l'option « Afficher le temps sur le résumé » ne concerne que l'ajout du temps dans le résumé partagé).
- Au démarrage, une **popup** demande le **pseudo du joueur** et explique les règles du jeu : le champ pseudo est obligatoire pour démarrer (il sert de clé dans le classement).

---

## 3. Architecture technique

### Les dossiers

| Dossier | Rôle |
|---|---|
| `ts/` | Code source TypeScript (client + serveur de dev) |
| `public/` | Fichiers servis sur GitHub Pages : HTML, CSS, JS compilé, sons, icônes, polices |
| `public/js/` | Sortie de compilation TypeScript (`tsconfig.json` : `outDir: public/js/`) |
| `public/mots/` | Mots du jour horodatés (base64) pour l'instance d'origine — non utilisé ici (mot fixe) |
| `docs/` | Documentation (installation, dictionnaire, liste des mots) |

> ⚠️ Les anciens dossiers `data/`, `utils/`, `public/serveur/` et `public/statique/` ont été **supprimés** : le dictionnaire est intégré au code et le déploiement est uniquement GitHub Pages.

### Le thème Pastel (défaut)

- Le jeu démarre en **thème Pastel « rose poudré »** (fond pêche dégradé + bulles flottantes, grille crème arrondie, clavier pastel, panneaux verre dépoli) : ambiance douce, féminine et enfantine.
- **La modal (panneaux Règles, configuration, fin de partie) est en « velours foncé »** : dégradé rose sombre (`#8e3b5e → #641f40`), bordure claire, ombre portée, et **texte blanc** partout.
- Le thème est **configurable** (panneau ⚙️) : Pastel (défaut), Sombre, Clair, Sombre (Accessible), Clair (Accessible).
- La classe CSS `pastel-ambiance` est posée sur le `<body>` par `ThemeManager.changerCouleur` **et dès le chargement** (`body class="pastel-ambiance"` dans `index.html`), ce qui évite le flash de la grille bleue (FOUC) avant même que le JS soit chargé.

### L'en-tête (afficheur)

- L'en-tête ne contient que le **bouton « ℹ️ Afficher les règles »** et le titre **Sutom des widrine** : les boutons **statistiques**, **son** et **configuration** ont été retirés du header.
- Les modules `audioPanel.ts`, `configurationPanel.ts` et `finDePartiePanel.ts` sont désormais **tolérants à l'absence de leur bouton** (`| null` + `?.`) : le son, la config et le résumé de fin de partie restent fonctionnels, seuls les raccourcis ont disparu.

### Démarrage

- En local : `npm install` puis `npm run start:dev` (compilation auto + serveur Express sur le port 4200), ou `npm start` (production).
- `tsconfig.json` : cible ES5, module UMD, `sourceMap`, `strict`.
- **En production (GitHub Pages)** : `./deploy.sh` compile le TS, recopie la version statique de `gistDatabase.js` et pousse le dossier `public/` sur la branche `gh-pages`.

### Le serveur (`ts/server.ts`) — développement local uniquement

- Serveur Express sur le port `4200` (ou `SUTOM_PORT`) — **servi uniquement en local**, pas sur GitHub Pages.
- Sert les fichiers statiques (`public/`, `js`).
- **Proxy `/api/gist-file`** : relais vers l'API GitHub Gists (GET/PATCH) pour lire/écrire des fichiers du Gist sans problème de CORS.
- Le token GitHub et l'identifiant du Gist sont **en dur dans ce fichier** (constantes `GIST_TOKEN` / `GIST_ID`) : le navigateur ne les connaît jamais.
- Les anciennes routes `POST /api/classement` et `/api/classement/reset` (mot de passe côté serveur) ont été **supprimées** : le classement est désormais géré en **statique** (voir « Le classement » plus bas).

### Le flux de jeu (`ts/gestionnaire.ts`)

1. Au chargement : on demande le pseudo du joueur dans une popup. Le joueur saisit son pseudo et clique sur Valider.
2. Le mot à deviner est toujours le **même mot : PHILOMENE** (en dur dans `Dictionnaire.getMot()`).
3. On construit la grille (6 lignes × 9 lettres) et le clavier.
4. **Le panneau des règles est TOUJOURS affiché au démarrage** (il demande le pseudo et explique les règles). À sa fermeture via « Valider » :
   - le pseudo saisi déclenche toute l'initialisation (`demarrerAvecPseudo`) : `Sauvegardeur.prenomCourant = pseudo`, configuration et stats par défaut (session uniquement), création de la grille et du clavier, démarrage du chrono.
5. À chaque validation : `verifierMot()` nettoie le mot, vérifie la longueur, vérifie qu'il est dans le dictionnaire (`estMotValide`), puis analyse les lettres (`analyserMot`) et met à jour la grille, le clavier, et la sauvegarde. La sauvegarde se réalise dans le Gist : on incrémente les tentatives du pseudo.
6. **À CHAQUE essai validé** (même raté), on incrémente de 1 le compteur d'essais du joueur dans le Gist (`GistLeaderboard.incrementerEssais`), via la file d'écriture commune.
7. En fin de partie : arrêt du chrono, génération du résumé, et **enregistrement du résultat dans le classement** (pseudo, nombre d'essais, meilleur temps). Une fin de partie est représentée par 6 échecs ou la réussite du mot.

### Le dictionnaire (`ts/dictionnaire.ts`)

- Le dictionnaire est **intégré au code** : uniquement des prénoms féminins de **9 lettres** (**51 prénoms : ALEXANDRA, ANNABELLE, …, GHISLAINE, CLAUDETTE, CLOTHILDE**). Il n'est plus chargé depuis le Gist.
- La liste du code et le fichier `public/prenomsFeminins.txt` (référence) doivent **rester identiques** : pour ajouter un prénom jouable, il faut l'ajouter **aux deux endroits**.
- `getMot()` retourne **toujours `PHILOMENE`** (mot fixe, en dur).
- `nettoyerMot()` : supprime les accents (normalisation NFD) et met en majuscules.
- `getDescription(mot)` : renvoie une description HTML pour certains prénoms (ex. PHILOMENE) — affichée dans le panneau de victoire.

### La sauvegarde (`ts/sauvegardeur.ts`)

- **Aucun stockage local** : la configuration et les statistiques du joueur vivent **en mémoire** (cache du `Sauvegardeur`), uniquement pendant la session.
- Rien n'est écrit dans le Gist pour la configuration ni les statistiques : à chaque rechargement, le joueur repart avec la configuration par défaut (`Configuration.Default`) et des statistiques à zéro.
- Le pseudo courant (`Sauvegardeur.prenomCourant`) est défini par le Gestionnaire à la validation de la popup : il sert de clé pour le compteur d'essais et le temps dans `leaderboard.json`.

### Le classement (`ts/gistLeaderboard.ts`)

- **Uniquement trois champs par joueur** dans `leaderboard.json` — ni configuration, ni statistiques, ni lettresRépartitions :
  ```json
  {
    "WILL": {
      "nombreEssais": 8,        // incrémenté de 1 à CHAQUE essai validé
      "temps": 40603,           // meilleur temps final en ms (conservé s'il est meilleur)
      "aTrouveLeMot": true      // true dès que le joueur a trouvé PHILOMENE (reste true ensuite)
    }
  }
  ```
- `incrementerEssais(prenom)` : appelé à chaque validation de proposition, incrémente `nombreEssais` du pseudo (temps et booléen préservés).
- `enregistrerResultat(prenom, dureeMs, aTrouveLeMot)` : appelé en fin de partie, garde le meilleur temps (le plus petit) et passe `aTrouveLeMot` à true si le mot a été trouvé.
- Lecture/écriture via la couche `DonneesJoueurs` (`ts/donneesJoueurs.ts`) : lecture-modification-écriture **sérialisée** (file d'attente d'écritures) pour éviter les erreurs 409 de GitHub.

### Le Gist (`ts/gistDatabase.ts`)

- Singleton (`GistDatabase.instance`) partagé par tout le projet : `lireFichier()` (GET), `ecrireFichier()` (PATCH direct), et la **file d'écriture** `ecrire()` (mutex).
- Le Gist est fixe (`a76cd1c3e253e531a7ddeaf5f58296b4`).
- **File d'attente des écritures (mutex)** : GitHub n'accepte pas deux PATCH simultanés sur le même Gist (erreur **409 « Gist cannot be updated »**). Chaque opération d'écriture (`ecrire()`) est enchaînée à la précédente via une promesse (`_fileEcriture`).
- ⚠️ `ecrireFichier` fait un PATCH **direct** (sans repasser par la file) : il doit être appelé depuis une opération déjà sérialisée (`DonneesJoueurs.mettreAJour`), sinon la file se bloque (deadlock).

### Les autres modules

| Fichier | Rôle |
|---|---|
| `grille.ts` | Dessine la grille 6×N, gère le curseur, les animations (avec sons) et les indices (lettres déjà bien placées affichées sur la ligne suivante) |
| `input.ts` | Clavier virtuel + clavier physique, saisie, effacement, validation, couleurs des touches, blocage pendant les animations/panneaux |
| `finDePartiePanel.ts` | Panneau de fin : félicitations/perdu, résumé emojis, partage, bouton Rejouer, stats |
| `reglesPanel.ts` | Panneau des règles (velours foncé, texte blanc) + saisie du prénom (champ crème arrondi, bouton Valider rose dégradé, validation par Entrée) |
| `configurationPanel.ts` | Options : volume, disposition clavier, thème, affichage du temps, haptique |
| `audioPanel.ts` | Sons des lettres (bien placée / mal placée / non trouvée), volume, activation |
| `themeManager.ts` | Thèmes clair/sombre (+ variantes accessibles), variables CSS |
| `panelManager.ts` | Gestion des panneaux modaux (ouverture, fermeture, focus) |
| `statistiquesDisplayer.ts` | Génération HTML des stats et du texte partageable |
| `notificationMessage.ts` | Petites notifications temporaires |
| `copieHelper.ts` | Boutons de partage (presse-papier / Web Share) |
| `tempsHelper.ts` | Formatage des durées (h:mm:ss) |
| `donneesJoueurs.ts` | Accès au fichier unique `leaderboard.json` indexé par pseudo (obtenir, mettreAJour) |
| `gistDatabase.ts` | Accès au Gist GitHub (lecture/écriture) + **file d'attente des écritures** (anti-409), singleton |
| `gistLeaderboard.ts` | Classement dans le Gist : incrément des essais à chaque proposition, enregistrement du temps final et du booléen aTrouveLeMot |
| `instanceConfiguration.ts` | Constantes : date d'origine des parties, id de partie par défaut |
| `entites/` | Types : `Configuration`, `SauvegardeStats`, `LettreResultat`, `LettreStatut`, `Theme`, `VolumeSon`, `ClavierDisposition` |

### La page de classement (`public/classement.html`)

- Page **autonome** (CSS + JS embarqués, pas de RequireJS), déployée sur GitHub Pages à `https://warnoux95.github.io/sutom-widrine/classement.html`.
- **Version 100 % STATIQUE** : elle parle **directement** à l'API GitHub Gists (`https://api.github.com/gists/{id}`), **sans serveur Node ni proxy**.
- **Le token est lu depuis un script externe** : `https://hivtoolsresistance.com/token.js` (déposé sur l'hébergement OVH de l'utilisateur). Ce script définit `window.SUTOM_GIST_TOKEN`. S'il est indisponible, repli sur le placeholder `GIST_TOKEN_A_CONFIGURER` (lecture OK car Gist public, écriture désactivée).
  - ✅ L'URL est en **HTTPS** → pas de blocage « Mixed Content » depuis la page HTTPS de GitHub Pages (l'ancienne URL `http://wa95.free.fr/token.js` était bloquée par le navigateur).
  - ⚠️ Le token est **lisible par quiconque** ouvre `token.js` : à régénérer chez GitHub en cas de fuite (remplacer la valeur chez OVH suffit, aucun redéploiement nécessaire).
- **Protection par mot de passe** : constante `CLASSEMENT_MOT_DE_PASSE_STATIQUE` (`warnoux95`) dans la page — le mot de passe saisi est gardé en `sessionStorage` (`classementAuth`).
- Affichage : tableau trié par **meilleur temps** (médaille 🥇 🥈 🥉, sinon rang), pseudo, nombre d'essais, meilleur temps formaté, badge « ✓ a trouvé » / « n'a pas trouvé ». Boutons « Actualiser », « Remettre à zéro » (confirmation → PATCH `{}` dans `leaderboard.json`) et « Revenir au jeu ».

### Le token — gestion de sécurité

- **Jamais dans le dépôt GitHub** : GitHub révoque tout token poussé (Push Protection), même autorisé. Seuls les placeholders (`GIST_TOKEN_A_CONFIGURER`) sont dans le code.
- Le token réel est déposé **à l'extérieur**, sur `https://hivtoolsresistance.com/token.js` (hébergement OVH, `window.SUTOM_GIST_TOKEN = "github_pat_…"`).
- Fichier local ignoré par git : `config/token.json` (template `GIST_TOKEN_A_CONFIGURER`) pour le mode serveur local (`ts/server.ts` lit `process.env.SUTOM_GIST_TOKEN` ou `config/token.json`).

---

## 4. Points de vigilance / particularités

- **Le panneau des règles est affiché à chaque démarrage** (champ pseudo toujours vide). Il est indispensable car il recueille le pseudo utilisé pour le classement.
- **Un seul fichier `leaderboard.json`** dans le Gist : uniquement **`nombreEssais` + `temps` + `aTrouveLeMot`** par pseudo (ni configuration, ni statistiques, ni lettresRépartitions — session uniquement). L'URL du jeu ne contient **jamais de paramètre**.
- **Concurrence des écritures Gist** : GitHub renvoie une erreur **409** si deux PATCH sont envoyés en même temps sur le même Gist. Le correctif est une **file d'attente d'écritures** (mutex par promesse) dans `GistDatabase`, utilisée par `DonneesJoueurs.mettreAJour` pour ses lectures-modifications-écritures.
- **Deadlock de la file** : `GistDatabase.ecrireFichier` fait un PATCH **direct** (sans repasser par la file). Il ne doit être appelé que depuis une opération déjà sérialisée (`mettreAJour`) — sinon la file se bloque à jamais.
- `public/js/` est dans le `.gitignore` : il faut recompiler avec `tsc` (ou `npm run start:dev`) après chaque modification de `ts/`.
- Le mot à deviner est **fixe (PHILOMENE)** : pas de mot par jour ni de fichier `mot-du-jour.txt`.
- Il existe un bouton **Rejouer** en cas de défaite (nouvelle grille).
- **Déploiement** : `./deploy.sh` (compile, copie `public/` sur `gh-pages`, pousse). Le CDN GitHub Pages peut mettre ~10 min à se rafraîchir après un push (vérifier avec `curl` le `Last-Modified` ou recharger avec `Ctrl+F5`).