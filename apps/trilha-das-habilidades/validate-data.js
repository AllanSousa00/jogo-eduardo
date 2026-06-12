"use strict";

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const dataPath = path.join(__dirname, "game-data.js");
const source = fs.readFileSync(dataPath, "utf8");
const sandbox = { window: {} };
const errors = [];

vm.runInNewContext(source, sandbox, { filename: dataPath });

const data = sandbox.window.TRILHA_DATA;

function fail(message) {
  errors.push(message);
}

if (!data || typeof data !== "object" || Array.isArray(data)) {
  fail("TRILHA_DATA precisa existir e ser um objeto.");
} else {
  const skills = Array.isArray(data.skills) ? data.skills : [];
  const skillNames = skills.map((skill) => skill && skill.name).filter(Boolean);
  const uniqueSkills = new Set(skillNames);
  const questions = Array.isArray(data.questions) ? data.questions : [];
  const allowedTypes = new Set(Object.keys(data.questionTypes || {}));
  const questionsPerSkill = Math.max(1, Number(data.questionsPerSkill) || 0);
  const expectedTrackSize = skillNames.length * questionsPerSkill;

  if (!skillNames.length) fail("Cadastre pelo menos uma habilidade.");
  if (uniqueSkills.size !== skillNames.length) fail("Existem habilidades repetidas.");
  if (!allowedTypes.size) fail("Cadastre os tipos de pergunta em questionTypes.");
  if (!Array.isArray(data.tilePositions) || data.tilePositions.length < expectedTrackSize) {
    fail(`A trilha precisa de pelo menos ${expectedTrackSize} posicoes de casas.`);
  }

  questions.forEach((question, index) => {
    const label = `Pergunta ${index + 1}`;
    const normalizedOptions = Array.isArray(question.options)
      ? question.options.map((option) => String(option).trim().toLocaleLowerCase("pt-BR"))
      : [];

    if (!uniqueSkills.has(question.skill)) fail(`${label}: habilidade invalida.`);
    if (!allowedTypes.has(question.type)) fail(`${label}: tipo invalido.`);
    if (!["facil", "fácil", "medio", "médio", "média", "dificil", "difícil"].includes(question.difficulty)) {
      fail(`${label}: dificuldade invalida.`);
    }
    if (typeof question.prompt !== "string" || question.prompt.trim().length < 12) {
      fail(`${label}: enunciado muito curto.`);
    }
    if (normalizedOptions.length < 2) fail(`${label}: alternativas insuficientes.`);
    if (new Set(normalizedOptions).size !== normalizedOptions.length) {
      fail(`${label}: existem alternativas repetidas.`);
    }
    if (
      !Number.isInteger(question.answer) ||
      question.answer < 0 ||
      question.answer >= normalizedOptions.length
    ) {
      fail(`${label}: resposta correta fora do intervalo.`);
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

console.log("Banco da Trilha das Habilidades validado com sucesso.");
