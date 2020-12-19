function solution(bridgeLength, weight, truckWeights) {
  let answer = 0;
  let bridgeStatus = Array(bridgeLength).fill().map(_ => 0);
  
  const calcSum = arr => arr.reduce((acc, curr) => acc += curr, 0);
  
  while (bridgeStatus.length > 0) {
    answer += 1;
    bridgeStatus.shift();
    if (truckWeights.length > 0) {
      if (truckWeights[0] + calcSum(bridgeStatus) <= weight) {
        bridgeStatus.push(truckWeights.shift());
      } else {
        bridgeStatus.push(0);
      }
    }
  }
  
  return answer;
}

console.log(solution(2, 10, [7, 4, 5, 6])); // 8w
console.log(solution(100, 100, [10])); // 101
console.log(solution(100, 100, [10, 10, 10, 10, 10, 10, 10, 10, 10, 10])); // 110