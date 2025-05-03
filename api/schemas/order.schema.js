const Joi = require('joi');
const {generateKeyMap} = require('../utils/utils');
const {customerValidationSchema,customerAttrTypes} = require('../schemas/customer.schema')


const orderValidationSchema = Joi.object({
  id: Joi.number().integer(),
  customerId: customerValidationSchema.extract(customerAttrTypes.id),
  limit: Joi.number().integer(),
  offset: Joi.number().integer(),
})

const orderAttrTypes = generateKeyMap(orderValidationSchema.describe().keys);


const createOrderSchema = Joi.object({
  customerId: orderValidationSchema.extract(orderAttrTypes.customerId).required()
});

const updateOrderSchema = Joi.object({
  customerId: orderValidationSchema.extract(orderAttrTypes.customerId)
});

const getOrderSchema = Joi.object({
  id: orderValidationSchema.extract(orderAttrTypes.id).required(),
});

const queryOrdersSchema = Joi.object({
  limit: orderValidationSchema.extract(orderAttrTypes.limit),
  offset: orderValidationSchema.extract(orderAttrTypes.offset),
});

module.exports = {
  createOrderSchema,
  updateOrderSchema,
  getOrderSchema,
  orderValidationSchema,
  orderAttrTypes,
  queryOrdersSchema
}
