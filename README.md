# 📚 Quiz Português e Trilha das Habilidades

Projeto educacional de Língua Portuguesa feito em **HTML, CSS e JavaScript puro**, com duas experiências diferentes para estudo, revisão e prática em sala de aula:

- 🧠 **Aplicativo de Quiz Português**: quiz tradicional com perguntas, alternativas, resultado final, revisão de erros e modo professor.
- 🎲 **Jogo de Caminho - Trilha das Habilidades**: tabuleiro interativo com caravana estudantil, dado 3D, casas com perguntas e tema claro/escuro.

O projeto roda diretamente no navegador e não precisa de instalação de dependências, servidor ou banco de dados.

---

## ✨ Objetivo do Projeto

O objetivo é transformar conteúdos de Língua Portuguesa em uma experiência mais visual, interativa e divertida.

O aluno pode estudar por meio de perguntas objetivas, receber feedback imediato, revisar erros e avançar em um tabuleiro temático. O professor pode usar o projeto em sala, no laboratório de informática, em projetor, em atividades individuais ou em dinâmicas de grupos.

---

## 🧩 Experiências Disponíveis

### 1. 🧠 Aplicativo de Quiz

O quiz tradicional apresenta perguntas de Português em formato de múltipla escolha.

Principais recursos:

- ✅ Tela inicial organizada
- ✅ Perguntas com quatro alternativas
- ✅ Feedback de acerto e erro
- ✅ Explicação após cada questão
- ✅ Resultado final com pontuação
- ✅ Revisão das perguntas erradas
- ✅ Tema claro e escuro
- ✅ Música e efeitos sonoros
- ✅ Modo tela cheia
- ✅ Embaralhamento de perguntas
- ✅ Embaralhamento de alternativas
- ✅ Progresso salvo no navegador
- ✅ Modo professor para cadastrar perguntas
- ✅ Importação e exportação de perguntas em JSON

### 2. 🎲 Jogo de Caminho

O jogo de caminho funciona como um tabuleiro digital. O aluno joga um dado 3D, a caravana anda pela trilha e, ao parar em uma casa, aparece uma pergunta relacionada a uma habilidade de Português.

Principais recursos:

- ✅ Tela inicial com botão de iniciar
- ✅ Configurações antes do jogo
- ✅ Tabuleiro fixo em tela
- ✅ Caravana estudantil animada
- ✅ Dado 3D com animação
- ✅ Resultado aleatório do dado
- ✅ 20 casas no caminho
- ✅ 10 habilidades de Português
- ✅ 2 perguntas por habilidade
- ✅ Pergunta automática ao cair na casa
- ✅ Feedback de acerto e erro
- ✅ Se acertar, permanece na casa
- ✅ Se errar, volta para a casa anterior
- ✅ Placar de acertos
- ✅ Barra de progresso
- ✅ Tema claro e tema escuro
- ✅ Decorações diferentes entre os temas
- ✅ Sons, música, animações e texto maior configuráveis

---

## 📁 Estrutura do Projeto

```text
Quiz-Portugues-main/
├── Aplicativo/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── Jogo-Caminho/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── .gitignore
└── README.md
```

### 📌 O que existe em cada pasta

| Pasta ou arquivo | Função |
| --- | --- |
| `Aplicativo/` | Contém o quiz tradicional de Português |
| `Jogo-Caminho/` | Contém o jogo de tabuleiro com caravana e dado |
| `README.md` | Documentação completa e manual de usuário |
| `.gitignore` | Arquivos que não devem ser enviados ao GitHub |

---

## 🚀 Como Abrir o Projeto

### Abrir o Quiz

1. Entre na pasta `Aplicativo`.
2. Abra o arquivo `index.html` no navegador.
3. Clique em iniciar e responda às perguntas.

### Abrir o Jogo de Caminho

1. Entre na pasta `Jogo-Caminho`.
2. Abra o arquivo `index.html` no navegador.
3. Clique em **Iniciar jogo**.
4. Jogue o dado e avance pela trilha.

