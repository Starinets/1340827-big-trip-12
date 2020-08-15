import {
  render,
  createElement,
  RenderPosition
} from './../utils/dom';
import Point from './point';

const generatePoints = (container, points) =>
  points.forEach((point) => {
    render(container, new Point().getElement(point), RenderPosition.BEFORE_END);
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
