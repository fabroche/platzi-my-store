class CategoryModel {
  constructor({id, name}) {
    this.id = id;
    this.name = name;
  }

  // Validadores individuales
  isValidId() {
    return typeof this.id === 'string';
  }

  isValidName() {
    return typeof this.name === 'string';
  }

  isValid() {
    return this.isValidId() && this.isValidName();
  }
}

module.exports = {
  CategoryModel
};
