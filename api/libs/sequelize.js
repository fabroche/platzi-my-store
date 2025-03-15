const {Sequelize} = require('sequelize');
const {config} = require('../config');

const sequelize = new Sequelize(config.db.connectionString, {
  dialect: 'postgres',
  logging: true
});

module.exports.sequelize = {sequelize};
