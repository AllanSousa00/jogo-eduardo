# Checklist de QA

Use este checklist antes de apresentar ou publicar uma nova versão.

## Trilha das Habilidades

- [ ] A tela inicial abre sem rolagem estranha.
- [ ] A engrenagem abre e fecha o painel de configurações.
- [ ] Tema claro e tema escuro ficam legíveis.
- [ ] Alto contraste melhora a leitura.
- [ ] Texto maior não quebra os botões principais.
- [ ] Reduzir animações diminui movimentos da tela.
- [ ] O botão de tela cheia funciona.
- [ ] O dado gira e mostra resultado.
- [ ] A caravana anda até a casa correta.
- [ ] As casas não ficam em cima de decorações importantes.
- [ ] O modal de pergunta aparece depois do movimento.
- [ ] Alternativas corretas e erradas recebem feedback visual.
- [ ] Ao errar, a caravana volta para a casa anterior.
- [ ] Ao acertar, a caravana permanece na casa.
- [ ] A tela final mostra resumo por habilidade.
- [ ] Atalhos `D`, `R`, `T`, `F`, `M` e números de alternativas funcionam.
- [ ] A navegação por teclado mostra foco visível.
- [ ] A narração de perguntas funciona quando ativada.
- [ ] O jogo funciona em projetor.
- [ ] O jogo continua usável em celular e tablet.

## Quiz Português

- [ ] O quiz inicia normalmente.
- [ ] As perguntas aparecem com alternativas.
- [ ] O feedback aparece após responder.
- [ ] A revisão dos erros funciona.
- [ ] O modo professor abre.
- [ ] Importação e exportação de perguntas funcionam.
- [ ] Tema claro e tema escuro ficam legíveis.
- [ ] O progresso salvo não impede uma nova partida.

## Validação automática

Rode:

```bash
node tools/check-project.js
```

O comando precisa terminar sem erros.
