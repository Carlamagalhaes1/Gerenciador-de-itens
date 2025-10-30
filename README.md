# 🧩 Projeto CRUD Full Stack com Next.js + Node.js + TailwindCSS

Um projeto **Full Stack simples e funcional**, criado com **Next.js 16**, **Tailwind CSS v4** e **Node.js**, implementando um **CRUD completo** (Create, Read, Update, Delete) com armazenamento em **JSON local**.  

---

## 🚀 Tecnologias Utilizadas

- **Next.js 16** — Framework React fullstack moderno  
- **React 19** — Biblioteca base para a interface  
- **Tailwind CSS v4** — Estilização rápida e responsiva  
- **Node.js** — Ambiente de execução do backend  
- **JSON local** — Simulação de banco de dados  
- **PostCSS + @tailwindcss/postcss** — Processamento de CSS moderno  

---

## 📦 Instalação e Execução

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/Carlamagalhaes1/Gerenciador-de-itens.git
cd nome-do-projeto
```

### 2️⃣ Instalar as dependências

```bash
npm install
```

### 3️⃣ Rodar o projeto em ambiente de desenvolvimento

```bash
npm run dev
```

> O projeto estará disponível em:  
> 👉 http://localhost:3000

---

## 🧱 Estrutura do Projeto

```
📂 projeto-crud
 ┣ 📂 app
 ┃ ┣ 📂 api
 ┃ ┃ ┣ 📜 route.js      # Endpoints de CRUD (GET, POST, PUT, DELETE)
 ┃ ┣ 📜 page.jsx         # Página principal com a interface CRUD
 ┣ 📂 data
 ┃ ┗ 📜 db.json          # “Banco de dados” local em JSON
 ┣ 📂 styles
 ┃ ┗ 📜 globals.css      # Estilos globais com Tailwind
 ┣ 📜 postcss.config.cjs # Configuração do PostCSS
 ┣ 📜 tailwind.config.js # Configuração do Tailwind CSS
 ┣ 📜 package.json
 ┗ 📜 README.md
```

---

## ⚙️ Comandos Úteis

| Comando | Descrição |
|----------|------------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera a versão de produção |
| `npm start` | Inicia o servidor após o build |
| `npm run lint` | Executa a verificação de código |

---

## 🧮 Funcionalidades do CRUD

- ➕ **Cadastrar** novos itens  
- 📋 **Listar** todos os registros  
- ✏️ **Editar** informações existentes  
- ❌ **Excluir** registros  
- 💾 Dados armazenados em `data/db.json`

---

## 🎨 Interface

Construída com **Tailwind CSS**, garantindo:
- Design limpo e responsivo  
- Cores suaves e modernas  
- Feedback visual nas ações de CRUD  

---


---

## 📄 Licença

Este projeto é de código aberto e pode ser usado para estudos, testes ou portfólios.  
Sinta-se livre para aprimorar e compartilhar!

---
