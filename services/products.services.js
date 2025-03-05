const {ProductModel} = require("../src/models/product.models");
const {products} = require("../src/api/e-commerce");
const boom = require("@hapi/boom");

class ProductsService {
  constructor() {
    this.products = [];
    this.setUp();
  }

  setUp() {
    this.products = products
  }

  _findProductIndex({id}) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound(`Producto con id ${id} no encontrado`);
    }
    return index;
  }

  async getProducts() {
    return this.products
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
