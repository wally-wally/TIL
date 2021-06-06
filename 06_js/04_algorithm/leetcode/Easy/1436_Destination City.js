const destCity = (paths) => {
  const { startCities, reachCities } = paths.reduce((citiesInfo, [currentStartCity, currentReachCity]) => {
    const { startCities, reachCities } = citiesInfo;

    if (!startCities.has(currentStartCity)) {
      startCities.add(currentStartCity);
    }

    if (!startCities.has(currentReachCity)) {
      reachCities.add(currentReachCity);
    }

    return {
      startCities,
      reachCities,
    }
  }, {
    startCities: new Set(),
    reachCities: new Set(),
  });

  const [ exactlyDestinationCity ] = [...reachCities].filter((city) => !startCities.has(city));

  return exactlyDestinationCity;
}

console.log(destCity([['London', 'New York'], ['New York', 'Lima'], ['Lima', 'Sao Paulo']])); // 'Sao Paulo'
console.log(destCity([['B', 'C'], ['D', 'B'], ['C', 'A']])); // 'A'
console.log(destCity([['A', 'Z']])); // 'Z'