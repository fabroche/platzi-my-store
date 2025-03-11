const {handlePagination} = require("../src/utils/utils");
const {Router} = require("express");
const {UserService} = require("../services/user.service")

const usersRouter = Router();

usersRouter.get('/', async (req, res) => {
  const userService = new UserService();

  const users = await userService.find();

  const {limit = users.length, offset = 0} = req.query;

  const result = handlePagination({
    limit,
    offset,
    itemList: users
  });

  if (!result?.length) {
    res.status(404).send('No se encontraron usuarios');
  }

  res.status(200).json([
    ...result
  ]);
})

module.exports = {
  usersRouter
}
