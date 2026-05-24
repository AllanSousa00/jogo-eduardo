# Atividades de Língua Portuguesa

Este repositório contém dois jogos web independentes. O código-fonte fica organizado em `apps/`;
as URLs públicas históricas permanecem iguais para não quebrar acessos já distribuídos.

| Aplicativo             | Código-fonte                                                   | Link publicado                                                                      |
| ---------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Quiz Português         | [`apps/quiz-portugues/`](apps/quiz-portugues/)                 | [Abrir Quiz](https://allansousa00.github.io/jogo-eduardo/Quiz-Portugues/)           |
| Trilha das Habilidades | [`apps/trilha-das-habilidades/`](apps/trilha-das-habilidades/) | [Abrir Trilha](https://allansousa00.github.io/jogo-eduardo/Trilha-das-Habilidades/) |

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
| `npm run serve`        | Serve os dois aplicativos nas rotas públicas locais           |
| `npm run check:source` | Confere sintaxe, independência das entradas e dados da trilha |
| `npm run lint`         | Verifica os scripts de ferramentas e testes novos             |
| `npm run format:check` | Confere formatação dos arquivos modernizados                  |
| `npm run test:e2e`     | Executa smoke tests em cada projeto diretamente               |
| `npm run check`        | Porta de qualidade completa                                   |
| `npm run build:static` | Monta `dist/` somente com arquivos necessários à publicação   |
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

## Estrutura

```text
.
|-- apps/                            # fontes dos aplicativos
|   |-- quiz-portugues/
|   |   |-- index.html
|   |   |-- script.js
|   |   |-- style.css
|   |   `-- viewport-fit.js
|   `-- trilha-das-habilidades/
|       |-- index.html
|       |-- script.js
|       |-- style.css
|       `-- game-data.js
|-- referencias/                     # insumos pedagogicos; nao publicados
|-- tests/e2e/                      # testes das entradas diretas
|-- tools/                          # automação do repositório
`-- .github/                        # CI e publicação
```

`dist/`, `node_modules/` e resultados de testes são regeneráveis e ficam fora do controle de
versão.

## Conteúdo e acessibilidade

- As perguntas da trilha ficam em `apps/trilha-das-habilidades/game-data.js` e são validadas por
  `npm run validate:trilha`.
- As perguntas base do quiz ficam em `apps/quiz-portugues/script.js`; perguntas cadastradas no modo
  professor ficam salvas no navegador.
- O material recebido para consulta fica em `referencias/questoes-para-o-jogo.docx`.
- A trilha oferece texto maior, alto contraste, narração, som, movimento reduzido e tela cheia.
- O Quiz respeita movimento reduzido e mantém o modo professor acessível por teclado.
- Antes de publicar, execute `npm run check` e confirme os fluxos principais em desktop e celular.

## Publicação

O arquivo `tools/project-map.js` associa cada fonte em `apps/` à rota pública compatível. O workflow
de Pages executa as verificações e gera `dist/` com `/Quiz-Portugues/` e
`/Trilha-das-Habilidades/`, sem página inicial conjunta e sem publicar materiais de referência.

## Contribuição

Consulte [`CONTRIBUTING.md`](CONTRIBUTING.md) antes de alterar telas, perguntas ou automações.
Mudanças relevantes devem ser registradas em [`CHANGELOG.md`](CHANGELOG.md).
