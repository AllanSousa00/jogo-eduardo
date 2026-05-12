"use strict";

const { spawnSync } = require("node:child_process");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

const checks = [
  ["Conferindo JavaScript da trilha", ["--check", path.join(root, "Trilha-das-Habilidades", "script.js")]],
  ["Conferindo dados da trilha", ["--check", path.join(root, "Trilha-das-Habilidades", "data.js")]],
  ["Conferindo JavaScript do quiz", ["--check", path.join(root, "Quiz-Portugues", "script.js")]],
  ["Validando banco da trilha", [path.join(root, "tools", "validate-trilha-data.js")]]
];

for (const [title, args] of checks) {
  console.log(`\n${title}`);
  const result = spawnSync(process.execPath, args, {
    cwd: root,
    encoding: "utf8",
    stdio: "inherit"
  });

  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}

console.log("\nChecklist automatico concluido com sucesso.");
