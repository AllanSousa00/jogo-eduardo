"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { applications } = require("./project-map");

const root = path.resolve(__dirname, "..");
const errors = [];
const portal = applications.find(({ id }) => id === "portal");
const quiz = applications.find(({ id }) => id === "quiz");
const trilha = applications.find(({ id }) => id === "trilha");

if (!portal || portal.publicDirectory !== "") {
  errors.push("O portal de entrada deve ser publicado na raiz do site.");
}

const files = {
  portalPage: `${portal.sourceDirectory}/index.html`,
  quizPage: `${quiz.sourceDirectory}/index.html`,
  quizScript: `${quiz.sourceDirectory}/script.js`,
  trailPage: `${trilha.sourceDirectory}/index.html`,
  trailScript: `${trilha.sourceDirectory}/script.js`
};

const requiredFragments = {
  portalPage: [
    'href="./Quiz-Portugues/"',
    'href="./Trilha-das-Habilidades/"',
    "Uso restrito",
    "Créditos",
    "allancruzsousa519@gmail.com",
    "Solicitação de acesso"
  ],
  quizPage: ['id="start-button"', 'id="teacher-mode-button"', 'id="teacher-modal"'],
  quizScript: ['"quiz-portugues-jogo:state-v2"', "exportQuestionsJson", "importQuestionsFromFile"],
  trailPage: ['id="roll-button"', 'id="question-modal"', 'id="victory-modal"'],
  trailScript: ['"trilha-habilidades:theme"', '"trilha-habilidades:settings"', "rollDice", "answerQuestion"]
};

const forbiddenFragments = {
  quizPage: ["../shared/", "../trilha-das-habilidades", "Trilha das Habilidades"],
  trailPage: ["../shared/", "../quiz-portugues", "Quiz Português"]
};

Object.entries(files).forEach(([name, relativePath]) => {
  const absolutePath = path.join(root, relativePath);

  if (!fs.existsSync(absolutePath)) {
    errors.push(`Arquivo publico ausente: ${relativePath}.`);
    return;
  }

  const contents = fs.readFileSync(absolutePath, "utf8");
  requiredFragments[name].forEach((fragment) => {
    if (!contents.includes(fragment)) {
      errors.push(`Contrato ausente em ${relativePath}: ${fragment}.`);
    }
  });

  (forbiddenFragments[name] || []).forEach((fragment) => {
    if (contents.includes(fragment)) {
      errors.push(`Projeto nao independente em ${relativePath}: referencia ${fragment}.`);
    }
  });
});

if (errors.length) {
  console.error("Validacao do contrato publico falhou:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(
  "Contrato preservado: portal unico, jogos independentes, controles e chaves de armazenamento encontrados."
);
