import Abstract from './abstract';

const createDaysTemplate = () => {
  return (
    `<ul class="trip-days"></ul>`
  );
};

export default class Days extends Abstract {
  _getTemplate() {
    return createDaysTemplate();
  }
}
