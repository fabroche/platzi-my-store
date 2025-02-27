const {ENV} = require('./config.js');

const express = require('express');
const {routerApi} = require('./routes/index.js');
const app = express();
const port = ENV.PORT;
app.use(express.json());

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

app.listen(port, () => {
  console.log(`Listening on port :${port}`);
})
