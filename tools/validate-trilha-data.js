"use strict";

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const dataPath = path.join(root, "Trilha-das-Habilidades", "data.js");
const source = fs.readFileSync(dataPath, "utf8");
const sandbox = { window: {} };
const errors = [];

vm.runInNewContext(source, sandbox, { filename: dataPath });

const data = sandbox.window.TRILHA_DATA;

function fail(message) {
  errors.push(message);
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

if (!isPlainObject(data)) {
  fail("TRILHA_DATA precisa existir e ser um objeto.");
} else {
  const skills = Array.isArray(data.skills) ? data.skills : [];
  const skillNames = skills.map((skill) => skill && skill.name).filter(Boolean);
  const uniqueSkills = new Set(skillNames);
  const questions = Array.isArray(data.questions) ? data.questions : [];
  const questionTypes = isPlainObject(data.questionTypes) ? data.questionTypes : {};
  const allowedTypes = new Set(Object.keys(questionTypes));
  const questionsPerSkill = Math.max(1, Number(data.questionsPerSkill) || 0);
  const expectedTrackSize = skillNames.length * questionsPerSkill;

  if (!skillNames.length) {
    fail("Cadastre pelo menos uma habilidade.");
  }

  if (uniqueSkills.size !== skillNames.length) {
    fail("Existem habilidades repetidas.");
  }

  if (!allowedTypes.size) {
    fail("Cadastre os tipos de pergunta em questionTypes.");
  }

  if (!Array.isArray(data.tilePositions) || data.tilePositions.length < expectedTrackSize) {
    fail(`A trilha precisa de pelo menos ${expectedTrackSize} posicoes de casas.`);
  }

  questions.forEach((question, index) => {
    const label = `Pergunta ${index + 1}`;

    if (!uniqueSkills.has(question.skill)) {
      fail(`${label}: habilidade "${question.skill}" nao existe em skills.`);
    }

    if (!allowedTypes.has(question.type)) {
      fail(`${label}: tipo "${question.type}" nao existe em questionTypes.`);
    }

    if (!["facil", "fácil", "medio", "médio", "média", "dificil", "difícil"].includes(question.difficulty)) {
      fail(`${label}: dificuldade deve ser facil/medio/dificil ou facil com acento.`);
    }

    if (typeof question.prompt !== "string" || question.prompt.trim().length < 12) {
      fail(`${label}: enunciado muito curto.`);
    }

    if (!Array.isArray(question.options) || question.options.length < 2) {
      fail(`${label}: precisa de pelo menos duas alternativas.`);
    }

    if (!Number.isInteger(question.answer) || question.answer < 0 || question.answer >= question.options.length) {
      fail(`${label}: resposta correta fora do intervalo de alternativas.`);
    }

    if (typeof question.explanation !== "string" || question.explanation.trim().length < 12) {
      fail(`${label}: explicacao muito curta.`);
    }
  });

  skillNames.forEach((skill) => {
    const count = questions.filter((question) => question.skill === skill).length;
    if (count < questionsPerSkill) {
      fail(`A habilidade "${skill}" tem ${count} pergunta(s), mas precisa de ${questionsPerSkill}.`);
    }
  });
}

if (errors.length) {
  console.error("Validacao da Trilha das Habilidades falhou:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log("Validacao da Trilha das Habilidades concluida com sucesso.");
