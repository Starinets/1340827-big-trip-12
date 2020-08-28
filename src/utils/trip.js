const sortPointByTime = (pointA, pointB) =>
  (pointB.endTime - pointB.startTime) - (pointA.endTime - pointA.startTime);

const sortPointByPrice = (pointA, pointB) => pointB.price - pointA.price;

export {
  sortPointByTime,
  sortPointByPrice
};
