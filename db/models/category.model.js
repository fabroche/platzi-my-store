const {Model, DataTypes, Sequelize} = require('sequelize');

const CATEGORY_TABLE = 'categories';

const CategorySchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    allowNull: false,
    defaultValue: DataTypes.NOW,
  }
}

class Category extends Model {
  static associate(models) {
      this.hasMany(models.Product, {
        as: 'products',
        foreignKey: 'categoryId',
      })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'Category',
      timestamps: false,
    }
  }
}

module.exports = {
  Category,
  CategorySchema,
  CATEGORY_TABLE
}
