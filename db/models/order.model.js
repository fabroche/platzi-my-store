const {Model, DataTypes, Sequelize} = require('sequelize');
const {CUSTOMER_TABLE} = require("./customer.model");

const ORDER_TABLE = 'orders';

const OrderSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  customerId: {
    field: 'customer_id',
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  total: {
    type: DataTypes.VIRTUAL,
    get() {
      if (this.items.length > 0) {
        return this.items.reduce((total, item) => {
          return total + item.price * item.OrderProduct.amount
        }, 0)
      }
      return 0
    }
  }
}

class Order extends Model {
  static associate(models) {
    this.belongsTo(models.Customer, {
      as: 'customer',
    })
    this.belongsToMany(models.Product, {
      as: 'items',
      through: models.OrderProduct,
      foreignKey: "orderId",
      otherKey: "productId"
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false,
    }
  }
}

module.exports = {
  Order,
  OrderSchema,
  ORDER_TABLE
}
