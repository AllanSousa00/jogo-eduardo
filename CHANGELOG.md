# Changelog

O formato segue [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/).

## [Unreleased]

### Added

- Portal único de entrada na raiz do site, com botões para abrir o Quiz ou a Trilha.
- Créditos visíveis e licença de uso restrito para pessoas autorizadas pelo responsável.
- Pacotes independentes de desenvolvimento e publicação para o Quiz e para a Trilha.
- Builds `dist/`, servidores locais, validadores de perguntas e configuração Netlify por projeto.
- Auditoria responsiva Playwright para desktop e celular, com verificação de cortes e acesso ao tabuleiro.
- Remoção segura de perguntas personalizadas no modo professor.
- Preferência de movimento reduzido local à Trilha das Habilidades.
- Contrato de independência validado, templates de colaboração e smoke tests Playwright.
- Scripts locais de servidor, build estático, lint, formatação e validação de rotas/storage.
- Workflows separados para integração contínua e publicação no GitHub Pages.

### Changed

- Corrigida a adaptação do modo professor para manter texto legível e conteúdo rolável.
- Corrigido o tabuleiro móvel da Trilha para permitir acesso por rolagem a todas as casas.
- Corrigidos o ícone de tela cheia, uma questão corrompida e alternativas duplicadas do Quiz.
- Conteúdo importado no Quiz agora é renderizado como texto, evitando injeção de HTML.
- Documentação raiz descreve a publicação única com portal e os dois jogos preservados em subpastas.
- Fontes organizadas em `apps/`, material de origem isolado em `referencias/` e publicação mantida
  nas rotas históricas.
- Modal do modo professor mantém o botão de fechamento acessível em telas de menor altura.

### Removed

- Dependências visuais compartilhadas entre as duas pastas de jogos.
- Documentação extensa e mídias de apresentação redundantes com os aplicativos.

## [1.1.0] - 2026-05-12

### Changed

- Melhorado o contraste do tema escuro da Trilha das Habilidades.
- Criada paleta oficial do projeto com variáveis CSS.
- Padronizadas sombras, foco e estados de hover dos botões.
- Adicionados modos de alto contraste, texto maior, narração, silenciar tudo e tela cheia.
- Criados atalhos de teclado para uso em sala.
- Separado o banco da Trilha em `data.js`.
- Adicionadas perguntas de verdadeiro/falso, completar lacuna e associação.
- Criado resumo final por habilidade.
- Adicionados scripts de validação e checklist de QA.
- Criada página inicial para GitHub Pages.
- Atualizada documentação com manual de uso, edição de perguntas e publicação.

## [1.0.0] - 2026-05-12

### Added

- Organização inicial dos projetos em `Quiz-Portugues` e `Trilha-das-Habilidades`.
- Publicação inicial no repositório `jogo-eduardo`.
