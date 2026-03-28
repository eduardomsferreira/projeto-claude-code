# CLAUDE.md — Projeto Claude Code

## Repositório GitHub

**URL:** https://github.com/eduardomsferreira/projeto-claude-code

Todas as alterações feitas por Claude Code são automaticamente sincronizadas
com o repositório no GitHub via hook configurado em `.claude/settings.json`.

## Auto-sync com GitHub

O hook `PostToolUse` em `.claude/settings.json` executa automaticamente após
cada edição de arquivo (Edit, Write, NotebookEdit):

```bash
git add -A
git commit -m "Auto-sync: <timestamp>"
git push origin master
```

Isso garante que o repositório no GitHub sempre reflita o estado atual do projeto.

## Inicialização de novos projetos

Use o comando `/init` para inicializar um projeto no GitHub:

1. Inicializa o repositório Git local
2. Cria `.gitignore` adequado
3. Cria repositório no GitHub via `gh repo create`
4. Faz o push inicial
5. O auto-sync passa a funcionar automaticamente

## Requisitos do ambiente

- **GitHub CLI** (`gh`) instalado em `C:\Program Files\GitHub CLI\`
- **Autenticação**: `gh auth login` (usuário: `eduardomsferreira`)
- **Git** configurado com credenciais HTTPS via gh

## Estrutura do projeto

```
Projeto Claude Code/
├── .claude/
│   ├── settings.json       # Hooks de auto-sync
│   └── commands/
│       └── init.md         # Comando /init
├── .gitignore
├── CLAUDE.md               # Este arquivo
├── Aplicativo de Growth Marketing/
│   ├── index.html
│   ├── app.js
│   └── data.js
└── alves-solar-landing.html
```
