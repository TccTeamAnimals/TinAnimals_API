const express = require('express');
const router = express.Router();

// Importar os controllers
const OngController = require('../../controllers/OngsController');

// Rotas da API
router.get('/ongs', OngController.getAll);
router.get('/ong/:id', OngController.getOngById);
router.post('/ong/login', OngController.loginOng);
router.post('/ong', OngController.createOng);
router.put('/ong/:id', OngController.updateOng);
router.delete('/ong/:id', OngController.deleteOng);


//cadastro de animais
router.post('/ong/register_animal', OngController.registerAnimal);
router.get('/ong/getAnimalByOng/:id', OngController.getAnimalsByOng);
router.delete('/ong/deleteAnimalByOng/:id', OngController.deleteAnimal);

module.exports = router;