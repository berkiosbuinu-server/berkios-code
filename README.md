# BERKIOS CODE — bibliothèques

Bibliothèques de commandes pour BERKIOS CODE (code des composants), téléchargées depuis le Studio :
**Code → Bibliothèques**. Chaque release GitHub publie `index.json` (catalogue avec empreintes SHA-256) et un fichier
`<id>-<version>.bkl` par bibliothèque.

Le Studio lit : `https://github.com/berkiosbuinu-server/berkios-code/releases/latest/download/index.json`
(le dépôt doit donc être **public** et la dernière release ne doit être ni brouillon ni pré-version).

## Ajouter ou modifier une bibliothèque
1. Créer `libraries/<id>.bkl` (format `berkios-library/1`, voir [`docs/FORMAT.md`](docs/FORMAT.md)).
2. `node scripts/build-release.mjs` puis `node --test "tests/*.test.mjs"` pour contrôler et construire `dist/`.
3. Incrémenter `version` dans le `.bkl`, valider (`git commit`, `git push`), puis publier :
   `git tag v1.1.0 && git push origin v1.1.0` (le workflow `release.yml` crée la release).

Une bibliothèque ne contient **que des commandes écrites en BERKIOS CODE** (macros) : aucune exécution de programme.
Elle déclare les permissions de l'hôte qu'elle utilise ; le Studio les vérifie et les affiche avant l'ajout.

## Bibliothèques fournies
| id | contenu |
|---|---|
| `systeme` | `copier-valeur`, `exporter-texte`, `sauvegarder-valeur`, `restaurer-valeur` (fr, en, es, sw) |

## Licence
MIT — voir [`LICENSE`](LICENSE).
