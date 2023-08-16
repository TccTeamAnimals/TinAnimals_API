const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const likedAnimals  = sequelize.define('likedAnimals', {
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
  animal_id: {
    type: DataTypes.STRING,
    allowNull: false,
  }, 

});

module.exports = likedAnimals;