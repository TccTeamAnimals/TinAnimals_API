const http = require('http');
const express = require('express');
const { Server } = require('socket.io');

const socketRoute = require('./socket/routes');
const { onIdentification, onMessage, onConnection } = require('./functions');
const routes = require('./routes/Users/routesUsers');
const routesOngs = require('./routes/Ongs/routesOngs');
const routesLikes = require('./routes/LikedAnimal/routesLikedAnimal');
const routesChat = require('./routes/Chat/chat');

const app = express();
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});
socketRoute(io);

// const cors = require('cors');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Permitir solicitações de qualquer domínio
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Métodos HTTP permitidos
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Cabeçalhos permitidos
  next();
});

// app.use(cors());

// Rotas da API
app.use('/api', routes, routesOngs, routesLikes, routesChat);

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});