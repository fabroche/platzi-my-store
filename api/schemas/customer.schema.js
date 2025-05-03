const Joi = require('joi');
const {userValidationSchema, userAttrTypes} = require('../schemas/user.schema');
const {generateKeyMap} = require("../utils/utils");


const customerValidationSchema = Joi.object({
  id: Joi.number().integer(),
  name: Joi.string().min(3).max(30),
  lastName: Joi.string(),
  phone: Joi.string(),
  user: Joi.object({
    email: userValidationSchema.extract(userAttrTypes.email),
    password: userValidationSchema.extract(userAttrTypes.password),
  }),
  userId: userValidationSchema.extract(userAttrTypes.id),
})

const customerAttrTypes = generateKeyMap(customerValidationSchema.describe().keys);

const getCustomerSchema = Joi.object({
  id: customerValidationSchema.extract(customerAttrTypes.id).required()
})

const createCustomerSchema = Joi.object({
  name: customerValidationSchema.extract(customerAttrTypes.name).required(),
  lastName: customerValidationSchema.extract(customerAttrTypes.lastName).required(),
  phone: customerValidationSchema.extract(customerAttrTypes.phone).required(),
  user: Joi.object({
    email: userValidationSchema.extract(userAttrTypes.email).required(),
    password: userValidationSchema.extract(userAttrTypes.password).required(),
  })
})

const updateCustomerSchema = Joi.object({
  name: customerValidationSchema.extract(customerAttrTypes.name),
  lastName: customerValidationSchema.extract(customerAttrTypes.lastName),
  phone: customerValidationSchema.extract(customerAttrTypes.phone),
  userId: customerValidationSchema.extract(customerAttrTypes.userId),
})

const queryCustomersSchema = Joi.object({
  limit: Joi.number().integer(),
  offset: Joi.number().integer(),
});

module.exports = {
  getCustomerSchema,
  createCustomerSchema,
  updateCustomerSchema,
  customerValidationSchema,
  customerAttrTypes,
  queryCustomersSchema
}
