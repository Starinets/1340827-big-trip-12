import {createElement} from './../utils/dom';
import {createPointTemplate} from './point.js';

const generatePointsTemplates = (points) => points
  .map(createPointTemplate)
  .join(``);

const createPointListTemplate = (points) => {
  return `<ul class="trip-events__list">
    ${generatePointsTemplates(points)}
  </ul>`;
};

export default class PointList {
  constructor() {
    this._element = null;
  }

  _getTemplate(dayPoints) {
    return createPointListTemplate(dayPoints);
  }

  getElement(dayPoints) {
    if (!this._element) {
      this._element = createElement(this._getTemplate(dayPoints));
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export {createPointListTemplate};
