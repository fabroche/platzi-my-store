const Joi = require('joi');
const {userAttrSchema, userAttrTypes} = require('../schemas/user.schema');
const {generateKeyMap} = require("../utils/utils");


const customerSchema = Joi.object({
  id: Joi.number().integer(),
  name: Joi.string().min(3).max(30),
  lastName: Joi.string(),
  phone: Joi.string(),
  userId: userAttrSchema.extract(userAttrTypes.id)
})

const customerAttrTypes = generateKeyMap(customerSchema.describe().keys);

const getCustomerSchema = Joi.object({
  id: customerSchema.extract(customerAttrTypes.id).required()
})

const createCustomerSchema = Joi.object({
  name: customerSchema.extract(customerAttrTypes.name).required(),
  lastName: customerSchema.extract(customerAttrTypes.lastName).required(),
  phone: customerSchema.extract(customerAttrTypes.phone).required(),
  user: Joi.object({
    email: userAttrSchema.extract(userAttrTypes.email).required(),
    password: userAttrSchema.extract(userAttrTypes.password).required(),
  })
})

const updateCustomerSchema = Joi.object({
  name: customerSchema.extract(customerAttrTypes.name),
  lastName: customerSchema.extract(customerAttrTypes.lastName),
  phone: customerSchema.extract(customerAttrTypes.phone),
  userId: customerSchema.extract(customerAttrTypes.userId),
})

module.exports = {
  getCustomerSchema,
  createCustomerSchema,
  updateCustomerSchema,
  customerSchema,
  customerAttrTypes
}
