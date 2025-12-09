# Guia de Instalação e Execução

Siga os passos abaixo para configurar e rodar o projeto em seu ambiente local.

## Pré-requisitos

Certifique-se de ter instalado em sua máquina:

- **Node.js** (Versão 18 ou superior recomendada)
- **Yarn** (Gerenciador de pacotes utilizado neste projeto)

## 1. Clonar e Instalar

Primeiro, clone o repositório e instale as dependências:

```bash
# Instalar as dependências do projeto
yarn install
```

## 2. Iniciar o Backend (API Mock)

Este projeto utiliza o `json-server` para simular uma API REST completa. **É obrigatório que este servidor esteja rodando** para que a aplicação funcione corretamente (login, listagens, cadastros).

Abra um terminal e execute:

```bash
yarn mock
```

> ℹ️ O servidor rodará na porta `3333` (http://localhost:3333). Mantenha este terminal aberto.

## 3. Iniciar o Frontend

Em um **novo terminal** (mantenha o do mock aberto), inicie a aplicação React:

```bash
yarn dev
```

> ℹ️ A aplicação estará disponível geralmente em http://localhost:5173 (confira o output do terminal).

## Outros Comandos Úteis

### Gerar Tipagem da API

Se você alterar a estrutura do `mock/database.json`, pode regenerar os tipos TypeScript automaticamente:

```bash
yarn gen:types
```

### Build de Produção

Para gerar a versão otimizada para produção:

```bash
yarn build
```

O resultado será gerado na pasta `dist`.

### Linting

Para verificar a qualidade do código e buscar por erros:

```bash
yarn lint
```
