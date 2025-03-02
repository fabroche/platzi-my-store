const {createArrayFromObject} = require("../src/utils/utils");
const {CategoryModel} = require("../src/models/category.models");
const {faker} = require("@faker-js/faker");
const {categories} = require("../src/api/e-commerce");

class CategoriesService {
  constructor() {
    this.categories = [];
    this.generate()
  }

  generate() {
    const limit = 5;
    this.categories = createArrayFromObject(limit, () => (new CategoryModel({
      id: faker.database.mongodbObjectId(),
      name: faker.commerce.productAdjective(),
    })))
  }

  getCategories() {
    return this.categories;
  }
}

module.exports = {CategoriesService};
