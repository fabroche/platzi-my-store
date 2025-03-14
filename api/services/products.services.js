const {ProductModel} = require("../src/models/product.models");
const {CategoryModel} = require("../src/models/category.models");
const {generateProducts, saveItemsIntoDB} = require("../src/api/e-commerce");
const boom = require("@hapi/boom");
const {pool} = require("../libs/postgres.pool.js")
const {CategoriesService} = require("./categories.services");
const id = require("faker/lib/locales/id_ID");

const categoriesService = new CategoriesService();

class ProductsService {

  static instance;

  static getInstance() {
    if (!ProductsService.instance) {
      ProductsService.instance = new ProductsService();
    }
    return ProductsService.instance;
  }

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

      const categories = await this.getProductCategories({
        productId: product.id
      });

      return new ProductModel({
        ...product,
        categories: categories
      });
    }));

    return response;
  }

  async getProductCategories({productId}) {
    const categoryModelName = CategoryModel.modelName;

    const query = `SELECT ${categoryModelName}.*
                   FROM ${categoryModelName} ${categoryModelName}
                          JOIN product_categories pc
                               ON categories.id = pc.category_id
                   WHERE pc.product_id = $1`;

    const result = await this.pool.query(query, [productId]);

    return result.rows.map(category => new CategoryModel(category));
  }

  async findProductById({id}) {
    const query = `SELECT * FROM ${this.modelName} WHERE ID=$1`;
    const searchedProduct = await this.pool.query(query, [id]);
    const searchedProductCategories = await this.getProductCategories({productId: id});

    if (!searchedProduct.rows[0]) {
      throw boom.notFound(`Product with id = ${id} not found`);
    }

    return new ProductModel({
      ...searchedProduct.rows[0],
      categories: searchedProductCategories
    });
  }

  async createProduct({product}) {
    const newProduct = new ProductModel(product)

    if (!newProduct.isValid()) {
      throw boom.badData("Product dont match with a valid ProductModel instance");
    }

    const newProductCategories = [...newProduct.categories]

    // Validando que existan todas las categorias en la BD.
    await Promise.all(newProductCategories.map(async (category) => {
      return await categoriesService.findById({id: category.id});
    }));

    // Eliminando el atributo categories del objeto newProduct para guardarlo en la BD.
    // La relacion de productos y categorias son gestionadas a traves de la tabla product_categories
    delete newProduct.categories;
    // Persistiendo el nuevo Producto
    await saveItemsIntoDB({
      tableName: this.modelName,
      data: [newProduct],
      keepOldData: true
    })

    // Persistiendo en la BD la relacion de este producto con sus categorias.
    await Promise.all(newProductCategories.map(async (category) => {
      await saveItemsIntoDB({
        tableName: "product_categories",
        data: [{product_id: product.id, category_id: category.id}],
        keepOldData: true
      })
    }))

    // Actualizando el arreglo en memoria
    this.products.push({
      ...newProduct,
      categories: newProductCategories
    });

    // Retornando el producto directamente de la BD.
    return await this.findProductById({id: newProduct.id});
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

    const query = `DELETE
                   FROM ${this.modelName}
                   WHERE id = $1`;

    await this.pool.query(query, [id]);

    const deletedProduct = this.products.splice(productIndex, 1);

    return deletedProduct[0];
  }
}

module.exports = {ProductsService};
