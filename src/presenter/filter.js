import FilterView from './../view/filters';
import {render, RenderPosition, replace, remove} from './../utils/dom';
import {UpdateType} from './../constants';

export default class Filter {
  constructor(container, model, pointsModel) {
    this._container = container;
    this._model = model;
    this._pointsModel = pointsModel;
    this._current = null;

    this._component = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleTypeChange = this._handleTypeChange.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
    this._model.addObserver(this._handleModelEvent);
  }

  init() {
    this._current = this._model.getFilter();

    const prevComponent = this._component;

    this._component = new FilterView(this._current);
    this._component.setFilterTypeChangeHandler(this._handleTypeChange);

    if (prevComponent === null) {
      render(this._container, this._component, RenderPosition.BEFORE_END);
      return;
    }

    replace(this._component, prevComponent);
    remove(prevComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleTypeChange(filterType) {
    if (this._current === filterType) {
      return;
    }

    this._model.setFilter(UpdateType.MINOR, filterType);
  }
}
