"use strict";

const THEME_STORAGE_KEY = "trilha-habilidades:theme";
const SETTINGS_STORAGE_KEY = "trilha-habilidades:settings";

const skills = [
  "Leitura e interpretação",
  "Ortografia",
  "Pontuação",
  "Classes de palavras",
  "Concordância",
  "Sinônimos e antônimos",
  "Acentuação",
  "Uso dos porquês",
  "Produção textual",
  "Coesão e coerência"
];

const questions = [
  {
    skill: "Leitura e interpretação",
    prompt: "Em um texto narrativo, quem conta os acontecimentos é chamado de:",
    options: ["Personagem", "Narrador", "Leitor", "Autor da capa"],
    answer: 1,
    explanation: "O narrador é a voz que apresenta os acontecimentos da narrativa."
  },
  {
    skill: "Leitura e interpretação",
    prompt: "Quando uma informação está escrita claramente no texto, ela é:",
    options: ["Implícita", "Contrária", "Explícita", "Inventada"],
    answer: 2,
    explanation: "Informação explícita aparece diretamente no texto."
  },
  {
    skill: "Ortografia",
    prompt: "Qual palavra está escrita corretamente?",
    options: ["Excessão", "Exceção", "Esceção", "Esseção"],
    answer: 1,
    explanation: "A escrita correta é exceção."
  },
  {
    skill: "Ortografia",
    prompt: "Complete: O aluno fez uma boa ___.",
    options: ["pesquiza", "pesquisa", "pezquisa", "pesquissa"],
    answer: 1,
    explanation: "A forma correta é pesquisa."
  },
  {
    skill: "Pontuação",
    prompt: "Qual sinal usamos ao final de uma pergunta direta?",
    options: ["Ponto final", "Vírgula", "Ponto de interrogação", "Dois-pontos"],
    answer: 2,
    explanation: "Perguntas diretas terminam com ponto de interrogação."
  },
  {
    skill: "Pontuação",
    prompt: "Na frase 'Maria, venha aqui', a vírgula separa:",
    options: ["Uma pergunta", "Um vocativo", "Uma data", "Uma resposta"],
    answer: 1,
    explanation: "Maria é o vocativo, termo usado para chamar alguém."
  },
  {
    skill: "Classes de palavras",
    prompt: "Na frase 'A casa azul é bonita', a palavra 'azul' é:",
    options: ["Substantivo", "Verbo", "Adjetivo", "Artigo"],
    answer: 2,
    explanation: "Azul caracteriza o substantivo casa, por isso é adjetivo."
  },
  {
    skill: "Classes de palavras",
    prompt: "Qual alternativa apresenta um verbo?",
    options: ["Feliz", "Correr", "Mesa", "Muito"],
    answer: 1,
    explanation: "Correr indica uma ação, portanto é verbo."
  },
  {
    skill: "Concordância",
    prompt: "Qual frase apresenta concordância correta?",
    options: ["Os menino brinca.", "As meninas cantam.", "A casas caiu.", "Nós estudou."],
    answer: 1,
    explanation: "Sujeito plural pede verbo no plural: as meninas cantam."
  },
  {
    skill: "Concordância",
    prompt: "Complete corretamente: Eles ___ cedo para a escola.",
    options: ["chega", "chegamos", "chegam", "cheguei"],
    answer: 2,
    explanation: "Com 'eles', usamos o verbo no plural: chegam."
  },
  {
    skill: "Sinônimos e antônimos",
    prompt: "Um sinônimo de 'alegre' é:",
    options: ["Triste", "Contente", "Lento", "Frio"],
    answer: 1,
    explanation: "Contente tem sentido parecido com alegre."
  },
  {
    skill: "Sinônimos e antônimos",
    prompt: "Um antônimo de 'claro' é:",
    options: ["Escuro", "Brilhante", "Limpo", "Leve"],
    answer: 0,
    explanation: "Escuro tem sentido contrário a claro."
  },
  {
    skill: "Acentuação",
    prompt: "Qual palavra precisa de acento?",
    options: ["Cafe", "Casa", "Mesa", "Livro"],
    answer: 0,
    explanation: "A forma correta é café."
  },
  {
    skill: "Acentuação",
    prompt: "Qual palavra está acentuada corretamente?",
    options: ["Arvore", "Árvore", "Aviao", "Ideia"],
    answer: 1,
    explanation: "Árvore é uma proparoxítona e recebe acento."
  },
  {
    skill: "Uso dos porquês",
    prompt: "Complete: Não fui à aula ___ estava doente.",
    options: ["por que", "por quê", "porque", "porquê"],
    answer: 2,
    explanation: "Porque é usado em respostas e explicações."
  },
  {
    skill: "Uso dos porquês",
    prompt: "Complete: ___ você chegou atrasado?",
    options: ["Por que", "Porque", "Porquê", "Por quê"],
    answer: 0,
    explanation: "Por que é usado no início de perguntas."
  },
  {
    skill: "Produção textual",
    prompt: "Antes de escrever um texto, é importante:",
    options: ["Apagar tudo", "Planejar as ideias", "Copiar sem ler", "Ignorar o tema"],
    answer: 1,
    explanation: "Planejar ajuda a organizar as ideias antes da escrita."
  },
  {
    skill: "Produção textual",
    prompt: "A revisão de um texto serve para:",
    options: ["Encontrar e corrigir problemas", "Tirar o título", "Mudar o autor", "Excluir todas as frases"],
    answer: 0,
    explanation: "Revisar permite melhorar clareza, escrita e organização."
  },
  {
    skill: "Coesão e coerência",
    prompt: "A palavra 'portanto' geralmente indica:",
    options: ["Conclusão", "Dúvida", "Lugar", "Personagem"],
    answer: 0,
    explanation: "Portanto introduz uma conclusão."
  },
  {
    skill: "Coesão e coerência",
    prompt: "Um texto coerente apresenta ideias:",
    options: ["Sem relação", "Organizadas e com sentido", "Sempre repetidas", "Todas contraditórias"],
    answer: 1,
    explanation: "Coerência é a relação lógica entre as ideias do texto."
  }
];

