const {products} = require("../api/e-commerce");

class ProductModel {
  constructor({
                id,
                name,
                price,
                currency,
                categories,
                description,
                image
              }) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._currency = currency;
    this._categories = categories;
    this._description = description;
    this._image = image;
  }

  // Getters
  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get price() {
    return this._price;
  }

  get currency() {
    return this._currency;
  }

  get categories() {
    return this._categories;
  }

  get description() {
    return this._description;
  }

  get image() {
    return this._image;
  }

  // Setters
  set id(value) {
    this._id = value;
  }

  set name(value) {
    this._name = value;
  }

  set price(value) {
    this._price = value;
  }

  set currency(value) {
    this._currency = value;
  }

  set categories(value) {
    this._categories = value;
  }

  set description(value) {
    this._description = value;
  }

  set image(value) {
    this._image = value;
  }

  isValid() {

    const isValidProduct = (
      typeof this._id === 'string' &&
      typeof this._name === 'string' &&
      typeof this._price === 'number' &&
      typeof this._currency === 'string' &&
      Array.isArray(this._categories) &&
      this._categories?.length > 0 &&
      this._categories.every(cat => typeof cat === 'string') &&
      typeof this._description === 'string' &&
      typeof this._image === 'string'
    )

    return isValidProduct;
  }
}

module.exports = {
  ProductModel,
};
