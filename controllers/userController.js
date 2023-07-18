const User = require('../models/Users');
const bcrypt = require('bcryptjs');

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
      const user = await User.findOne({ where: { email } });
      if (!user) {
        res.status(404).json({ message: 'user not found' });
      } else {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
          res.json(user);
          // return res.status(401).json({ message: 'Invalid password' });
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },

  async createUser(req, res) {
    const { id, name, phone, cpf, email, password, typeCad } = req.body;
    try {
      const emailUsed = await User.findOne({ where: { email } });
      const cpfUsed = await User.findOne({ where: { cpf } });
      if (emailUsed) {
        return res.status(400).json({ message: 'email already used' });
      }
      else if (cpfUsed) {
        return res.status(400).json({ message: 'cpf already used' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ 
        id,
        name, 
        phone, 
        cpf, 
        email, 
        password: hashedPassword, 
        typeCad 
      });
      res.json(user);
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },

  async updateUser(req, res) {
    const { id } = req.params;
    const { name, phone, cpf, email, password, typeCad } = req.body;
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
        user.typeCad = typeCad;
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