const board = document.querySelector("#board");
const rollButton = document.querySelector("#roll-button");
const orderButton = document.querySelector("#order-button");
const restartButton = document.querySelector("#restart-button");
const themeButton = document.querySelector("#theme-button");
const themeLabel = document.querySelector("#theme-label");
const themeColorMeta = document.querySelector('meta[name="theme-color"]');
const diceValue = document.querySelector("#dice-value");
const positionLabel = document.querySelector("#position-label");
const scoreLabel = document.querySelector("#score-label");
const progressFill = document.querySelector("#progress-fill");
const modal = document.querySelector("#question-modal");
const questionSkill = document.querySelector("#question-skill");
const questionNumber = document.querySelector("#question-number");
const questionTitle = document.querySelector("#question-title");
const optionsList = document.querySelector("#options-list");
const feedbackText = document.querySelector("#feedback-text");
const continueButton = document.querySelector("#continue-button");
const caravan = document.querySelector("#caravan");
const diceCube = document.querySelector("#dice-cube");
const startScreen = document.querySelector("#start-screen");
const startButton = document.querySelector("#start-button");
const settingsToggle = document.querySelector("#settings-toggle");
const settingsPanel = document.querySelector("#settings-panel");
const settingTheme = document.querySelector("#setting-theme");
const settingMusic = document.querySelector("#setting-music");
const settingSfx = document.querySelector("#setting-sfx");
const settingAnimations = document.querySelector("#setting-animations");
const settingDecorations = document.querySelector("#setting-decorations");
const settingLargeText = document.querySelector("#setting-large-text");

const tilePositions = [
  { x: 13.1, y: 85.4, rotate: 7 },
  { x: 24.6, y: 86.6, rotate: -6 },
  { x: 33, y: 73.2, rotate: -18 },
  { x: 29.2, y: 56.3, rotate: -18 },
  { x: 20.8, y: 42.2, rotate: -18 },
  { x: 22.9, y: 23.8, rotate: -15 },
  { x: 34, y: 17.2, rotate: -1 },
  { x: 45.3, y: 21.6, rotate: 10 },
  { x: 50.7, y: 37.8, rotate: 18 },
  { x: 53.1, y: 57.4, rotate: 15 },
  { x: 63.7, y: 57.9, rotate: -18 },
  { x: 66.5, y: 38.7, rotate: -18 },
  { x: 73, y: 22.6, rotate: -11 },
  { x: 84.3, y: 18.9, rotate: 5 },
  { x: 91.8, y: 32.7, rotate: 18 },
  { x: 87.4, y: 50.7, rotate: 18 },
  { x: 76.5, y: 57.9, rotate: 18 },
  { x: 69.7, y: 72.8, rotate: 18 },
  { x: 76.1, y: 87.1, rotate: 4 },
  { x: 87.4, y: 84.5, rotate: -8 }
];

