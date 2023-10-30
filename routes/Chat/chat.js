const express = require('express');
const router = express.Router();

// Importar os controllers
const chatController = require('../../controllers/chatController');

// Rotas da API
router.get('/chats', chatController.getChats);


module.exports = router;