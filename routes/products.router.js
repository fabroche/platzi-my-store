const {Router} = require('express');
const {products} = require("../src/api/e-commerce");
const {ProductModel} = require("../src/models/product.models.js");
const {handlePagination} = require("../src/utils/utils");

const productsRouter = Router();

productsRouter.get('/', (req, res) => {
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
  const result = products.find(product => product.id === id)

  if (!result) {
    res.status(404).send(`No existe ningun producto con id = ${id}`);
  }

  res.json({
    ...result
  });

})

productsRouter.post('/', (req, res) => {
  const body = req.body;

  if (new ProductModel(body).isValid()) {
    products.push(body)
    res.status(201).json({
      message: `Producto ${body.name} created`,
      data: body
    });
  }

  res.status(400).send('Bad request: This is not a valid product');

})

productsRouter.put('/:id', (req, res) => {
  const {id} = req.params;
  const body = req.body;

  const productIndex = products.findIndex(product => product.id === id);

  if (new ProductModel(body).isValid() && productIndex !== -1) {
    products[productIndex] = {...body};

    res.status(201).json({
      message: `Producto ${body.id} updated`,
      data: body
    });
  }

  res.status(400).send('Bad request: This is not a valid product');

})

productsRouter.patch('/:id', (req, res) => {
  const {id} = req.params;
  const body = req.body;

  const productIndex = products.findIndex(product => product.id === id);

  if (productIndex !== -1) {
    const newPatchProduct = new ProductModel({
      ...products[productIndex],
      ...body
    })

    if (newPatchProduct.isValid()) {
      products[productIndex] = {
        ...newPatchProduct
      };
    }

    res.status(201).json({
      message: `Producto ${body.id} Partial updated`,
      data: body,
      id
    });
  }

  res.status(400).send('Bad request: This is not a valid product');

})

productsRouter.delete('/:id', (req, res) => {
  const {id} = req.params;
  const productIndex = products.findIndex(product => product.id === id);

  if (productIndex !== -1) {
    const deletedProduct = products.splice(productIndex, 1);
    res.status(200).json({
      message: `Producto ${id} deleted`,
      data: deletedProduct,
      id
    })
  }

  res.status(400).send(`Bad request: there is no product with id= ${id}`);
})

module.exports = {
  productsRouter
};

