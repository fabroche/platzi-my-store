const {handlePagination} = require("../src/utils/utils");
const {Router} = require("express");
const {CategoriesService} = require("../services/categories.services");
const {ProductsService} = require("../services/products.services");

const categoriesRouter = Router();

const categoriesService = new CategoriesService();
const productsService = new ProductsService();

categoriesRouter.get('/', (req, res) => {
  const categories = categoriesService.getCategories()

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
  const result = categoriesService.findById({id})

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

  const products = productsService.getProducts();

  const {
    limit = products.length,
    offset = 0
  } = req.query;

  if (limit <= 0 || offset < 0) {
    res.status(400).send('Bad Request: Limit tiene que ser mayor que 0 y Offset no puede se menor que 0');
  }

  let result = categoriesService.getCategoryInProduct({
    categoryId,
    productId,
    products
  });

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
    categories: categoriesService.getCategoryNamesByIdList({categoriesIdList: [categoryId]})
  })
})

categoriesRouter.get('/:categoryId/products', (req, res) => {
  const {
    categoryId,
  } = req.params;

  const products = productsService.getProducts();

  const {
    limit = products.length,
    offset = 0
  } = req.query;

  if (limit <= 0 || offset < 0) {
    res.status(400).send('Bad Request: Limit tiene que ser mayor que 0 y Offset no puede se menor que 0');
  }

  let result = categoriesService.getCategoryInProductsById({
    categoryId,
    products
  })

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

categoriesRouter.post('/', (req, res) => {
  const body = req.body;

  const newCategory = categoriesService.createCategory({
    category: body
  })

  if (newCategory) {
    res.status(201).json({
      message: `Category ${newCategory.name} created`,
      data: newCategory,
      id: newCategory.id
    });
  }

  res.status(400).send('Bad request: This is not a valid Category');
})

module.exports = {
  categoriesRouter
};
