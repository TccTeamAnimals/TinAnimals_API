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

  async loginUser(req, res) {
    console.log("reqbodyyy", req.body)
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email, password } });
      if (!user) {
        res.status(404).json({ message: 'user not found' });
      } else {
        res.json(user);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },

  async createUser(req, res) {
    const { name, phone, cpf, email, password } = req.body;
    try {
      const emailUsed = await User.findOne({ where: { email } });
      const cpfUsed = await User.findOne({ where: { cpf } });
      if (emailUsed) {
        return res.status(400).json({ message: 'email already used' });
      }
      else if (cpfUsed) {
        return res.status(400).json({ message: 'cpf already used' });
      }
      const user = await User.create({ name , phone, cpf, email, password });
      res.json(user);
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },

  async updateUser(req, res) {
    const { id } = req.params;
    const { name, phone, cpf, email, password } = req.body;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        res.status(404).json({ message: 'Usuário não encontrado' });
      } else {
        user.name = name;
        user.phone = phone;
        user.cpf = cpf;
        user.email = email;
        user.password = password;
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