// Vérifie que la release construite est cohérente : catalogue, fichiers, empreintes SHA-256.
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
execFileSync(process.execPath, [path.join(root, "scripts", "build-release.mjs")], { cwd: root, stdio: "pipe" });
const dist = path.join(root, "dist");
const index = JSON.parse(readFileSync(path.join(dist, "index.json"), "utf8"));

test("le catalogue a le bon format et au moins une bibliothèque", () => {
  assert.equal(index.format, "berkios-library-index/1");
  assert.ok(index.libraries.length >= 1);
});

test("chaque entrée pointe un fichier .bkl dont l'empreinte SHA-256 correspond", () => {
  for (const entry of index.libraries) {
    assert.equal(entry.url, `${entry.id}-${entry.version}.bkl`);
    const bytes = readFileSync(path.join(dist, entry.url));
    assert.equal(createHash("sha256").update(bytes).digest("hex"), entry.sha256, entry.id);
    const lib = JSON.parse(bytes.toString("utf8"));
    assert.equal(lib.id, entry.id);
    assert.equal(lib.version, entry.version);
  }
});

test("chaque bibliothèque de libraries/ est dans le catalogue", () => {
  const sources = readdirSync(path.join(root, "libraries")).filter((f) => f.endsWith(".bkl")).map((f) => f.slice(0, -4)).sort();
  assert.deepEqual(index.libraries.map((e) => e.id).sort(), sources);
});

test("les noms de commandes ne sont pas dupliqués dans une même bibliothèque", () => {
  for (const file of readdirSync(path.join(root, "libraries")).filter((f) => f.endsWith(".bkl"))) {
    const lib = JSON.parse(readFileSync(path.join(root, "libraries", file), "utf8"));
    const names = lib.commands.flatMap((c) => c.names.map((n) => n.toLowerCase()));
    assert.equal(new Set(names).size, names.length, `${file} : nom de commande en double`);
  }
});
