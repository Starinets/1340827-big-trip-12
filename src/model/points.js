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

  static adaptToClient(point) {
    const adaptedPoint = Object.assign(
        {},
        point,
        {
          price: point.base_price,
          startTime: new Date(point.date_from),
          endTime: new Date(point.date_to),
          destination: {
            name: point.destination.name,
            description: point.destination.description,
            photos: point.destination.pictures.map((picture) => ({
              href: picture.src,
              description: picture.description
            }))
          }
        }
    );

    delete adaptedPoint.base_price;
    delete adaptedPoint.date_from;
    delete adaptedPoint.date_to;
    delete adaptedPoint.destination.pictures;

    return adaptedPoint;
  }

  static adaptToServer(point) {
    const adaptedPoint = Object.assign(
        {},
        point,
        {
          'base_price': point.price,
          'date_from': point.startTime.toISOString(),
          'date_to': point.endTime.toISOString(),
          'destination': {
            'name': point.destination.name,
            'description': point.destination.description,
            'pictures': point.destination.photos.map((photo) => ({
              'src': photo.href,
              'destination': photo.destination
            }))
          }
        }
    );

    delete adaptedPoint.price;
    delete adaptedPoint.startTime;
    delete adaptedPoint.endTime;
    delete adaptedPoint.destination.photos;

    return adaptedPoint;
  }
}
