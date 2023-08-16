const likedAnimal = require('../models/LikedAnimals');

module.exports = {
  
    async LikeAnimal(req, res) {
      const { id, user_id, animal_id  } = req.body;
      try {
        const liked = await likedAnimal.create({ 
          id, 
          user_id, 
          animal_id, 
        });
        res.json(liked);
        
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    },

    async GetLikedAnimalsByUser(req, res) {
      const userId = req.body.userId; 
      try {
        const animals = await likedAnimal.findAll({
          where: {
            user_id: userId,
          },
        });
        res.json(animals);
        
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    },

};