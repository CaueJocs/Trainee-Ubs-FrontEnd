# UBS Expense Manager — Front-end 
Front-end do projeto **Expense Manager: Gestão de Custos de Funcionários** (UBS).

**Stack:** React + TypeScript + Vite + Material UI (MUI) + React Router  
**API:** configurável via `.env` (Vite)

---

## Overview

Este projeto entrega a interface web para:
- Autenticação e navegação protegida (rotas privadas)
- Listagem e interação com tabelas (MUI DataGrid)
- Fluxos de **Expenses**, **Approvals**, **Budget** e **Departments**
- Componentes globais de layout (**Header**, **Footer**, **MainLayout**)

---

## Getting Started

### Pré-requisitos
- **Node.js 18+** (recomendado 20+)
- **NPM** (incluso com Node.js)

### Instalação
'''bash

git clone <URL_DO_REPO>

cd Trainee-Ubs-FrontEnd

npm install

## Variáveis de ambiente

Este projeto utiliza arquivos de ambiente do Vite para configurar o endpoint da API.

- **`.env.development`** (usado no `npm run dev`)
  - `VITE_API_BASE_URL=http://localhost:8080/api`
  - `VITE_FEATURE_FLAG=true`

- **`.env.production`** (usado no `npm run build` / produção)
  - `VITE_API_BASE_URL=http://146.235.36.58:8080/api`
  - `VITE_FEATURE_FLAG=false`

> Garanta que a API (backend) esteja rodando e acessível na `VITE_API_BASE_URL`, caso contrário o login e as requisições irão falhar.

### Scripts

npm run dev — ambiente local (Vite)

npm run build — build de produção (TypeScript + Vite)

npm run preview — preview do build

npm run lint — ESLint

### Credenciais (ambiente de testes)

As credenciais abaixo estão validadas. Cada usuário possui permissões/roles específicas.

daniel.contente@ubsbb.com
 — Daniel123#
 
vinicius.dezotti@ubsbb.com
 — Vinicius123#

kenzo.miyashita@ubs.com
 — Kenzo123#

caue.jacomini@ubs.com
 — Caue123#

nicolas.costa@ubs.com
 — Nicolas123#

yuri.martins@ubs.com
 — Yuri123#

### Rotas do sistema

Rotas configuradas no App.tsx:

/login

/home

/my-expenses

/my-approvals

/budget

/access

/departments
