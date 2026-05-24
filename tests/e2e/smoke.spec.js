const { test, expect } = require("@playwright/test");

test.describe("projetos independentes", () => {
  test("quiz abre diretamente em sua propria pasta", async ({ page }) => {
    await page.goto("/Quiz-Portugues/");

    await expect(page).toHaveTitle(/Quiz sobre Língua Portuguesa/);
    await expect(page.getByRole("heading", { level: 1, name: "Quiz sobre Língua Portuguesa" })).toBeVisible();
    await expect(page.getByText("Trilha das Habilidades")).toHaveCount(0);
  });

  test("trilha abre diretamente em sua propria pasta", async ({ page }) => {
    await page.goto("/Trilha-das-Habilidades/");

    await expect(page).toHaveTitle(/Trilha das Habilidades/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Trilha das Habilidades" }).first()
    ).toBeVisible();
    await expect(page.getByText("Quiz Português")).toHaveCount(0);
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
