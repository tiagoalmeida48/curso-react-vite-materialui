# Sistema de Gestão de Cadastros

Bem-vindo ao projeto **Gestão de Cadastros**! Esta é uma aplicação Frontend moderna desenvolvida com React e TypeScript, focada em boas práticas, performance e uma experiência de usuário (UX) fluida.

## 🚀 Sobre o Projeto

Este sistema permite o gerenciamento completo (CRUD) de **Usuários** e **Cidades**, oferecendo funcionalidades avançadas como:

- **Dashboard** com visão geral.
- **Listagens paginadas** com busca rápida (debounce).
- **Formulários inteligentes** com validação robusta (Zod).
- **Autenticação** (simulada).
- **Tema Escuro/Claro** (Dark Mode).
- **Layout Responsivo** adaptável a diferentes dispositivos.

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando as ferramentas mais atuais do ecossistema React:

- **Core:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **UI Framework:** [Material UI v7](https://mui.com/) (MUI)
- **Estado Global:** [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching:** [TanStack Query v5](https://tanstack.com/query/latest) (React Query)
- **Formulários:** [React Hook Form](https://react-hook-form.com/)
- **Validação:** [Zod](https://zod.dev/)
- **Roteamento:** [React Router v7](https://reactrouter.com/)
- **API Mock:** [JSON Server](https://github.com/typicode/json-server)

## ✨ Funcionalidades Destacadas

- **Performance:** Uso de `useQuery` para cacheamento de dados e `Lazy Loading` para carregamento sob demanda das páginas.
- **UX Aprimorada:** Feedback visual de carregamento (`LinearProgress`), confirmações de exclusão e notificações (Snackbars).
- **Autocomplete Inteligente:** Componente de seleção de cidades com busca assíncrona e prevenção de conflitos de digitação.
- **Código Limpo:** Arquitetura organizada em "Feature Folders" (`src/pages`), `shared` e hooks customizados.

## 📦 Instalação e Uso

Para instruções detalhadas sobre como baixar, instalar e rodar o projeto em sua máquina, consulte o arquivo [README-INSTALL.md](./README-INSTALL.md).
