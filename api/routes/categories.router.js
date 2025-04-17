const {handlePagination} = require("../src/utils/utils");
const {validatorHandler} = require("../middlewares/validator.handler");
const {Router} = require("express");
const {CategoryService} = require("../services/categories.service");
const {createCategorySchema} = require("../schemas/category.schema");

const categoriesRouter = Router();

const categoriesService = new CategoryService();

categoriesRouter.get('/', async (req, res, next) => {
  try {
    const categories = await categoriesService.find();

    const {limit = categories.length, offset = 0} = req.query;

    const result = handlePagination({
      limit,
      offset,
      itemList: categories
    });

    if (!result?.length) {
      res.status(404).send('No se encontraron Categorias');
    } else {
      res.status(200).json([
        ...result
      ]);
    }

  } catch (error) {
    next(error);
  }
})

// categoriesRouter.get('/generate', async (req, res, next) => {
//   try {
//
//     const result = await categoriesService.generate();
//
//     res.status(200).json(result)
//
//   } catch (err) {
//     next(err);
//   }
// })
//
// categoriesRouter.get('/:id', async (req, res, next) => {
//   try {
//     const {id} = req.params;
//     const result = await categoriesService.findById({id})
//
//     res.json({
//       ...result
//     });
//   } catch (error) {
//     next(error);
//   }
// })
//
// categoriesRouter.get('/:categoryId/products/:productId', async (req, res, next) => {
//   try {
//     const {
//       categoryId,
//       productId
//     } = req.params;
//
//     const products = await productsService.getProducts();
//
//     const {
//       limit = products.length,
//       offset = 0
//     } = req.query;
//
//     if (limit <= 0 || offset < 0) {
//       res.status(400).send('Bad Request: Limit tiene que ser mayor que 0 y Offset no puede se menor que 0');
//     }
//
//     let result = await categoriesService.getCategoryInProduct({
//       categoryId,
//       productId,
//       products
//     });
//
//     result = handlePagination({
//       limit,
//       offset,
//       itemList: result
//     })
//
//     res.json({
//       ...result,
//       categories: await categoriesService.getCategoryNamesByIdList({categoriesIdList: [categoryId]})
//     })
//   } catch (error) {
//     next(error);
//   }
//
// })
//
// categoriesRouter.get('/:categoryId/products', async (req, res, next) => {
//   try {
//     const {
//       categoryId,
//     } = req.params;
//
//     const products = await productsService.getProducts();
//
//     const {
//       limit = products.length,
//       offset = 0
//     } = req.query;
//
//     if (limit <= 0 || offset < 0) {
//       res.status(400).send('Bad Request: Limit tiene que ser mayor que 0 y Offset no puede se menor que 0');
//     }
//
//     let result = await categoriesService.getCategoryInProductsById({
//       categoryId,
//       products
//     })
//
//     if (!result?.length) {
//       res.status(404).send(`No existe ningun producto con la categoria = ${categoryId}`);
//     }
//
//     result = handlePagination({
//       limit,
//       offset,
//       itemList: result
//     })
//
//     res.json([
//       ...result
//     ])
//   } catch (error) {
//     next(error);
//   }
//
// })

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

module.exports = {
  categoriesRouter
};
