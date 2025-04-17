const boom = require('@hapi/boom');

const {sequelize: {models}} = require('../libs/sequelize');
const {UserModel} = require('../src/models/user.model');


class UserService {

  async create(data) {

    const newUser = new UserModel(data)

    if (!newUser.isValid()) {
      throw boom.badData('Incorrect user data')
    }

    const response = await models.User.create(newUser);

    return new UserModel(response.dataValues);
  }

  async find() {
    const rta = await models.User.findAll({
      include: ['customer']
    });

    if (!rta?.length) {
      throw boom.notFound("No se encontraron usuarios")
    }

    return rta;
  }

  async findOne(id) {
    const findedUser = await models.User.findByPk(id);

    if (!findedUser?.dataValues) {
      throw boom.notFound(`There is no user with id=${id}`)
    }

    return new UserModel(findedUser.dataValues);
  }

  async update(id, changes) {

    const updatedUser = await this.findOne(id);

    await models.User.update(changes, {
      where: {
        id: id
      }
    })

    return {
      ...updatedUser,
      changes: changes
    };
  }

  async delete(id) {

    const deletedUser = await this.findOne(id);

    const response = await models.User.destroy({
      where: {
        id: id
      }
    })

    if (!response > 0) {
      throw boom.notFound("No se encontraron usuarios")
    }

    return deletedUser;
  }
}

module.exports = {UserService};
