# Português Interativo

Este repositório reúne duas atividades de Língua Portuguesa feitas para rodar direto no navegador:

- **Quiz Português**, um quiz mais tradicional, com perguntas, alternativas, revisão e modo professor.
- **Trilha das Habilidades**, um jogo de caminho com caravana estudantil, dado 3D e perguntas por casa.

A ideia é simples: abrir o arquivo HTML e usar. Não precisa instalar dependências, criar servidor ou configurar banco de dados.

## Estrutura

```text
Portugues-Interativo/
├── Aplicativo/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── README.md
├── Jogo-Caminho/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── README.md
├── .gitignore
└── README.md
```

## Como abrir

### Quiz Português

Abra:

```text
Aplicativo/index.html
```

### Trilha das Habilidades

Abra:

```text
Jogo-Caminho/index.html
```

## O que cada projeto faz

### Quiz Português

O quiz trabalha perguntas de múltipla escolha. Ele mostra feedback depois da resposta, guarda progresso no navegador e possui um modo professor para cadastrar novas perguntas.

Documentação própria:

```text
Aplicativo/README.md
```

### Trilha das Habilidades

A trilha funciona como um jogo de tabuleiro. O aluno joga o dado, a caravana anda, uma pergunta aparece e a resposta define se ele fica na casa ou volta.

Documentação própria:

```text
Jogo-Caminho/README.md
```

## Tecnologias

- HTML
- CSS
- JavaScript puro
- localStorage
- Web Audio API

## Publicação

Repositório remoto:

```text
git@github.com:AllanSousa00/jogo-eduardo.git
```

Comandos úteis:

```bash
git status
git add .
git commit -m "Atualiza documentação"
git push
```

## Observação

Os dois projetos foram pensados para uso escolar. O professor pode abrir em um computador, projetar em sala ou deixar os alunos jogarem individualmente.
