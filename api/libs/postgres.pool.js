const {Pool} = require('pg');
const {ENV} = require('../config.js');

  const DB_USER = encodeURIComponent(ENV.POSTGRES_USER)
  const DB_PASSWORD = encodeURIComponent(ENV.POSTGRES_PASSWORD)

  const URI = `postgres://${DB_USER}:${DB_PASSWORD}@${ENV.POSTGRES_HOST}:${ENV.POSTGRES_PORT}/${ENV.POSTGRES_DB}`;
  const SUPABASE_URI = ENV.SUPABASE_DB;

  // let ssl = null;
  //
  // if (process.env.CA_CERT) {
  //   ssl = {
  //     rejectUnauthorized: true,
  //     ca: process.env.CA_CERT,
  //   }
  // }

  const pool = new Pool({
    connectionString: process.env.SUPABASE_DB || ENV.SUPABASE_DB,
    ssl: {
      rejectUnauthorized: false,
    },
  });

module.exports = {
  pool
};
