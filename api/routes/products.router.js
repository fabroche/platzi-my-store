const {Router} = require('express');
const {handlePagination} = require("../src/utils/utils");
const {ProductsService} = require('../services/products.services.js');

const productsRouter = Router();
const productService = new ProductsService();


productsRouter.get('/', async (req, res, next) => {
  try {

    const products = await productService.getProducts();

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
  } catch (error) {
    next(error);
  }

})

productsRouter.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await productService.findProductById({id});

    res.json({
      ...result
    });
  } catch (error) {
    next(error);
  }
})

productsRouter.post('/', async (req, res, next) => {
  try {
    const body = req.body;

    const newProduct = await productService.createProduct({
      product: body
    });

    if (newProduct) {
      res.status(201).json({
        message: `Producto ${newProduct.name} created`,
        data: newProduct,
        id: newProduct.id
      });
    }
  } catch (error) {
    next(error);
  }
})

productsRouter.put('/:id', async (req, res, next) => {
  try {

    const {id} = req.params;
    const body = req.body;

    const newProduct = await productService.update({
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
  } catch (error) {
    next(error);
  }

})

productsRouter.patch('/:id', async (req, res, next) => {
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
        id: newProduct.id
      });
    }
  } catch (error) {
    next(error);
  }
})

productsRouter.delete('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const deletedProduct = await productService.delete({id})

    if (deletedProduct) {
      res.status(200).json({
        message: `Producto ${deletedProduct.id} deleted`,
        data: deletedProduct,
        id: deletedProduct.id
      })
    }
  } catch (error) {
    next(error);
  }
})

module.exports = {
  productsRouter
};

