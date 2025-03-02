const {createArrayFromObject} = require("../src/utils/utils");
const {ProductModel} = require("../src/models/product.models");
const {faker} = require("@faker-js/faker");
const {ENV} = require("../config");
const {CategoriesService} = require("./categories.services.js");

const categoriesService = new CategoriesService();

class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 20;
    const categories = categoriesService.getCategories();
    this.products = createArrayFromObject(limit, () => (new ProductModel({
      id: faker.database.mongodbObjectId(),
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      currency: ENV.CURRENCY,
      categories: createArrayFromObject(
        Math.floor(Math.random() * categories.length) + 1
        , () => (
          categories[Math.floor(Math.random() * categories.length)].id
        )),
      description: faker.commerce.productDescription(),
      image: faker.image.url({width: ENV.PRODUCT_IMAGE_W, height: ENV.PRODUCT_IMAGE_H}),
    })))
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
