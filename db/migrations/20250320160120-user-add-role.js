'use strict';
const {UserSchema, USER_TABLE} = require('../models/user.model')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.addColumn(USER_TABLE, 'role', UserSchema.role);
    } catch (error) {
      const mysqlError = "Duplicate column name 'role'"
      const postgresqlError = `column "role" of relation "${USER_TABLE}" already exists`

      if (error.message.includes(postgresqlError) || error.message.includes(mysqlError)) {
        console.info(`La columna role ya existe en la tabla ${USER_TABLE}, continuando...`)
      } else {
        throw error;
      }
    }
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.removeColumn(USER_TABLE, 'role');

  }
};
