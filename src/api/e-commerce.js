export const products = [
  {
    id: '1',
    name: 'Producto1',
    price: 4.99,
    currency: 'EUR',
    categories: ['1']
  },
  {
    id: '2',
    name: 'Producto2',
    price: 12.99,
    currency: 'EUR',
    categories: ['2']
  },
  {
    id: '3',
    name: 'Producto3',
    price: 58.79,
    currency: 'EUR',
    categories: ['1', '3']
  }
]

export const categories = [
  {
    id: '1',
    name: 'Comida',
  },
  {
    id: '2',
    name: 'Ropa',
  },
  {
    id: '3',
    name: 'Electrodomesticos',
  }
]

export const users = [
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

export const roles = [
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
    permissions: ['1','2','3','4'],
  }
]

export const permissions = [
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
