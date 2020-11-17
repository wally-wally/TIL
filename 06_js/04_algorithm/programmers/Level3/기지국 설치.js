function addStationCount(start, end, w) {
  const noSpreadLength = end - start + 1;
  const spreadRange = (w * 2) + 1;
  let stationCount = 0;
  while (stationCount * spreadRange < noSpreadLength) {
    stationCount += 1;
  }
  return stationCount;
}


function solution(n, stations, w) {
  let answer = 0;
  if (stations[0] - w - 1 >= 1) {
    answer += addStationCount(1, stations[0] - w - 1, w);
  }
  for (let i = 1; i < stations.length; i++) {
    answer += addStationCount(stations[i - 1] + w + 1, stations[i] - w - 1, w);
  }
  if (stations[stations.length - 1] + w + 1 <= n) {
    answer += addStationCount(stations[stations.length - 1] + w + 1, n, w);
  }
  return answer;
}

console.log(solution(11, [4, 11], 1));
console.log(solution(16, [9], 2));