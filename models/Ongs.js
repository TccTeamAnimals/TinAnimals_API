const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Ong = sequelize.define('Ongs', {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  typeCad: {
    type: DataTypes.STRING,
    allowNull: false,
  }

});

module.exports = Ong;