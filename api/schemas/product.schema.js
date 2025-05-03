const Joi = require('joi');
const {generateKeyMap} = require("../utils/utils");
const {categoryValidationSchema, categoryAttrTypes} = require("../schemas/category.schema");

const productValidationSchema = Joi.object({
  id: Joi.number().integer(),
  name: Joi.string().alphanum().min(3).max(15),
  price: Joi.number().integer().min(10),
  description: Joi.string().min(10),
  image: Joi.string().uri(),
  category: Joi.object({
    name: categoryValidationSchema.extract(categoryAttrTypes.name),
    image: categoryValidationSchema.extract(categoryAttrTypes.image),
  }),
  categoryId: categoryValidationSchema.extract(categoryAttrTypes.id),
  limit: Joi.number().integer(),
  offset: Joi.number().integer(),
})

const productsAttrTypes = generateKeyMap(productValidationSchema.describe().keys);

const createProductSchema = Joi.object({
  name: productValidationSchema.extract(productsAttrTypes.name).required(),
  price: productValidationSchema.extract(productsAttrTypes.price).required(),
  description: productValidationSchema.extract(productsAttrTypes.description).required(),
  image: productValidationSchema.extract(productsAttrTypes.image).required(),
  category: productValidationSchema.extract(productsAttrTypes.category),
  categoryId: categoryValidationSchema.extract(categoryAttrTypes.id)
});

const updateProductSchema = Joi.object({
  name: productValidationSchema.extract(productsAttrTypes.name),
  price: productValidationSchema.extract(productsAttrTypes.price),
  description: productValidationSchema.extract(productsAttrTypes.description),
  image: productValidationSchema.extract(productsAttrTypes.image),
  categoryId: categoryValidationSchema.extract(categoryAttrTypes.id)
});

const getProductSchema = Joi.object({
  id: productValidationSchema.extract(productsAttrTypes.id).required(),
});

const queryProductsSchema = Joi.object({
  limit: productValidationSchema.extract(productsAttrTypes.limit),
  offset: productValidationSchema.extract(productsAttrTypes.offset),
  name: productValidationSchema.extract(productsAttrTypes.name),
  price: productValidationSchema.extract(productsAttrTypes.price),
  categoryId: categoryValidationSchema.extract(categoryAttrTypes.id),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  productValidationSchema,
  productsAttrTypes,
  queryProductsSchema
}
