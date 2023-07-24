const Ong = require('../models/Ongs');
const bcrypt = require('bcryptjs');

module.exports = {
  async getAll(req, res) {
    try {
      const ongs = await Ong.findAll();
      res.json(ongs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },

  async getOngById(req, res) {
    const { id } = req.params;
    try {
      const ong = await Ong.findByPk(id);
      if (!ong) {
        res.status(404).json({ message: 'Ong não encontrada' });
      } else {
        res.json(ong);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },

  async loginOng(req, res) {
    console.log("reqbodyyy", req.body)
    const { email, password } = req.body;
    try {
      const ong = await Ong.findOne({ where: { email } });
      if (!ong) {
        res.status(404).json({ message: 'ong not found' });
      } else {
        const isPasswordValid = await bcrypt.compare(password, ong.password);
        if (isPasswordValid) {
          res.json(ong);
          // return res.status(401).json({ message: 'Invalid password' });
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },

  async createOng(req, res) {
    const { id, name, phone, email, password, typeCad } = req.body;
    try {
      const emailUsed = await Ong.findOne({ where: { email } });
      if (emailUsed) {
        return res.status(400).json({ message: 'email already used' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const ong = await Ong.create({ 
        id, 
        name, 
        phone, 
        email, 
        password: hashedPassword, 
        typeCad 
      });
      res.json(ong);
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },

  async updateOng(req, res) {
    const { id } = req.params;
    const { name, phone, password } = req.body;
    try {
      const ong = await Ong.findByPk(id);
      if (!ong) {
        res.status(404).json({ message: 'Ong não encontrada' });
      } else {
        // Use um objeto auxiliar para armazenar os campos a serem atualizados
        const updatedFields = {};
        
        // Verifique se cada campo não está vazio e atualize apenas os campos não vazios
        if (name !== undefined && name.trim() !== '') {
          updatedFields.name = name.trim();
        }
        if (phone !== undefined && phone.trim() !== '') {
          updatedFields.phone = phone.trim();
        }
        if (password !== undefined && password.trim() !== '') {
          updatedFields.password = await bcrypt.hash(password, 10);
        }
  
        //ong destino 
        // updatedFields = origin {name: 'nome', phone: 'telefone', password: 'senha'}
        Object.assign(ong, updatedFields);
  
 
        await ong.save();
  
        res.json(ong);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },

  async deleteOng(req, res) {
    const { id } = req.params;
    try {
      const ong = await Ong.findByPk(id);
      if (!ong) {
        res.status(404).json({ message: 'Ong não encontrada' });
      } else {
        await ong.destroy();
        res.json({ message: 'Ong removida com sucesso' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  },
};