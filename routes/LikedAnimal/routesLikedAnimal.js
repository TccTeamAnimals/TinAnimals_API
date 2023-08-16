const express = require('express');
const router = express.Router();

// Importar os controllers
const likedAnimalsControllers = require('../../controllers/likedAnimalsController');

// Rotas da API
router.post('/like', likedAnimalsControllers.LikeAnimal);
router.get('/likes', likedAnimalsControllers.GetLikedAnimalsByUser);


module.exports = router;