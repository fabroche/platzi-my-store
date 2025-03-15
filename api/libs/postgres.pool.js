const {Pool} = require('pg');
const {config} = require('../config.js');

  const options = {
    development: {
      connectionString: process.env.SUPABASE_VERCEL_URI || config.db.connectionString,
    },
    production: {
      connectionString: process.env.SUPABASE_VERCEL_URI || config.db.connectionString,
      ssl: {
        rejectUnauthorized: false,
      }
    }
  }

  const pool = new Pool(options[config.env]);

module.exports = {
  pool
};
