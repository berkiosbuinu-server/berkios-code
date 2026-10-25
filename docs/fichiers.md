# Bibliothèque `fichiers` (Fichiers et dossiers) — v1.0.0

27 commandes pour BERKIOS CODE, en **français et en anglais** ; la forme qualifiée `fichiers.<nom>` fonctionne aussi.
Permissions demandées : `fichiers` (création de fichiers) et `stockage` (espace de dossiers de l'application).

## Deux mondes, à ne pas confondre

BERKIOS CODE ne sait écrire qu'**un seul type de fichier réel** : un fichier texte créé dans le dossier *Téléchargements* (commande `telecharger`).
Il ne sait ni créer un dossier sur le disque, ni lister, renommer ou supprimer un fichier réel. Cette bibliothèque propose donc :

1. **De vrais fichiers** : `fichier-creer`, `fichier-creer-vide`, `fichier-creer-horodate`, et `fichier-exporter`.
2. **Un espace de fichiers interne à l'application** : de vrais dossiers et fichiers *logiques*, mémorisés par l'application (commande `stocker`),
   que l'on crée, lit, renomme, copie, supprime et liste. Ils ne sont **pas visibles dans l'explorateur** de l'ordinateur ;
   `fichier-exporter` les transforme en vrai fichier.

## Noms, extensions et chemins (texte seulement, aucune permission)

| Commande (fr · en) | Syntaxe | Effet |
|---|---|---|
| `nom-fichier-sur` · `safe-filename` | `nom-fichier-sur "Nom" "Résultat"` | remplace par `-` les caractères interdits ou risqués (`\ / : * ? " < > \| , ; ( ) & # % @ ! + = [ ] { } $ ^ ~` `` ` `` `'` et `..`) ; `sans-nom` si le nom devient vide |
| `nom-fichier-valide` · `valid-filename` | `nom-fichier-valide "nom.ext" "Résultat"` | `true` si le nom est accepté par la création de fichier (voir règles) |
| `nom-fichier-horodate` · `timestamped-filename` | `nom-fichier-horodate "base" "ext" "Résultat"` | `base_2026-10-24_14-30.ext` |
| `nom-fichier-numero` · `numbered-filename` | `nom-fichier-numero "base" 7 "ext" "Résultat"` | `base-007.ext` |
| `extension-fichier` · `file-extension` | `extension-fichier "Photo.JPG" "Résultat"` | `jpg` (vide s'il n'y en a pas) |
| `changer-extension` · `change-extension` | `changer-extension "a.txt" "csv" "Résultat"` | `a.csv` (l'extension s'écrit sans point) |
| `chemin-joindre` · `path-join` | `chemin-joindre "Rapports/" "/2026" "Résultat"` | `Rapports/2026` (un seul `/`, `\` devient `/`) |
| `chemin-nom` · `path-name` | `chemin-nom "a/b/c.txt" "Résultat"` | `c.txt` |
| `chemin-dossier` · `path-folder` | `chemin-dossier "a/b/c.txt" "Résultat"` | `a/b` (vide à la racine) |

## Créer de vrais fichiers (dossier Téléchargements)

| Commande | Syntaxe | Effet |
|---|---|---|
| `fichier-creer` · `create-file` | `fichier-creer "nom.ext" "Source"` | écrit la valeur de `Source` ; `\ / : * ? " < > \|` et `..` deviennent `-` ; `.txt` est ajouté s'il n'y a pas d'extension |
| `fichier-creer-vide` · `create-empty-file` | `fichier-creer-vide "nom.ext"` | fichier vide |
| `fichier-creer-horodate` · `create-timestamped-file` | `fichier-creer-horodate "base" "ext" "Source"` | `base_AAAA-MM-JJ_HH-mm.ext` : un nom nouveau à chaque appel |
| `fichier-exporter` · `export-file` | `fichier-exporter "Dossier/nom.txt"` | écrit un fichier de l'espace de l'application sous son nom d'origine (`.txt` si aucune extension) |

Règle de la création de fichier (appliquée aussi par `nom-fichier-valide`) : lettres, chiffres, espaces et `_ - .` ; 80 caractères au plus avant une
extension de 1 à 6 lettres ou chiffres ; pas de `..`. Un nom qui garde un caractère refusé (par exemple `é€.txt`) provoque l'erreur
« Nom de fichier invalide » ; passez-le d'abord par `nom-fichier-sur`, puis contrôlez-le avec `nom-fichier-valide`.
Si un fichier du même nom existe déjà, l'application générée ajoute ` (1)`, ` (2)`… ; dans l'aperçu du Studio, c'est le navigateur qui décide.

## Dossiers de l'espace de l'application

| Commande | Syntaxe | Effet |
|---|---|---|
| `dossier-creer` · `create-folder` | `dossier-creer "Rapports/2026"` | crée le dossier ; erreur si le parent n'existe pas ou si le nom est pris |
| `dossier-assurer` · `ensure-folder` | `dossier-assurer "Rapports"` | idem **sans erreur** s'il existe déjà (à mettre au démarrage) |
| `dossier-existe` · `folder-exists` | `dossier-existe "Rapports" "Résultat"` | `true` ou `false` (`/` = racine, toujours vraie) |
| `dossier-lister` · `list-folder` | `dossier-lister "Rapports" "Résultat"` | liste : sous-dossiers terminés par `/`, ex. `2026/, ventes.csv` (`/` = racine) |
| `dossier-supprimer` · `delete-folder` | `dossier-supprimer "Rapports"` | supprime un dossier **vide** uniquement |

## Fichiers de l'espace de l'application

| Commande | Syntaxe | Effet |
|---|---|---|
| `fichier-ecrire` · `write-file` | `fichier-ecrire "Rapports/a.txt" "Source"` | crée ou remplace ; le dossier doit exister |
| `fichier-ajouter` · `append-file` | `fichier-ajouter "Logs/j.txt" "Texte" [" \| "]` | ajoute à la suite (crée le fichier si besoin) ; séparateur facultatif |
| `fichier-lire` · `read-file` | `fichier-lire "Rapports/a.txt" "Résultat"` | contenu du fichier |
| `fichier-existe` · `file-exists` | `fichier-existe "Rapports/a.txt" "Résultat"` | `true` ou `false` |
| `fichier-taille` · `file-size` | `fichier-taille "Rapports/a.txt" "Résultat"` | nombre de caractères |
| `fichier-renommer` · `rename-file` | `fichier-renommer "Rapports/a.txt" "b.txt"` | renomme dans le même dossier ; refus si le nom est pris |
| `fichier-copier` · `copy-file` | `fichier-copier "Rapports/a.txt" "Archives/a.txt"` | copie ; le dossier cible doit exister, refus si la destination existe |
| `fichier-supprimer` · `delete-file` | `fichier-supprimer "Rapports/a.txt"` | supprime ; erreur si le fichier n'existe pas |
| `fichier-supprimer-si-existe` · `delete-file-if-exists` | `fichier-supprimer-si-existe "Rapports/a.txt"` | idem **sans erreur** s'il n'existe pas |

Pour **déplacer** un fichier : `fichier-copier` puis `fichier-supprimer`.

## Exemple

```text
quand chargement
  dossier-assurer "Rapports"

quand clic
  nom-fichier-horodate "ventes" "csv" "$nom"
  chemin-joindre "Rapports" "$nom" "$chemin"
  fichier-ecrire "$chemin" "tableau"
  fichier-exporter "$chemin"
```

```text
quand clic
  dossier-lister "Rapports" "$liste"
  fichier-exporter "Rapports/ventes.csv"
```

## Règles des chemins de l'espace de l'application
- Segments séparés par `/` (un `\` est converti) ; lettres, chiffres, espaces et `_ - .` ; 200 caractères au plus.
- Refusés : `/` au début ou à la fin, `//`, un segment `.`, tout `..`, les espaces en bord de segment. Erreur « Chemin invalide ».
- **La casse est ignorée** : `Rapports/A.txt` et `rapports/a.TXT` désignent le même fichier ; la première graphie est conservée dans les listes.
- Les virgules sont interdites (les listes de BERKIOS CODE sont séparées par des virgules).
- Toutes les vérifications ont lieu **avant** la première écriture : une commande en erreur ne modifie rien.

## Limites
- **Pas de vrais dossiers sur le disque** et pas de lecture de fichiers existants : le moteur ne le permet pas. Cela demanderait une extension native (voir `EXTENSIONS_NATIVES.md`).
- Contenu **texte** uniquement (UTF-8). L'espace est fait pour des données modestes (notes, journaux, exports), pas pour de gros fichiers.
- Pas de renommage, déplacement ni suppression récursive de dossier ; `fichier-renommer` reste dans le même dossier.
- Une commande de bibliothèque ne peut pas suivre `si … alors` ni `repeter` : d'où `dossier-assurer` et `fichier-supprimer-si-existe`.
- BERKIOS CODE ne sait pas écrire un saut de ligne dans un texte : `fichier-ajouter` accepte donc un séparateur au lieu d'un retour à la ligne.
- **Persistance** : dans l'application Flutter générée, l'espace est enregistré avec les autres valeurs mémorisées de l'application. Dans l'**aperçu du Studio**,
  il est gardé dans le navigateur et **partagé par tous les projets** ouverts dans ce navigateur : utilisez des noms de dossiers distincts pour vos essais.
- Les variables internes commençant par `$fs` sont réservées aux macros ; évitez ces noms dans vos scripts.
- Le Dart généré n'a pas été compilé dans l'environnement de préparation de cette bibliothèque.
