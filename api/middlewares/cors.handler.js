const {ENV} = require("../config");

const whitelist = process.env.CORS_WHITE_LIST.split(',') || ENV.CORS_WHITE_LIST.split(',');

const corsOptions = {
    origin: (origin, callback) => {
      if (whitelist.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error(`Unknown origin: ${origin}`), false);
      }
    }
  }


module.exports = {
  corsOptions
};
