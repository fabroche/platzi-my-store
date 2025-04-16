const Joi = require('joi');
const {generateKeyMap} = require("../utils/utils");


const productValidationSchema = Joi.object({
  id: Joi.string().uuid(),
  name: Joi.string().alphanum().min(3).max(15),
  price: Joi.number().integer().min(10),
  description: Joi.string().min(10),
  image: Joi.string().uri(),
})

const productsAttrTypes = generateKeyMap(productValidationSchema.describe().keys);

const createProductSchema = Joi.object({
  name: productValidationSchema.extract(productsAttrTypes.name).required(),
  price: productValidationSchema.extract(productsAttrTypes.price).required(),
  description: productValidationSchema.extract(productsAttrTypes.description).required(),
  image: productValidationSchema.extract(productsAttrTypes.image).required(),
});

const updateProductSchema = Joi.object({
  name: productValidationSchema.extract(productsAttrTypes.name),
  price: productValidationSchema.extract(productsAttrTypes.price),
  description: productValidationSchema.extract(productsAttrTypes.description),
  image: productValidationSchema.extract(productsAttrTypes.image)
});

const getProductSchema = Joi.object({
  id: productValidationSchema.extract(productsAttrTypes.id).required(),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  productValidationSchema,
  productsAttrTypes,
}
