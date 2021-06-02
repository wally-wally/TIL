const largestAltitude = (gain) => {
  const altitudeInfo = gain.reduce(({ beforeHeight, highestAltitude }, currentGain) => {
    const nowHeight = beforeHeight + currentGain;

    return {
      beforeHeight: nowHeight,
      highestAltitude: nowHeight > highestAltitude ? nowHeight : highestAltitude,
    }
  }, {
    beforeHeight: 0,
    highestAltitude: 0,
  });

  return altitudeInfo.highestAltitude;
}

console.log(largestAltitude([-5, 1, 5, 0, -7])); // 1
console.log(largestAltitude([-4, -3, -2, -1, 4, 3, 2])); // 0