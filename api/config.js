const path = require("path");

const ENVDIR = process.env.NODE_ENV
  ? path.join(__dirname, "..", '.env')
  : path.join(__dirname, "..", '.env.local')

process.loadEnvFile(ENVDIR);
const ENV = process.env;

function setupSSL() {
  let ssl = null;

  if (process.env.CA_CERT) {
    ssl = {
      rejectUnauthorized: true, // Verificación estricta de certificados
      ca: process.env.CA_CERT,  // Usa el certificado CA
    };
  } else if (process.env.NODE_ENV !== 'production') {
    ssl = {
      rejectUnauthorized: false
    };
  } else {
    ssl = {
      rejectUnauthorized: false
    }
  }
  return ssl;
}

const config = {
  env: process.env.NODE_ENV || ENV.NODE_ENV || "development",
  port: process.env.PORT || ENV.PORT || 3000,
  db: {
    engine: process.env.DB_ENGINE || ENV.DB_ENGINE,
    user: encodeURIComponent(process.env.DB_USER) || encodeURIComponent(ENV.DB_USER),
    password: encodeURIComponent(process.env.DB_PASSWORD) || encodeURIComponent(ENV.DB_PASSWORD),
    host: process.env.DB_HOST || ENV.DB_HOST,
    port: process.env.DB_PORT || ENV.DB_PORT,
    database: process.env.DB_NAME || ENV.DB_NAME,
    ssl: setupSSL()
  },
}

config.db.connectionString = process.env.SUPABASE_VERCEL_URI || `${config.db.engine}://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.database}`;

module.exports = {
  ENV,
  config
}
