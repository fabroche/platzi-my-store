const {sequelize: {models}} = require('../libs/sequelize');
const {Op} = require("sequelize");
const {generateProducts, saveItemsIntoDB} = require("../src/api/e-commerce");
const boom = require("@hapi/boom");
const {setPagination, setFilters} = require("../utils/utils");
const {productsAttrTypes} = require("../schemas/product.schema");


class ProductsService {

  _setFilterPriceRange(query, options) {
    if (query.price) {
      throw boom.badRequest('when price filter is set you can not use range filter (price_min and price_max)');
    }

    options.where.price = {
      [Op.gte]: query.price_min,
      [Op.lte]: query.price_max
    };
  }

  async generate({categories}) {
    const generatedProducts = generateProducts({
      limit: 100,
      categories: categories
    });

    generatedProducts.map(async (product) => {
      const productCategories = [...product.categories];

      delete product.categories;

      await saveItemsIntoDB({
        tableName: this.modelName,
        data: [product],
        keepOldData: true
      })

      await Promise.all(productCategories.map(async (categoryId) => {
        await saveItemsIntoDB({
          tableName: "product_categories",
          data: [{product_id: product.id, category_id: categoryId}],
          keepOldData: true
        })
      }))
    })

    return await this.getProducts();
  }

  async find(query) {

    const options = {
      include: ['category'],
      where: {}
    }

    setPagination(query, options);

    setFilters(
      productsAttrTypes,
      query,
      options
    );

    if (query.price_min && query.price_max) {
      this._setFilterPriceRange(query, options);
    }

    const products = await models.Product.findAll(options);

    if (!products?.length) {
      throw boom.notFound("No se encontraron productos")
    }

    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id, {
      include: ['category']
    });

    if (!product) {
      throw boom.notFound(`No se existe ningun producto con id = ${id}`)
    }

    return product;
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    const rta = await product.update(changes);
    return rta;
  }

  async create(data) {
    const newProduct = await models.Product.create(data, {
      include: ['category']
    });
    return newProduct;
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return {
      rta: true
    }
  }

}

module.exports = {ProductsService};
