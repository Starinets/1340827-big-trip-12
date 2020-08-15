import {createElement} from './../utils/dom';
import Point from './point';

const generatePoints = (container, points) =>
  points.forEach((point) => {
    container.append(new Point().getElement(point));
  });

const createPointListTemplate = () => {
  return `<ul class="trip-events__list"></ul>`;
};

export default class PointList {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return createPointListTemplate();
  }

  getElement(dayPoints) {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
    }

    generatePoints(this._element, dayPoints);

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
