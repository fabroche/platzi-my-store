const express = require('express');
const {OrderService} = require('../services/orders.service');
const {validatorHandler} = require('../middlewares/validator.handler');
const {
  createOrderSchema,
  updateOrderSchema,
  getOrderSchema,
  orderValidationSchema,
  orderAttrTypes
} = require('../schemas/order.schema');

const ordersRouter = express.Router();
const ordersService = new OrderService();

ordersRouter.get('/', async (req, res, next) => {
  try {
    res.json(await ordersService.find());
  } catch (error) {
    next(error);
  }
})

ordersRouter.post('/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await ordersService.create(body));
    } catch (error) {
      next(error);
    }
  });

ordersRouter.patch('/:id',
  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(updateOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      const body = req.body;
      res.status(201).json(await ordersService.update(id, body));
    } catch (error) {
      next(error);
    }
  });

ordersRouter.delete('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      res.status(200).json(await ordersService.delete(id));
    } catch (error) {
      next(error);
    }
  });

module.exports = {
  ordersRouter
}
