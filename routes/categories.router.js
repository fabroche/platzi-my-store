const {handlePagination} = require("../src/utils/utils");
const {Router} = require("express");
const {CategoriesService} = require("../services/categories.services");
const {ProductsService} = require("../services/products.services");

const categoriesRouter = Router();

const categoriesService = new CategoriesService();
const productsService = new ProductsService();

categoriesRouter.get('/', async (req, res, next) => {
  try {
    const categories =  await categoriesService.getCategories();

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
  } catch (error) {
    next(error);
  }
})

categoriesRouter.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await categoriesService.findById({id})

    res.json({
      ...result
    });
  } catch (error) {
    next(error);
  }
})

categoriesRouter.get('/:categoryId/products/:productId', async (req, res, next) => {
  try {
    const {
      categoryId,
      productId
    } = req.params;

    const products = await productsService.getProducts();

    const {
      limit = products.length,
      offset = 0
    } = req.query;

    if (limit <= 0 || offset < 0) {
      res.status(400).send('Bad Request: Limit tiene que ser mayor que 0 y Offset no puede se menor que 0');
    }

    let result = await categoriesService.getCategoryInProduct({
      categoryId,
      productId,
      products
    });

    result = handlePagination({
      limit,
      offset,
      itemList: result
    })

    res.json({
      ...result,
      categories: await categoriesService.getCategoryNamesByIdList({categoriesIdList: [categoryId]})
    })
  } catch (error) {
    next(error);
  }

})

categoriesRouter.get('/:categoryId/products', async (req, res, next) => {
  try {
    const {
      categoryId,
    } = req.params;

    const products = await productsService.getProducts();

    const {
      limit = products.length,
      offset = 0
    } = req.query;

    if (limit <= 0 || offset < 0) {
      res.status(400).send('Bad Request: Limit tiene que ser mayor que 0 y Offset no puede se menor que 0');
    }

    let result = await categoriesService.getCategoryInProductsById({
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
  } catch (error) {
    next(error);
  }

})

categoriesRouter.post('/', async (req, res, next) => {
  try {
    const body = req.body;

    const newCategory = await categoriesService.createCategory({
      category: body
    })

    if (newCategory) {
      res.status(201).json({
        message: `Category ${newCategory.name} created`,
        data: newCategory,
        id: newCategory.id
      });
    }
  } catch (error) {
    next(error);
  }
})

module.exports = {
  categoriesRouter
};