const startPosition = { x: 7.9, y: 80.7 };
const tileColors = ["#f94144", "#f9c74f", "#43aa8b", "#4cc9f0", "#b565c0", "#f3722c"];

const state = {
  started: false,
  mode: "alternated",
  position: 0,
  previousPosition: 0,
  score: 0,
  answered: new Set(),
  activeQuestionIndex: -1,
  waitingForContinue: false,
  theme: "light"
};

const defaultSettings = {
  music: false,
  sfx: true,
  animations: true,
  decorations: true,
  largeText: false
};

const settings = { ...defaultSettings };
let audioContext = null;
let musicTimer = null;
let musicStep = 0;

const diceFaces = [1, 2, 3, 4, 5, 6];
const diceFaceClasses = diceFaces.map((face) => `show-${face}`);

function setDiceFace(value) {
  diceCube.classList.remove(...diceFaceClasses);
  diceCube.classList.add(`show-${value}`);
}

function saveSettings() {
  try {
    window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.warn("Nao foi possivel salvar as configuracoes.", error);
  }
}

function loadSettings() {
  try {
    const savedSettings = JSON.parse(window.localStorage.getItem(SETTINGS_STORAGE_KEY));
    if (savedSettings && typeof savedSettings === "object") {
      Object.assign(settings, defaultSettings, savedSettings);
    }
  } catch (error) {
    console.warn("Nao foi possivel carregar as configuracoes.", error);
  }
}

function updateSettingsUI() {
  if (settingTheme) {
    settingTheme.checked = state.theme === "dark";
  }

  if (settingMusic) {
    settingMusic.checked = settings.music;
  }

  if (settingSfx) {
    settingSfx.checked = settings.sfx;
  }

  if (settingAnimations) {
    settingAnimations.checked = settings.animations;
  }

  if (settingDecorations) {
    settingDecorations.checked = settings.decorations;
  }

  if (settingLargeText) {
    settingLargeText.checked = settings.largeText;
  }
}

function applySettingsClasses() {
  document.body.classList.toggle("reduce-motion", !settings.animations);
  document.body.classList.toggle("simple-decor", !settings.decorations);
  document.body.classList.toggle("large-text", settings.largeText);
}

function ensureAudioContext() {
  const AudioConstructor = window.AudioContext || window.webkitAudioContext;

  if (!AudioConstructor) {
    return null;
  }

  if (!audioContext) {
    audioContext = new AudioConstructor();
  }

  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  return audioContext;
}

function playTone(frequency, duration = 0.12, type = "sine", volume = 0.035, force = false) {
  if (!force && !settings.sfx) {
    return;
  }

  try {
    const context = ensureAudioContext();
    if (!context) {
      return;
    }
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const now = context.currentTime;

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + duration + 0.03);
  } catch (error) {
    console.warn("Nao foi possivel tocar o som.", error);
  }
}

function startMusic() {
  stopMusic();

  if (!settings.music) {
    return;
  }

  const notes = [392, 523.25, 587.33, 493.88, 440, 523.25];
  musicTimer = window.setInterval(() => {
    playTone(notes[musicStep % notes.length], 0.22, "triangle", 0.018, true);
    musicStep += 1;
  }, 900);
}

function stopMusic() {
  if (musicTimer) {
    window.clearInterval(musicTimer);
    musicTimer = null;
  }
}

function setSetting(key, value) {
  settings[key] = value;
  saveSettings();
  applySettingsClasses();
  updateSettingsUI();

  if (key === "music") {
    if (value) {
      ensureAudioContext();
      startMusic();
    } else {
      stopMusic();
    }
  }
}

function setTheme(theme, shouldSave = true) {
  state.theme = theme;
  if (shouldSave) {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, state.theme);
    } catch (error) {
      console.warn("Nao foi possivel salvar o tema.", error);
    }
  }
  renderAll();
}

function buildOrderedQuestions() {
  if (state.mode === "grouped") {
    return questions;
  }

  const bySkill = skills.map((skill) => questions.filter((question) => question.skill === skill));
  const ordered = [];

  for (let round = 0; round < 2; round += 1) {
    bySkill.forEach((skillQuestions) => {
      if (skillQuestions[round]) {
        ordered.push(skillQuestions[round]);
      }
    });
  }

  return ordered;
}

function getTrack() {
  return buildOrderedQuestions();
}

