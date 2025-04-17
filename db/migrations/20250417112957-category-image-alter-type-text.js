'use strict';

const {CATEGORY_TABLE, CategorySchema} = require("../models/category.model");
const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      CATEGORY_TABLE,
      "image",
      {
        type: DataTypes.TEXT,
        allowNull: false,
      }
    )
  },

  async down (queryInterface, Sequelize) {
    // await queryInterface.dropTable(CUSTOMER_TABLE);
  }
};
