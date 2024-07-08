# fullstack_example

Este repositório contém um exemplo de aplicação web completa para demonstração nas auças de Backend com Nodejs + banco MongoDB

## Composição

Backend: aplicação NodeJS usando Express e Mongoose
Frontend: aplicação escrita em HTML + Twitter Bootstrap

## Modo de Usar

### Download e instalação

```
git clone
npm install
```

### Configuração

Definição da string de conexão com o banco de dados: crie um arquivo chamado ```.env``` na raíz do projeto e adicione a string de conexão no formato abaixo (não esqueça de alterar as variáveis <>):

```
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster_name>.vhjggsb.mongodb.net/<database>?retryWrites=true&w=majority
```

### Execução

Rode o comando:

```
node src/app.js
```

Isso irá subir a aplicação oferecendo:

localhost:3000/ -> Index.html
localhost:3000/api/users -> API para interação com a coleção users do database setado
