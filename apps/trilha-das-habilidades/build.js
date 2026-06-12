"use strict";

const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const destination = path.join(root, "dist");
const runtimeFiles = ["index.html", "style.css", "script.js", "game-data.js"];

fs.rmSync(destination, { recursive: true, force: true });
fs.mkdirSync(destination, { recursive: true });

runtimeFiles.forEach((filename) => {
  const source = path.join(root, filename);
  const target = path.join(destination, filename);

  if (!fs.existsSync(source)) {
    throw new Error(`Arquivo necessario para publicacao nao encontrado: ${filename}`);
  }

  fs.copyFileSync(source, target);
});

fs.writeFileSync(path.join(destination, ".nojekyll"), "", "utf8");
console.log(`Trilha pronta para publicacao em ${destination}.`);
