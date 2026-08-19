# Commandes utiles pour le projet SUTOM

Ce projet est **« Sutom des widrine »** : un SUTOM personnalisé autour des prénoms
féminins (mot fixe PHILOMENE), déployé sur GitHub Pages. Ce document regroupe les
commandes utiles pour le développement local et le déploiement.

## 1. Installer les dépendances

```powershell
npm install
```

## 2. Compiler le TypeScript

```powershell
node .\node_modules\typescript\bin\tsc --pretty false
```

## 3. Lancer le serveur (développement local)

```powershell
node .\public\js\server.js
```

## 4. Lancer le serveur avec compilation automatique

```powershell
npm run start:dev
```

## 5. Lancer le serveur en mode production

```powershell
npm run start:prod
```

## 6. Tuer tous les serveurs Node en cours

```powershell
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
```

## 7. Vérifier si un port est utilisé

```powershell
netstat -ano | findstr :4200
```

## 8. Tuer un processus par son PID

```powershell
Stop-Process -Id <PID> -Force
```

## 9. Ouvrir l'application dans le navigateur

```powershell
Start-Process http://localhost:4200
```

## 10. Recompiler après modification

```powershell
node .\node_modules\typescript\bin\tsc --pretty false
```

---

# URL et API utiles

## 11. Ouvrir le jeu en local

```
http://localhost:4200
```

- **Aucun paramètre d'URL** : ni token, ni gistId. Le token et le gistId sont **en dur dans `ts/server.ts`** (constantes `GIST_TOKEN` / `GIST_ID`). Le navigateur ne les envoie jamais.
- Le token est sensible : ne pas le partager dans un dépôt public.

## 11bis. Thème Pastel (défaut)

