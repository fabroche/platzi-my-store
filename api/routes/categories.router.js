const {handlePagination} = require("../src/utils/utils");
const {validatorHandler} = require("../middlewares/validator.handler");
const {Router} = require("express");
const {CategoryService} = require("../services/categories.service");
const {
  createCategorySchema,
  getCategorySchema,
  updateCategorySchema,
  queryCategoriesSchema
} = require("../schemas/category.schema");

const categoriesRouter = Router();

const categoriesService = new CategoryService();

categoriesRouter.get('/',
 validatorHandler(queryCategoriesSchema, 'query'),
  async (req, res, next) => {
  try {
    const categories = await categoriesService.find(req.query);

    if (!categories?.length) {
      res.status(404).send('No se encontraron Categorias');
    } else {
      res.status(200).json([
        ...categories
      ]);
    }

  } catch (error) {
    next(error);
  }
})

categoriesRouter.get('/generate', async (req, res, next) => {
  try {

    const result = await categoriesService.generate();

    res.status(200).json(result)

  } catch (err) {
    next(err);
  }
})

categoriesRouter.get('/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      const result = await categoriesService.findOne(id);

      res.json({
        ...result
      });
    } catch (error) {
      next(error);
    }
  })

categoriesRouter.get('/:id/products',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const {
        id: categoryId,
      } = req.params;

      const products = await categoriesService.getProductsWithCategoryID(categoryId)

      const {
        limit = products.length,
        offset = 0
      } = req.query;

      if (limit <= 0 || offset < 0) {
        res.status(400).send('Bad Request: Limit tiene que ser mayor que 0 y Offset no puede se menor que 0');
      }

      if (!products?.length) {
        res.status(404).send(`No existe ningun producto con la categoria = ${categoryId}`);
      }

      const result = handlePagination({
        limit,
        offset,
        itemList: products
      })

      res.json([
        ...result
      ])
    } catch (error) {
      next(error);
    }

  })

categoriesRouter.post('/',
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {

    try {
      const body = req.body;

      const newCategory = await categoriesService.create(body)

      if (newCategory) {
        res.status(201).json({
          message: `Category ${newCategory.name} created`,
          data: newCategory
        });
      }
    } catch (error) {
      next(error);
    }
  })

categoriesRouter.patch('/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      const body = req.body;
      res.status(201).json(await categoriesService.update(id, body));
    } catch (error) {
      next(error);
    }
  })

categoriesRouter.put('/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      const body = req.body;
      res.status(201).json(await categoriesService.update(id, body));
    } catch (error) {
      next(error);
    }
  })


categoriesRouter.delete('/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      res.status(200).json(await categoriesService.delete(id))
    } catch (error) {
      next(error);
    }
  })

module.exports = {
  categoriesRouter
};
