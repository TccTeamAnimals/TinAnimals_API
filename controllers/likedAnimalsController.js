const likedAnimal = require('../models/LikedAnimals');

module.exports = {
  
    async LikeAnimal(req, res) {
      const { id, user_id, animal_id, ong_id, name, idade, raca, sexo, image_url  } = req.body;
      try {

        const existingLike = await likedAnimal.findOne({
          where: {
            user_id: user_id,
            animal_id: animal_id
          }
        });
  
        if (existingLike) {
          return res.status(400).json({ message: 'Animal Já Curtido' });
        }

        const liked = await likedAnimal.create({ 
          id, 
          user_id, 
          animal_id,
          ong_id,
          name,
          idade,
          raca,
          sexo,
          image_url

        });
        res.json(liked);
        
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    },

    async GetLikedAnimalsByUser(req, res) {
      const { id } = req.params;
      console.log("id", id)
      // const userId = req.body.userId; 
      // console.log("idddd", userId)
      try {
        const animals = await likedAnimal.findAll({
          where: {
            user_id: id,
          },
        });
        res.json(animals);
        
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    },

    async RemoveLikeAnimalByUser(req, res) {
      const { id } = req.params;
      try {
        const AnimalLiked = await likedAnimal.findByPk(id);
        if (!AnimalLiked) {
          res.status(404).json({ message: 'curtida não encontrada' });
        } else {
          await AnimalLiked.destroy();
          res.json({ message: 'curtida removida' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    },

};