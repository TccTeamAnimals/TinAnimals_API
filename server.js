const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// const cors = require('cors');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Permitir solicitações de qualquer domínio
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Métodos HTTP permitidos
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Cabeçalhos permitidos
  next();
});

// Configurar o body-parser para analisar o corpo das requisições
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());

// Rotas da API
const routes = require('./routes/Users/routesUsers');
app.use('/api', routes);

const routesOngs = require('./routes/Ongs/routesOngs');
app.use('/api', routesOngs);

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});