const {Sequelize} = require('sequelize');
const {config} = require('../config');
const {setUpModels} = require('../../db/models');

const sequelize = new Sequelize(config.db.connectionString, {
  dialect: config.db.engine,
});

setUpModels(sequelize);

module.exports = {sequelize};
