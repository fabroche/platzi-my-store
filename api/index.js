const {ENV} = require('../config.js');

const express = require('express');
const {routerApi} = require('./routes');
const {
  logErrorsMiddleware,
  errorHandlerMiddleware,
  boomErrorHandlerMiddleware
} = require('./middlewares/error.handler.js');
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

app.get('/api', (req, res) => {
  res.send('Hola mundo, este es mi primer server en express');
})

routerApi(app);
app.use(logErrorsMiddleware);
app.use(boomErrorHandlerMiddleware);
app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`Listening on port :${port}`);
})
