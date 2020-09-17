const EMPTY_POINTS_LIST_MESSAGE = `Click New Event to create your first point`;
const LOADING_MESSAGE = `Loading...`;
const UNGROUPED_LIST = 0;

const PointKind = {
  TRANSFER: `transfer`,
  ACTIVITY: `activity`,
};

const PointType = {
  TAXI: `taxi`,
  BUS: `bus`,
  TRAIN: `train`,
  SHIP: `ship`,
  TRANSPORT: `transport`,
  DRIVE: `drive`,
  FLIGHT: `flight`,
  CHECK_IN: `check-in`,
  SIGHTSEEING: `sightseeing`,
  RESTAURANT: `restaurant`,
};

const pointKindToTypeMap = {
  [PointKind.TRANSFER]: [
    PointType.TAXI,
    PointType.BUS,
    PointType.TRAIN,
    PointType.SHIP,
    PointType.TRANSPORT,
    PointType.DRIVE,
    PointType.FLIGHT,
  ],
  [PointKind.ACTIVITY]: [
    PointType.CHECK_IN,
    PointType.SIGHTSEEING,
    PointType.RESTAURANT,
  ],
};

const pointTypeToPretext = {
  [PointType.TAXI]: `Taxi to`,
  [PointType.BUS]: `Bus to`,
  [PointType.TRAIN]: `Train to`,
  [PointType.SHIP]: `Ship to`,
  [PointType.TRANSPORT]: `Transport to`,
  [PointType.DRIVE]: `Drive to`,
  [PointType.FLIGHT]: `Flight to`,
  [PointType.CHECK_IN]: `Check in`,
  [PointType.SIGHTSEEING]: `Sightseeing in`,
  [PointType.RESTAURANT]: `Restaurant in`,
};

const OfferList = {
  'luggage': {
    text: `Add luggage`,
    price: 30,
  },
  'comfort': {
    text: `Switch to comfort class`,
    price: 100,
  },
  'meal': {
    text: `Add meal`,
    price: 15,
  },
  'seats': {
    text: `Choose seats`,
    price: 5,
  },
  'train': {
    text: `Travel by train`,
    price: 40,
  }
};

const SortType = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`
};

const UserAction = {
  UPDATE_POINT: `UPDATE_POINT`,
  ADD_POINT: `ADD_POINT`,
  DELETE_POINT: `DELETE_POINT`
};

const UpdateType = {
  PATCH: `PATCH`,
  FILTER: `FILTER`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  INIT: `INIT`
};

const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

const MenuItem = {
  ADD_NEW_POINT: `ADD_NEW_POINT`,
  TABLE: `TABLE`,
  STATISTICS: `STATISTICS`
};

export {
  PointKind,
  PointType,
  pointKindToTypeMap,
  EMPTY_POINTS_LIST_MESSAGE,
  LOADING_MESSAGE,
  UNGROUPED_LIST,
  pointTypeToPretext,
  OfferList,
  SortType,
  UserAction,
  UpdateType,
  FilterType,
  MenuItem
};
