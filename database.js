const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mysql',
  port:  process.env.PORT_BD,
});

module.exports = sequelize;