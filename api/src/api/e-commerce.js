const {createArrayFromObject} = require("../utils/utils");
const {ProductModel} = require("../models/product.models.js");
const {faker} = require("@faker-js/faker");
const {ENV} = require("../../../config");
const {CategoryModel} = require("../models/category.models");

function generateProducts({limit = 5, categories = []}) {

  return createArrayFromObject(limit, () => (new ProductModel({
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

function generateCategories({limit = 5}) {
  return createArrayFromObject(limit, () => (new CategoryModel({
    id: faker.database.mongodbObjectId(),
    name: faker.commerce.productAdjective(),
  })))
}

const categories = generateCategories({limit: 5});

const products = generateProducts({limit: 20, categories: categories});


const users = [
  {
    id: '1',
    username: 'fabroche',
    role: 'user',
  },
  {
    id: '2',
    username: 'admin',
    role: 'admin',
  },
  {
    id: '3',
    username: 'moderator',
    role: 'moderator',
  }
]

const roles = [
  {
    id: '1',
    name: 'admin',
    permissions: ['5'],
  },
  {
    id: '2',
    name: 'user',
    permissions: ['1'],
  },
  {
    id: '3',
    name: 'moderator',
    permissions: ['1', '2', '3', '4'],
  }
]

const permissions = [
  {
    id: '1',
    name: 'read',
  },
  {
    id: '2',
    name: 'write',
  },
  {
    id: '3',
    name: 'edit',
  },
  {
    id: '4',
    name: 'remove',
  },
  {
    id: '5',
    name: 'all',
  }
]

module.exports = {
  users,
  roles,
  permissions,
  categories,
  products,
}
