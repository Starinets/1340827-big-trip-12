import Observer from './../utils/observer';
import {FilterType} from './../constants';

export default class Filter extends Observer {
  constructor() {
    super();
    this._current = FilterType.EVERYTHING;
  }

  setFilter(updateType, filter) {
    this._current = filter;
    this._notify(updateType, filter);
  }

  getFilter() {
    return this._current;
  }
}
