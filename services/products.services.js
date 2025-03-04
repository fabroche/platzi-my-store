const {ProductModel} = require("../src/models/product.models");
const {products} = require("../src/api/e-commerce");


class ProductsService {
  constructor() {
    this.products = [];
    this.setUp();
  }

  setUp() {
    this.products = products
  }

  getProducts() {
    return this.products
  }

  findProductById({id}) {
    return this.products.find(item => item.id === id);
  }

  createProduct({product}) {
    const newProduct = new ProductModel(product)
    if (!newProduct.isValid()) {
      return {}
    }
    this.products.push(newProduct);
    return newProduct;
  }


  update({id, product}) {

    const productIndex = this.products.findIndex(product => product.id === id);

    if (productIndex !== -1) {
      const toUpdateProduct = new ProductModel({
        ...this.products[productIndex],
        ...product
      });

      if (toUpdateProduct.isValid()) {
        this.products[productIndex] = {...toUpdateProduct};
        return toUpdateProduct;
      }
    }

    return {};

  }

  delete({id}) {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex !== -1) {
      const deletedProduct = this.products.splice(productIndex, 1);
      return deletedProduct;
    }
    return {};
  }
}

module.exports = {ProductsService};
