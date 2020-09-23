import Abstract from './abstract';

const createPointMessageTemplate = (textContent) => {
  return (
    `<p class="trip-events__msg">${textContent}</p>`
  );
};

export default class PointMessage extends Abstract {
  constructor(textContent) {
    super();

    this._textContent = textContent;
  }

  _getTemplate() {
    return createPointMessageTemplate(this._textContent);
  }
}
