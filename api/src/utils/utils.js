function handlePagination({limit, offset = 0, itemList}) {

  const parseLimit = parseInt(limit)

  if (!parseLimit && !offset) {
    return [
      ...itemList
    ]
  }

  let result = [];
  let count = 0;
  for (let i = parseInt(offset); i < itemList.length; i++) {

    if (count >= parseLimit) {
      break;
    }
    result.push(itemList[i]);
    count++;
  }

  return result;
}

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

module.exports = {
  handlePagination,
  createArrayFromObject,
  removeDuplicates,
}
