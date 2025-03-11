const joi = require("joi");
const boom = require('@hapi/boom');

class CategoryModel {
  static modelName = 'categories';

  static schema = joi.object({
    id: joi.string().required(),
    name: joi.string().required(),
  })

  constructor({id, name}) {
    this.id = id;
    this.name = name;
  }

  validateData() {
    const validation = CategoryModel.schema.validate(this, {abortEarly: false});

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
      [attribute]: CategoryModel.schema.extract(attribute),
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

  isValidName() {
    return this._validateAttribute("name", this.name);
  }

  isValid() {
    return this.validateData().isValid;
  }
}

module.exports = {
  CategoryModel
};
