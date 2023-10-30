const { DataTypes } = require('sequelize');
const User = require('./Users');
const Ong = require('./Ongs');
const sequelize = require('../database');

const chat  = sequelize.define('chat', {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ong_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },  
  mensagens: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = chat;