function renderBoard() {
  const track = getTrack();
  board.innerHTML = "";

  track.forEach((question, index) => {
    const position = tilePositions[index];
    const tile = document.createElement("li");
    const number = document.createElement("span");
    const skill = document.createElement("strong");
    const questionLabel = document.createElement("span");

    tile.className = "tile";
    tile.style.left = `${position.x}%`;
    tile.style.top = `${position.y}%`;
    tile.style.setProperty("--tile-rotate", `${position.rotate}deg`);
    tile.style.setProperty("--tile-color", tileColors[index % tileColors.length]);
    tile.classList.toggle("is-current", state.position === index + 1);
    tile.classList.toggle("is-complete", state.answered.has(index));

    number.className = "tile-number";
    number.textContent = String(index + 1);

    skill.className = "tile-skill";
    skill.textContent = question.skill;

    questionLabel.className = "tile-question";
    questionLabel.textContent = `Questão ${(index % 2) + 1}`;

    tile.append(number, skill, questionLabel);

    board.appendChild(tile);
  });

  renderCaravan();
}

function renderCaravan() {
  const position = state.position === 0 ? startPosition : tilePositions[state.position - 1];

  if (!position) {
    return;
  }

  caravan.style.left = `${position.x}%`;
  caravan.style.top = `${position.y}%`;
}

function animateCaravan() {
  caravan.classList.remove("is-moving");
  void caravan.offsetWidth;
  caravan.classList.add("is-moving");
}

function updateScore() {
  const total = getTrack().length;
  const progressPercent = Math.round((state.position / total) * 100);
  positionLabel.textContent = `Casa ${state.position} de ${total}`;
  scoreLabel.textContent = `${state.score} acerto${state.score === 1 ? "" : "s"}`;
  progressFill.style.width = `${progressPercent}%`;
}

function renderAll() {
  orderButton.textContent = state.mode === "alternated" ? "Modo alternado" : "Modo por habilidade";
  themeButton.setAttribute("aria-pressed", String(state.theme === "dark"));
  themeLabel.textContent = state.theme === "dark" ? "Tema claro" : "Tema dark";
  document.body.dataset.theme = state.theme;
  if (themeColorMeta) {
    themeColorMeta.setAttribute("content", state.theme === "dark" ? "#0d2b3c" : "#22577a");
  }
  applySettingsClasses();
  updateSettingsUI();
  renderBoard();
  updateScore();
}

function setStatus(title, text) {
  console.info(`${title}: ${text}`);
}

function rollDice() {
  if (!state.started || state.waitingForContinue) {
    return;
  }

  const track = getTrack();
  const roll = Math.floor(Math.random() * 6) + 1;
  playTone(196, 0.08, "square", 0.018);
  rollButton.disabled = true;
  diceValue.textContent = "...";
  diceCube.classList.remove("is-rolling");
  void diceCube.offsetWidth;
  diceCube.classList.add("is-rolling");

  let tick = 0;
  const tickTimer = window.setInterval(() => {
    setDiceFace(diceFaces[tick % diceFaces.length]);
    tick += 1;
  }, 95);

  window.setTimeout(() => {
    window.clearInterval(tickTimer);
    diceCube.classList.remove("is-rolling");
    setDiceFace(roll);
    diceValue.textContent = String(roll);
    playTone(330 + roll * 28, 0.14, "triangle", 0.03);

    state.previousPosition = state.position;
    state.position = Math.min(state.position + roll, track.length);

    renderAll();
    animateCaravan();

    if (state.position === 0) {
      rollButton.disabled = false;
      return;
    }

    window.setTimeout(() => openQuestion(state.position - 1), 560);
  }, 1080);
}

function openQuestion(index) {
  const question = getTrack()[index];

  if (!question) {
    finishGame();
    return;
  }

  state.activeQuestionIndex = index;
  state.waitingForContinue = true;
  rollButton.disabled = true;
  questionSkill.textContent = question.skill;
  questionNumber.textContent = `Casa ${index + 1}`;
  questionTitle.textContent = question.prompt;
  feedbackText.textContent = "";
  continueButton.hidden = true;
  optionsList.innerHTML = "";

  question.options.forEach((option, optionIndex) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-button";
    button.textContent = `${String.fromCharCode(65 + optionIndex)}) ${option}`;
    button.addEventListener("click", () => answerQuestion(optionIndex));
    optionsList.appendChild(button);
  });

  modal.hidden = false;
}

