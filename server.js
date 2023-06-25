const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Configurar o body-parser para analisar o corpo das requisições
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rotas da API
const routes = require('./routes/Users/routesUsers');
app.use('/api', routes);

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});