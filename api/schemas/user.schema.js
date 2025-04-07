const Joi = require('joi');
const {generateKeyMap} = require('../utils/utils');

const userAttrSchema = Joi.object({
  id: Joi.number().integer(),
  email: Joi.string().email(),
  password: Joi.string().min(8),
  role: Joi.string().min(5),
})

const userAttrTypes = generateKeyMap(userAttrSchema);


const createUserSchema = Joi.object({
  email: userAttrSchema.extract(userAttrTypes.id).required(),
  password: userAttrSchema.extract(userAttrTypes.password).required(),
  role: userAttrSchema.extract(userAttrTypes.role).required()
});

const updateUserSchema = Joi.object({
  email: userAttrSchema.extract(userAttrTypes.email),
  role: userAttrSchema.extract(userAttrTypes.role),
  password: userAttrSchema.extract(userAttrTypes.password),
});

const getUserSchema = Joi.object({
  id: userAttrSchema.extract(userAttrTypes.id).required(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
  userAttrSchema,
  userAttrTypes
}
