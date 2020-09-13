import StatisticsView from './../view/statistics';
import {render, RenderPosition, remove} from './../utils/dom';
import {UpdateType} from './../constants';

export default class Statistics {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;

    this._component = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
  }

  init() {
    this._pointsModel.addObserver(this._handleModelEvent);

    this._component = new StatisticsView(this._pointsModel.get());
    render(this._container, this._component, RenderPosition.AFTER_END);
  }

  destroy() {
    remove(this._component);

    this._pointsModel.removeObserver(this._handleModelEvent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleTypeChange(filterType) {
    if (this._current === filterType) {
      return;
    }

    this._model.set(UpdateType.MINOR, filterType);
  }
}
