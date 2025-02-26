const {Router} = require('express');
const {products} = require("../src/api/e-commerce");
const {handlePagination} = require("../src/utils/utils");

const productsRouter = Router();

productsRouter.get('/', (req, res) => {
  const {limit = products.length, offset = 0} = req.query;

  if(limit <= 0 || offset < 0) {
    res.status(404).send('Limit tiene que ser mayor que 0 y Offset no puede se menor que 0');
  }

  const result = handlePagination({
    limit,
    offset,
    itemList: products
  });

  if (!result?.length) {
    res.status(404).send('No se encontraron productos');
  }

  res.status(200).json([
    ...result
  ]);

})

productsRouter.get('/:id', (req, res) => {
  const {id} = req.params;
  const result = products.find(product => product.id === id)

  if (!result) {
    res.status(404).send(`No existe ningun producto con id = ${id}`);
  }

  res.json({
    ...result
  });

})

module.exports = {
  productsRouter
};

