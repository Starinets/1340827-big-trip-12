const ActionKey = {
  POINTS: `points`,
  OFFERS: `offers`,
  DESTINATIONS: `destinations`,
};

export default class Store {
  constructor(key, storage) {
    this._storage = storage;
    this._key = key;
  }

  getPoints() {
    return this._getItems()[ActionKey.POINTS];
  }

  getDestinations() {
    return this._getItems()[ActionKey.DESTINATIONS];
  }

  getOffers() {
    return this._getItems()[ActionKey.OFFERS];
  }

  setPoint(id, point) {
    const storedPoints = this.getPoints();

    this.setPoints(
        Object.assign(
            {},
            storedPoints,
            {
              [id]: point,
            }
        )
    );
  }

  setPoints(points) {
    this._setItem(ActionKey.POINTS, points);
  }

  setOffers(offers) {
    this._setItem(ActionKey.OFFERS, offers);
  }

  setDestinations(destinations) {
    this._setItem(ActionKey.DESTINATIONS, destinations);
  }

  deletePoint(id) {
    const storedPoints = this.getPoints();
    delete storedPoints[id];
    this.setPoints(storedPoints);
  }

  _getItems() {
    try {
      return JSON.parse(
          this._storage.getItem(this._key)
      ) || {};
    } catch (error) {
      return {};
    }
  }

  _setItem(key, value) {
    const store = this._getItems();

    this._storage.setItem(
        this._key,
        JSON.stringify(
            Object.assign(
                {},
                store,
                {
                  [key]: value,
                }
            )
        )
    );
  }
}