> 💡 O projeto funciona abrindo o arquivo diretamente no navegador, por exemplo:
>
> `file:///C:/Users/Allan/Downloads/Eduardo/Quiz-Portugues-main/Jogo-Caminho/index.html`

---

## 👤 Manual do Usuário

## 🧠 Manual do Quiz Português

### Tela inicial

Na tela inicial do quiz, o usuário pode começar uma nova partida ou continuar uma atividade salva, caso exista progresso no navegador.

### Como jogar

1. Clique em **Iniciar**.
2. Leia a pergunta exibida.
3. Escolha uma das alternativas.
4. Veja o feedback de acerto ou erro.
5. Leia a explicação.
6. Clique para avançar.
7. Continue até finalizar todas as questões.

### Resultado final

Ao terminar, o quiz exibe:

- 🏆 quantidade de acertos
- 📊 porcentagem de desempenho
- 📝 resumo da atividade
- 🔎 lista de perguntas erradas para revisão

### Configurações do quiz

O quiz possui tela de configurações com opções como:

- 🌙 tema claro/escuro
- 🎵 música
- 🔀 embaralhar perguntas
- 🔁 embaralhar alternativas
- 🖥️ tela cheia
- 👩‍🏫 modo professor

### Modo professor

O modo professor permite cadastrar perguntas novas sem editar o código manualmente.

É possível:

- adicionar enunciado
- adicionar quatro alternativas
- escolher a resposta correta
- escrever uma explicação
- exportar perguntas personalizadas
- importar perguntas salvas em JSON

### Salvamento automático

O quiz usa `localStorage`, ou seja, salva informações no próprio navegador.

Ele pode guardar:

- progresso da atividade
- perguntas personalizadas
- configurações escolhidas
- tema atual

---

## 🎲 Manual do Jogo de Caminho

### Tela inicial

Antes de entrar no tabuleiro, o jogador vê uma tela inicial com:

- nome do jogo
- caravana estudantil
- dado decorativo
- botão **Iniciar jogo**
- engrenagem de configurações

### Configurações iniciais

Na engrenagem, o usuário pode ajustar:

- 🌙 tema escuro
- 🎵 música
- 🔊 sons
- ✨ animações
- 🌿 decorações
- 🔠 texto maior

Essas configurações foram pensadas para adaptar o jogo a diferentes usos: computador, projetor, sala de aula, aluno individual ou acessibilidade visual.

### Como jogar

1. Clique em **Iniciar jogo**.
2. Clique em **Jogar dado**.
3. O dado 3D gira e sorteia um número.
4. A caravana anda pela trilha.
5. Ao parar em uma casa, uma pergunta aparece automaticamente.
6. Escolha uma alternativa.
7. Se acertar, a caravana fica na casa.
8. Se errar, a caravana volta para a casa anterior.
9. Continue até chegar à casa 20.

### Regras do jogo

- 🎯 O objetivo é chegar ao final da trilha.
- 🎲 O dado define quantas casas a caravana anda.
- 🧠 Cada casa tem uma pergunta.
- ✅ Ao acertar, o jogador permanece na casa.
- ❌ Ao errar, o jogador retorna para a posição anterior.
- 🏁 O jogo termina ao chegar na última casa.

### Placar e progresso

Durante a partida aparecem:

- número da casa atual
- quantidade de acertos
- barra de progresso
- resultado do dado
- modo atual de organização das perguntas

### Modos de organização

O botão de modo permite alternar a distribuição das perguntas:

- 🔁 **Modo alternado**: habilidades aparecem misturadas no caminho.
- 📚 **Modo por habilidade**: perguntas seguem uma organização mais agrupada.

### Tema claro

O tema claro usa uma proposta mais diurna, com cores vivas, céu claro, vegetação, caravana e decorações escolares.

### Tema escuro

O tema escuro usa uma proposta noturna, com céu mais fechado, brilhos, luzes, contraste reforçado e detalhes diferentes do tema claro.

---

## 🧠 Conteúdos Trabalhados

