const {CategoryModel} = require("../src/models/category.models");
const {generateCategories, saveItemsIntoDB} = require("../src/api/e-commerce");
const boom = require("@hapi/boom");
const {sequelize: {models}} = require("../libs/sequelize");

class CategoryService {
  constructor() {
  }


  async generate() {
    try {

      const generatedCategories = generateCategories({limit: 5});

      await saveItemsIntoDB({
        data: generatedCategories,
        tableName: this.modelName,
      });

      return await this.getCategories()

    } catch (error) {
      throw boom.badData(error.message);
    }

  }

  async find() {
    const categories = await models.Category.findAll();

    if (!categories?.length) {
      throw boom.notFound('There is not any Category');
    }
    return categories;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id)

    if (!category) {
      throw boom.notFound('Category not found');
    }

    return category;
  }

  async update(id, changes) {
    const category = await this.findOne(id);
    const rta = await category.update(changes);
    return rta;
  }

  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async delete(id) {
    const category = await this.findOne(id);
    await category.destroy();
    return {
      rta: true
    }
  }

  async getProductsWithCategoryID(id) {
    const categories = await models.Category.findByPk(id, {
      include: ['products']
    })

    return categories.products;
  }
}

module.exports = {CategoryService};
