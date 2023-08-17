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
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }, 
  idade: {
    type: DataTypes.STRING,
    allowNull: false,
  }, 
  raca: {
    type: DataTypes.STRING,
    allowNull: false,
  }, 
  sexo: {
    type: DataTypes.STRING,
    allowNull: false,
  }, 
  image_url: {
    type: DataTypes.STRING,
    allowNull: false,
  }, 

});

module.exports = likedAnimals;