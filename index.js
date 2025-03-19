const {ENV,config} = require('./api/config.js');

const express = require('express');
const {routerApi} = require('./api/routes');
const {
  logErrorsMiddleware,
  errorHandlerMiddleware,
  boomErrorHandlerMiddleware,
  ormErrorHandlerMiddleware
} = require('./api/middlewares/error.handler.js');
const cors = require("cors");

const app = express();
const port = ENV.PORT || 3000;
app.use(express.json());

const whitelist = ENV.CORS_WHITE_LIST.split(',');

const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error(`Unknown origin: ${origin}`), false);
    }
  }
}
app.use(cors(options));

app.get('/', (req, res) => {
  res.send("Genzai with Express on Vercel")
})

routerApi(app);
app.use(logErrorsMiddleware);
app.use(ormErrorHandlerMiddleware);
app.use(boomErrorHandlerMiddleware);
app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`Listening on port :${port}`);
})

module.exports = app;
