const {ENV} = require('../../config');
const {faker} = require('@faker-js/faker');

function removeDuplicates(list) {
  return [...new Set(list)];
}

function createArrayFromObject(length, mapFunc, allowDuplicates = false) {
  const newList = Array.from({length: length}, mapFunc)

  if (allowDuplicates) {
    return newList;
  }

  return removeDuplicates(newList);

}

const categories = createArrayFromObject(5, () => ({
  id: faker.database.mongodbObjectId(),
  name: faker.commerce.productAdjective(),
}))

const products = createArrayFromObject(20, () => ({
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
}))

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
  products,
  categories,
  users,
  roles,
  permissions,
}
