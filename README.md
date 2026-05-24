# Projetos de Língua Portuguesa

Este repositório contém **dois projetos independentes**. Não há uma tela inicial para escolher entre
eles: cada atividade é aberta diretamente pelo seu próprio `index.html`, com seus próprios arquivos,
estilos e regras.

| Projeto                | Pasta                                                | Link publicado                                                                      |
| ---------------------- | ---------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Quiz Português         | [`Quiz-Portugues/`](Quiz-Portugues/)                 | [Abrir Quiz](https://allansousa00.github.io/jogo-eduardo/Quiz-Portugues/)           |
| Trilha das Habilidades | [`Trilha-das-Habilidades/`](Trilha-das-Habilidades/) | [Abrir Trilha](https://allansousa00.github.io/jogo-eduardo/Trilha-das-Habilidades/) |

![Prévia da Trilha das Habilidades](docs/media/trilha-preview.png)

## Início rápido

Requer Node.js 20 ou superior para validação e testes; Node.js 22 LTS é a versão recomendada em
`.nvmrc` e no CI. Os dois projetos publicados continuam sendo HTML, CSS e JavaScript estáticos.

```bash
npm install
npm run serve
```

Abra diretamente uma das URLs locais:

```text
http://127.0.0.1:4173/Quiz-Portugues/
http://127.0.0.1:4173/Trilha-das-Habilidades/
```

A raiz do repositório não publica um seletor de jogos.

## Scripts

| Comando                | Função                                                        |
| ---------------------- | ------------------------------------------------------------- |
| `npm run serve`        | Serve as duas pastas localmente em `127.0.0.1:4173`           |
| `npm run check:source` | Confere sintaxe, independência das entradas e dados da trilha |
| `npm run lint`         | Verifica os scripts de ferramentas e testes novos             |
| `npm run format:check` | Confere formatação dos arquivos modernizados                  |
| `npm run test:e2e`     | Executa smoke tests em cada projeto diretamente               |
| `npm run check`        | Porta de qualidade completa                                   |
| `npm run build:static` | Monta `dist/` com as duas pastas independentes                |
| `npm run preview`      | Serve o conteúdo montado em `dist/`                           |

## Contrato preservado

A organização não altera regras, pontuação, ordem funcional das telas nem conteúdo pedagógico.

- O Quiz é iniciado somente em `/Quiz-Portugues/`.
- A Trilha é iniciada somente em `/Trilha-das-Habilidades/`.
- Um projeto não importa arquivos da pasta do outro nem uma camada visual de aplicação externa.
- O progresso e as perguntas personalizadas do quiz permanecem em
  `quiz-portugues-jogo:state-v2`.
- Tema e configurações da trilha permanecem em `trilha-habilidades:theme` e
  `trilha-habilidades:settings`.
- A importação/exportação JSON do modo professor continua disponível.
- Na trilha, acertar mantém a casa e errar retorna à posição anterior.

O registro técnico da organização fica em
[`docs/architecture/README.md`](docs/architecture/README.md). A documentação consolidada e os guias
de manutenção ficam em [`docs/README.md`](docs/README.md),
[`docs/MANUTENCAO.md`](docs/MANUTENCAO.md) e
[`docs/DOCUMENTACAO_COMPLETA.html`](docs/DOCUMENTACAO_COMPLETA.html).

## Estrutura

```text
.
|-- Quiz-Portugues/                 # projeto autônomo do quiz
|   |-- index.html
|   |-- style.css
|   `-- script.js
|-- Trilha-das-Habilidades/         # projeto autônomo do tabuleiro
|   |-- index.html
|   |-- style.css
|   |-- script.js
|   `-- data.js
|-- docs/                           # QA e mídia de documentação
|-- tests/e2e/                      # testes das entradas diretas
|-- tools/                          # automação do repositório
`-- .github/                        # CI e publicação
```

## Conteúdo e acessibilidade

- As perguntas da trilha ficam em `Trilha-das-Habilidades/data.js` e são validadas por
  `npm run validate:trilha`.
- As perguntas base do quiz ficam em `Quiz-Portugues/script.js`; perguntas cadastradas no modo
  professor ficam salvas no navegador.
- A trilha oferece texto maior, alto contraste, narração, som, movimento reduzido e tela cheia.
- O Quiz respeita movimento reduzido e mantém o modo professor acessível por teclado.
- O checklist de uso em sala está em [`docs/CHECKLIST-QA.md`](docs/CHECKLIST-QA.md).

## Publicação

O workflow de CI executa as verificações antes da publicação. O workflow de Pages publica as duas
pastas diretamente, sem gerar uma página inicial conjunta. No GitHub, a origem de Pages deve estar
configurada como **GitHub Actions**.

## Contribuição

Consulte [`CONTRIBUTING.md`](CONTRIBUTING.md) antes de alterar telas, perguntas ou automações.
Mudanças relevantes devem ser registradas em [`CHANGELOG.md`](CHANGELOG.md).
