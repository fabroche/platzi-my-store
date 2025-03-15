const {Sequelize} = require('sequelize');
const {config} = require('../config');
const {setUpModels} = require('../../db/models');

const sequelize = new Sequelize(config.db.connectionString, {
  dialect: 'postgres',
});

setUpModels(sequelize);

sequelize.sync()
  .then(() => {
    console.group('Sequelize Sync')
    console.log('Successfully Sync Models')
    console.groupEnd()
  })
  .catch(err => {
    console.group('Sequelize Sync')
    console.error(err)
    console.groupEnd()
  });

module.exports = {sequelize};
