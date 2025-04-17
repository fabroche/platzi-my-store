'use strict';

const {PRODUCT_TABLE, ProductSchema} = require("../models/product.model");
const {DataTypes} = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      PRODUCT_TABLE,
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
