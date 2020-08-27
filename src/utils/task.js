const sortEvent = (pointA, pointB) => {
  if (pointA.type > pointB.type) {
    return 1;
  }

  if (pointA.type < pointB.type) {
    return -1;
  }

  return 0;
};

const sortTime = (pointA, pointB) => {
  return pointA.StartDate - pointB.startDate;
};

const sortPrice = (pointA, pointB) => {
  return pointA.price - pointB.price;
};

export {
  sortEvent,
  sortTime,
  sortPrice
};
