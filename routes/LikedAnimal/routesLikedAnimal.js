const express = require('express');
const router = express.Router();

// Importar os controllers
const likedAnimalsControllers = require('../../controllers/likedAnimalsController');

// Rotas da API
router.post('/like', likedAnimalsControllers.LikeAnimal);
router.get('/likesByUser/:id', likedAnimalsControllers.GetLikedAnimalsByUser);
router.delete('/removelikesByUser/:id', likedAnimalsControllers.RemoveLikeAnimalByUser);


module.exports = router;