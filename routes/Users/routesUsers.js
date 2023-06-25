const express = require('express');
const router = express.Router();

// Importar os controllers
const UserController = require('../../controllers/userController');

// Rotas da API
router.get('/users', UserController.getAll);
router.get('/users/:id', UserController.getUserById);
router.post('/users', UserController.createUser);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);

module.exports = router;