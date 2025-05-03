/**
 * Generates a key map from an object.
 *
 * @param {Object} obj - The object to map.
 * @return {Object} A key map of the object.
 *
 * @example
 * const obj = {id: 1, name: 'test'};
 * const keyMap = generateKeyMap(obj);
 * // keyMap is {id: 'id', name: 'name'}
 */
function generateKeyMap(obj) {
  return Object.keys(obj).reduce((map, key) => {
    map[key] = key;
    return map;
  }, {});
}

/**
 * Sets pagination options based on the query parameters.
 *
 * @param {Object} query - The query object containing pagination parameters.
 * @param {number} query.limit - The maximum number of items to return.
 * @param {number} query.offset - The number of items to skip before starting to collect the result set.
 * @param {Object} options - The options object to modify with pagination settings.
 */
function setPagination(query, options) {
  const {limit, offset} = query;

  if (limit && offset) {
    options.limit = limit;
    options.offset = offset;
  }
}

/**
 * Setea los filtros de una consulta segun los atributos de un schema
 * y los valores de una query.
 *
 * @param {Object} attrSchema - Schema de los atributos a filtrar.
 * @param {Object} query - Valores de la query.
 * @param {Object} options - Opciones de la consulta.
 */
function setFilters(attrSchema, query, options) {

  Object.values(attrSchema).map((filter) => {
    if (filter === attrSchema.limit || filter === attrSchema.offset) {
      return;
    }

    if (query[filter]) {
      options.where[filter] = query[filter];
    }
  })
}

module.exports = {
  generateKeyMap,
  setPagination,
  setFilters
}
