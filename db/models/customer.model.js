const {Model, DataTypes, Sequelize} = require('sequelize');

const CUSTOMER_TABLE = 'customer';


const CustomerSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'last_name',
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'created_at',
    defaultValue: DataTypes.NOW,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id',
    unique: true,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id',
    },
  },
  onUpdate: 'CASCADA',
  onDelete: 'SET NULL',
}

class Customer extends Model {
  static associate() {

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false,
    }
  }
}

module.exports = {
  Customer,
  CUSTOMER_TABLE,
  CustomerSchema
}
