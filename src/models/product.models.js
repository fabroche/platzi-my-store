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
    this.id = id;
    this.name = name;
    this.price = price;
    this.currency = currency;
    this.categories = categories;
    this.description = description;
    this.image = image;
  }

  // Validadores individuales
  isValidId() {
    return typeof this.id === 'string';
  }

  isValidName() {
    return typeof this.name === 'string';
  }

  isValidPrice() {
    return typeof this.price === 'number';
  }

  isValidCurrency() {
    return typeof this.currency === 'string';
  }

  isValidCategories() {
    return Array.isArray(this.categories) &&
      this.categories.length > 0 &&
      this.categories.every(cat => typeof cat === 'string');
  }

  isValidDescription() {
    return typeof this.description === 'string';
  }

  isValidImage() {
    return typeof this.image === 'string';
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
