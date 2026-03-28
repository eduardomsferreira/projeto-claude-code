# /init — Inicializar projeto no GitHub

Este comando inicializa o repositório Git local e cria/sincroniza com o repositório no GitHub.

## Passos executados:

1. **Verificar se o diretório já tem git** — se não, inicializar com `git init`
2. **Criar `.gitignore`** se não existir
3. **Fazer commit inicial** de todos os arquivos
4. **Criar repositório no GitHub** via `gh repo create` (se ainda não existir)
5. **Fazer push** para o GitHub
6. **Confirmar URL** do repositório criado

## Como usar:

```
/init
```

Após o `/init`, todas as alterações feitas por Claude Code são automaticamente
enviadas ao GitHub via hook `PostToolUse` configurado em `.claude/settings.json`.

## Requisitos:
- GitHub CLI instalado (`gh`) e autenticado (`gh auth login`)
- Git instalado
