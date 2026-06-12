"use strict";

const applications = [
  {
    id: "portal",
    sourceDirectory: "apps/portal",
    publicDirectory: "",
    runtimeFiles: ["index.html", "style.css"]
  },
  {
    id: "quiz",
    sourceDirectory: "apps/quiz-portugues",
    publicDirectory: "Quiz-Portugues",
    runtimeFiles: ["index.html", "style.css", "script.js", "viewport-fit.js"]
  },
  {
    id: "trilha",
    sourceDirectory: "apps/trilha-das-habilidades",
    publicDirectory: "Trilha-das-Habilidades",
    runtimeFiles: ["index.html", "style.css", "script.js", "game-data.js"]
  }
];

module.exports = { applications };
