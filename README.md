# PayTrack

PayTrack é uma API desenvolvida para gerenciar contas bancárias e pagamentos. Este projeto utiliza o NestJS e PostgreSQL para fornecer uma API robusta e escalável com autenticação JWT.

## Funcionalidades

- **Cadastro de Contas:** Permite a criação de contas bancárias com nome, tipo (corrente ou poupança) e saldo inicial.
- **Cadastro de Pagamentos:** Permite a criação de pagamentos associados a uma conta bancária.
- **Relatório de Transações:** Gera relatórios de transações para uma conta específica dentro de um intervalo de datas.
- **Autenticação e Autorização:** Utiliza JWT para autenticação e proteção dos endpoints.
- **Documentação da API:** A documentação interativa da API está disponível via Swagger.

## Tecnologias Utilizadas

- **NestJS:** Framework Node.js para construir aplicações do lado do servidor.
- **TypeORM:** ORM para trabalhar com bancos de dados relacionais.
- **PostgreSQL:** Sistema de gerenciamento de banco de dados relacional.
- **Swagger:** Documentação da API.

## Instalação

### Pré-requisitos

- Node.js
- npm
- PostgreSQL

### Passos para Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/Yuz1n/paytrack.git
   cd paytrack
   npm install
   ```
2. **Configuração Base de Dados**
   Troque no arquivo app.module as conexões para sua base de dados.
3. **Iniciando Aplicação**
   ```bash
   npm run start
   ```
   A documentação da aplicação estará disponível em http://localhost:3000/api
