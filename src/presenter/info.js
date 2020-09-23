import {render, RenderPosition, replace, remove} from './../utils/dom';
import {
  formatMonthDate,
  addLeadingRank
} from './../utils/date';
import MainInfoView from './../view/main-info';
import TripCostView from './../view/trip-cost';

const getTripCost = (points) => points.reduce((pointsPrice, point) =>
  pointsPrice + point.price + point.offers.reduce((offersPrice, offer) =>
    offersPrice + offer.price, 0), 0);

const getTripPath = (points) => {
  switch (points.length) {
    case 0:
      return ``;
    case 1:
      return `${points[0].destination.name}`;
    case 2:
      return `${points[0].destination.name} &mdash; ${points[points.length - 1].destination.name}`;
    case 3:
      return `${points[0].destination.name} &mdash; ${points[1].destination.name} &mdash; ${points[points.length - 1].destination.name}`;
    default:
      return `${points[0].destination.name} &mdash; ... &mdash; ${points[points.length - 1].destination.name}`;
  }
};

const getTripDuration = (points) => {
  const startTime = points[0].startTime;
  const endTime = points[points.length - 1].endTime;

  if (startTime.getMonth() !== endTime.getMonth()) {
    return `${formatMonthDate(startTime)}&nbsp;&mdash;&nbsp;${formatMonthDate(endTime)}`;
  }

  if (startTime.getDay() !== endTime.getDay()) {
    return `${formatMonthDate(startTime)}&nbsp;&mdash;&nbsp;${addLeadingRank(endTime.getDate())}`;
  }

  return formatMonthDate(startTime);
};

export default class Info {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;

    this._mainInfoComponent = null;
    this._tripCostComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._pointsModel.addObserver(this._handleModelEvent);
  }

  init() {
    const points = this._pointsModel.get().slice().sort((less, more) => less.startTime - more.startTime);

    const tripPath = getTripPath(points);
    const tripDuration = getTripDuration(points);
    const tripCost = getTripCost(points);

    const previewMainInfoComponent = this._mainInfoComponent;
    const previewTripCostComponent = this._tripCostComponent;

    this._mainInfoComponent = new MainInfoView(tripPath, tripDuration);
    this._tripCostComponent = new TripCostView(tripCost);

    if (previewMainInfoComponent === null) {
      render(this._container, this._mainInfoComponent, RenderPosition.BEFORE_END);
      render(this._container, this._tripCostComponent, RenderPosition.BEFORE_END);

      return;
    }

    replace(this._mainInfoComponent, previewMainInfoComponent);
    replace(this._tripCostComponent, previewTripCostComponent);

    remove(previewMainInfoComponent);
    remove(previewTripCostComponent);
  }

  _handleModelEvent() {
    this.init();
  }
}
