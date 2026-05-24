const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "output/**",
      "docs/**",
      "Quiz-Portugues/**",
      "Trilha-das-Habilidades/**"
    ]
  },
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",
      globals: {
        ...globals.node
      }
    }
  },
  {
    files: ["tests/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser
      }
    }
  }
];
