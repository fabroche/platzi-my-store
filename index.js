const {ENV,config} = require('./api/config.js');

const express = require('express');
const {routerApi} = require('./api/routes');
const cors = require("cors");
const {corsOptions} = require("./api/middlewares/cors.handler");
const {setCustomMiddlewares} = require("./api/middlewares");

const app = express();
const port = ENV.PORT || 3000;

// parsing json middleware
app.use(express.json());

// defining cors
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send("Genzai with Express on Vercel")
})

// defining routes
routerApi(app);

// defining custom middlewares
setCustomMiddlewares(app);

app.listen(port, () => {
  console.log(`Listening on port :${port}`);
})

module.exports = app;
