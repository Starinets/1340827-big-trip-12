import {
  render,
  RenderPosition
} from './utils/dom';
import {MenuItem, UpdateType} from './constants';
import PointsModel from './model/points';
import FilterModel from './model/filter';
import TripInfoView from './view/trip-info';
import MenuView from './view/menu';
import AddPointButtonView from './view/add-point-button';
import TripPresenter from './presenter/trip';
import FilterPresenter from './presenter/filter';
import StatisticsPresenter from './presenter/statistics';
import InfoPresenter from './presenter/info';
import Http from './api/http';
import Store from './api/store';
import Provider from './api/provider';

const AUTHORIZATION = `Basic hS3sd3dfd2cl7sa2j`;
const END_POINT = `https://12.ecmascript.pages.academy/big-trip`;
const STORE_PREFIX = `big-trip-localstorage`;
const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const infoPlace = document.querySelector(`.trip-main`);
const menuPlace = infoPlace.querySelector(`.js-menu`);
const filtersPlace = infoPlace.querySelector(`.trip-controls`);

const contentPlace = document.querySelector(`.trip-events`);

const handleMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_POINT:
      statisticsPresenter.destroy();
      tripPresenter.destroy();
      tripPresenter.init();
      tripPresenter.createPoint();
      menuView.reset();
      addPointButtonView.setDisabled();
      break;
    case MenuItem.TABLE:
      statisticsPresenter.destroy();
      tripPresenter.destroy();
      tripPresenter.init();
      break;
    case MenuItem.STATISTICS:
      statisticsPresenter.destroy();
      tripPresenter.destroy();
      statisticsPresenter.init();
      break;
  }
};

const setMenuHandlers = () => {
  menuView.setClickHandler(handleMenuClick);
  addPointButtonView.setClickHandler(handleMenuClick);
};

const http = new Http(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(http, store);
const pointsModel = new PointsModel();
const filterModel = new FilterModel();

const infoView = new TripInfoView().getElement();
const addPointButtonView = new AddPointButtonView();

render(infoPlace, infoView, RenderPosition.AFTER_BEGIN);
render(infoPlace, addPointButtonView, RenderPosition.BEFORE_END);

const menuView = new MenuView();
render(menuPlace, menuView, RenderPosition.AFTER_END);

const tripPresenter = new TripPresenter(contentPlace, pointsModel, filterModel, apiWithProvider, addPointButtonView);
const filterPresenter = new FilterPresenter(filtersPlace, filterModel, pointsModel);
const statisticsPresenter = new StatisticsPresenter(contentPlace, pointsModel);
const infoPresenter = new InfoPresenter(infoView, pointsModel);

filterPresenter.init();
tripPresenter.init();

Promise.all([
  apiWithProvider.getPoints(),
  apiWithProvider.getDestinations(),
  apiWithProvider.getOffers()
])
  .then(([points, destinations, offers]) => {
    tripPresenter.setOptions(destinations, offers);
    pointsModel.set(UpdateType.INIT, points);

    infoPresenter.init();

    setMenuHandlers();
  })
  .catch(() => {
    tripPresenter.setOptions([], []);
    pointsModel.set(UpdateType.INIT, []);

    setMenuHandlers();
  });

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`);
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
  apiWithProvider.syncRequired = true;
});
