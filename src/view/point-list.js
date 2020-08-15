import {
  render,
  createElement,
  RenderPosition
} from './../utils/dom';
import Point from './point';
import PointForm from './point-form';

const generatePoints = (container, points) =>
  points.forEach((point) => {
    const pointForRender = new Point().getElement(point);
    const formForRender = new PointForm().getElement(point);

    const replacePointToForm = () => {
      container.replaceChild(formForRender, pointForRender);
    };

    const replaceFormToPoint = () => {
      container.replaceChild(pointForRender, formForRender);
    };

    pointForRender.querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
      replacePointToForm();
    });

    formForRender.querySelector(`form`).addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
    });

    render(container, pointForRender, RenderPosition.BEFORE_END);
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

      generatePoints(this._element, dayPoints);
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
