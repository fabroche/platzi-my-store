const {productsRouter} = require("./products.router.js");
const {usersRouter} = require("./users.router.js");
const {categoriesRouter} = require("./categories.router.js");
const {customersRouter} = require("./customers.router.js");
const {ordersRouter} = require("./orders.router");
const {Router} = require('express');

function routerApi(app) {
  const routerV1 = Router();
  app.use('/api/v1', routerV1);
  routerV1.use("/products", productsRouter);
  routerV1.use("/users", usersRouter);
  routerV1.use("/categories", categoriesRouter);
  routerV1.use("/customers", customersRouter);
  routerV1.use("/orders", ordersRouter);
}

module.exports = {routerApi};
