# Jogos de Língua Portuguesa

Site educacional com um portal único e dois jogos de revisão:

- **Quiz Português**: perguntas rápidas, feedback imediato e modo professor.
- **Trilha das Habilidades**: tabuleiro com dado, casas, habilidades e perguntas por etapa.

## Rotas publicadas

| Rota                       | Conteúdo               | Fonte                          |
| -------------------------- | ---------------------- | ------------------------------ |
| `/`                        | Portal de seleção      | `apps/portal/`                 |
| `/Quiz-Portugues/`         | Quiz Português         | `apps/quiz-portugues/`         |
| `/Trilha-das-Habilidades/` | Trilha das Habilidades | `apps/trilha-das-habilidades/` |

O formulário de autorização é um projeto separado. Ele não faz parte do build deste repositório:

- [Solicitar autorização de uso](https://site-de-pedidos-pt.pages.dev/)
- [Código do portal de solicitações](https://github.com/AllanSousa00/site-de-pedidos-pt)

## Termos de uso

Copyright © 2026 Allan Sousa. Todos os direitos reservados.

Este é um projeto de **uso restrito**. O acesso ao site, ao repositório ou aos arquivos não concede
licença de uso nem transfere qualquer direito sobre o código, os textos, as perguntas, a identidade
visual, a documentação ou os demais materiais do projeto.

Sem autorização prévia, expressa e por escrito do responsável, não é permitido:

- usar o projeto em atividades pessoais, acadêmicas, educacionais, institucionais ou comerciais;
- copiar, modificar, adaptar, traduzir ou criar versões derivadas;
- distribuir, publicar, vender, sublicenciar ou disponibilizar cópias;
- hospedar o projeto, total ou parcialmente, em sites, plataformas ou repositórios;
- remover créditos, avisos de autoria ou referências à licença.

O envio do formulário representa apenas um **pedido de análise**. O uso continua proibido até que o
solicitante receba uma autorização expressa por escrito. Qualquer autorização vale somente para a
finalidade, o período, os jogos e as condições informadas na resposta do responsável.

Consulte também o arquivo [LICENSE](LICENSE). Em caso de dúvida, escreva para
**allancruzsousa519@gmail.com**.

## Requisitos

- Node.js 20 ou superior;
- Node.js 22 LTS recomendado;
- Chromium do Playwright para os testes de navegador.

## Desenvolvimento

```bash
npm install
npx playwright install chromium
npm run serve
```

O portal local fica disponível em `http://127.0.0.1:4173/`.

## Validação e build

```bash
npm run check
npm run build:static
npm run preview
```

O build estático é gerado em `dist/`. O workflow `.github/workflows/pages.yml` publica essa pasta no
GitHub Pages quando há alterações na branch `main`.

## Qualidade

`npm run check` valida:

- sintaxe e estrutura do portal e dos jogos;
- bancos de perguntas;
- lint e formatação;
- navegação e fluxos principais;
- layout em desktop `1280x720` e celular `390x844`;
- cortes horizontais, elementos fora da tela e acesso ao tabuleiro móvel.

## Estrutura

```text
.
|-- apps/
|   |-- portal/                  # entrada do site
|   |-- quiz-portugues/          # jogo 1
|   `-- trilha-das-habilidades/  # jogo 2
|-- referencias/                 # material pedagógico não publicado
|-- tests/e2e/                   # testes funcionais e responsivos
|-- tools/                       # automação do workspace
`-- .github/                     # integração contínua e publicação
```
