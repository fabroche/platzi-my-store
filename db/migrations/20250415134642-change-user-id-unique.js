'use strict';

const {CUSTOMER_TABLE, CustomerSchema} = require("../models/customer.model");
const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      CUSTOMER_TABLE,
      CustomerSchema.userId.field,
      {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id',
        unique: true,
      }
    )
  },

  async down (queryInterface, Sequelize) {
    // await queryInterface.dropTable(CUSTOMER_TABLE);
  }
};
