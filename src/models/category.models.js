class CategoryModel {
  constructor(id, name) {
    this._id = id;
    this._name = name;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  set id(value) {
    this._id = value;
  }

  set name(value) {
    this._name = value;
  }

  isValid() {
    return (
      typeof this._id === 'string' &&
      typeof this._name === 'string'
    );
  }
}
