const express = require('express');

const {CustomersService} = require('../services/customers.service');
const {validatorHandler} = require('../middlewares/validator.handler');

const {
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema,
  queryCustomersSchema
} = require('../schemas/customer.schema')

const customersRouter = express.Router();
const customerService = new CustomersService();

customersRouter.get('/',
  validatorHandler(queryCustomersSchema, 'query'),
  async (req, res, next) => {
  try {
    res.json(await customerService.find(req.query));
  } catch (error) {
    next(error);
  }
})

customersRouter.post('/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await customerService.create(body));
    } catch (error) {
      next(error);
    }
  });

customersRouter.patch('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      const body = req.body;
      res.status(201).json(await customerService.update(id, body));
    } catch (error) {
      next(error);
    }
  });

customersRouter.delete('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const {id} = req.params;
      res.status(200).json(await customerService.delete(id));
    } catch (error) {
      next(error);
    }
  });

module.exports = {
  customersRouter
};
