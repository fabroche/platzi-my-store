const joi = require('joi');
const Joi = require("joi");

class ProductModel {

  static schema = joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    price: joi.number().positive().required(),
    currency: Joi.string().length(3).case("upper").required(),
    categories: joi.array().items(joi.string()).min(1).required(),
    description: joi.string().required(),
    image: joi.string().uri().required(),
  });

  constructor({
                id,
                name,
                price,
                currency,
                categories,
                description,
                image
              }) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.currency = currency;
    this.categories = categories;
    this.description = description;
    this.image = image;
  }

  validateData() {
    const validation = ProductModel.schema.validate(this, {abortEarly: false});
    return {
      isValid: !validation.error,
      errors: validation.error ? validation.error.details : null,
    }
  }

  _validateAttribute(attribute,value) {
    const objToValidate = {};
    objToValidate[attribute] = value;

    const singleAttributeSchema = joi.object({
      [attribute]: ProductModel.schema.extract(attribute)
    });

    const validation = singleAttributeSchema.validate(objToValidate);

    return !validation.error;
  }

  // Validadores individuales
  isValidId() {
    return this._validateAttribute("id", this.id);
  }

  isValidName() {
    return this._validateAttribute("name", this.name);
  }

  isValidPrice() {
    return this._validateAttribute("price", this.price);
  }

  isValidCurrency() {
    return this._validateAttribute("currency", this.currency);
  }

  isValidCategories() {
    return this._validateAttribute("categories", this.categories);
  }

  isValidDescription() {
    return this._validateAttribute("description", this.description);
  }

  isValidImage() {
    return this._validateAttribute("image", this.image);
  }

  // Validador general que utiliza los validadores individuales
  isValid() {
    return this.isValidId() &&
      this.isValidName() &&
      this.isValidPrice() &&
      this.isValidCurrency() &&
      this.isValidCategories() &&
      this.isValidDescription() &&
      this.isValidImage();
  }
}

module.exports = {
  ProductModel,
};
