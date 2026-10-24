// Construit les fichiers à publier dans une release GitHub : dist/index.json + dist/<id>-<version>.bkl.
// Usage : node scripts/build-release.mjs   (Node 22+, aucune dépendance)
// Le Studio et le Bridge revalident chaque bibliothèque à l'installation ; ce script refuse déjà les erreurs grossières.
import { createHash } from "node:crypto";
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const PERMISSIONS = ["reseau", "fichiers", "presse-papiers", "impression", "audio", "stockage"];
rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

const entries = [];
for (const file of readdirSync(path.join(root, "libraries")).filter((f) => f.endsWith(".bkl")).sort()) {
  const lib = JSON.parse(readFileSync(path.join(root, "libraries", file), "utf8"));
  const where = `libraries/${file}`;
  if (lib.format !== "berkios-library/1") throw new Error(`${where} : format inattendu`);
  if (!/^[a-z][a-z0-9_-]{1,39}$/.test(lib.id) || `${lib.id}.bkl` !== file) throw new Error(`${where} : l'id doit être celui du fichier`);
  if (!/^\d+\.\d+\.\d+$/.test(lib.version)) throw new Error(`${where} : version invalide`);
  for (const p of lib.permissions ?? []) if (!PERMISSIONS.includes(p)) throw new Error(`${where} : permission inconnue ${p}`);
  if (!Array.isArray(lib.commands) || !lib.commands.length) throw new Error(`${where} : aucune commande`);
  const bytes = Buffer.from(JSON.stringify(lib), "utf8");
  const name = `${lib.id}-${lib.version}.bkl`;
  writeFileSync(path.join(dist, name), bytes);
  entries.push({ id: lib.id, version: lib.version, title: lib.title, description: lib.description ?? "", permissions: lib.permissions ?? [], url: name, sha256: createHash("sha256").update(bytes).digest("hex") });
}
writeFileSync(path.join(dist, "index.json"), JSON.stringify({ format: "berkios-library-index/1", generatedAt: new Date().toISOString(), libraries: entries }, null, 2));
console.log(`✓ ${entries.length} bibliothèque(s) : ${entries.map((e) => `${e.id}@${e.version}`).join(", ")}`);
