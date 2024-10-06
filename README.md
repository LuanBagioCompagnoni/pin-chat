# Requisitos para exeução

### Ter instalado no seu computador:
- Docker versão: 27.3.1
- npm
- Nodejs versão: 20
- MongoDB (local ou Atlas)

# Passo a passo para execução


 1 - Você precisa ter o git instalado na sua maquina, ou então baixar o repositório manualmente pelo Git Hub: https://github.com/LuanBagioCompagnoni/celestial-chat
 - Para clonar o repositório:
  ```
  git clone https://github.com/LuanBagioCompagnoni/celestial-chat.git
  ```

2 - O aplicativo utiliza MongoDB, sendo assim, você precisa ajustar a URI do Mongo no docker-compose.yml (encontrado na raiz do repositório) nas linhas 23 e 37 dessa forma caso deseja utilizar o Mongo Atlas:
  ```
  DB_CONNECTION_STRING=mongodb+srv://{usuário}:{senha}@{url}.mongodb.net/
  ```
 - E dessa forma caso deseja utilizar o Mongo localmente (no exemplo sem autenticação):
  ```
  DB_CONNECTION_STRING=mongodb+srv://localhost:27017/
  ```

3 - Ainda configurando as variáveis de ambiente, é necessário preencher o JWT_SECRET com uma string aleatória, por exemplo: XC6opHR2hWPyGg

5 - Execute o projeto utilizando o Docker: 
```
docker compose up -d
```

# Uso da aplicação

- Após os passos acima, você poderá acessar a aplicação localmente pela pora 3000: http://localhost:3000/
- Registre seu usuário, e para teste, abra a aplicação em uma aba anonima e registre um segundo usuário para conversação!
