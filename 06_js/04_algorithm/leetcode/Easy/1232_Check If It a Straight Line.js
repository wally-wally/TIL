const checkStraightLine = (coordinates) => {
  const sortedCoordinates = coordinates.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);

  const calcGradient = (point1, point2) => Math.abs(point2[1] - point1[1]) / Math.abs(point2[0] - point1[0]);

  const criteriaGradient = calcGradient(sortedCoordinates[0], sortedCoordinates[1]);

  for (let i = 1; i < sortedCoordinates.length - 1; i++) {
    if (calcGradient(sortedCoordinates[i], sortedCoordinates[i + 1]) !== criteriaGradient) {
      return false;
    }
  }

  return true;
};

console.log(checkStraightLine([[1,2],[2,3],[3,4],[4,5],[5,6],[6,7]])); // true
console.log(checkStraightLine([[1,1],[2,2],[3,4],[4,5],[5,6],[7,7]])); // false