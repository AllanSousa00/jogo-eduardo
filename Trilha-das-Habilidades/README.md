# Trilha das Habilidades

A **Trilha das Habilidades** é um jogo de caminho para trabalhar Língua Portuguesa. O aluno joga um dado, a caravana anda pelo tabuleiro e uma pergunta aparece quando ele para em uma casa.

O jogo foi feito para parecer uma atividade de sala, com visual próprio, caravana estudantil, dado 3D, tema claro e tema escuro.

## Como jogar

1. Abra `index.html` no navegador.
2. Clique em **Iniciar jogo**.
3. Clique em **Jogar dado**.
4. Espere a caravana andar.
5. Responda à pergunta que aparecer.
6. Se acertar, permanece na casa.
7. Se errar, volta para a casa anterior.
8. Continue até chegar ao final da trilha.

## Regras

- O dado define quantas casas a caravana anda.
- Cada casa tem uma pergunta.
- Cada pergunta pertence a uma habilidade de Português.
- Ao acertar, o aluno ganha ponto.
- Ao errar, o aluno retorna para a posição anterior.
- O jogo termina quando a última casa é alcançada e respondida.

## Habilidades trabalhadas

O tabuleiro tem 20 casas e trabalha 10 habilidades:

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

Cada habilidade aparece em duas perguntas.

## Controles

| Controle | O que faz |
| --- | --- |
| `Jogar dado` | Sorteia um número e move a caravana |
| `Modo alternado` | Alterna a organização das perguntas |
| `Reiniciar` | Recomeça a partida |
| `Tema dark` | Troca entre tema claro e escuro |
| Engrenagem inicial | Abre as configurações antes da partida |

## Configurações

Na tela inicial, a engrenagem permite ajustar:

- tema escuro;
- música;
- sons;
- animações;
- decorações;
- texto maior.

Essas opções ficam salvas no navegador.

## Onde ficam as perguntas

As habilidades ficam em `script.js`:

```js
const skills = [
  "Leitura e interpretação",
  "Ortografia"
];
```

As perguntas ficam na constante:

```js
const questions = [
  {
    skill: "Ortografia",
    prompt: "Qual palavra está escrita corretamente?",
    options: ["Excessão", "Exceção", "Esceção", "Esseção"],
    answer: 1,
    explanation: "A escrita correta é exceção."
  }
];
```

O campo `answer` indica a alternativa correta:

```text
0 = primeira alternativa
1 = segunda alternativa
2 = terceira alternativa
3 = quarta alternativa
```

## Posição das casas

As casas do tabuleiro são posicionadas por porcentagem:

```js
const tilePositions = [
  { x: 13.1, y: 85.4, rotate: 7 }
];
```

Cada item define:

- `x`: posição horizontal;
- `y`: posição vertical;
- `rotate`: inclinação da casa.

## Arquivos

| Arquivo | Função |
| --- | --- |
| `index.html` | Estrutura da tela inicial, controles, tabuleiro e modal |
| `style.css` | Visual do jogo, temas, dado 3D, caravana e animações |
| `script.js` | Regras, perguntas, dado, movimento e pontuação |

## Sugestão de uso em sala

O jogo funciona bem com projetor. A turma pode decidir a resposta em conjunto, ou o professor pode dividir a sala em equipes e alternar quem responde.

Também pode ser usado individualmente no computador, principalmente como revisão antes de avaliação.
