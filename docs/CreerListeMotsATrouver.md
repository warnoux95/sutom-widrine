# Créer la liste des mots à trouver

> Cette procédure concernait l'instance **originale** du jeu (mot du jour, `data/motsATrouve.txt`, scripts `utils/` et `cron.sh`). **Ces fichiers et scripts ont été supprimés** de cette instance.

## État actuel de cette instance

- Le **mot à deviner est fixe** : `PHILOMENE` (défini en dur dans `ts/dictionnaire.ts` → `_motATrouverFixe`).
- Il n'y a **pas** de mot du jour : `Dictionnaire.getMot()` retourne toujours `PHILOMENE`, quelle que soit la date.
- Il n'y a **pas** de fichier `public/mots/` utilisé : le dossier existe pour compatibilité avec l'instance d'origine, mais le jeu ne le lit pas.

## Si vous voulez réintroduire un mot du jour

Il faudrait restaurer les scripts supprimés (`utils/melangerATrouver.js`, `utils/nettoyageATrouver.js`, `cron.sh`) et modifier `Dictionnaire.getMot()` pour lire la liste horodatée au lieu de la constante `PHILOMENE`. Ce n'est pas prévu actuellement.

## Pour les prénoms jouables

La liste des prénoms **proposables** par les joueurs est le dictionnaire (voir `MettreAJourLeDictionnaire.md`) : il se compose de prénoms féminins de 9 lettres, en dur dans `ts/dictionnaire.ts` et `public/prenomsFeminins.txt`.