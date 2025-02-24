const path = require("path");
const express = require('express');
const {products, categories, users} = require("./src/api/e-commerce");


const ENVDIR = path.join(__dirname, '.env');
process.loadEnvFile(ENVDIR);

const app = express();

const port = process.env.PORT;

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
  res.json(
    [
      ...products
    ]
  );
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
  res.json(
    [
      ...categories
    ]
  );
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
  const {name:categoryName} = categories.find(category => category.id === categoryId);

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
  res.json(
    [
      ...users
    ]
  );
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})

function getCategoryNames(categoriesIdList) {
  return categories.filter(category => categoriesIdList.includes(category.id));
}
