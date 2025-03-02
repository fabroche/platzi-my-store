const {createArrayFromObject} = require("../src/utils/utils");
const {CategoryModel} = require("../src/models/category.models");
const {faker} = require("@faker-js/faker");

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

  findById({id}) {
    const searchedCategory = this.categories.find(category => category.id === id)

    if (searchedCategory) {
      return searchedCategory;
    }

    return {};
  }

  getCategoryInProduct({categoryId, productId, products}) {
    const result = products.find(product => product.categories.includes(categoryId) && product.id === productId);

    if (result) {
      return result;
    }

    return {}
  }

  getCategoryNamesByIdList({categoriesIdList = []}) {
    const result = this.categories.filter(category => categoriesIdList.includes(category.id));

    if (result) {
      return result;
    }

    return [];
  }

  getCategoryInProductsById({categoryId, products}) {

    const result = products
      .filter(product => product.categories.includes(categoryId))
      .map(product => {
        return {
          ...product,
          categories: this.getCategoryNamesByIdList({
            categoriesIdList: product.categories
          })
        };
      });

    if (result) {
      return result;
    }

    return [];
  }

  createCategory({category}) {
    const newCategory = new CategoryModel(category);

    if (newCategory.isValid()) {
      this.categories.push(newCategory);
      return newCategory;
    }

    return {};
  }
}

module.exports = {CategoriesService};
