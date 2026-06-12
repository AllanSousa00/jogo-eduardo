# Quiz Português

Projeto web estático e independente para revisão de Língua Portuguesa. Pode ser publicado sozinho em qualquer hospedagem de arquivos estáticos.

## Executar

```bash
npm run check
npm run serve
```

Abra `http://127.0.0.1:4173/`.

## Publicar

```bash
npm run build
```

Publique o conteúdo da pasta `dist/`. No Netlify, o `netlify.toml` já está configurado.

## Recursos

- 14 perguntas base de múltipla escolha;
- feedback imediato e explicação da resposta;
- pontuação final e revisão dos erros;
- perguntas e alternativas embaralháveis;
- progresso salvo no navegador;
- temas claro e escuro, música e tela cheia;
- modo professor com cadastro, remoção, importação e exportação JSON.

## Banco de perguntas

As perguntas base ficam em `script.js`, na constante `DEFAULT_QUESTIONS`.

```js
{
  id: "base-1",
  prompt: "Texto da pergunta",
  options: ["A", "B", "C", "D"],
  answer: 0,
  explanation: "Explicação da resposta."
}
```

O campo `answer` começa em zero: `0` é a primeira alternativa e `3` é a quarta.

Perguntas cadastradas no modo professor ficam somente no navegador, na chave `quiz-portugues-jogo:state-v2`. Use **Exportar JSON** para fazer cópia ou transferir o banco.

## Arquivos de publicação

- `index.html`: telas e componentes;
- `style.css`: visual e responsividade;
- `script.js`: perguntas e regras;
- `viewport-fit.js`: ajuste a telas pequenas.
