const EMPTY_POINTS_LIST_MESSAGE = `Click New Event to create your first point`;
const UNGROUPED_LIST = 0;

const pointTypeToPretext = {
  'taxi': `Taxi to`,
  'bus': `Bus to`,
  'train': `Train to`,
  'ship': `Ship to`,
  'transport': `Transport to`,
  'drive': `Drive to`,
  'flight': `Flight to`,
  'check-in': `Check in`,
  'sightseeing': `Sightseeing in`,
  'restaurant': `Restaurant in`,
};

const GROUP_ACTIVITY_TYPES = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`];
const GROUP_TRANSFER_TYPES = [`check-in`, `sightseeing`, `restaurant`];
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
  MINOR: `MINOR`,
  MAJOR: `MAJOR`
};

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

export {
  EMPTY_POINTS_LIST_MESSAGE,
  UNGROUPED_LIST,
  pointTypeToPretext,
  GROUP_ACTIVITY_TYPES,
  GROUP_TRANSFER_TYPES,
  OfferList,
  SortType,
  UserAction,
  UpdateType
};
