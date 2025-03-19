const joi = require("joi");
const boom = require("@hapi/boom");

class UserModel {
  static modelName = 'categories';

  static schema = joi.object({
    id: joi.string(),
    email: joi.string().required(),
    password: joi.string().min(8).required(),
    role: joi.string().min(5),
  })

  constructor({id, email, password, role}) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  validateData() {
    const validation = UserModel.schema.validate(this, {abortEarly: false});

    if (validation.error) {
      throw boom.badData(validation.error.message);
    }

    return {
      isValid: !validation.error,
      errors: validation.error ? validation.error.details : null,
    }
  }

  _validateAttribute(attribute, value) {
    const objToValidate = {};
    objToValidate[attribute] = value;

    const singleAttributeSchema = joi.object({
      [attribute]: UserModel.schema.extract(attribute),
    });

    const validation = singleAttributeSchema.validate(objToValidate);

    if (validation.error) {
      throw boom.badData(validation.error.message);
    }

    return !validation.error;
  }

  // Validadores individuales
  isValidId() {
    return this._validateAttribute("id", this.id);
  }

  isValidEmail() {
    return this._validateAttribute("email", this.email);
  }

  isValidPassword() {
    return this._validateAttribute("password", this.password);
  }

  isValidRole() {
    return this._validateAttribute("role", this.role);
  }

  isValid() {
    return this.validateData().isValid;
  }
}

module.exports = {
  UserModel
};
