"use strict";

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const scriptPath = path.join(__dirname, "script.js");
const source = fs.readFileSync(scriptPath, "utf8");
const match = source.match(/const DEFAULT_QUESTIONS = (\[[\s\S]*?\r?\n\]);\r?\n\r?\nconst appRoot/);
const errors = [];

if (!match) {
  throw new Error("Nao foi possivel localizar DEFAULT_QUESTIONS em script.js.");
}

const sandbox = { questions: null };
vm.runInNewContext(`questions = ${match[1]}`, sandbox, { filename: scriptPath });

const questions = sandbox.questions;

if (!Array.isArray(questions) || questions.length === 0) {
  errors.push("O banco inicial do quiz precisa ter perguntas.");
} else {
  const ids = new Set();

  questions.forEach((question, index) => {
    const label = `Pergunta ${index + 1}`;
    const options = Array.isArray(question.options)
      ? question.options.map((option) => String(option).trim())
      : [];
    const normalizedOptions = options.map((option) => option.toLocaleLowerCase("pt-BR"));

    if (!question.id || ids.has(question.id)) errors.push(`${label}: id ausente ou repetido.`);
    ids.add(question.id);
    if (typeof question.prompt !== "string" || question.prompt.trim().length < 12) {
      errors.push(`${label}: enunciado muito curto.`);
    }
    if (options.length !== 4 || options.some((option) => !option)) {
      errors.push(`${label}: precisa ter quatro alternativas preenchidas.`);
    }
    if (new Set(normalizedOptions).size !== normalizedOptions.length) {
      errors.push(`${label}: existem alternativas repetidas.`);
    }
    if (!Number.isInteger(question.answer) || question.answer < 0 || question.answer >= options.length) {
      errors.push(`${label}: resposta correta fora do intervalo.`);
    }
    if (typeof question.explanation !== "string" || question.explanation.trim().length < 12) {
      errors.push(`${label}: explicacao muito curta.`);
    }
  });
}

if (errors.length) {
  console.error("Validacao do Quiz Portugues falhou:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log("Banco do Quiz Portugues validado com sucesso.");
