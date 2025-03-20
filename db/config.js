const {config} = require('../api/config.js');

module.exports = {
  development: {
    url: config.db.connectionString,
    dialect: config.db.engine,
  },
  production: {
    url: config.db.connectionString,
    dialect: config.db.engine,
  }
}
