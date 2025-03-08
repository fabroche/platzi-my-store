const {CategoryModel} = require("../src/models/category.models");
const {categories} = require("../src/api/e-commerce");
const boom = require("@hapi/boom");


class CategoriesService {
  constructor() {
    this.categories = [];
    this.setUp();
  }

  setUp() {
    this.categories = categories;
  }

  async getCategories() {
    return this.categories;
  }

  async findById({id}) {
    const searchedCategory = this.categories.find(category => category.id === id)

    if (!searchedCategory) {
      throw boom.notFound(`Category with id = ${id} not found`);
    }

    return searchedCategory;
  }

  async getCategoryInProduct({categoryId, productId, products}) {
    const result = products.find(product => product.categories.includes(categoryId) && product.id === productId);

    if (!result) {
      throw boom.notFound(`Product with id = ${productId} and with Category id = ${categoryId} not found`);
    }

    return result;
  }

  async getCategoryNamesByIdList({categoriesIdList = []}) {
    const result = this.categories.filter(category => categoriesIdList.includes(category.id));

    if (!result?.length) {
      throw boom.notFound("Categories not found");
    }
    return result;

  }

  async getCategoryInProductsById({categoryId, products}) {

    const result = await Promise.all(products
      .filter(product => product.categories.includes(categoryId))
      .map(async (product) => {
        return {
          ...product,
          categories: await this.getCategoryNamesByIdList({
            categoriesIdList: product.categories
          })
        };
      }));

    if (!result?.length) {
      throw boom.notFound(`Products with categoryId = ${categoryId} not found`);
    }

    return result;
  }

  async createCategory({category}) {
    const newCategory = new CategoryModel(category);

    if (!newCategory.isValid()) {
      throw boom.badData("Category dont match with a valid CategoryModel instance");
    }

    this.categories.push(newCategory);
    return newCategory;
  }
}

module.exports = {CategoriesService};
