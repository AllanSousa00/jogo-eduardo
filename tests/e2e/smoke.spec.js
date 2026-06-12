const { test, expect } = require("@playwright/test");

test.describe("portal unico", () => {
  test("raiz direciona para os dois jogos publicados", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Jogos de Língua Portuguesa/);
    await expect(page.getByRole("heading", { level: 1, name: "Escolha o jogo para começar" })).toBeVisible();
    await expect(page.getByText("Uso restrito")).toBeVisible();
    await expect(page.getByText("Créditos: projeto organizado para Allan Sousa.")).toBeVisible();

    await page.getByRole("link", { name: /Quiz Português/ }).click();
    await expect(page).toHaveURL(/\/Quiz-Portugues\/$/);
    await expect(page.getByRole("heading", { level: 1, name: "Quiz sobre Língua Portuguesa" })).toBeVisible();

    await page.goto("/");
    await page.getByRole("link", { name: /Trilha das Habilidades/ }).click();
    await expect(page).toHaveURL(/\/Trilha-das-Habilidades\/$/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Trilha das Habilidades" }).first()
    ).toBeVisible();
  });
});

test.describe("jogos independentes", () => {
  test("quiz abre diretamente em sua propria pasta", async ({ page }) => {
    await page.goto("/Quiz-Portugues/");

    await expect(page).toHaveTitle(/Quiz sobre Língua Portuguesa/);
    await expect(page.getByRole("heading", { level: 1, name: "Quiz sobre Língua Portuguesa" })).toBeVisible();
    await expect(page.getByRole("link", { name: /Trilha das Habilidades/ })).toHaveCount(0);
  });

  test("trilha abre diretamente em sua propria pasta", async ({ page }) => {
    await page.goto("/Trilha-das-Habilidades/");

    await expect(page).toHaveTitle(/Trilha das Habilidades/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Trilha das Habilidades" }).first()
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /Quiz Português/ })).toHaveCount(0);
  });
});

test.describe("quiz portugues", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => window.localStorage.clear());
    await page.goto("/Quiz-Portugues/");
  });

  test("inicia uma rodada e exibe feedback", async ({ page }) => {
    await page.getByRole("button", { name: "Iniciar" }).click();

    await expect(page.locator("#question-counter")).toContainText(/Pergunta 1 de 14/);
    await page.locator("#options-list button").first().click();
    await expect(page.locator("#feedback-panel")).toBeVisible();
    await expect(page.getByRole("button", { name: "Próxima" })).toBeVisible();
  });

  test("abre e fecha o modo professor sem alterar o banco", async ({ page }) => {
    await page.getByRole("button", { name: "Configurações" }).click();
    await page.getByRole("button", { name: "Modo Professor" }).click();

    await expect(page.getByRole("dialog", { name: "Modo Professor" })).toBeVisible();
    await expect(page.locator("#teacher-bank-count")).toContainText("14 perguntas");
    await page.getByRole("button", { name: "Fechar" }).click();
    await expect(page.locator("#teacher-modal")).toBeHidden();
  });

  test("cadastra e remove uma pergunta personalizada com texto seguro", async ({ page }) => {
    await page.getByRole("button", { name: "Configurações" }).click();
    await page.getByRole("button", { name: "Modo Professor" }).click();

    await page
      .locator("#teacher-prompt")
      .fill('<img src=x onerror="window.quizXss=true"> Qual palavra está correta?');
    await page.locator("#teacher-option-a").fill("Casa");
    await page.locator("#teacher-option-b").fill("Caza");
    await page.locator("#teacher-option-c").fill("Cassa");
    await page.locator("#teacher-option-d").fill("Caça");
    await page.locator("#teacher-explanation").fill("Casa é escrita com a letra s.");
    await page.getByRole("button", { name: "Adicionar Pergunta" }).click();

    await expect(page.locator("#teacher-bank-count")).toContainText("15 perguntas");
    await expect(page.locator("#teacher-custom-list img")).toHaveCount(0);
    await expect(page.locator("#teacher-custom-list")).toContainText("<img src=x");

    await page.getByRole("button", { name: "Remover questão" }).click();
    await expect(page.getByRole("dialog", { name: "Remover esta questão?" })).toBeVisible();
    await page.getByRole("button", { name: "Remover", exact: true }).click();

    await expect(page.locator("#teacher-bank-count")).toContainText("14 perguntas");
    await expect(page.locator("#teacher-custom-list")).toContainText("Nenhuma questão personalizada ainda.");
  });
});

test.describe("trilha das habilidades", () => {
  test("inicia a partida, joga o dado e abre a pergunta", async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem(
        "trilha-habilidades:settings",
        JSON.stringify({ animations: false, music: false, sfx: false })
      );
    });
    await page.goto("/Trilha-das-Habilidades/");

    await page.getByRole("button", { name: "Iniciar jogo" }).click();
    const rollButton = page.getByRole("button", { name: "Jogar o dado" });
    await expect(rollButton).toBeEnabled();
    await rollButton.click();

    await expect(page.getByRole("dialog", { name: /./ })).toBeVisible({ timeout: 4_000 });
    await expect(page.locator("#options-list .option-button").first()).toBeVisible();
  });
});
