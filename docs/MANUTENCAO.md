# Manutencao do Repositorio

## O que faz parte do codigo-fonte

- `Quiz-Portugues/`: aplicacao estatica do quiz.
- `Trilha-das-Habilidades/`: aplicacao estatica da trilha.
- `docs/`: documentacao permanente e midias de apoio.
- `tools/`: automacoes locais de validacao, build e preview.
- `tests/`: smoke tests em Playwright.
- `.github/`: CI, Pages, templates e ownership.

## O que nao deve ser versionado

- `node_modules/`
- `dist/`
- `test-results/`
- `playwright-report/`
- `output/`
- `debug.log`

Esses caminhos sao artefatos de execucao local, build ou debug.

## Fluxo recomendado

1. Instale dependencias com `npm install`.
2. Rode `npm run check`.
3. Monte a publicacao com `npm run build:static`.
4. Revise `docs/CHECKLIST-QA.md` quando a interface mudar.

## Limpeza segura

Pode remover localmente, sem impacto no projeto publicado:

- pastas de build e teste geradas automaticamente;
- logs de depuracao;
- capturas temporarias fora de `docs/media/`.
