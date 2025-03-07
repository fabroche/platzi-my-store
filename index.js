const {ENV} = require('./config.js');

const express = require('express');
const {routerApi} = require('./routes/index.js');
const {
  logErrorsMiddleware,
  errorHandlerMiddleware,
  boomErrorHandlerMiddleware
} = require('./middlewares/error.handler.js');
const cors = require("cors");

const app = express();
const port = ENV.PORT;
app.use(express.json());
const whitelist = ['http://localhost:8080', 'http://localhost:8000', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (!whitelist.includes(origin)) {
      callback(new Error(`Unknown origin: ${origin}`), false);
    } else {
      callback(null, true);
    }
  }
}
app.use(cors(options));

app.get('/', (req, res) => {
  res.send('Hola mundo, este es mi primer server en express');
})

app.get('/nuevo-endpoint', (req, res) => {
  res.send('Hola soy el nuevo endpoint');
})

app.get('/send-limit-offset', (req, res) => {
  const {limit, offset} = req.query;

  if (!limit || !offset) {
    return res.status(400).send('Los parámetros limit y offset son obligatorios.');
  }

  res.json({
    limit,
    offset
  })
})

routerApi(app);
app.use(logErrorsMiddleware);
app.use(boomErrorHandlerMiddleware);
app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`Listening on port :${port}`);
})
