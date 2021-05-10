const kClosest = (points, k) => {
  const calcDistance = ([x, y]) => Math.sqrt(x ** 2 + y ** 2);
  
  return points.sort((a, b) => calcDistance(a) - calcDistance(b)).slice(0, k);
};

console.log(kClosest([[1, 3],[-2, 2]], 1)); // [[-2, 2]]
console.log(kClosest([[3, 3],[5, -1],[-2, 4]], 2)); // [[3, 3],[-2, 4]]