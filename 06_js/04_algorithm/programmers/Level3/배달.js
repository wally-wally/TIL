function makeRoadInfo(a, b, time, roadInfo) {
  if (!roadInfo.hasOwnProperty(a)) {
    roadInfo[a] = [[b, time]];
  } else {
    const existInfoIndex = roadInfo[a].findIndex(info => info[0] === b);
    if (existInfoIndex === -1) {
      roadInfo[a].push([b, time]);
      return roadInfo;
    }
    if (roadInfo[a][existInfoIndex][1] > time) {
      roadInfo[a][existInfoIndex][1] = time;
    }
  }
  return roadInfo;
}

function solution(N, road, K) {
  // (1) 도로 정보 테이블 만들기
  let roadInfo = {};
  for (const r of road) {
    const [ start, finish, time ] = r;
    roadInfo = makeRoadInfo(start, finish, time, roadInfo);
    roadInfo = makeRoadInfo(finish, start, time, roadInfo);
  }
  
  // (2) 각 마을까지 가는데 걸리는 최소 시간을 저장할 빈 배열과 방문했는지 체크할 빈 배열 만들기
  let minTime = [];
  let visited = [];
  for (let i = 0; i <= N; i++) {
    minTime.push(Infinity);
    visited.push(false);
  }
  minTime[1] = 0;

  // (3) 각 마을까지 가는데 걸리는 최소 시간 구하기(다익스트라 알고리즘)
  let cnt = N;
  while (cnt > 0) {
    let u = 0;
    let minValue = Infinity;
    for (let i = 1; i <= N; i++) {
      if (!visited[i] && minValue > minTime[i]) {
        u = i;
        minValue = minTime[i];
      }
    }
    visited[u] = true;
    for (const info of roadInfo[u]) {
      const [v, w] = info;
      if (minTime[v] > minTime[u] + w) {
        minTime[v] = minTime[u] + w;
      }
    }
    cnt -= 1;
  }
  return minTime.slice(1).filter(time => time <= K).length;
}

console.log(solution(5, [
  [1, 2, 1],
  [2, 3, 3],
  [5, 2, 2],
  [1, 4, 2],
  [5, 3, 1],
  [5, 4, 2]
], 3));
console.log(solution(6, [
  [1, 2, 1],
  [1, 3, 2],
  [2, 3, 2],
  [3, 4, 3],
  [3, 5, 2],
  [3, 5, 3],
  [5, 6, 1]
], 4));