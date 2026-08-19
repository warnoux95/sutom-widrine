# Mettre à jour le dictionnaire

Dans cette instance, le dictionnaire des prénoms jouables est **intégré au code** : il n'est plus généré depuis un fichier `data/mots.txt` (supprimé).

## Où se trouve le dictionnaire

- **`ts/dictionnaire.ts`** — le tableau `chargerDictionnaire()` contient les prénoms valides (uniquement des **prénoms féminins de 9 lettres**).
- **`public/prenomsFeminins.txt`** — la liste de référence (mêmes prénoms, un par ligne, en majuscules, sans accents).

## Comment ajouter un prénom

1. **Vérifier la longueur** : le prénom doit faire exactement **9 lettres** (sinon il ne pourra jamais être proposé — le mot à deviner est de 9 lettres).
2. **Ajouter le prénom** dans **les deux fichiers** (le tableau de `ts/dictionnaire.ts` ET le fichier `public/prenomsFeminins.txt`), en majuscules et sans accents :
   ```
   GHISLAINE  →  ts/dictionnaire.ts (entre GUADALUPE et CLAUDETTE) + prenomsFeminins.txt
   ```
3. **Recompiler** le TypeScript :
   ```sh
   npx tsc
   ```
4. **Redéployer** (si le site doit être à jour en ligne) :
   ```sh
   ./deploy.sh
   ```

## Règles suivies par les prénoms du dictionnaire

- Le prénom est **féminin**.
- Le prénom fait **exactement 9 lettres**.
- Le prénom est écrit **sans accents** (accents ignorés au nettoyage via `nettoyerMot()`).
- Les lettres en double et l'ordre alphabétique n'ont pas d'importance pour la validation (une simple recherche dans le tableau).

> ⚠️ Le mot à deviner est **fixe** (`PHILOMENE`, défini en dur) : ajouter un prénom au dictionnaire le rend **proposable** par les joueurs, il ne change pas le mot à trouver.