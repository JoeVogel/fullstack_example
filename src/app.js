const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/user');
const indexRouter = require('./routes/index')
require('dotenv').config();

const path = require('path');

// Verifica se a variável de ambiente MONGODB_URI está definida
if (!process.env.MONGODB_URI) {
  console.error('Erro: A variável de ambiente MONGODB_URI não está definida.');
  process.exit(1); // Encerra a aplicação com erro
}

const port = process.env.PORT || 3000;

/* ---------- Configurações do Express ---------- */

const app = express();

app.use(express.json());

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'views')));

app.use('/api/users', userRouter); // Importa as rotas que criamos no arquivo src/routes/user.js e as adiciona depois de /users/
app.use('/', indexRouter); 

/* ---------- Criar conexão com o banco ---------- */

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Could not connect to MongoDB Atlas', err));


/* ---------- Sobe nosso servidor de aplicação ---------- */

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
