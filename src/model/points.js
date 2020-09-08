import Observer from "./../utils/observer";

export default class Points extends Observer {
  constructor() {
    super();

    this._specifics = [];
  }

  set(points) {
    this._specifics = points.slice();
  }

  get() {
    return this._specifics;
  }

  update(updateType, update) {
    const index = this._specifics.findIndex((specific) => specific.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting point`);
    }

    this._specifics = [
      ...this._specifics.slice(0, index),
      update,
      ...this._specifics.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  add(updateType, update) {
    this._specifics = [
      update,
      ...this._specifics
    ];

    this._notify(updateType, update);
  }

  delete(updateType, update) {
    const index = this._specifics.findIndex((specific) => specific.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting task`);
    }

    this._specifics = [
      ...this._specifics.slice(0, index),
      ...this._specifics.slice(index + 1)
    ];

    this._notify(updateType);
  }
}
