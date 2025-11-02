# 💻 Sistema de Gerenciamento Corporativo Calbon (Frontend)

## 📌 Descrição do Projeto

Este projeto consiste no frontend de uma aplicação web desenvolvida em **React** para um Sistema de Gerenciamento Corporativo. Ele foi desenvolvido em atendimento aos requisitos da disciplina **Desenvolvimento de Aplicações Dinâmicas (DAD)**, utilizando React em substituição ao JavaScript puro (conforme requisito **Extra**) e seguindo as melhores práticas de organização e modularização.

O sistema oferece acesso seguro, gerenciamento de dados de funcionários (CRUD), visualização de métricas estratégicas (Dashboard) e um assistente virtual (Chat Bot), garantindo uma experiência dinâmica e interativa.

## ✅ Conformidade com os Requisitos de DAD

| Requisito | Status | Observações |
| :--- | :--- | :--- |
| **Implementação Web (HTML/CSS/JS)** | **Concluído** | Interface dinâmica e interativa implementada com React e estilização CSS. |
| **Código JS Externo e Modular** | **Concluído** | Todo o código JavaScript (React) é modularizado em arquivos `.jsx` e componentes. |
| **Funcionalidades no Carregamento** | **Concluído** | Uso do `useEffect` para carregar dados (ex: `VisualizarFuncionarios` carrega dados de funcionários no início). |
| **Validação de Formulário com Regex** | **Concluído** | Implementada nos formulários (Ex: Login com CNPJ), garantindo a integridade dos dados. |
| **Armazenamento Local (Web Storage)** | **Concluído** | Uso de `sessionStorage` para persistir informações essenciais de autenticação (token, CNPJ, nome da empresa). |
| **EXTRA: Uso de React** | **Adotado** | Projeto 100% desenvolvido em React, seguindo a convenção de componentes em arquivos `.jsx`. |

## ✨ Funcionalidades Principais

O sistema é dividido nos seguintes módulos principais:

* **Autenticação Segura (Login):** Conforme tela de Login, o acesso é feito via **CNPJ** e senha. O sistema armazena o token e dados da sessão na `sessionStorage`.
* **Gerenciamento de Funcionários (CRUD):**
    * **Listagem e Busca:** Tabela completa de funcionários com filtro de busca por nome.
    * **CRUD Completo:** Funções para **Cadastrar** (`InserirFuncionario`), **Editar** (`EditarFuncionario`) e **Excluir** registros.
* **Visualização de Dados Estáticos:** Páginas dedicadas para consulta de listas de **Cargos** e **Localizações**.
* **Dashboard de Métricas:** Exibição de um painel de Business Intelligence (Power BI) incorporado para acompanhamento de KPIs.
* **Chat Bot Assistente (Calbon):** Interface de conversação que se conecta a um endpoint de backend (`/chat`) para suporte.
* **Navegação:** Menu de escolha principal (`/escolha`) e Sidebar de navegação com destaque para a rota ativa.

## ⚙️ Arquitetura e Estrutura do Projeto

O projeto segue a arquitetura de **Componentes React** e o princípio da **Separação de Preocupações**, isolando a lógica de negócio (serviços) da lógica de interface (componentes).

### Estrutura de Pastas
## 🛠️ Tecnologias Utilizadas

| Categoria | Tecnologia | Uso Principal |
| :--- | :--- | :--- |
| **Framework** | [React](https://reactjs.org/) | Construção de interfaces interativas. |
| **Roteamento** | [React Router DOM](https://reactrouter.com/) | Navegação Single Page Application (SPA). |
| **Gerenciamento de Estado** | React Hooks (`useState`, `useEffect`) | Lógica de estado e ciclo de vida. |
| **Persistência de Dados** | Web Storage (`sessionStorage`) | Armazenamento de token de autenticação. |
| **Comunicação com API** | `fetch` ou `axios` (via Services) | Requisições HTTP ao Backend. |
| **Estilização** | CSS Puro/Modularizado | Layout e design das interfaces. |

## 🚀 Como Iniciar o Projeto

### Pré-requisitos

* [Node.js](https://nodejs.org/en/) (versão LTS recomendada)
* npm ou Yarn
* Um servidor de **Backend de API** rodando e acessível (necessário para Login e CRUD).

### 1. Instalação das Dependências

Clone o repositório e instale as dependências:

```bash
# Clone o repositório 
git clone https://github.com/EcoFactory-Calbon/DAD-Calbon.git
cd nome-do-projeto-web

# Instale as dependências do frontend
npm install
# ou
# yarn install
