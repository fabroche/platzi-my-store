const boom = require('@hapi/boom');
const {sequelize: {models}} = require('../libs/sequelize');
const {setPagination} = require("../utils/utils");

class CustomersService {
  constructor() {}

  async find(query) {

    const options = {
      include: ['user']
    }

    setPagination(query, options);

    const customers = await models.Customer.findAll(options);

    if (!customers?.length) {
      throw boom.notFound('There is not any Customer');
    }
    return customers;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('Customer not found');
    }
    return customer;
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    const rta = await customer.update(changes);
    return rta;
  }

  async create(data) {
    const newCustomer = await models.Customer.create(data, {
      include: ['user']
    });
    return newCustomer;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy();
    return {
      rta: true
    }
  }

}

module.exports = {CustomersService};
