const Joi = require('joi');
const {generateKeyMap} = require('../utils/utils');
const {customerValidationSchema,customerAttrTypes} = require('../schemas/customer.schema')


const orderValidationSchema = Joi.object({
  id: Joi.number().integer(),
  customerId: customerValidationSchema.extract(customerAttrTypes.id),
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

module.exports = {
  createOrderSchema,
  updateOrderSchema,
  getOrderSchema,
  orderValidationSchema,
  orderAttrTypes
}
