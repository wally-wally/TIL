const numWaterBottles = (numBottles: number, numExchange: number): number => {
  let drankBottleCount = numBottles;

  while (numBottles >= numExchange) {
    const addCount = (numBottles / numExchange >> 0);
    drankBottleCount += addCount;
    numBottles = addCount + (numBottles % numExchange);
  }

  return drankBottleCount;
};

console.log(numWaterBottles(9, 3)); // 13
console.log(numWaterBottles(15, 4)); // 19
console.log(numWaterBottles(5, 5)); // 6
console.log(numWaterBottles(2, 3)); // 2