const {Model, DataTypes, Sequelize} = require('sequelize');

const {ORDER_TABLE} = require('./order.model');
const {PRODUCT_TABLE} = require('./product.model');

const ORDER_PRODUCT_TABLE = 'orders_products';


const OrderProductSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'created_at',
    defaultValue: DataTypes.NOW,
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'order_id',
    unique: true,
    references: {
      model: ORDER_TABLE,
      key: 'id',
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'product_id',
      unique: true,
      references: {
        model: PRODUCT_TABLE,
        key: 'id',
      }
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
}

class OrderProduct extends Model {
  static associate(models) {
    this.belongsTo(models.User, {as: 'user'})
    this.hasMany(models.Order, {
      as: 'orders',
      foreignKey: 'customerId',
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_PRODUCT_TABLE,
      modelName: 'OrderProduct',
      timestamps: false,
    }
  }
}

module.exports = {
  OrderProduct,
  ORDER_PRODUCT_TABLE,
  OrderProductSchema
}
