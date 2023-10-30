const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const connections = sequelize.define('connections', {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
  connection_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = connections;