const setFirstCharToUpperCase = (str) => str[0].toUpperCase() + str.slice(1);

const adaptDestinationsToClient = (pointDestinations) =>
  pointDestinations.map((pointDestination) => ({
    name: pointDestination.name,
    description: pointDestination.description,
    photos: pointDestination.pictures.map((picture) => ({
      href: picture.src,
      description: picture.description,
    }))
  }));


export {
  setFirstCharToUpperCase,
  adaptDestinationsToClient
};