O jogo de caminho trabalha 10 habilidades de Língua Portuguesa:

1. 📖 Leitura e interpretação
2. ✍️ Ortografia
3. ❓ Pontuação
4. 🧩 Classes de palavras
5. ✅ Concordância
6. 🔄 Sinônimos e antônimos
7. 🎵 Acentuação
8. 💬 Uso dos porquês
9. 📝 Produção textual
10. 🔗 Coesão e coerência

Cada habilidade possui 2 perguntas, totalizando 20 casas no tabuleiro.

---

## 🛠️ Documentação Técnica

## Tecnologias usadas

- 🌐 HTML5
- 🎨 CSS3
- ⚙️ JavaScript puro
- 💾 `localStorage`
- 🔊 Web Audio API

Não existem dependências externas obrigatórias.

### Arquivos do Quiz

| Arquivo | Função |
| --- | --- |
| `Aplicativo/index.html` | Estrutura visual do quiz |
| `Aplicativo/style.css` | Layout, temas, responsividade e animações |
| `Aplicativo/script.js` | Perguntas, navegação, pontuação, configurações e modo professor |

### Arquivos do Jogo de Caminho

| Arquivo | Função |
| --- | --- |
| `Jogo-Caminho/index.html` | Estrutura da tela inicial, controles, tabuleiro e modal |
| `Jogo-Caminho/style.css` | Visual do tabuleiro, temas, dado 3D, caravana e animações |
| `Jogo-Caminho/script.js` | Regras do jogo, perguntas, dado, movimento e feedback |

---

## 🧪 Como Personalizar

## Personalizar perguntas do Jogo de Caminho

As habilidades ficam em:

```js
const skills = [
  "Leitura e interpretação",
  "Ortografia",
  "Pontuação"
];
```

As perguntas ficam em:

```js
const questions = [
  {
    skill: "Leitura e interpretação",
    prompt: "Pergunta aqui",
    options: ["Alternativa A", "Alternativa B", "Alternativa C", "Alternativa D"],
    answer: 1,
    explanation: "Explicação da resposta."
  }
];
```

### Campos de uma pergunta

| Campo | Função |
| --- | --- |
| `skill` | habilidade relacionada à pergunta |
| `prompt` | enunciado da questão |
| `options` | alternativas exibidas ao jogador |
| `answer` | número da alternativa correta, começando em `0` |
| `explanation` | explicação exibida após responder |

Exemplo:

```js
{
  skill: "Ortografia",
  prompt: "Qual palavra está escrita corretamente?",
  options: ["Excessão", "Exceção", "Esceção", "Esseção"],
  answer: 1,
  explanation: "A escrita correta é exceção."
}
```

Nesse exemplo, a resposta correta é `"Exceção"`, porque ela está na posição `1`.

### Índice das alternativas

```text
0 = primeira alternativa
1 = segunda alternativa
2 = terceira alternativa
3 = quarta alternativa
```

---

## 🎨 Personalizar o visual

### Alterar cores

As principais cores ficam no CSS, especialmente nas variáveis e regras de tema.

Procure em:

```text
Jogo-Caminho/style.css
Aplicativo/style.css
```

### Alterar posições das casas

No jogo de caminho, as posições das casas ficam em `Jogo-Caminho/script.js`:

```js
const tilePositions = [
  { x: 13.1, y: 85.4, rotate: 7 },
  { x: 24.6, y: 86.6, rotate: -6 }
];
```

Cada casa usa:

- `x`: posição horizontal em porcentagem
- `y`: posição vertical em porcentagem
- `rotate`: inclinação da casa

### Alterar posição inicial da caravana

```js
const startPosition = { x: 7.9, y: 80.7 };
```

---

## 🔊 Sons e Música

O projeto usa a **Web Audio API**, que permite criar sons diretamente pelo navegador.

No jogo de caminho, as opções de áudio podem ser ligadas ou desligadas nas configurações.

Por padrão:

- música começa desligada
- efeitos sonoros começam ligados

Isso evita que o navegador bloqueie áudio antes da interação do usuário.

