const {ProductModel} = require("../src/models/product.models");
const {CategoryModel} = require("../src/models/category.models");
const {generateProducts, saveItemsIntoDB} = require("../src/api/e-commerce");
const boom = require("@hapi/boom");
const {pool} = require("../libs/postgres.pool.js")


class ProductsService {
  constructor() {
    this.products = [];
    this.modelName = ProductModel.modelName;
    this.pool = pool;
    this.pool.on("error", (err) => console.log(err));
    this.setUp();
  }

  setUp() {
    this.getProducts().then(result => this.products = result).catch(err => console.log(err));
  }

  async generate({categories}) {
    const generatedProducts = generateProducts({
      limit: 5,
      categories: categories
    });

    generatedProducts.map(async (product) => {
      const productCategories = [...product.categories];

      delete product.categories;

      await saveItemsIntoDB({
        tableName: "products",
        data: [product],
        keepOldData: true
      })

      await Promise.all(productCategories.map(async (categoryId) => {
        await saveItemsIntoDB({
          tableName: "product_categories",
          data: [{product_id:product.id, category_id:categoryId}],
          keepOldData: true
        })
      }))
    })
  }

  _findProductIndex({id}) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound(`Producto con id ${id} no encontrado`);
    }
    return index;
  }

  async getProducts() {
    const query = "SELECT * FROM products";
    const products = await this.pool.query(query);

    const response = Promise.all(products.rows.map(async (product) => {
      const query = `SELECT category_id FROM product_categories WHERE product_id = $1`;
      const categories = await this.pool.query(query, [product.id]);

      return new ProductModel({
        ...product,
        categories: categories.rows
      });
    }));

    return response;
  }

  async findProductById({id}) {
    const productIndex = this._findProductIndex({id})
    return this.products[productIndex];
  }

  async createProduct({product}) {
    const newProduct = new ProductModel(product)
    if (!newProduct.isValid()) {
      throw boom.badData("Product dont match with a valid ProductModel instance");
    }
    this.products.push(newProduct);
    return newProduct;
  }

  async update({id, product}) {

    if (!product || Object.keys(product).length === 0) {
      throw boom.badData("No hay datos para actualizar");
    }

    const productIndex = this._findProductIndex({id});
    const currentProduct = this.products[productIndex]

    const toUpdateProduct = new ProductModel({
      ...currentProduct,
      ...product
    });

    if (!toUpdateProduct.isValid()) {
      throw boom.badData("Product not valid");
    }

    this.products[productIndex] = toUpdateProduct;
    return toUpdateProduct;

  }

  async delete({id}) {
    const productIndex = this._findProductIndex({id})
    const deletedProduct = this.products.splice(productIndex, 1);
    return deletedProduct[0];
  }
}

module.exports = {ProductsService};
