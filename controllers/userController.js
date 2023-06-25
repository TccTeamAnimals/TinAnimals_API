const User = require('../models/User');

module.exports = {
  async getAll(req, res) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },

  async getUserById(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        res.status(404).json({ message: 'Usuário não encontrado' });
      } else {
        res.json(user);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },

  async createUser(req, res) {
    const { name, email } = req.body;
    try {
      const user = await User.create({ name, email });
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },

  async updateUser(req, res) {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        res.status(404).json({ message: 'Usuário não encontrado' });
      } else {
        user.name = name;
        user.email = email;
        await user.save();
        res.json(user);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },

  async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        res.status(404).json({ message: 'Usuário não encontrado' });
      } else {
        await user.destroy();
        res.json({ message: 'Usuário removido com sucesso' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },
};