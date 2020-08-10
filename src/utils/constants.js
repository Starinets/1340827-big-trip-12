const insertPosition = {
  BEFORE_BEGIN: `beforebegin`,
  AFTER_BEGIN: `afterbegin`,
  BEFORE_END: `beforeend`,
  AFTER_END: `afterend`
};

const PointTypeToImageName = {
  Taxi: `taxi`,
  Bus: `bus`,
  Train: `train`,
  Ship: `ship`,
  Transport: `transport`,
  Drive: `drive`,
  Flight: `flight`,
  Check: `check-in`,
  Sightseeing: `sightseeing`,
  Restaurant: `restaurant`,
};

const PointTypeToPretext = {
  Taxi: `to`,
  Bus: `to`,
  Train: `to`,
  Ship: `to`,
  Transport: `to`,
  Drive: `to`,
  Flight: `to`,
  Check: `in`,
  Sightseeing: `in`,
  Restaurant: `in`,
};

export {
  insertPosition,
  PointTypeToImageName,
  PointTypeToPretext
};
