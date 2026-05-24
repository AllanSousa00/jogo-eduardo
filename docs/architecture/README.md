# Arquitetura e independência dos projetos

## Decisão

O repositório publica duas aplicações web estáticas independentes:
`Quiz-Portugues/` e `Trilha-das-Habilidades/`. Não existe página de entrada agregadora e nenhum jogo
carrega CSS ou JavaScript do outro.

As ferramentas em `tools/`, `tests/` e `.github/` são infraestrutura de manutenção do repositório,
não dependências de execução das atividades.

| Projeto                | Entrada                             | Dependências em execução                       |
| ---------------------- | ----------------------------------- | ---------------------------------------------- |
| Quiz Português         | `Quiz-Portugues/index.html`         | Arquivos internos de `Quiz-Portugues/`         |
| Trilha das Habilidades | `Trilha-das-Habilidades/index.html` | Arquivos internos de `Trilha-das-Habilidades/` |

## Contrato funcional

| Superfície     | Comportamento preservado                                                                  |
| -------------- | ----------------------------------------------------------------------------------------- |
| Quiz           | Abre diretamente, exibe feedback e mantém modo professor JSON                             |
| Trilha         | Abre diretamente; dado move a caravana; acerto mantém posição; erro retorna               |
| Persistência   | `quiz-portugues-jogo:state-v2`, `trilha-habilidades:theme`, `trilha-habilidades:settings` |
| Acessibilidade | Teclado, foco, temas, contraste, narração/tela cheia quando existentes                    |

`tools/validate-contract.js` falha caso uma entrada passe a importar uma camada compartilhada externa
ou faça referência ao outro jogo.

## Estrutura

```text
Quiz-Portugues/                 aplicação independente do quiz
Trilha-das-Habilidades/         aplicação independente da trilha
tests/e2e/                      smoke tests que abrem cada pasta diretamente
tools/                          servidor, build e validações do repositório
.github/                        revisão, CI e publicação
```

## Pipeline

1. `npm run check:source` valida sintaxe, dados e a independência das entradas.
2. `npm run lint` verifica scripts novos de automação/teste.
3. `npm run test:e2e` abre cada projeto diretamente em navegador real.
4. `npm run build:static` copia as duas pastas para `dist/`, sem criar tela de seleção.
5. GitHub Pages publica o artifact com os dois endereços diretos.

## Riscos e mitigação

| Risco                         | Mitigação                                                                   |
| ----------------------------- | --------------------------------------------------------------------------- |
| Reintroduzir um menu conjunto | A raiz não possui `index.html`; testes usam apenas entradas diretas         |
| Criar dependência entre jogos | Validador rejeita referências cruzadas nas entradas                         |
| Perder progresso local        | Chaves atuais são verificadas pelo contrato                                 |
| Regressão de interação        | Playwright cobre início do quiz, modo professor e primeira rodada da trilha |
