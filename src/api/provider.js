import {nanoid} from 'nanoid';
import PointsModel from '../model/points';

const getSyncedPoints = (items) => {
  return items.filter(({success}) => success)
    .map(({payload}) => payload.point);
};

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign(
        {},
        acc,
        {
          [current.id]: current,
        });
  }, {});
};

export default class Provider {
  constructor(http, store) {
    this._http = http;
    this._store = store;
  }

  getPoints() {
    if (Provider.isOnline()) {
      return this._http.getPoints()
        .then((points) => {
          const items = createStoreStructure(points.map(PointsModel.adaptToServer));
          this._store.setPoints(items);
          return points;
        });
    }

    const storePoints = Object.values(this._store.getPoints());

    return Promise.resolve(storePoints.map(PointsModel.adaptToClient));
  }

  getDestinations() {
    if (Provider.isOnline()) {
      return this._http.getDestinations()
         .then((destinations) => {
           this._store.setDestinations(destinations);
           return destinations;
         });
    }

    const storeDestinations = this._store.getDestinations();

    return Promise.resolve(storeDestinations);
  }

  getOffers() {
    if (Provider.isOnline()) {
      return this._http.getOffers()
         .then((offers) => {
           this._store.setOffers(offers);
           return offers;
         });
    }

    const storeOffers = Object.values(this._store.getOffers());

    return Promise.resolve(storeOffers);
  }

  updatePoint(point) {
    if (Provider.isOnline()) {
      return this._http.updatePoint(point)
        .then((updatedPoint) => {
          this._store.setPoint(updatedPoint.id, PointsModel.adaptToServer(updatedPoint));
          return updatedPoint;
        });
    }

    this._store.setPoint(
        point.id,
        PointsModel.adaptToServer(
            Object.assign(
                {},
                point
            )
        )
    );

    return Promise.resolve(point);
  }

  addPoint(point) {
    if (Provider.isOnline()) {
      return this._http.addPoint(point)
        .then((newPoint) => {
          this._store.setPoint(newPoint.id, PointsModel.adaptToServer(newPoint));
          return newPoint;
        });
    }

    const localNewPointId = nanoid();
    const localNewPoint = Object.assign(
        {},
        point,
        {
          id: localNewPointId
        }
    );

    this._store.setPoint(localNewPoint.id, PointsModel.adaptToServer(localNewPoint));

    return Promise.resolve(localNewPoint);
  }

  deletePoint(point) {
    if (Provider.isOnline()) {
      return this._http.deletePoint(point)
        .then(() => this._store.deletePoint(point.id));
    }

    this._store.deletePoint(point.id);

    return Promise.resolve();
  }

  sync() {
    if (Provider.isOnline()) {
      const storePoints = Object.values(this._store.getPoints());

      return this._http.sync(storePoints)
        .then((response) => {
          const createdPoints = getSyncedPoints(response.created);
          const updatedPoints = getSyncedPoints(response.updated);

          const points = createStoreStructure([...createdPoints, ...updatedPoints]);

          this._store.setPoints(points);
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }

  static isOnline() {
    return window.navigator.onLine;
  }
}
