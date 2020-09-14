import {FilterType} from './../constants';
import Abstract from './abstract';

const createFiltersTemplate = (filterType, filters) => {
  return (
    `<form class="trip-filters" action="#" method="get">
      <div class="trip-filters__filter">
        <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${FilterType.EVERYTHING}" ${filterType === FilterType.EVERYTHING ? `checked` : ``} ${filters[FilterType.EVERYTHING] > 0 ? `` : `disabled`}>
        <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
      </div>

      <div class="trip-filters__filter">
        <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${FilterType.FUTURE}" ${filterType === FilterType.FUTURE ? `checked` : ``} ${filters[FilterType.FUTURE] > 0 ? `` : `disabled`}>
        <label class="trip-filters__filter-label" for="filter-future">Future</label>
      </div>

      <div class="trip-filters__filter">
        <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${FilterType.PAST}" ${filterType === FilterType.PAST ? `checked` : ``} ${filters[FilterType.PAST] > 0 ? `` : `disabled`}>
        <label class="trip-filters__filter-label" for="filter-past">Past</label>
      </div>

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class Filters extends Abstract {
  constructor(currentType, filters) {
    super();
    this._currentType = currentType;
    this._filters = filters;

    this._typeChangeHandler = this._typeChangeHandler.bind(this);
  }

  _getTemplate() {
    return createFiltersTemplate(this._currentType, this._filters);
  }

  setTypeChangeHandler(callback) {
    this._callback.typeChange = callback;
    this.getElement().addEventListener(`change`, this._typeChangeHandler);
  }

  _typeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.typeChange(evt.target.value);
  }
}
