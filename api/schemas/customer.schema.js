const Joi = require('joi');
const {userValidationSchema, userAttrTypes} = require('../schemas/user.schema');
const {generateKeyMap} = require("../utils/utils");


const customerValidationSchema = Joi.object({
  id: Joi.number().integer(),
  name: Joi.string().min(3).max(30),
  lastName: Joi.string(),
  phone: Joi.string(),
  userId: userValidationSchema.extract(userAttrTypes.id)
})

const customerAttrTypes = generateKeyMap(customerValidationSchema.describe().keys);

const getCustomerSchema = Joi.object({
  id: customerValidationSchema.extract(customerAttrTypes.id).required()
})

const createCustomerSchema = Joi.object({
  name: customerValidationSchema.extract(customerAttrTypes.name).required(),
  lastName: customerValidationSchema.extract(customerAttrTypes.lastName).required(),
  phone: customerValidationSchema.extract(customerAttrTypes.phone).required(),
  userId: userValidationSchema.extract(userAttrTypes.id).required()
})

const updateCustomerSchema = Joi.object({
  name: customerValidationSchema.extract(customerAttrTypes.name),
  lastName: customerValidationSchema.extract(customerAttrTypes.lastName),
  phone: customerValidationSchema.extract(customerAttrTypes.phone),
  userId: customerValidationSchema.extract(customerAttrTypes.userId),
})

module.exports = {
  getCustomerSchema,
  createCustomerSchema,
  updateCustomerSchema,
  customerValidationSchema,
  customerAttrTypes
}
