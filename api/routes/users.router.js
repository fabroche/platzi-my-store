const {handlePagination} = require("../src/utils/utils");
const {Router} = require("express");
const {UserService} = require("../services/user.service")

const usersRouter = Router();
const userService = new UserService();

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

usersRouter.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await userService.findOne(id)

    res.json({
      ...result
    });
  } catch (error) {
    next(error);
  }
})

usersRouter.post('/', async (req, res, next) => {
  try {
    const body = req.body;

    const newUser = await userService.create(body)

    if (newUser) {
      res.status(201).json({
        message: `User ${newUser.email} created`,
        data: newUser,
        id: newUser.id
      });
    }
  } catch (error) {
    next(error);
  }
})

usersRouter.patch('/:id', async (req, res, next) => {

  try {

    const {id} = req.params;
    const body = req.body;

    const updatedUser = await userService.update(id, body);

    res.status(200).json({
      message: `User ${updatedUser.email} updated`,
      data: updatedUser.changes
    })
  } catch (error) {
    next(error);
  }

})

usersRouter.delete('/:id', async (req, res, next) => {
  try {

    const {id} = req.params;

    const removedUser = await userService.delete(id);

    res.status(200).json({
      message: `User ${removedUser.email} deleted`,
    })

  } catch (e) {
    next(e);
  }


})

module.exports = {
  usersRouter
}
