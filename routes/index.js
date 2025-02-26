const {productsRouter} = require("./products.router.js");
const {usersRouter} = require("./users.router.js");
const {categoriesRouter} = require("./categories.router.js");

function routerApi(app) {
  app.use("/products", productsRouter);
  app.use("/users", usersRouter);
  app.use("/categories", categoriesRouter);
}

module.exports = {routerApi};
