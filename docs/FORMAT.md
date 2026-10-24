# Bibliothèques BERKIOS CODE (extensions)

Une bibliothèque ajoute des commandes au code des composants. C'est un **fichier JSON** (`.bkl`, format `berkios-library/1`) :
ses commandes sont des **macros** écrites en BERKIOS CODE. À l'analyse du script, un appel de macro est remplacé par les
commandes intégrées qu'elle contient. Rien n'est exécuté en dehors de ce que BERKIOS CODE sait déjà faire, donc l'aperçu du
Studio et l'application Flutter se comportent de la même façon.

## Format

```json
{
  "format": "berkios-library/1",
  "id": "systeme", "version": "1.0.0", "title": "Système",
  "description": "…", "author": "…", "license": "MIT",
  "permissions": ["presse-papiers", "fichiers", "stockage"],
  "commands": [{
    "id": "exporter-texte",
    "names": ["exporter-texte", "export-text"],
    "usage": "exporter-texte \"nom.txt\" \"Source\"",
    "summary": "Enregistre la valeur d'un composant dans un fichier texte.",
    "minArgs": 2, "maxArgs": 2,
    "body": ["telecharger %1 %2"]
  }]
}
```

- `%1`…`%9` = arguments de l'appel (avec leurs guillemets d'origine) ; `%*` = tous les arguments ; `%1` dans un texte entre guillemets est remplacé par la valeur de l'argument.
- `permissions` : `reseau`, `fichiers`, `presse-papiers`, `impression`, `audio`, `stockage`. Le Studio **déduit** les permissions des commandes du corps et refuse la bibliothèque si l'une n'est pas déclarée.
- Interdits dans un corps : en-têtes d'événement (`quand clic`, `toutes les 100 ms`, `quand touche …`) et appel d'une autre commande de bibliothèque (pas de récursion possible).
- Dans un script : le nom court (`exporter-texte …`) ou qualifié (`systeme.exporter-texte …`). Un nom déjà pris par une commande intégrée n'est disponible que sous sa forme qualifiée ; deux bibliothèques qui partagent un nom le rendent ambigu (forme qualifiée obligatoire).
- Une commande de bibliothèque s'utilise comme première commande d'une ligne ; elle ne peut pas être imbriquée après `si … alors` ou `repeter`.

## Cycle de vie

1. **Catalogue** : le Bridge lit `https://github.com/berkiosbuinu-server/berkios-code/releases/latest/download/index.json` (surchargeable par `BERKIOS_LIBRARY_CATALOG_URL`). Seules les adresses `https` sont acceptées.
2. **Installation** (Studio → *Code → Bibliothèques*) : le Bridge télécharge le `.bkl`, vérifie le **SHA-256** annoncé par le catalogue, valide la structure et l'enregistre dans `%LOCALAPPDATA%\BerkiosLibraries` (ou `~/.berkios/libraries`, surchargeable par `BERKIOS_LIBRARIES_HOME`).
3. **Activation** : « Ajouter au projet » copie la définition **dans le projet** (`libraries`). Le projet reste ouvrable sans connexion, et les commandes sont disponibles dans l'aperçu et la vérification du code.
4. **Génération** : le Bridge intègre les bibliothèques du projet au Dart généré (`setActiveLibraries(...)` au démarrage). L'application finale est autonome.

## Publier une bibliothèque
Voir `libraries-repo/` (dépôt `berkios-code`) : `node scripts/build-release.mjs` construit `dist/index.json` et les `.bkl` ; un tag `v*` déclenche la release GitHub.

## Limites de la v1
- Macros uniquement : pas de bibliothèque native (Dart/plugins). `audio` et `imprimer` dans l'application Flutter restent à faire.
- Le catalogue n'est pas signé : l'empreinte SHA-256 protège contre un fichier altéré, pas contre un catalogue malveillant. Une signature (clé publique intégrée au Bridge) est prévue.
- Le Dart n'a pas été compilé dans l'environnement de développement (voir RELEASE_NOTES_v0.7.79).
