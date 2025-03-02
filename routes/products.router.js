const {Router} = require('express');
const {handlePagination} = require("../src/utils/utils");
const {ProductsService} = require('../services/products.services.js');

const productsRouter = Router();
const productService = new ProductsService();


productsRouter.get('/', (req, res) => {
  const products = productService.getProducts();

  const {limit = products.length, offset = 0} = req.query;

  if (limit <= 0 || offset < 0) {
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
  const result = productService.getProducts().find(product => product.id === id)

  if (!result) {
    res.status(404).send(`No existe ningun producto con id = ${id}`);
  }

  res.json({
    ...result
  });

})

productsRouter.post('/', (req, res) => {
  const body = req.body;

  const newProduct = productService.createProduct({
    product: body
  });

  if (newProduct) {
    res.status(201).json({
      message: `Producto ${newProduct.name} created`,
      data: newProduct,
      id: newProduct.id
    });
  }

  res.status(400).send('Bad request: This is not a valid product');

})

productsRouter.put('/:id', (req, res) => {
  const {id} = req.params;
  const body = req.body;

  const newProduct = productService.update({
    id,
    product: body
  });

  if (newProduct) {
    res.status(201).json({
      message: `Producto ${newProduct.id} updated`,
      data: newProduct,
      id: newProduct.id
    });
  }

  res.status(400).send('Bad request: This is not a valid product');

})

productsRouter.patch('/:id', (req, res) => {
  const {id} = req.params;
  const body = req.body;

  const newProduct = productService.update({
    id,
    product: body
  });

  if (newProduct) {
    res.status(201).json({
      message: `Producto ${newProduct.id} Partial updated`,
      data: body,
      id: newProduct.id
    });
  }

  res.status(400).send('Bad request: This is not a valid product');

})

productsRouter.delete('/:id', (req, res) => {
  const {id} = req.params;
  const deletedProduct = productService.delete({id})[0]

  if (deletedProduct) {
    res.status(200).json({
      message: `Producto ${deletedProduct.id} deleted`,
      data: deletedProduct,
      id: deletedProduct.id
    })
  }

  res.status(400).send(`Bad request: there is no product with id= ${id}`);
})

module.exports = {
  productsRouter
};

