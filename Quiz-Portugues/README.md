# Quiz Português

O **Quiz Português** é a versão mais direta do projeto. Ele apresenta perguntas de múltipla escolha, mostra se o aluno acertou ou errou e fecha a atividade com um resultado geral.

É uma boa opção para revisão rápida, estudo individual ou aplicação em sala com projetor.

## Como usar

1. Abra `index.html` no navegador.
2. Clique para começar.
3. Leia a pergunta.
4. Escolha uma alternativa.
5. Veja o feedback.
6. Avance até terminar a lista de questões.

No final, o aluno vê a pontuação e pode revisar os erros.

## Recursos principais

- perguntas de múltipla escolha;
- feedback depois de cada resposta;
- explicação da alternativa correta;
- resultado final;
- revisão das perguntas erradas;
- tema claro e escuro;
- música e efeitos sonoros;
- modo tela cheia;
- perguntas e alternativas embaralhadas;
- progresso salvo no navegador;
- modo professor para cadastrar novas perguntas;
- importação e exportação de perguntas em JSON.

## Modo professor

O modo professor serve para acrescentar perguntas sem mexer direto no código.

Nele é possível preencher:

- enunciado;
- quatro alternativas;
- alternativa correta;
- explicação da resposta.

Também dá para exportar o banco de perguntas personalizado e importar depois em outro navegador.

## Onde ficam as perguntas

As perguntas iniciais ficam em `script.js`, na constante:

```js
DEFAULT_QUESTIONS
```

Cada pergunta segue este formato:

```js
{
  id: "base-1",
  prompt: "Texto da pergunta",
  options: ["A", "B", "C", "D"],
  answer: 0,
  explanation: "Explicação da resposta."
}
```

O campo `answer` usa a posição da alternativa correta:

```text
0 = primeira alternativa
1 = segunda alternativa
2 = terceira alternativa
3 = quarta alternativa
```

## Arquivos

| Arquivo | Função |
| --- | --- |
| `index.html` | Estrutura das telas do quiz |
| `style.css` | Aparência, temas, responsividade e animações |
| `script.js` | Perguntas, regras, pontuação, salvamento e modo professor |
| `patch.js` | Arquivo auxiliar mantido no projeto original |

## Dados salvos

O quiz usa `localStorage`, então as informações ficam no próprio navegador.

Chave usada:

```text
quiz-portugues-jogo:state-v2
```

## Quando usar

- revisão antes de prova;
- atividade no laboratório;
- estudo individual;
- retomada de conteúdo;
- diagnóstico rápido de dificuldades.
