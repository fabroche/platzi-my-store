const Joi = require('joi');
const {generateKeyMap} = require('../utils/utils');

const userValidationSchema = Joi.object({
  id: Joi.number().integer(),
  email: Joi.string().email(),
  password: Joi.string().min(8),
  role: Joi.string().min(5),
  limit: Joi.number().integer(),
  offset: Joi.number().integer(),
})

const userAttrTypes = generateKeyMap(userValidationSchema.describe().keys);


const createUserSchema = Joi.object({
  email: userValidationSchema.extract(userAttrTypes.email).required(),
  password: userValidationSchema.extract(userAttrTypes.password).required(),
  role: userValidationSchema.extract(userAttrTypes.role).required()
});

const updateUserSchema = Joi.object({
  email: userValidationSchema.extract(userAttrTypes.email),
  role: userValidationSchema.extract(userAttrTypes.role),
  password: userValidationSchema.extract(userAttrTypes.password),
});

const getUserSchema = Joi.object({
  id: userValidationSchema.extract(userAttrTypes.id).required(),
});

const queryUsersSchema = Joi.object({
  limit: userValidationSchema.extract(userAttrTypes.limit),
  offset: userValidationSchema.extract(userAttrTypes.offset),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
  userValidationSchema,
  userAttrTypes,
  queryUsersSchema
}
