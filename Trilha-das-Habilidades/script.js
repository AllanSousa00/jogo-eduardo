"use strict";

const THEME_STORAGE_KEY = "trilha-habilidades:theme";
const SETTINGS_STORAGE_KEY = "trilha-habilidades:settings";

const trilhaData = window.TRILHA_DATA || {};
const questionTypes = trilhaData.questionTypes || {};
const skillsMeta = Array.isArray(trilhaData.skills) ? trilhaData.skills : [];
const skills = skillsMeta.map((skill) => (typeof skill === "string" ? skill : skill.name)).filter(Boolean);
const skillIconMap = new Map(
  skillsMeta
    .filter((skill) => skill && typeof skill === "object")
    .map((skill) => [skill.name, skill.icon || skill.name.slice(0, 2).toUpperCase()])
);
const questions = Array.isArray(trilhaData.questions) ? trilhaData.questions : [];
const tilePositions = Array.isArray(trilhaData.tilePositions) ? trilhaData.tilePositions : [];
const startPosition = trilhaData.startPosition || { x: 7.9, y: 80.7 };
const tileColors = Array.isArray(trilhaData.tileColors)
  ? trilhaData.tileColors
  : ["#ef476f", "#ffd166", "#43aa8b", "#4cc9f0", "#b565c0", "#f3722c"];
const questionsPerSkill = Math.max(1, Number(trilhaData.questionsPerSkill) || 2);

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
const questionType = document.querySelector("#question-type");
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
const settingHighContrast = document.querySelector("#setting-high-contrast");
const settingSpeech = document.querySelector("#setting-speech");
const settingMuted = document.querySelector("#setting-muted");
const fullscreenButton = document.querySelector("#fullscreen-button");
const srStatus = document.querySelector("#sr-status");
const victoryModal = document.querySelector("#victory-modal");
const victoryCard = document.querySelector(".victory-card");
const victorySummary = document.querySelector("#victory-summary");
const skillSummary = document.querySelector("#skill-summary");
const victoryRestartButton = document.querySelector("#victory-restart-button");
const victoryCloseButton = document.querySelector("#victory-close-button");

const state = {
  started: false,
  mode: "alternated",
  position: 0,
  previousPosition: 0,
  score: 0,
  answered: new Set(),
  skillStats: {},
  history: [],
  activeQuestionIndex: -1,
  waitingForContinue: false,
  theme: "light"
};

const defaultSettings = {
  music: false,
  sfx: true,
  animations: true,
  decorations: true,
  largeText: false,
  highContrast: false,
  speech: false,
  muted: false
};

const settings = { ...defaultSettings };
let audioContext = null;
let musicTimer = null;
let musicStep = 0;
let activeTrack = [];

const diceFaces = [1, 2, 3, 4, 5, 6];
const diceFaceClasses = diceFaces.map((face) => `show-${face}`);

function setDiceFace(value) {
  diceCube.classList.remove(...diceFaceClasses);
  diceCube.classList.add(`show-${value}`);
}

function shuffleList(items) {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
  }

  return result;
}

function createSkillStats() {
  return skills.reduce((stats, skill) => {
    stats[skill] = { right: 0, wrong: 0 };
    return stats;
  }, {});
}

function getSkillIcon(skill) {
  return skillIconMap.get(skill) || skill.slice(0, 2).toUpperCase();
}

function getQuestionTypeLabel(question) {
  return questionTypes[question.type] || "Múltipla escolha";
}

function announce(message) {
  if (srStatus) {
    srStatus.textContent = message;
  }
}

