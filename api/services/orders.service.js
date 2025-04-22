const {generateCategories, saveItemsIntoDB} = require("../src/api/e-commerce");
const boom = require("@hapi/boom");
const {sequelize: {models}} = require("../libs/sequelize");

class OrderService {
  constructor() {
  }


  async generate() {
    try {

      const generatedCategories = generateCategories({limit: 5});

      await saveItemsIntoDB({
        data: generatedCategories,
        tableName: this.modelName,
      });

      return await this.getCategories()

    } catch (error) {
      throw boom.badData(error.message);
    }

  }

  async find() {
    const orders = await models.Order.findAll();

    if (!orders?.length) {
      throw boom.notFound('There is not any Order');
    }
    return orders;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id,{
      include: ['customer']
    })

    if (!order) {
      throw boom.notFound('Order not found');
    }

    return order;
  }

  async update(id, changes) {
    const order = await this.findOne(id);
    const rta = await order.update(changes);
    return rta;
  }

  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async delete(id) {
    const order = await this.findOne(id);
    await order.destroy();
    return {
      rta: true
    }
  }

}

module.exports = {OrderService};
