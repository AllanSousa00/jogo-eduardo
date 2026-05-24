"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { applications } = require("./project-map");

const root = path.resolve(__dirname, "..");
const destination = path.join(root, "dist");

fs.rmSync(destination, { recursive: true, force: true });
fs.mkdirSync(destination, { recursive: true });

applications.forEach(({ sourceDirectory, publicDirectory, runtimeFiles }) => {
  runtimeFiles.forEach((filename) => {
    const source = path.join(root, sourceDirectory, filename);
    const target = path.join(destination, publicDirectory, filename);

    if (!fs.existsSync(source)) {
      throw new Error(`Arquivo necessario para publicacao nao encontrado: ${sourceDirectory}/${filename}`);
    }

    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(source, target);
  });
});

console.log(`Build estatico concluido em ${destination}.`);
