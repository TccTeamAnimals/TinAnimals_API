const { Op } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const chatModel = require('../models/chat');
const User = require('../models/Users');
const Ong = require('../models/Ongs');

module.exports = {
    async createChat(req, res) {
      const { user_id, ong_id } = req.body;
      try {
        const chat = await chatModel.create({ 
          id: uuidv4(),
          user_id,
          ong_id,
          mensagens: JSON.stringify([])
        });

        res.json(chat);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    },

    async getChats(req, res) {
      try {
        let chats = await chatModel.findAll({
          where: {
            [Op.or]: [
              { user_id: req.query.user_id || ''},
              { ong_id: req.query.ong_id || '' }
            ]
          }
        });

        console.log('CAIU AAQQQQUI', chats);

        chats = await Promise.all(chats.map(async (chat) => {
          return {
            ...chat.dataValues,
            chat: req.query.user_id 
              ? await Ong.findByPk(chat.ong_id) 
              : await User.findByPk(chat.user_id),
          }
        }))

        res.json(chats);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    }
};