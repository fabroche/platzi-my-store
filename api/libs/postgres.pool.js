const {Pool} = require('pg');
const {ENV} = require('../config.js');

  const pool = new Pool({
    host: ENV.POSTGRES_HOST,
    port: ENV.POSTGRES_PORT,
    user: ENV.POSTGRES_USER,
    password: ENV.POSTGRES_PASSWORD,
    database: ENV.POSTGRES_DB,
  });

module.exports = {
  pool
};
