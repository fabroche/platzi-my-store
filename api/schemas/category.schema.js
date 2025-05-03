const Joi = require('joi');
const {generateKeyMap} = require('../utils/utils');

const categoryValidationSchema = Joi.object({
  id: Joi.number().integer(),
  name: Joi.string().min(3).max(15),
  image: Joi.string().uri(),
  limit: Joi.number().integer(),
  offset: Joi.number().integer(),
})

const categoryAttrTypes = generateKeyMap(categoryValidationSchema.describe().keys);


const createCategorySchema = Joi.object({
  name: categoryValidationSchema.extract(categoryAttrTypes.name).required(),
  image: categoryValidationSchema.extract(categoryAttrTypes.image).required(),
});

const updateCategorySchema = Joi.object({
  name: categoryValidationSchema.extract(categoryAttrTypes.name),
  image: categoryValidationSchema.extract(categoryAttrTypes.image),
});

const getCategorySchema = Joi.object({
  id: categoryValidationSchema.extract(categoryAttrTypes.id).required(),
});

const queryCategoriesSchema = Joi.object({
  limit: categoryValidationSchema.extract(categoryAttrTypes.limit),
  offset: categoryValidationSchema.extract(categoryAttrTypes.offset),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
  categoryValidationSchema,
  categoryAttrTypes,
  queryCategoriesSchema
}
