# Contribuindo

## Preparação

```bash
npm install
npm run serve
```

Use uma branch curta, por exemplo `style/quiz-modal`, `test/trilha-smoke` ou `fix/trilha-audio`.

## Limites funcionais

Este projeto é usado em atividades pedagógicas. Uma contribuição de organização ou aparência não
deve mudar:

- regras, pontuação ou progressão dos jogos;
- chaves e formato persistido em `localStorage`;
- importação/exportação JSON do modo professor;
- rotas públicas existentes;
- a separação entre os projetos; um jogo não deve depender dos arquivos do outro;
- perguntas ou respostas corretas sem validação pedagógica explícita.

Quando uma alteração precisar tocar um desses itens, descreva a migração e acrescente testes.

## Convenções

| Área                     | Convenção                                                                      |
| ------------------------ | ------------------------------------------------------------------------------ |
| Pastas e arquivos novos  | `lowercase-kebab-case`                                                         |
| JavaScript               | `camelCase`; constantes globais em `UPPER_SNAKE_CASE`                          |
| CSS novo                 | variáveis em `:root`, componentes previsíveis e sem seletores de comportamento |
| Hooks de interação novos | atributos `data-*`                                                             |
| Commits                  | Conventional Commits, como `test(e2e): cobre modo professor`                   |

O código-fonte dos jogos fica em `apps/quiz-portugues/` e `apps/trilha-das-habilidades/`.
Os diretórios com maiúsculas `Quiz-Portugues/` e `Trilha-das-Habilidades/` existem apenas no
resultado de `npm run build:static`, para preservar as URLs publicadas.

## Verificação

Antes de abrir um pull request:

```bash
npm run check
npm run build:static
```

Para alteração visual, confira também desktop e celular, foco visível, contraste, movimento reduzido
e os fluxos principais dos dois jogos.

## Pull requests

Preencha o template com escopo, validações e risco funcional. Inclua captura atualizada ao alterar
interface e atualize o changelog quando a mudança for perceptível para professor ou aluno.