function answerQuestion(selectedIndex) {
  const question = getTrack()[state.activeQuestionIndex];
  const isCorrect = selectedIndex === question.answer;
  const optionButtons = [...optionsList.querySelectorAll(".option-button")];

  optionButtons.forEach((button, index) => {
    button.disabled = true;
    button.classList.toggle("is-correct", index === question.answer);
    button.classList.toggle("is-wrong", index === selectedIndex && !isCorrect);
  });

  if (isCorrect) {
    if (!state.answered.has(state.activeQuestionIndex)) {
      state.score += 1;
      state.answered.add(state.activeQuestionIndex);
    }

    feedbackText.textContent = `Acertou! ${question.explanation} Você permanece na casa ${state.position}.`;
    playTone(523.25, 0.12, "triangle", 0.035);
    window.setTimeout(() => playTone(659.25, 0.14, "triangle", 0.03), 110);
    setStatus("Resposta correta", `Você ficou na casa ${state.position}. Agora pode jogar o dado novamente.`);
  } else {
    state.position = state.previousPosition;
    feedbackText.textContent = `Ainda não. ${question.explanation} Você volta para a casa ${state.position}.`;
    playTone(220, 0.14, "sawtooth", 0.02);
    setStatus("Voltou uma jogada", `Você retornou para a casa ${state.position}. Jogue de novo para tentar avançar.`);
  }

  continueButton.hidden = false;
  renderAll();
}

function closeQuestion() {
  modal.hidden = true;
  state.activeQuestionIndex = -1;
  state.waitingForContinue = false;
  rollButton.disabled = false;

  if (state.position >= getTrack().length && state.answered.has(getTrack().length - 1)) {
    finishGame();
  }
}

function finishGame() {
  setStatus("Fim da trilha", `Você chegou ao final com ${state.score} acerto${state.score === 1 ? "" : "s"}.`);
  rollButton.disabled = true;
}

function toggleMode() {
  state.mode = state.mode === "alternated" ? "grouped" : "alternated";
  restartGame();
}

function restartGame() {
  state.position = 0;
  state.previousPosition = 0;
  state.score = 0;
  state.answered = new Set();
  state.activeQuestionIndex = -1;
  state.waitingForContinue = false;
  diceValue.textContent = "-";
  setDiceFace(1);
  diceCube.classList.remove("is-rolling");
  rollButton.disabled = !state.started;
  modal.hidden = true;
  setStatus("Pronto para começar", "Jogue o dado. Ao cair em uma casa, a pergunta daquela habilidade aparece automaticamente.");
  renderAll();
}

function toggleTheme() {
  setTheme(state.theme === "dark" ? "light" : "dark");
}

function loadTheme() {
  try {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === "light" || savedTheme === "dark") {
      state.theme = savedTheme;
    }
  } catch (error) {
    console.warn("Nao foi possivel carregar o tema.", error);
  }
}

function startGame() {
  state.started = true;
  startScreen.hidden = true;
  settingsPanel.hidden = true;
  settingsToggle.setAttribute("aria-expanded", "false");
  rollButton.disabled = false;
  playTone(440, 0.12, "triangle", 0.03);
  window.setTimeout(() => playTone(587.33, 0.14, "triangle", 0.03), 120);

  if (settings.music) {
    ensureAudioContext();
    startMusic();
  }
}

function toggleSettingsPanel() {
  const isOpen = settingsPanel.hidden;
  settingsPanel.hidden = !isOpen;
  settingsToggle.setAttribute("aria-expanded", String(isOpen));
}

rollButton.addEventListener("click", rollDice);
orderButton.addEventListener("click", toggleMode);
restartButton.addEventListener("click", restartGame);
themeButton.addEventListener("click", toggleTheme);
continueButton.addEventListener("click", closeQuestion);
startButton.addEventListener("click", startGame);
settingsToggle.addEventListener("click", toggleSettingsPanel);
settingTheme.addEventListener("change", () => setTheme(settingTheme.checked ? "dark" : "light"));
settingMusic.addEventListener("change", () => setSetting("music", settingMusic.checked));
settingSfx.addEventListener("change", () => setSetting("sfx", settingSfx.checked));
settingAnimations.addEventListener("change", () => setSetting("animations", settingAnimations.checked));
settingDecorations.addEventListener("change", () => setSetting("decorations", settingDecorations.checked));
settingLargeText.addEventListener("change", () => setSetting("largeText", settingLargeText.checked));

loadTheme();
loadSettings();
renderAll();
