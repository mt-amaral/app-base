# SPA Client-side em React com Vite

Projeto simples de autenticação, navegação, listagens e telas administrativas. A base está montada em **React + Vite + TypeScript**, usando **TanStack Router**, **TanStack Query**, **shadcn/ui**, **Radix UI** e **Tailwind CSS v4**.Com suporte para build de produção com **Nginx** e para SPA no Netlify.

### Backend

- Backend usado: https://github.com/mt-amaral/api-base

---

# Visão geral

O projeto foi pensado como uma base frontend para painel administrativo,
para ser usado como templete rapido para futuros projetos.

---

## Stack

- **React 19**
- **Vite 7**
- **TypeScript**
- **Tailwind CSS v4**

## UI e componentes

- **shadcn/ui**
- **Radix UI**
- **Lucide React**
- **Sonner**

## Dados, rotas e estado

- **TanStack Router**
- **TanStack Query**
- **Axios**
- **Zustand**

## Formulários e validação

- **React Hook Form**
- **Zod**
- **@hookform/resolvers**

---

# Autenticação

Pelo `main.tsx`, o projeto já está preparado para tratar erros comuns da API.
A validação é feita nos cookies com `http only`.
Dados de login consulte as informações de seed do no backend

Isso é bom porque deixa o comportamento centralizado e evita tratar tudo manualmente em cada tela.

---

## 1. Router

O projeto usa **TanStack Router** com plugin do Vite e geração de rotas, o que ajuda a deixar a navegação mais organizada.

## 2. Query centralizada

O **TanStack Query** já está configurado com:

- `staleTime`
- `gcTime`
- retry controlado
- tratamento global de erro
  Isso reduz bastante repetição, e se encaixa com os padrão de retorno vindo do meu backend.

## 3. Tema e componentes

O projeto usa **shadcn/ui**, base color **slate** e **Lucide** como biblioteca de ícones.

---

## Como rodar

### Opção 1: rodar com npm

```bash
npm install
npm run dev
```

A aplicação sobe pelo Vite.

## Opção 2: rodar com Docker

Existe um `Dockerfile` de desenvolvimento usando **Node 22 Alpine** e expondo a porta `5173`.

```bash
docker build -t app-base .
docker run -p 5173:5173 app-base
```

---

# Integração com backend

Esse frontend foi feito para trabalhar junto com:

- https://github.com/mt-amaral/api-base

Então a ideia é:

- `app-base` e `api-base` no mesmo diretorio

---

### Temas

Para testar combinações de tema com shadcn/ui, vale muito usar:

- https://tweakcn.com

### Inspiração de código

- https://github.com/satnaing/shadcn-admin

---

## Links

- Frontend: https://github.com/mt-amaral/app-base
- Backend: https://github.com/mt-amaral/api-base
- Temas shadcn/ui: https://tweakcn.com
- Inspiração de código: https://github.com/satnaing/shadcn-admin
