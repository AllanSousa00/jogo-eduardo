# Trilha das Habilidades

Jogo de caminho para revisar Língua Portuguesa com caravana estudantil, dado 3D e perguntas por casa. Foi pensado para uso em sala, projetor, laboratório ou estudo individual.

## Como jogar

1. Abra `index.html`.
2. Clique em **Iniciar jogo**.
3. Jogue o dado.
4. A caravana anda até a casa sorteada.
5. Responda à pergunta.
6. Se acertar, permanece na casa.
7. Se errar, volta para a casa anterior.
8. Ao chegar ao fim, o jogo mostra um resumo por habilidade.

## Habilidades

O jogo trabalha 10 habilidades:

1. Leitura e interpretação
2. Ortografia
3. Pontuação
4. Classes de palavras
5. Concordância
6. Sinônimos e antônimos
7. Acentuação
8. Uso dos porquês
9. Produção textual
10. Coesão e coerência

Cada partida usa 2 perguntas por habilidade. O banco tem 5 perguntas por habilidade, então a trilha pode variar.

## Tipos de pergunta

| Tipo | Código |
| --- | --- |
| Múltipla escolha | `multiple-choice` |
| Verdadeiro ou falso | `true-false` |
| Completar lacuna | `fill-blank` |
| Associação | `association` |

## Controles

| Controle | Ação |
| --- | --- |
| Jogar dado | Sorteia o dado e move a caravana |
| Modo alternado | Distribui habilidades pela trilha |
| Modo por habilidade | Agrupa perguntas da mesma habilidade |
| Reiniciar | Começa a partida de novo |
| Tema dark/claro | Alterna o visual |
| Tela cheia | Ajuda em projetor e apresentações |

Atalhos:

| Tecla | Ação |
| --- | --- |
| `Espaço` ou `D` | Jogar dado |
| `1` a `4` | Escolher alternativa |
| `R` | Reiniciar |
| `T` | Trocar tema |
| `F` | Tela cheia |
| `M` | Silenciar |
| `Esc` | Fechar painel ou tela final |

## Configurações

A engrenagem da tela inicial permite ajustar:

- tema escuro;
- música;
- sons;
- animações;
- decorações;
- texto maior;
- alto contraste;
- narração de perguntas;
- silenciar tudo.

As escolhas ficam salvas no navegador.

## Editar perguntas

As perguntas ficam em:

```text
data.js
```

Formato:

```js
{
  skill: "Pontuação",
  type: "true-false",
  difficulty: "facil",
  prompt: "Verdadeiro ou falso: perguntas diretas terminam com ponto de interrogação.",
  options: ["Verdadeiro", "Falso"],
  answer: 0,
  explanation: "Perguntas diretas usam ponto de interrogação."
}
```

Regras importantes:

- `skill` precisa existir na lista de habilidades.
- `type` precisa existir em `questionTypes`.
- `difficulty` aceita `facil`, `medio` ou `dificil`.
- `answer` começa em zero.
- cada habilidade precisa ter pelo menos 2 perguntas.

Depois de editar, rode na raiz do repositório:

```bash
node tools/validate-trilha-data.js
```

## Arquivos

| Arquivo | Função |
| --- | --- |
| `index.html` | Estrutura da tela inicial, tabuleiro, controles e modais |
| `style.css` | Visual, temas, animações, responsividade e acessibilidade |
| `script.js` | Regras do jogo, dado, movimento, placar e configurações |
| `data.js` | Habilidades, posições das casas, paleta das casas e perguntas |

## Uso em sala

Para uma aula mais dinâmica, divida a turma em equipes. Uma equipe joga o dado, discute a resposta e escolhe a alternativa. Depois alterne a vez. Ao final, use o resumo por habilidade para revisar o que gerou mais erro.

Para projetor, use tela cheia e, se a sala estiver clara, ative alto contraste.
