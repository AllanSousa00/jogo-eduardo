"use strict";

const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const destination = path.join(root, "dist");
const publishedEntries = [
  "LICENSE",
  "README.md",
  "Quiz-Portugues",
  "Trilha-das-Habilidades",
  path.join("docs", "media")
];

fs.rmSync(destination, { recursive: true, force: true });
fs.mkdirSync(destination, { recursive: true });

publishedEntries.forEach((entry) => {
  const source = path.join(root, entry);
  const target = path.join(destination, entry);

  if (!fs.existsSync(source)) {
    throw new Error(`Entrada necessaria para publicacao nao encontrada: ${entry}`);
  }

  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.cpSync(source, target, { recursive: true });
});

console.log(`Build estatico concluido em ${destination}.`);
