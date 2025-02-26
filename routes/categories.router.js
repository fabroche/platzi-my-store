const {categories, products, getCategoryNames} = require("../src/api/e-commerce");
const {handlePagination} = require("../src/utils/utils");
const {Router} = require("express");

const categoriesRouter = Router();

categoriesRouter.get('/', (req, res) => {
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

categoriesRouter.get('/:id', (req, res) => {
  const {id} = req.params;
  const result = categories.find(category => category.id === id)

  if (!result) {
    res.status(404).send(`No existe ninguna categoria con id = ${id}`);
  }

  res.json({
    ...result
  });

})

categoriesRouter.get('/:categoryId/products/:productId', (req, res) => {
  const {
    categoryId,
    productId
  } = req.params;

  const {
    limit = products.length,
    offset = 0
  } = req.query;

  if(limit <= 0 || offset < 0) {
    res.status(400).send('Bad Request: Limit tiene que ser mayor que 0 y Offset no puede se menor que 0');
  }

  let result = products.find(product => product.categories.includes(categoryId) && product.id === productId);

  if (!result) {
    res.status(404).send(`No se encontraron resultados`);
  }

  result = handlePagination({
    limit,
    offset,
    itemList: result
  })

  res.json({
    ...result,
    categories: getCategoryNames([categoryId])
  })
})

categoriesRouter.get('/:categoryId/products', (req, res) => {
  const {
    categoryId,
  } = req.params;

  const {
    limit = products.length,
    offset = 0
  } = req.query;

  if(limit <= 0 || offset < 0) {
    res.status(400).send('Bad Request: Limit tiene que ser mayor que 0 y Offset no puede se menor que 0');
  }

  let result = products
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

  result = handlePagination({
    limit,
    offset,
    itemList: result
  })

  res.json([
    ...result
  ])
})

module.exports = {
  categoriesRouter
};
