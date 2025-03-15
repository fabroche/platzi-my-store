const {Sequelize} = require('sequelize');
const {config} = require('../config');

const sequelize = new Sequelize(config.db.connectionString, {
  dialect: 'postgres',
});

module.exports = {sequelize};
