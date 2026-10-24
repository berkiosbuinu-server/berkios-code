# Bibliothèque `pdfreader` (pdfReader) — v1.0.0

20 commandes pour BERKIOS CODE qui gèrent la **lecture d'un PDF page par page** : navigation, progression, signets, reprise de lecture, citation et zoom.
Chaque commande existe en **français, anglais, espagnol et swahili** ; la forme qualifiée `pdfreader.<nom>` fonctionne aussi.
Permission demandée : `stockage` (uniquement `pdf-memoriser` et `pdf-reprendre`).

## Ce que la bibliothèque fait… et ne fait pas
Une bibliothèque BERKIOS (format `berkios-library/1`) n'est qu'un ensemble de **macros** : elle combine les commandes intégrées, rien de plus.
Or BERKIOS CODE n'a aucune commande qui lit le contenu d'un fichier. `pdfreader` **n'extrait donc pas le texte d'un PDF et n'affiche pas ses pages** :
elle tient l'**état de lecture** (page courante, total, signets, zoom) dans des champs, et prépare les liens et les citations.
Le nombre de pages se saisit à la main. Lire réellement un PDF demanderait une commande native (runtime, Bridge, Studio), à ajouter une seule fois : les bibliothèques suivantes resteraient de simples fichiers.

## Conventions
Une **page**, un **total**, un **zoom**, des **signets** ou un **résultat** sont des noms de composants ou de variables `$nom`.
Les **signets** sont une liste de numéros séparés par des virgules (`3, 7, 12`), sans doublon et triée.

## Navigation

| Commande (fr · en · es · sw) | Syntaxe | Effet |
|---|---|---|
| `pdf-page-suivante` · `pdf-next-page` · `pdf-pagina-siguiente` · `pdf-ukurasa-unaofuata` | `pdf-page-suivante "Page" "Total"` | Passe à la page suivante, sans dépasser le nombre total de pages. |
| `pdf-page-precedente` · `pdf-previous-page` · `pdf-pagina-anterior` · `pdf-ukurasa-uliotangulia` | `pdf-page-precedente "Page"` | Revient à la page précédente, sans descendre sous la page 1. |
| `pdf-premiere-page` · `pdf-first-page` · `pdf-primera-pagina` · `pdf-ukurasa-wa-kwanza` | `pdf-premiere-page "Page"` | Va à la première page. |
| `pdf-derniere-page` · `pdf-last-page` · `pdf-ultima-pagina` · `pdf-ukurasa-wa-mwisho` | `pdf-derniere-page "Page" "Total"` | Va à la dernière page (le total doit être renseigné). |
| `pdf-aller-page` · `pdf-go-to-page` · `pdf-ir-a-pagina` · `pdf-nenda-ukurasa` | `pdf-aller-page "Page" "Total" "Numéro"` | Va à un numéro de page, ramené entre 1 et le total (décimales ignorées). |

## Progression

| Commande (fr · en · es · sw) | Syntaxe | Effet |
|---|---|---|
| `pdf-page-sur` · `pdf-page-of` · `pdf-pagina-de` · `pdf-ukurasa-wa` | `pdf-page-sur "Page" "Total" "Résultat"` | Écrit le repère « 3 / 12 ». |
| `pdf-progression` · `pdf-progress` · `pdf-progreso` · `pdf-maendeleo` | `pdf-progression "Page" "Total" "Résultat"` | Pourcentage de lecture (page / total), de 0 à 100, arrondi à l'entier. |
| `pdf-pages-restantes` · `pdf-pages-left` · `pdf-paginas-restantes` · `pdf-kurasa-zilizobaki` | `pdf-pages-restantes "Page" "Total" "Résultat"` | Nombre de pages qu'il reste à lire (0 si la dernière page est atteinte). |
| `pdf-temps-restant` · `pdf-time-left` · `pdf-tiempo-restante` · `pdf-muda-uliobaki` | `pdf-temps-restant "Page" "Total" "Minutes par page" "Résultat"` | Estimation, en minutes, du temps de lecture restant. |

## Reprise de lecture

