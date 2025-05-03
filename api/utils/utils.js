//genera un map de las key de un objeto
// ejemplodado un objeto {id: 1, name: test} devolvera {id: 'id', name: 'name'}

function generateKeyMap(obj) {
  return Object.keys(obj).reduce((map, key) => {
    map[key] = key;
    return map;
  }, {});
}

function setPagination(query, options) {
  const {limit, offset} = query;

  if (limit && offset) {
    options.limit = limit;
    options.offset = offset;
  }
}

module.exports = {
  generateKeyMap,
  setPagination
}
