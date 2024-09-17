# <h1 align="center"> BACK-END  </h1>

### Tecnologias

Tecnologias e ferramentas utilizadas no projeto: `Typescript, NodeJS, Express.js, MongoDB, jwt, bycryptjs`

## Como Executar a aplicação
```bash
# Baixe este repositório ou clone pelo Git usando o comando:
$ git clone https://github.com/candago-3/back.git

# Acesse a pasta do projeto
$ cd back

# Utilizando o MongoDB certifique-se que haja um banco no endereço:
$ 'mongodb://127.0.0.1:27017/'

# Instale as dependências do projeto
$ npm i

# Inicie o Projeto
$ npm run dev
```

## Rotas da aplicação
<div align="center">
  
|                                                                    Tipo | Rota                       | Ação                              |
| ----------------------------------------------------------------------: | :------------------------- | :-------------------------------- |
|                                                                    <hr> | <hr>                       | **Controle de usuários**          |
|   [![](https://img.shields.io/badge/POST-4682B4?style=for-the-badge)]() | `/login`                   | Efetua o login do usuário  |
|   [![](https://img.shields.io/badge/POST-4682B4?style=for-the-badge)]() | `/reigster`           | Cadastrar um usuário |



</div>

## Estruturação das pastas

| Pasta                    | Definição                                                                                  |
| ------------------------ | ------------------------------------------------------------------------------------------ |
| 📁 src/                   | Arquivos com o código fonte do projeto                                                     |
| 📁 src/controllers/        | Arquivos com os métodos de requisição das rotas                                            |
| 📁 src/models/             | Arquivos com as entidades do banco de dados do projeto                                     |
| 📁 src/routes/          | Arquivos para expor rotas de controles da aplicação                                        |
| 📁 src/server/            | Arquivo usado para configuração do servidor     |
| 📄 .gitignore          | Arquivo com a retenção de arquivos pelo serviço de git.     |
| 📄 tsconfig.json          | Arquivo usado para configurar o typescript como sintaxe, organização de arquivos, etc.     |
| 📄 package.json           | Arquivo usado gerenciar as dependencias do projeto com o Yarn e compor scripts de terminal |
