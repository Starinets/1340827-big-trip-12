import {createElement} from './../utils/dom';
import Point from './point';

const generatePoints = (container, points) =>
  points.forEach((point) => {
    container.append(new Point().getElement(point));
  });

const createPointListTemplate = () => {
  return `<ul class="trip-events__list"></ul>`;
  // ${generatePointsTemplates(points)}
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
    // this._element.append(new PointList().getElement(dayPoints));
    // ${generatePointsTemplates(points)}

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export {createPointListTemplate};
