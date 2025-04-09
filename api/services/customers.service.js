const boom = require('@hapi/boom');
const {sequelize: {models}} = require('../libs/sequelize');

class CustomersService {
  constructor() {}

  async find() {
    const customers = await models.Customer.findAll();
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
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    const rta = await customer.update(changes);
    return rta;
  }

  async create(data) {
    return data;
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
