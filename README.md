# 📦 TechSolutions - Controle de Equipamentos

Sistema web para controle e gerenciamento de equipamentos eletrônicos das filiais da empresa fictícia **TechSolutions**.

O sistema permite autenticação de usuários, cadastro e edição de equipamentos, registro de ações como manutenção, transferência e descarte, e visualização do histórico completo de cada equipamento.

---

## 🚀 Funcionalidades

### Objetivos Mínimos
- 🔑 **Login com validação de usuário**
- 📝 **Cadastro, listagem, edição e exclusão** de equipamentos eletrônicos
- 🔄 **Registro de ações** que alterem o estado do equipamento:
  - Entrada por manutenção
  - Transferência entre filiais
  - Descarte
- 📊 Estado atual do equipamento refletido na listagem

### Diferenciais
- 📜 **Histórico completo** de ações de cada equipamento (data, responsável, tipo de ação, observações)
- 💬 Comentário opcional em cada registro de ação

---

## 🛠 Tecnologias Utilizadas

### Backend
- **C# .NET 9**
- **SQLite** (banco de dados)

### Frontend
- **React** + **TypeScript**
- **Vite**

---

## 📦 Versões Utilizadas

| Ferramenta | Versão |
|------------|--------|
| Git        | 2.50.1.windows.1 |
| .NET SDK   | 9.0.304 |
| Node.js    | v22.18.0 |
| npm        | 10.9.3 |
| Vite       | 7 |

---

## ⚙️ Como Executar o Projeto

### 1️⃣ Clonar o repositório
```bash
git clone https://github.com/kamilly-quadros/TechSolution.git
cd TechSolution
```

### 2️⃣ Backend (TechSolutions.Server)
```
cd TechSolutions.Server
dotnet build
dotnet watch run
```
O backend será iniciado e ficará monitorando alterações no código.

### 3️⃣ Frontend (Ttchsolutions.client)
Caso o frontend não seja executado automaticamente:
```
cd techsolutions.client
npm install
npm run dev
```
### 🔑 Credenciais de Acesso
- **Usuário:** admin
- **Senha:** senha123
 
### 🗂 Estrutura do Projeto
```
TechSolution/
│
├── TechSolutions.Server/   # Backend em C# .NET + SQLite
│
└── techsolutions.client/   # Frontend em React + TypeScript + Vite
```