| Commande (fr · en · es · sw) | Syntaxe | Effet |
|---|---|---|
| `pdf-memoriser` · `pdf-remember` · `pdf-recordar` · `pdf-kumbuka` | `pdf-memoriser "clé" "Page"` | Mémorise la page atteinte pour la prochaine ouverture de l'application. |
| `pdf-reprendre` · `pdf-resume` · `pdf-reanudar` · `pdf-endelea` | `pdf-reprendre "clé" "Page"` | Relit la page mémorisée (page 1 si rien n'a été mémorisé). |

## Signets

| Commande (fr · en · es · sw) | Syntaxe | Effet |
|---|---|---|
| `pdf-signet-ajouter` · `pdf-bookmark-add` · `pdf-marcador-agregar` · `pdf-alamisho-ongeza` | `pdf-signet-ajouter "Signets" "Page"` | Ajoute une page à la liste des signets (sans doublon, triée). |
| `pdf-signet-retirer` · `pdf-bookmark-remove` · `pdf-marcador-quitar` · `pdf-alamisho-ondoa` | `pdf-signet-retirer "Signets" "Page"` | Retire une page de la liste des signets. |
| `pdf-signet-existe` · `pdf-bookmark-exists` · `pdf-marcador-existe` · `pdf-alamisho-ipo` | `pdf-signet-existe "Signets" "Page" "Résultat"` | true si la page est déjà dans les signets, sinon false. |
| `pdf-signets-nombre` · `pdf-bookmark-count` · `pdf-marcadores-total` · `pdf-alamisho-idadi` | `pdf-signets-nombre "Signets" "Résultat"` | Nombre de signets. |

## Document et citation

| Commande (fr · en · es · sw) | Syntaxe | Effet |
|---|---|---|
| `pdf-est-pdf` · `pdf-is-pdf` · `pdf-es-pdf` · `pdf-ni-pdf` | `pdf-est-pdf "Nom" "Résultat"` | true si le nom ou l'adresse se termine par .pdf (majuscules acceptées). |
| `pdf-ouvrir-lien` · `pdf-open-link` · `pdf-abrir-enlace` · `pdf-fungua-kiungo` | `pdf-ouvrir-lien "https://exemple.org/guide.pdf"` | Ouvre l'adresse http(s) d'un PDF écrite dans le script (pas un nom de composant) ; refuse une adresse invalide ou qui ne finit pas par .pdf. |
| `pdf-citation` · `pdf-quote` · `pdf-cita` · `pdf-nukuu` | `pdf-citation "Résultat" "Document" "Page" "Extrait"` | Compose une citation : « extrait » — document, p. 3. |

## Zoom

| Commande (fr · en · es · sw) | Syntaxe | Effet |
|---|---|---|
| `pdf-zoom-avant` · `pdf-zoom-in` · `pdf-acercar` · `pdf-kuza` | `pdf-zoom-avant "Zoom"` | Augmente le zoom de 25 points (100 par défaut, 400 maximum). |
| `pdf-zoom-arriere` · `pdf-zoom-out` · `pdf-alejar` · `pdf-punguza` | `pdf-zoom-arriere "Zoom"` | Diminue le zoom de 25 points (25 minimum). |

## Exemple
```text
quand clic
  pdf-page-suivante "page" "total"
  pdf-progression "page" "total" "progression"
  pdf-memoriser "mon-livre" "page"

quand clic
  pdf-signet-ajouter "signets" "page"
  pdf-citation "citation" "document" "page" "extrait"
```

Deux projets complets, qui embarquent la bibliothèque, sont dans `examples/bibliotheques/` :
`03-liseuse-pdf.berkios.json` (navigation, progression, signets, zoom, reprise) et `04-fiche-lecture-pdf.berkios.json` (temps restant, citation, copie et export).
Régénérer : `node scripts/build-bibliotheque-pdfreader-example.mjs`.

## Bon à savoir
- **Total obligatoire** : `pdf-page-suivante`, `pdf-derniere-page`, `pdf-aller-page` et `pdf-progression` s'arrêtent avec « Nombre de pages inconnu. » si le total est vide ou inférieur à 1.
- **`pdf-ouvrir-lien`** : l'adresse doit être écrite **directement dans le script** (`pdf-ouvrir-lien "https://…/guide.pdf"`), car la commande intégrée `ouvrir` ne lit pas la valeur d'un composant. Elle refuse une adresse qui n'est pas http(s) ou ne finit pas par `.pdf`.
- **Mémoire partagée** : `pdf-memoriser` utilise la mémoire locale de l'application ; donnez à la clé un nom propre (`"mon-livre"`) pour ne pas écraser d'autres valeurs.
- **Variables réservées** : les commandes utilisent en interne des variables commençant par `$pdf`. Évitez ces noms dans vos scripts.
- **Dans une ligne** : comme toute commande de bibliothèque, elles s'utilisent en début de ligne (pas après `si … alors`).
- **Traductions** espagnole et swahilie écrites sans relecture par des locuteurs natifs : à relire avant diffusion large.
- Le Dart généré n'a pas été compilé ici ; seules les commandes intégrées déjà présentes dans le runtime sont utilisées.
