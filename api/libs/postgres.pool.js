const {Pool} = require('pg');
const {ENV} = require('../config.js');

  const DB_USER = encodeURIComponent(ENV.POSTGRES_USER)
  const DB_PASSWORD = encodeURIComponent(ENV.POSTGRES_PASSWORD)

  const URI = `postgres://${DB_USER}:${DB_PASSWORD}@${ENV.POSTGRES_HOST}:${ENV.POSTGRES_PORT}/${ENV.POSTGRES_DB}`;
  const SUPABASE_URI = ENV.SUPABASE_DB;

  const pool = new Pool({connectionString: SUPABASE_URI});

module.exports = {
  pool
};
