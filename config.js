const path = require("path");

const ENVDIR = path.join(__dirname, '.env');
process.loadEnvFile(ENVDIR);
const ENV = process.env;

module.exports = {
  ENV
}
