const {CategoryModel} = require("../src/models/category.models");
const {generateCategories,saveItemsIntoDB} = require("../src/api/e-commerce");
const boom = require("@hapi/boom");
const {pool} = require("../libs/postgres.pool.js")


class CategoriesService {
  constructor() {
    this.categories = [];
    this.modelName = CategoryModel.modelName;
    this.pool = pool;
    this.pool.on("error", (err) => console.log(err));
    this.setUp();
  }

  setUp() {
    this.getCategories()
      .then(categories => this.categories = categories)
      .catch(err => console.log(err));
  }

  async generate() {
    try {

    const generatedCategories = generateCategories({limit:5});

    await saveItemsIntoDB({
      data: generatedCategories,
      tableName: this.modelName,
    });

    return await this.getCategories()

    } catch (error) {
      throw boom.badData(error.message);
    }

  }

  async getCategories() {
    const query = `SELECT * FROM ${this.modelName} ORDER BY id;`;
    const response = await pool.query(query);

    if (!response) {
      throw boom.notFound("No categories found");
    }

    return response.rows.map(category => new CategoryModel(category));
  }

  async findById({id}) {
    const query = `SELECT * FROM ${this.modelName} WHERE ID=$1`;
    const searchedCategory = await this.pool.query(query, [id]);

    if (!searchedCategory.rows[0]) {
      throw boom.notFound(`Category with id = ${id} not found`);
    }

    return new CategoryModel(searchedCategory.rows[0]);
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
