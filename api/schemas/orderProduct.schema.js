const Joi = require('joi');
const {generateKeyMap} = require('../utils/utils');
const {orderValidationSchema, orderAttrTypes} = require('../schemas/order.schema')
const {productValidationSchema, productsAttrTypes} = require('../schemas/product.schema')


const orderProductValidationSchema = Joi.object({
  id: Joi.number().integer(),
  orderId: orderValidationSchema.extract(orderAttrTypes.id),
  productId: productValidationSchema.extract(productsAttrTypes.id),
  amount: Joi.number().integer().min(1),
})

const orderProductAttrTypes = generateKeyMap(orderProductValidationSchema.describe().keys);


const addItemSchema = Joi.object({
  orderId: orderProductValidationSchema.extract(orderProductAttrTypes.orderId).required(),
  productId: orderProductValidationSchema.extract(orderProductAttrTypes.productId).required(),
  amount: orderProductValidationSchema.extract(orderProductAttrTypes.amount).required(),
});

const updateItemSchema = Joi.object({
  orderId: orderProductValidationSchema.extract(orderProductAttrTypes.orderId),
  productId: orderProductValidationSchema.extract(orderProductAttrTypes.productId),
  amount: orderProductValidationSchema.extract(orderProductAttrTypes.amount),
});

const getItemSchema = Joi.object({
  id: orderProductValidationSchema.extract(orderProductAttrTypes.id).required(),
});

module.exports = {
  orderProductValidationSchema,
  orderProductAttrTypes,
  addItemSchema,
  updateItemSchema,
  getItemSchema
}