function speak(message) {
  if (!settings.speech || settings.muted || !("speechSynthesis" in window)) {
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.lang = "pt-BR";
  utterance.rate = 0.95;
  window.speechSynthesis.speak(utterance);
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

  if (settingHighContrast) {
    settingHighContrast.checked = settings.highContrast;
  }

  if (settingSpeech) {
    settingSpeech.checked = settings.speech;
  }

  if (settingMuted) {
    settingMuted.checked = settings.muted;
  }
}

function applySettingsClasses() {
  document.body.classList.toggle("reduce-motion", !settings.animations);
  document.body.classList.toggle("simple-decor", !settings.decorations);
  document.body.classList.toggle("large-text", settings.largeText);
  document.body.classList.toggle("high-contrast", settings.highContrast);
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
  if (settings.muted || (!force && !settings.sfx)) {
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

  if (!settings.music || settings.muted) {
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

  if (key === "muted" && value) {
    stopMusic();
    window.speechSynthesis?.cancel();
  }

  if (key === "music" || key === "muted") {
    if (settings.music && !settings.muted) {
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
  const bySkill = skills.map((skill) => (
    shuffleList(questions.filter((question) => question.skill === skill)).slice(0, questionsPerSkill)
  ));

  if (state.mode === "grouped") {
    return bySkill.flat();
  }

  const ordered = [];

  for (let round = 0; round < questionsPerSkill; round += 1) {
    bySkill.forEach((skillQuestions) => {
      if (skillQuestions[round]) {
        ordered.push(skillQuestions[round]);
      }
    });
  }

  return ordered;
}

function resetTrack() {
  activeTrack = buildOrderedQuestions();
}

function getTrack() {
  if (!activeTrack.length) {
    resetTrack();
  }

  return activeTrack;
}

function recordSkillResult(question, isCorrect) {
  if (!state.skillStats[question.skill]) {
    state.skillStats[question.skill] = { right: 0, wrong: 0 };
  }

  state.skillStats[question.skill][isCorrect ? "right" : "wrong"] += 1;
}

function renderBoard() {
  const track = getTrack();
  board.innerHTML = "";

  track.forEach((question, index) => {
    const position = tilePositions[index];
    const tile = document.createElement("li");
    const icon = document.createElement("span");
    const number = document.createElement("span");
    const skill = document.createElement("strong");
    const questionLabel = document.createElement("span");

    if (!position) {
      return;
    }

    tile.className = "tile";
    tile.dataset.skill = question.skill;
    tile.style.left = `${position.x}%`;
    tile.style.top = `${position.y}%`;
    tile.style.setProperty("--tile-rotate", `${position.rotate}deg`);
    tile.style.setProperty("--tile-color", tileColors[index % tileColors.length]);
    tile.classList.toggle("is-current", state.position === index + 1);
    tile.classList.toggle("is-complete", state.answered.has(index));
    tile.classList.toggle("is-completed", state.answered.has(index));
    tile.setAttribute("aria-label", `Casa ${index + 1}. ${question.skill}. ${getQuestionTypeLabel(question)}.`);

    icon.className = "tile-icon";
    icon.textContent = getSkillIcon(question.skill);

    number.className = "tile-number";
    number.textContent = String(index + 1);

    skill.className = "tile-skill";
    skill.textContent = question.skill;

    questionLabel.className = "tile-question";
    questionLabel.textContent = getQuestionTypeLabel(question);

    tile.append(icon, number, skill, questionLabel);

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
  scoreLabel.classList.remove("score-pop");
  void scoreLabel.offsetWidth;
  scoreLabel.classList.add("score-pop");
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
  announce(`${title}. ${text}`);
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
    state.history.push({
      type: "roll",
      roll,
      from: state.previousPosition,
      to: state.position,
      time: new Date().toISOString()
    });
    announce(`Dado caiu em ${roll}. Caravana avançou para a casa ${state.position}.`);

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
  questionType.textContent = getQuestionTypeLabel(question);
  questionTitle.textContent = question.prompt;
  feedbackText.textContent = "";
  continueButton.hidden = true;
  optionsList.innerHTML = "";

  question.options.forEach((option, optionIndex) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-button";
    button.textContent = `${String.fromCharCode(65 + optionIndex)}) ${option}`;
    button.setAttribute("aria-label", `Alternativa ${String.fromCharCode(65 + optionIndex)}: ${option}`);
    button.addEventListener("click", () => answerQuestion(optionIndex));
    optionsList.appendChild(button);
  });

  modal.hidden = false;
  modal.querySelector(".question-card")?.focus();
  speak(`${question.skill}. ${getQuestionTypeLabel(question)}. ${question.prompt}. ${question.options.join(". ")}`);
  announce(`Pergunta aberta. ${question.skill}. ${getQuestionTypeLabel(question)}.`);
}

function answerQuestion(selectedIndex) {
  const question = getTrack()[state.activeQuestionIndex];
  const isCorrect = selectedIndex === question.answer;
  const optionButtons = [...optionsList.querySelectorAll(".option-button")];
  const currentHouse = state.position;

  recordSkillResult(question, isCorrect);

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

  state.history.push({
    type: "answer",
    house: currentHouse,
    skill: question.skill,
    questionType: question.type,
    correct: isCorrect,
    selectedIndex,
    time: new Date().toISOString()
  });

  continueButton.hidden = false;
  renderAll();
  speak(feedbackText.textContent);
  continueButton.focus();
}

function closeQuestion() {
  modal.hidden = true;
  state.activeQuestionIndex = -1;
  state.waitingForContinue = false;
  rollButton.disabled = false;

  if (state.position >= getTrack().length && state.answered.has(getTrack().length - 1)) {
    finishGame();
  } else {
    rollButton.focus();
  }
}

function showVictory() {
  const total = getTrack().length;
  const accuracy = total ? Math.round((state.score / total) * 100) : 0;
  victorySummary.textContent = `A caravana chegou ao final com ${state.score} de ${total} acertos (${accuracy}%).`;
  skillSummary.innerHTML = "";

  skills.forEach((skill) => {
    const stat = state.skillStats[skill] || { right: 0, wrong: 0 };
    const item = document.createElement("div");
    item.className = "skill-summary__item";
    item.innerHTML = `
      <span>${getSkillIcon(skill)}</span>
      <strong>${skill}</strong>
      <em>${stat.right} acerto${stat.right === 1 ? "" : "s"} / ${stat.wrong} erro${stat.wrong === 1 ? "" : "s"}</em>
    `;
    skillSummary.appendChild(item);
  });

  victoryModal.hidden = false;
  victoryCard.focus();
  speak(`Chegada alcançada. Resultado final: ${state.score} de ${total} acertos.`);
}

function hideVictory() {
  victoryModal.hidden = true;
}

function finishGame() {
  setStatus("Fim da trilha", `Você chegou ao final com ${state.score} acerto${state.score === 1 ? "" : "s"}.`);
  rollButton.disabled = true;
  showVictory();
}

function toggleMode() {
  state.mode = state.mode === "alternated" ? "grouped" : "alternated";
  restartGame();
}

function restartGame() {
  resetTrack();
  state.position = 0;
  state.previousPosition = 0;
  state.score = 0;
  state.answered = new Set();
  state.skillStats = createSkillStats();
  state.history = [];
  state.activeQuestionIndex = -1;
  state.waitingForContinue = false;
  diceValue.textContent = "-";
  setDiceFace(1);
  diceCube.classList.remove("is-rolling");
  rollButton.disabled = !state.started;
  modal.hidden = true;
  hideVictory();
  setStatus("Pronto para começar", "Jogue o dado. Ao cair em uma casa, a pergunta daquela habilidade aparece automaticamente.");
  renderAll();
}

function toggleTheme() {
  setTheme(state.theme === "dark" ? "light" : "dark");
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen?.();
    announce("Tela cheia ativada.");
    return;
  }

  document.exitFullscreen?.();
  announce("Tela cheia desativada.");
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
  if (!activeTrack.length) {
    resetTrack();
  }
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

  rollButton.focus();
}

function toggleSettingsPanel() {
  const isOpen = settingsPanel.hidden;
  settingsPanel.hidden = !isOpen;
  settingsToggle.setAttribute("aria-expanded", String(isOpen));
}

function handleKeyboardShortcuts(event) {
  const tagName = document.activeElement?.tagName;
  const isTyping = ["INPUT", "TEXTAREA", "SELECT"].includes(tagName);

  if (event.altKey || event.ctrlKey || event.metaKey || isTyping) {
    return;
  }

  if (!modal.hidden && /^[1-4]$/.test(event.key)) {
    const option = optionsList.querySelectorAll(".option-button")[Number(event.key) - 1];
    option?.click();
    event.preventDefault();
    return;
  }

  if (event.key === "Escape") {
    if (!settingsPanel.hidden) {
      toggleSettingsPanel();
      settingsToggle.focus();
      event.preventDefault();
      return;
    }

    if (!victoryModal.hidden) {
      hideVictory();
      restartButton.focus();
      event.preventDefault();
      return;
    }
  }

  if (!state.started) {
    if (event.key === "Enter" || event.key === " ") {
      startGame();
      event.preventDefault();
    }
    return;
  }

  const key = event.key.toLowerCase();
  if ((event.key === " " || key === "d") && !rollButton.disabled) {
    rollDice();
    event.preventDefault();
  } else if (key === "r") {
    restartGame();
    event.preventDefault();
  } else if (key === "t") {
    toggleTheme();
    event.preventDefault();
  } else if (key === "f") {
    toggleFullscreen();
    event.preventDefault();
  } else if (key === "m") {
    setSetting("muted", !settings.muted);
    event.preventDefault();
  }
}

rollButton.addEventListener("click", rollDice);
orderButton.addEventListener("click", toggleMode);
restartButton.addEventListener("click", restartGame);
themeButton.addEventListener("click", toggleTheme);
fullscreenButton.addEventListener("click", toggleFullscreen);
continueButton.addEventListener("click", closeQuestion);
startButton.addEventListener("click", startGame);
settingsToggle.addEventListener("click", toggleSettingsPanel);
settingTheme.addEventListener("change", () => setTheme(settingTheme.checked ? "dark" : "light"));
settingMusic.addEventListener("change", () => setSetting("music", settingMusic.checked));
settingSfx.addEventListener("change", () => setSetting("sfx", settingSfx.checked));
settingAnimations.addEventListener("change", () => setSetting("animations", settingAnimations.checked));
settingDecorations.addEventListener("change", () => setSetting("decorations", settingDecorations.checked));
settingLargeText.addEventListener("change", () => setSetting("largeText", settingLargeText.checked));
settingHighContrast.addEventListener("change", () => setSetting("highContrast", settingHighContrast.checked));
settingSpeech.addEventListener("change", () => setSetting("speech", settingSpeech.checked));
settingMuted.addEventListener("change", () => setSetting("muted", settingMuted.checked));
victoryRestartButton.addEventListener("click", restartGame);
victoryCloseButton.addEventListener("click", hideVictory);
document.addEventListener("keydown", handleKeyboardShortcuts);

loadTheme();
loadSettings();
resetTrack();
state.skillStats = createSkillStats();
renderAll();
