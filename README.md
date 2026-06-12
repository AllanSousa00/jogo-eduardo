# Jogos de Língua Portuguesa

Site educacional com uma tela inicial única e dois jogos de revisão de Língua Portuguesa:

- **Quiz Português**: perguntas rápidas, feedback imediato e modo professor.
- **Trilha das Habilidades**: tabuleiro com dado, casas, habilidades e perguntas por etapa.

A publicação principal é feita em um único site. A raiz abre o portal de escolha e os jogos continuam
preservados em subpastas próprias:

| Rota publicada             | Conteúdo               | Fonte                          |
| -------------------------- | ---------------------- | ------------------------------ |
| `/`                        | Portal de seleção      | `apps/portal/`                 |
| `/Quiz-Portugues/`         | Quiz Português         | `apps/quiz-portugues/`         |
| `/Trilha-das-Habilidades/` | Trilha das Habilidades | `apps/trilha-das-habilidades/` |

## Créditos e uso

Projeto organizado para **Allan Sousa**.

Este material é de uso restrito. Somente pessoas, instituições ou serviços autorizados pelo
responsável do projeto podem utilizar, copiar, modificar, distribuir, publicar ou hospedar estes
arquivos. Consulte `LICENSE` antes de reutilizar qualquer parte do projeto.

Para solicitar acesso, envie email para **allancruzsousa519@gmail.com**.

Modelo recomendado de solicitação:

```text
Assunto: Solicitação de acesso aos Jogos de Língua Portuguesa

Nome completo:
Instituição, turma ou finalidade de uso:
Como pretende usar ou hospedar o material:
Período previsto de uso:
Declaro que li e aceito respeitar a licença de uso restrito.
```

## Requisitos

- Node.js 20 ou superior;
- Node.js 22 LTS recomendado;
- Chromium do Playwright para executar os testes de navegador.

## Preparação

Na raiz do workspace:

```bash
npm install
npx playwright install chromium
```

## Comandos principais

```bash
npm run serve          # abre o portal em http://127.0.0.1:4173/
npm run check          # valida código, dados, layout e fluxos principais
npm run build:static   # gera o site único em dist/
npm run preview        # serve a pasta dist/ para conferência final
```

## Publicação

Para hospedar tudo em um único site:

```bash
npm run check
npm run build:static
```

Publique o conteúdo da pasta `dist/`. O workflow `.github/workflows/pages.yml` já faz esse processo
automaticamente no GitHub Pages quando houver push na branch `main`.

## Qualidade

O comando `npm run check` cobre:

- sintaxe e estrutura dos três aplicativos do site;
- validação dos bancos de perguntas;
- lint e formatação;
- abertura do portal e dos dois jogos;
- cliques do portal para cada jogo;
- fluxos de pergunta, feedback e modo professor;
- layout em desktop `1280x720` e celular `390x844`;
- cortes horizontais, elementos fora da tela e acesso ao tabuleiro móvel.

## Conteúdo pedagógico

- O Quiz possui perguntas base em `apps/quiz-portugues/script.js` e aceita questões personalizadas
  pelo modo professor.
- A Trilha possui 10 habilidades e 50 perguntas em `apps/trilha-das-habilidades/game-data.js`.
- O material ainda não aprovado para publicação permanece em `referencias/questoes-para-o-jogo.docx`
  e não entra no build.

## Estrutura

```text
.
|-- apps/
|   |-- portal/                  # entrada unica do site
|   |-- quiz-portugues/          # jogo 1
|   `-- trilha-das-habilidades/  # jogo 2
|-- referencias/                 # material pedagogico nao publicado
|-- tests/e2e/                   # testes funcionais e responsivos
|-- tools/                       # automacao do workspace
`-- .github/                     # integracao continua e GitHub Pages
```
