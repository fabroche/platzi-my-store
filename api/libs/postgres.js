const {Client} = require('pg');
const {ENV} = require('../config.js');

async function getConection() {

  const client = new Client({
    host: ENV.POSTGRES_HOST,
    port: ENV.POSTGRES_PORT,
    user: ENV.POSTGRES_USER,
    password: ENV.POSTGRES_PASSWORD,
    database: ENV.POSTGRES_DB,
  });
  await client.connect();
  return client;
}

module.exports = {
  getConection
};
