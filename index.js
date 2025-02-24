const {ENV} = require('./config.js');
const {products, categories, users} = require("./src/api/e-commerce");
const {handlePagination} = require("./src/utils/utils.js");
const {getCategoryNames} = require("./src/api/e-commerce.js");

const express = require('express');
const app = express();
const port = ENV.PORT;

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

app.get('/products', (req, res) => {
  const {limit = products.length, offset = 0} = req.query;

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

app.get('/products/:id', (req, res) => {
  const {id} = req.params;
  const result = products.find(product => product.id === id)

  if (!result) {
    res.status(404).send(`No existe ningun producto con id = ${id}`);
  }

  res.json({
    ...result
  });

})

app.get('/categories', (req, res) => {
  const {limit = categories.length, offset = 0} = req.query;

  const result = handlePagination({
    limit,
    offset,
    itemList: categories
  });

  if (!result?.length) {
    res.status(404).send('No se encontraron Categorias');
  }

  res.status(200).json([
    ...result
  ]);
})

app.get('/categories/:id', (req, res) => {
  const {id} = req.params;
  const result = categories.find(category => category.id === id)

  if (!result) {
    res.status(404).send(`No existe ninguna categoria con id = ${id}`);
  }

  res.json({
    ...result
  });

})

app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const {
    categoryId,
    productId
  } = req.params;

  const result = products.find(product => product.categories.includes(categoryId) && product.id === productId);
  const {name: categoryName} = categories.find(category => category.id === categoryId);

  if (!result) {
    res.status(404).send(`No existe ningun producto con id = ${productId} y la categoria = ${categoryName}`);
  }

  res.json({
    ...result,
    categories: getCategoryNames([categoryId])
  })
})

app.get('/categories/:categoryId/products', (req, res) => {
  const {
    categoryId,
  } = req.params;


  const result = products
    .filter(product => product.categories.includes(categoryId))
    .map(product => {
      return {
        ...product,
        categories: getCategoryNames(product.categories)
      };
    });

  if (!result?.length) {
    res.status(404).send(`No existe ningun producto con la categoria = ${categoryId}`);
  }

  res.json([
    ...result
  ])
})

app.get('/users', (req, res) => {

  const {limit = users.length, offset = 0} = req.query;

  const result = handlePagination({
    limit,
    offset,
    itemList: users
  });

  if (!result?.length) {
    res.status(404).send('No se encontraron usuarios');
  }

  res.status(200).json([
    ...result
  ]);
})

app.listen(port, () => {
  console.log(`Listening on port :${port}`);
})