- Le jeu démarre en **thème Pastel** (rose poudré) — fond pêche + bulles, grille crème arrondie, clavier pastel, **modal « velours foncé »** (dégradé `#8e3b5e → #762f4e → #641f40`, bordure claire, **texte blanc** : titre, contenu, liens, sélecteurs de config ; zone prénom crème en contraste).
- Le thème est posé **dès le chargement** (`body class="pastel-ambiance"` dans `index.html` — correction du flash de la grille bleue / FOUC), puis réappliqué par `ThemeManager`.
- Changeable dans le panneau ⚙️ : Pastel / Sombre / Clair / Sombre (Accessible) / Clair (Accessible).
- Implémentation : `Theme.Pastel` (nouvelle valeur 0 de l'enum `ts/entites/theme.ts`), `ThemeManager` pose/retire la classe `pastel-ambiance` sur le `<body>`.

## 11ter. Interface 2026 (nom, header, règles de la modal)

- **Nom du jeu** : `index.html` (`<title>`, `<h1>`) et `manifest.json` affichent **« Sutom des widrine »** (à la place de WIDRINE/SUTOM).
- **Header simplifié** : seuls restent le bouton « ℹ️ Afficher les règles » (gauche) et le titre (centre/droite, `header` passe de `display:grid` 2fr/6fr/2fr à `flex`). Les boutons **statistiques**, **son** et **configuration** ont été supprimés du header.
- **Modules tolérants** : `audioPanel.ts`, `configurationPanel.ts`, `finDePartiePanel.ts` récupèrent leur bouton avec `as HTMLElement | null` et utilisent `?.addEventListener` — plus d'erreur si le bouton n'existe pas.
- **Texte des règles** (modal, `ts/reglesPanel.ts`) aligné sur les couleurs pastel : « carré **rose** » (bien placée), « cercle **orange** » (mal placée), « fond **crème** » (non trouvée).

## 11quater. Déploiement GitHub Pages

- Le site est déployé sur **GitHub Pages** : https://warnoux95.github.io/sutom-widrine/ (branche `gh-pages` du dépôt `warnoux95/sutom-widrine`).
- Script de déploiement : **`./deploy.sh`** (depuis la racine, sous Git Bash). Il :
  1. compile le TypeScript (`tsc`) ;
  2. recopie `public/js/gistDatabase.statique.js → public/js/gistDatabase.js` (version statique, non écrasée par `tsc`) ;
  3. recrée la branche `gh-pages` (worktree temporaire) avec le contenu de `public/` ;
  4. commit + push `--force` vers `gh-pages`.
- ⚠️ **Aucun token réel n'est injecté** dans le dépôt : GitHub révoque tout token poussé (Push Protection), même autorisé. Le dépôt ne contient que le placeholder `GIST_TOKEN_A_CONFIGURER`.
- Après un push, le **CDN GitHub Pages peut mettre ~10 minutes** à servir la nouvelle version. Vérifier avec `curl -sI https://warnoux95.github.io/sutom-widrine/classement.html` (ligne `Last-Modified`) ; dans le navigateur, recharger avec `Ctrl+F5`.

## 11quinquies. Token du classement — solution « script externe »

- La page `classement.html` (et le module `gistDatabase.js`) chargent le token via un **script externe** :
  `https://hivtoolsresistance.com/token.js` → définit `window.SUTOM_GIST_TOKEN`.
- Ce fichier est hébergé chez **OVH** (site HTTPS de l'utilisateur), **jamais dans le dépôt GitHub** (révocation Push Protection).
- Fallback si le script est indisponible : placeholder `GIST_TOKEN_A_CONFIGURER` (lecture du Gist public OK, écriture désactivée).
- ⚠️ Sécurité : le token est **lisible par quiconque** ouvre `token.js`. En cas de fuite : régénérer un token chez GitHub, remplacer la valeur chez OVH (aucun redéploiement nécessaire).
- Local : `ts/server.ts` lit le token depuis `process.env.SUTOM_GIST_TOKEN` ou `config/token.json` (gitignoré, pas dans le dépôt).
- ⚠️ **Mixed Content** : la page étant en HTTPS, l'URL du token **doit** être en HTTPS (l'ancienne `http://wa95.free.fr/token.js` était bloquée par le navigateur).

## 12. Lire un fichier du Gist via le proxy (GET)

```powershell
curl "http://localhost:4200/api/gist-file?filename=leaderboard.json"
```

- Le serveur lit le fichier demandé dans le Gist et répond `{ "content": "..." }`.

## 13. Écrire un fichier du Gist via le proxy (PATCH)

```bash
curl -X PATCH "http://localhost:4200/api/gist-file" \
  -H "Content-Type: application/json" \
  -d '{"filename":"leaderboard.json","content":"{\"WILL\":{...}}}'
```

## 14. Notes importantes sur l'API Gist

- **GET** : le paramètre `filename` est obligatoire (le serveur extrait le fichier demandé de la réponse du Gist).
- **PATCH** : le corps est `{ "filename": "<nomFichier>", "content": "<contenu>" }`.
- **Plus de POST** (`/gists`) : le Gist existe déjà, il n'est jamais créé par le jeu.
- **Erreur 409 « Gist cannot be updated »** : GitHub refuse deux PATCH **simultanés** sur le même Gist. Toutes les écritures passent par une **file d'attente (mutex)** dans `ts/gistDatabase.ts` (`_fileEcriture` / `ecrire()`), et `DonneesJoueurs.mettreAJour` fait ses lectures-modifications-écritures à l'intérieur de ce mutex.
  - ⚠️ `GistDatabase.ecrireFichier` fait un PATCH **direct** (sans repasser par la file) : il doit être appelé depuis une opération déjà sérialisée (`mettreAJour`), sinon la file se bloque (deadlock).
  - Pour un test manuel en ligne de commande, enchaîner les PATCH avec `sleep 1` entre eux.

## 15. Page de classement (protégée par mot de passe)

- **`http://localhost:4200/classement.html`** (déployée sur GitHub Pages : `/classement.html`) : page HTML autonome (CSS + JS embarqués, pas de RequireJS) listant tous les joueurs du Gist, triée par **meilleur temps** (les joueurs sans temps passent en fin).
- Colonnes : Rang (🥇 🥈 🥉), Pseudo, Nombre d'essais, Meilleur temps (formaté `mm:ss` / `h:mm:ss`), Résultat (badge « ✓ a trouvé » si `aTrouveLeMot`).
- **Accès protégé par mot de passe** : constante `CLASSEMENT_MOT_DE_PASSE_STATIQUE` (`warnoux95`) **embarquée dans la page** (version 100 % statique — le mot de passe est visible dans la console ; réservé à un usage familial/intranet).
- **Remise à zéro du leaderboard** : bouton « Remettre à zéro » (avec confirmation) → écrit `{}` dans `leaderboard.json` via PATCH direct GitHub (tous les joueurs sont supprimés du Gist, action définitive).
- Le mot de passe saisi est gardé en `sessionStorage` (`classementAuth`) : la page ne redemande pas le mot de passe tant que l'onglet est ouvert.
- ⚠️ Les anciennes routes serveur `POST /api/classement` et `/api/classement/reset` (mot de passe côté serveur) ont été **supprimées** de `ts/server.ts`.

## 16. Fichiers du Gist (base de données du jeu)

| Fichier | Contenu |
|---|---|
| `leaderboard.json` | **Un seul fichier** : le compteur d'essais, le meilleur temps et le booléen `aTrouveLeMot` de chaque joueur, indexés par pseudo (`{ "PSEUDO": { nombreEssais, temps, aTrouveLeMot } }`) |

- Plus de `configuration`, `statistiques`, `partieEnCours`, `mot-du-jour.txt`, `lettresRepartitions` : le Gist ne contient **que** `leaderboard.json` avec `nombreEssais` + `temps` + `aTrouveLeMot` par pseudo.
- La **configuration et les statistiques ne sont PAS dans le Gist** : elles vivent uniquement **en mémoire** pendant la session (`Sauvegardeur` — cache). À chaque rechargement : configuration par défaut, statistiques à zéro.
- `aTrouveLeMot` : passe à `true` à la fin d'une partie **gagnée** (`enregistrerResultat(prenom, dureeMs, aTrouveLeMot)`), et reste `true` ensuite (préservé par `incrementerEssais`).
- Migration : une entrée ancienne est complétée à la lecture — `temps = meilleurTempsMs ?? temps`, `aTrouveLeMot = false` par défaut (`DonneesJoueurs.lireToutes`), les autres champs sont ignorés et disparaissent à la prochaine écriture.

## 17. Flux de démarrage (aucun paramètre d'URL)

1. Ouvrir `http://localhost:4200` → la popup des règles s'affiche (champ pseudo **toujours vide**).
2. Le joueur saisit son pseudo et clique **Valider** → `Gestionnaire.demarrerAvecPseudo(prenom)` : `Sauvegardeur.prenomCourant = prenom`, configuration et stats par défaut (session uniquement), grille 6×9 vierge, clavier AZERTY, chrono.
3. Le mot à deviner est **toujours PHILOMENE** (`Dictionnaire.getMot()`).
4. **À chaque validation** : `Gestionnaire.verifierMot()` → `GistLeaderboard.incrementerEssais` (incrémente `nombreEssais` du pseudo dans le Gist, une écriture read-modify-write dans la file).
5. **En fin de partie** : `enregistrerResultat(prenom, dureeMs, aTrouveLeMot)` → `temps` = min(temps existant, durée), `aTrouveLeMot` = true si le mot a été trouvé ; les stats de session restent en mémoire (affichées dans le panneau de fin).
6. Recharger l'URL → popup de nouveau, champ vide (aucune reprise du joueur précédent).

> Le **chrono est toujours visible au-dessus de la grille** : `initialiserChrono` et `demarrerChrono` imposent `display:flex` (l'option `afficherChrono` ne pilote plus que l'ajout du temps dans le résumé partagé).

## 18. Test navigateur automatisé

- Le jeu se teste dans le navigateur en ouvrant `http://localhost:4200` **sans aucun paramètre**.
- Dans l'automatisation, les clics sur les touches du clavier virtuel doivent être déclenchés avec la méthode native `element.click()` (un `dispatchEvent(new MouseEvent('click'))` peut ne pas déclencher les listeners `addEventListener('click')` du jeu).
- Vérifier le flux complet : rechargement → popup des règles (champ prénom **toujours vide**) → « Valider » → grille 6×9 vierge + **chrono visible qui tourne** → proposition ratée (CATHERINE) → couleurs + indices → PHILOMENE gagnant → panneau « Félicitations » → vérifier `leaderboard.json` (essais incrémentés, `temps` enregistré, `aTrouveLeMot` = true, **uniquement** `nombreEssais` + `temps` + `aTrouveLeMot` par pseudo) dans le Gist.
- Après rechargement, le panneau des règles s'affiche **à chaque fois** : comportement voulu.

> ⚠️ L'ancien test sur le Gist direct (port 4298, `npx serve`) ne fonctionne plus : le jeu en ligne passe par le **script externe** `https://hivtoolsresistance.com/token.js` (sinon l'écriture est désactivée, placeholder).

## 19. Prénoms jouables (dictionnaire)

- Le dictionnaire est **en dur dans `ts/dictionnaire.ts`** : uniquement des prénoms féminins de **9 lettres** (51 actuellement), incluant GHISLAINE et FRANCIANE.
- Le fichier `public/prenomsFeminins.txt` est la **référence** de la liste : il doit rester **identique** au tableau du code (ajouter un prénom **aux deux endroits**).
- Le prénom à deviner est **fixe** : `PHILOMENE` (avec une description affichée à la victoire).
- Ajouter un prénom : modifier `ts/dictionnaire.ts` + `public/prenomsFeminins.txt`, recompiler (`tsc`), redéployer (`./deploy.sh`).