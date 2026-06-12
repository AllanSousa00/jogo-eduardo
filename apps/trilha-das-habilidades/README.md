# Trilha das Habilidades

Projeto web estático e independente para revisar Língua Portuguesa em uma trilha de 20 casas. Pode ser publicado sozinho em qualquer hospedagem de arquivos estáticos.

## Executar

```bash
npm run check
npm run serve
```

Abra `http://127.0.0.1:4174/`.

## Publicar

```bash
npm run build
```

Publique o conteúdo da pasta `dist/`. No Netlify, o `netlify.toml` já está configurado.

## Como jogar

1. Inicie o jogo.
2. Jogue o dado.
3. Responda à pergunta da casa sorteada.
4. Ao acertar, permaneça na casa; ao errar, retorne à posição anterior.
5. Conclua as 20 casas e consulte o resumo por habilidade.

## Conteúdo

O jogo trabalha 10 habilidades e mantém 5 perguntas por habilidade:

1. Leitura e interpretação;
2. Ortografia;
3. Pontuação;
4. Classes de palavras;
5. Concordância;
6. Sinônimos e antônimos;
7. Acentuação;
8. Uso dos porquês;
9. Produção textual;
10. Coesão e coerência.

As perguntas ficam em `game-data.js`. Depois de alterá-las, execute `npm run check` para validar habilidades, tipos, alternativas, resposta e explicação.

## Acessibilidade e controles

- teclado: `Espaço` ou `D` joga o dado, `1` a `4` responde, `R` reinicia, `T` troca o tema, `F` alterna tela cheia e `M` silencia;
- opções de texto maior, alto contraste, movimento reduzido e narração;
- tabuleiro acessível por rolagem em telas pequenas;
- temas claro e escuro, sons e modo de tela cheia.

## Arquivos de publicação

- `index.html`: abertura, tabuleiro e modais;
- `style.css`: arte, layout e responsividade;
- `script.js`: regras, dado, progresso e acessibilidade;
- `game-data.js`: habilidades, casas e perguntas.
