const {Pool} = require('pg');
const {ENV} = require('../config.js');

  const pool = new Pool({
    connectionString: process.env.SUPABASE_VERCEL_URI || ENV.SUPABASE_VERCEL_URI,
    ssl: {
      rejectUnauthorized: false,
    },
  });

module.exports = {
  pool
};