---

## 💾 Dados Salvos no Navegador

O projeto usa `localStorage`.

### Quiz

Chave principal:

```text
quiz-portugues-jogo:state-v2
```

### Jogo de caminho

Chaves principais:

```text
trilha-habilidades:theme
trilha-habilidades:settings
```

Esses dados ficam apenas no navegador da pessoa que está usando.

---

## 🧯 Solução de Problemas

### O jogo não abriu

Verifique se o arquivo correto foi aberto:

```text
Jogo-Caminho/index.html
```

ou

```text
Aplicativo/index.html
```

### O som não toca

Alguns navegadores bloqueiam áudio antes do primeiro clique.

Solução:

1. Clique em iniciar.
2. Ative música nas configurações.
3. Interaja com o jogo novamente.

### O tema não mudou

O tema é salvo no navegador. Se algo parecer travado:

1. Atualize a página.
2. Abra as configurações.
3. Troque o tema novamente.

### Quero apagar o progresso salvo

Você pode limpar os dados do site pelo navegador ou usar a opção de reiniciar dentro do jogo.

### O tabuleiro parece cortado

Use tela cheia ou ajuste o zoom do navegador para 100%.

---

## 👩‍🏫 Sugestões de Uso em Sala

### Individual

Cada aluno joga em um computador e responde às perguntas no próprio ritmo.

### Em dupla

Dois alunos discutem a resposta antes de escolher a alternativa.

### Com projetor

O professor projeta o jogo e a turma decide coletivamente qual alternativa responder.

### Como revisão

O jogo pode ser usado antes de provas, simulados ou atividades de recuperação.

### Como avaliação diagnóstica

O professor pode observar quais habilidades geram mais erros e planejar reforços.

---

## 🧾 Checklist de Manutenção

Antes de entregar ou publicar uma nova versão:

- ✅ testar o botão iniciar
- ✅ testar o dado
- ✅ testar resposta correta
- ✅ testar resposta errada
- ✅ testar reiniciar
- ✅ testar tema claro
- ✅ testar tema escuro
- ✅ testar configurações
- ✅ conferir se os textos cabem nos botões
- ✅ conferir se o tabuleiro cabe na tela
- ✅ conferir se não há casas sobrepostas
- ✅ abrir o projeto em outro navegador

---

## 🌐 Publicação no GitHub

Repositório informado:

```text
git@github.com:AllanSousa00/jogo-eduardo.git
```

Com Git instalado e acesso SSH configurado, os comandos seriam:

```bash
cd C:/Users/Allan/Downloads/Eduardo/Quiz-Portugues-main
git init
git add .
git commit -m "Documenta projeto e finaliza jogo educativo"
git branch -M main
git remote add origin git@github.com:AllanSousa00/jogo-eduardo.git
git push -u origin main
```

Se o repositório já tiver sido iniciado antes, use:

```bash
git remote set-url origin git@github.com:AllanSousa00/jogo-eduardo.git
git add .
git commit -m "Atualiza documentação do projeto"
git push
```

> ⚠️ Observação: para publicar via SSH, a máquina precisa ter o Git instalado e uma chave SSH autorizada na conta do GitHub.

---

## 🧑‍💻 Estado Atual do Projeto

O projeto está pronto localmente com:

- ✅ quiz tradicional
- ✅ jogo de caminho
- ✅ tela inicial
- ✅ configurações
- ✅ dado 3D
- ✅ caravana
- ✅ tema claro
- ✅ tema escuro
- ✅ documentação completa
- ✅ manual de usuário
- ✅ arquivo `.gitignore`

---

## 📌 Resumo Final

Este projeto é uma ferramenta educacional interativa para trabalhar Língua Portuguesa de forma mais dinâmica.

Ele pode ser usado por alunos, professores e turmas inteiras, tanto como jogo quanto como quiz tradicional. A proposta principal é unir aprendizagem, feedback imediato e experiência visual agradável em um projeto simples de abrir, fácil de editar e pronto para publicação no GitHub.
