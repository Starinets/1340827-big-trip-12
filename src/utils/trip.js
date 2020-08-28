const sortTime = (pointA, pointB) =>
  (pointB.endTime - pointB.startTime) - (pointA.endTime - pointA.startTime);

const sortPrice = (pointA, pointB) => pointB.price - pointA.price;

export {
  sortTime,
  sortPrice
};
