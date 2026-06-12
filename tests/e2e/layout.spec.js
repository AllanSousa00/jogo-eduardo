const { test, expect } = require("@playwright/test");

const viewports = [
  { name: "desktop", width: 1280, height: 720 },
  { name: "mobile", width: 390, height: 844 }
];

async function expectNoHorizontalOverflow(page) {
  const metrics = await page.evaluate(() => ({
    viewportWidth: window.innerWidth,
    documentWidth: document.documentElement.scrollWidth
  }));

  expect(metrics.documentWidth).toBeLessThanOrEqual(metrics.viewportWidth + 1);
}

async function expectNoVerticalOverflow(page) {
  const metrics = await page.evaluate(() => ({
    viewportHeight: window.innerHeight,
    documentHeight: document.documentElement.scrollHeight
  }));

  expect(metrics.documentHeight).toBeLessThanOrEqual(metrics.viewportHeight + 2);
}

async function expectElementsInsideViewport(page, selectors) {
  const issues = await page.evaluate((targetSelectors) => {
    return targetSelectors.flatMap((selector) => {
      const element = document.querySelector(selector);
      if (!element || element.hidden) return [`${selector}: ausente ou oculto`];

      const rect = element.getBoundingClientRect();
      const style = window.getComputedStyle(element);
      const tolerance = 2;
      const elementIssues = [];

      if (rect.left < -tolerance) elementIssues.push(`${selector}: ultrapassa a esquerda`);
      if (rect.right > window.innerWidth + tolerance) elementIssues.push(`${selector}: ultrapassa a direita`);
      if (rect.top < -tolerance) elementIssues.push(`${selector}: ultrapassa o topo`);
      if (rect.bottom > window.innerHeight + tolerance) elementIssues.push(`${selector}: ultrapassa a base`);
      if (
        ["hidden", "clip"].includes(style.overflowX) &&
        element.scrollWidth > element.clientWidth + tolerance
      ) {
        elementIssues.push(`${selector}: conteudo cortado na horizontal`);
      }
      if (
        ["hidden", "clip"].includes(style.overflowY) &&
        element.scrollHeight > element.clientHeight + tolerance
      ) {
        elementIssues.push(`${selector}: conteudo cortado na vertical`);
      }

      return elementIssues;
    });
  }, selectors);

  expect(issues).toEqual([]);
}

async function capture(page, testInfo, name) {
  await page.screenshot({ path: testInfo.outputPath(`${name}.png`), fullPage: false });
}

for (const viewport of viewports) {
  test.describe(`${viewport.name} ${viewport.width}x${viewport.height}`, () => {
    test.use({
      viewport: { width: viewport.width, height: viewport.height },
      reducedMotion: "reduce"
    });

    test(`portal: botoes e creditos sem cortes`, async ({ page }, testInfo) => {
      await page.addInitScript(() => window.localStorage.clear());
      await page.goto("/");

      await expectNoHorizontalOverflow(page);
      await expectNoVerticalOverflow(page);
      await expectElementsInsideViewport(page, [
        ".site-header",
        "#portal-title",
        ".game-options",
        ".access-request",
        ".site-footer",
        ".theme-toggle"
      ]);
      await expect(page.getByRole("link", { name: /Quiz Português/ })).toBeVisible();
      await expect(page.getByRole("link", { name: /Trilha das Habilidades/ })).toBeVisible();
      await expect(page.getByText("Créditos: projeto organizado para Allan Sousa.")).toBeVisible();
      await capture(page, testInfo, "portal-inicio");
    });

    test(`quiz: inicio, pergunta e feedback sem cortes`, async ({ page }, testInfo) => {
      await page.addInitScript(() => window.localStorage.clear());
      await page.goto("/Quiz-Portugues/");

      await expectNoHorizontalOverflow(page);
      await expectElementsInsideViewport(page, [
        ".title-block--home",
        "#question-total-label",
        ".menu-grid--home"
      ]);
      await capture(page, testInfo, "quiz-inicio");

      await page.locator("#start-button").click();
      await expect(page.locator("#question-counter")).toBeVisible();
      await expectElementsInsideViewport(page, ["#question-counter", "#question-text", "#options-list"]);

      await page.locator('#options-list button[data-index="0"]').click();
      await expect(page.locator("#feedback-panel")).toBeVisible();
      await page.waitForTimeout(120);
      await expectElementsInsideViewport(page, ["#feedback-panel", "#next-button"]);
      await capture(page, testInfo, "quiz-feedback");
    });

    test(`quiz: modo professor utilizavel`, async ({ page }, testInfo) => {
      await page.addInitScript(() => window.localStorage.clear());
      await page.goto("/Quiz-Portugues/");
      await page.locator("#open-settings-button").click();
      await page.locator("#teacher-mode-button").click();

      await expect(page.locator("#teacher-modal")).toBeVisible();
      await expectNoHorizontalOverflow(page);
      await expectElementsInsideViewport(page, [".modal-card--teacher", "#teacher-close-button"]);
      await capture(page, testInfo, "quiz-modo-professor");
    });

    test(`trilha: inicio e tabuleiro sem cortes`, async ({ page }, testInfo) => {
      await page.addInitScript(() => {
        window.localStorage.clear();
        window.localStorage.setItem(
          "trilha-habilidades:settings",
          JSON.stringify({ animations: false, music: false, sfx: false })
        );
      });
      await page.goto("/Trilha-das-Habilidades/");

      await expectNoHorizontalOverflow(page);
      await expectElementsInsideViewport(page, [".start-card", "#settings-toggle", "#start-button"]);
      await capture(page, testInfo, "trilha-inicio");

      await page.locator("#start-button").click();
      await expect(page.locator("#roll-button")).toBeEnabled();
      await expectNoHorizontalOverflow(page);
      await expectElementsInsideViewport(page, [".top-panel h1", ".score-panel", ".controls"]);

      if (viewport.name === "desktop") {
        await expectElementsInsideViewport(page, [".board-wrap"]);
      } else {
        const scrollState = await page.evaluate(() => ({
          documentHeight: document.documentElement.scrollHeight,
          viewportHeight: window.innerHeight,
          bodyOverflowY: window.getComputedStyle(document.body).overflowY
        }));
        expect(scrollState.documentHeight).toBeGreaterThan(scrollState.viewportHeight);
        expect(scrollState.bodyOverflowY).not.toBe("hidden");

        await page.locator(".board-wrap").scrollIntoViewIfNeeded();
        const boardIsReachable = await page.locator(".board-wrap").evaluate((element) => {
          const rect = element.getBoundingClientRect();
          return rect.top < window.innerHeight && rect.bottom > 0;
        });
        expect(boardIsReachable).toBe(true);
      }
      await capture(page, testInfo, "trilha-tabuleiro");
    });

    test(`trilha: pergunta e feedback utilizaveis`, async ({ page }, testInfo) => {
      await page.addInitScript(() => {
        window.localStorage.clear();
        window.localStorage.setItem(
          "trilha-habilidades:settings",
          JSON.stringify({ animations: false, music: false, sfx: false })
        );
      });
      await page.goto("/Trilha-das-Habilidades/");
      await page.locator("#start-button").click();
      await page.locator("#roll-button").click();

      await expect(page.locator("#question-modal")).toBeVisible();
      await expectElementsInsideViewport(page, [".question-card", "#question-title", "#options-list"]);
      await page.locator("#options-list .option-button").first().click();
      await expect(page.locator("#continue-button")).toBeVisible();
      await expectElementsInsideViewport(page, ["#feedback-text", "#continue-button"]);
      await capture(page, testInfo, "trilha-feedback");
    });
  });
}
