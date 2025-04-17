const {Router} = require('express');
const {handlePagination} = require("../src/utils/utils");
const {ProductsService} = require('../services/products.service');
const {validatorHandler} = require("../middlewares/validator.handler");
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema
} = require("../schemas/product.schema");

const productsRouter = Router();
const productService = new ProductsService();


productsRouter.get('/', async (req, res, next) => {
  try {

    const products = await productService.find();

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
    } else {
      res.status(200).json([
        ...result
      ]);
    }
  } catch (error) {
    next(error);
  }

})

productsRouter.get('/generate', async (req, res, next) => {
  try {
    const categories = await categoriesService.getCategories();

    const result = await productService.generate({
      categories: categories
    })

    res.status(200).json(result);

  } catch (error) {
    next(error);
  }
})

productsRouter.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await productService.findOne(id);

    res.json({
      ...result
    });
  } catch (error) {
    next(error);
  }
})

productsRouter.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;

      const newProduct = await productService.create(body);

      if (newProduct) {
        res.status(201).json({
          message: `Producto ${newProduct.name} created`,
          data: newProduct,
        });
      }
    } catch (error) {
      next(error);
    }
  })

productsRouter.put('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {

      const {id} = req.params;
      const body = req.body;

      const newProduct = await productService.update(id,body);

      if (newProduct) {
        res.status(201).json({
          message: `Producto ${newProduct.id} updated`,
          data: newProduct,
        });
      }
    } catch (error) {
      next(error);
    }

  })

productsRouter.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
  try {
    const {id} = req.params;
    const body = req.body;

    const newProduct = await productService.update({
      id,
      product: body
    });

    if (newProduct) {
      res.status(201).json({
        message: `Producto ${newProduct.id} Partial updated`,
        data: body,
      });
    }
  } catch (error) {
    next(error);
  }
})

productsRouter.delete('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
  try {
    const {id} = req.params;
    const deletedProduct = await productService.delete(id)

    if (deletedProduct) {
      res.status(200).json({
        message: `Producto ${deletedProduct.id} deleted`,
        data: deletedProduct,
      })
    }
  } catch (error) {
    next(error);
  }
})

module.exports = {
  productsRouter
};

