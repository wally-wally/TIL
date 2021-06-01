const distanceBetweenBusStops = (distance: number[], start: number, destination: number): number => {
  const calcSumDistance = (distance: number[]) => {
    return distance.reduce((acc: number, curr: number) => acc += curr, 0);
  }

  const minBusStopIdx = Math.min(start, destination);
  const maxBusStopIdx = Math.max(start, destination);
  
  // start => destination 으로 가는 경로 두 가지
  const subBusStops1 = distance.slice(minBusStopIdx, maxBusStopIdx);
  const sumSubStopsDistance1 = calcSumDistance(subBusStops1);

  const subBusStops2 = [...distance.slice(0, minBusStopIdx), ...distance.slice(maxBusStopIdx)];
  const sumSubStopsDistance2 = calcSumDistance(subBusStops2);

  return Math.min(sumSubStopsDistance1, sumSubStopsDistance2);
};