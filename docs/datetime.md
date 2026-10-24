# Bibliothèque `datetime` (Date et heure) — v1.0.0

13 commandes pour BERKIOS CODE : dates relatives, jours restants, formats courts, durées lisibles et chronomètre.
Chaque commande existe en **français, anglais, espagnol et swahili** ; la forme qualifiée `datetime.<nom>` fonctionne aussi.
Permission demandée : `stockage` (uniquement pour le chronomètre).

Conventions : une **cible** ou un **résultat** est le nom d'un composant ou d'une variable `$nom` ; une **date** s'écrit `AAAA-MM-JJ`
(celle d'un champ date) ; `JJ/MM/AAAA` est aussi accepté en lecture.

## Date et heure du moment

| Commande (fr · en · es · sw) | Syntaxe | Résultat |
|---|---|---|
| `date-et-heure` · `date-and-time` · `fecha-y-hora` · `tarehe-na-saa` | `date-et-heure "Cible"` | `24/10/2026 14:30` |
| `heure-courte` · `short-time` · `hora-corta` · `saa-fupi` | `heure-courte "Cible"` | `14:30` |
| `jour-actuel` · `current-weekday` · `dia-actual` · `siku-ya-sasa` | `jour-actuel "Cible"` | `samedi` |

## Formats de date

| Commande | Syntaxe | Effet |
|---|---|---|
| `date-courte` · `short-date` · `fecha-corta` · `tarehe-fupi` | `date-courte "Cible"` | `2026-10-24` → `24/10/2026` (sur place) |
| `date-iso` · `iso-date` · `fecha-iso` · `tarehe-iso` | `date-iso "Cible"` | `24/10/2026` → `2026-10-24` (sur place) |

## Dates relatives et écarts

| Commande | Syntaxe | Effet |
|---|---|---|
| `dans-jours` · `in-days` · `en-dias` · `baada-ya-siku` | `dans-jours "Cible" 30` | aujourd'hui + 30 jours (négatif accepté) |
| `dans-mois` · `in-months` · `en-meses` · `baada-ya-miezi` | `dans-mois "Cible" 3` | aujourd'hui + 3 mois (fin de mois respectée) |
| `jours-restants` · `days-left` · `dias-restantes` · `siku-zilizobaki` | `jours-restants "Date" "Résultat"` | jours entre aujourd'hui et la date (négatif si passée) |
| `jours-ecoules` · `days-since` · `dias-transcurridos` · `siku-zilizopita` | `jours-ecoules "Date" "Résultat"` | jours depuis la date (négatif si à venir) |
| `est-passee` · `is-past` · `esta-pasada` · `imepita` | `est-passee "Date" "Résultat"` | `true` si la date est avant aujourd'hui, sinon `false` |

## Durées et chronomètre

| Commande | Syntaxe | Effet |
|---|---|---|
| `formater-duree` · `format-duration` · `formatear-duracion` · `fomati-muda` | `formater-duree "Secondes" "Résultat"` | `3661` → `01:01:01` (heures > 24 permises ; décimales tronquées ; valeurs négatives non prises en charge) |
| `chrono-demarrer` · `start-stopwatch` · `iniciar-cronometro` · `anza-kipima-muda` | `chrono-demarrer "clé"` | mémorise l'instant présent sous la clé |
| `chrono-lire` · `read-stopwatch` · `leer-cronometro` · `soma-kipima-muda` | `chrono-lire "clé" "Résultat"` | secondes écoulées depuis `chrono-demarrer` ; erreur « Chronomètre non démarré. » sinon |

```text
quand clic
  chrono-demarrer "essai"

quand clic
  chrono-lire "essai" "$secondes"
  formater-duree "$secondes" "duree"
```

## Bon à savoir
- **Heure locale** : « aujourd'hui » et « maintenant » suivent l'horloge de l'appareil.
- **Le chronomètre est mémorisé** (commande `stocker`) : dans l'application générée, il survit à la fermeture de l'application. Réutiliser la même clé le remplace.
- **Variables réservées** : les commandes utilisent en interne des variables commençant par `$dt` (`$dtjour`, `$dtnow`…). Évitez ces noms dans vos scripts.
- **Dans une ligne** : comme toute commande de bibliothèque, elles s'utilisent en début de ligne (pas après `si … alors`).
