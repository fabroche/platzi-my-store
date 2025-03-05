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

  async getProducts() {
    return this.products
  }

  async findProductById({id}) {
    const product = this.products.find(item => item.id === id);
    if (!product) {
      throw boom.notFound(`Product with id = ${id} not found`);
    }
    return product;
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

    const productIndex = this.products.findIndex(product => product.id === id);

    if (productIndex === -1) {
      throw boom.notFound('Product not found');
    }

    const toUpdateProduct = new ProductModel({
      ...this.products[productIndex],
      ...product
    });

    if (!toUpdateProduct.isValid()) {
      throw boom.badData("Product not valid");
    }

    this.products[productIndex] = {...toUpdateProduct};
    return toUpdateProduct;

  }

  async delete({id}) {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) {
      throw boom.notFound('Product not found');
    }
    const deletedProduct = this.products.splice(productIndex, 1);
    return deletedProduct[0];
  }
}

module.exports = {ProductsService};
