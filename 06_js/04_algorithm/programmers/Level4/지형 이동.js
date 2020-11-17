const direction = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // 상, 우, 하, 좌

function checkRegion(row, col, land, height, visited, regionNumber) {
  let queue = [[row, col]];
  while (queue.length) {
    const [popRow, popCol] = queue.shift();
    visited[popRow][popCol] = regionNumber;
    for (const dir of direction) {
      const newRow = popRow + dir[0];
      const newCol = popCol + dir[1];
      // 4방향 검사시 land 범위 안에 있는지 확인
      if (newRow >= 0 && newRow < land.length && newCol >= 0 && newCol < land.length) {
        if (visited[newRow][newCol] > 0) {
          continue;
        }
        // 다음 가려고 하는 칸이 height 이하인지
        if (Math.abs(land[newRow][newCol] - land[popRow][popCol]) <= height) {
          if (visited[newRow][newCol] === 0) {
            visited[newRow][newCol] = regionNumber;
            queue.push([newRow, newCol]);
          }
        }
      }
    }
  }
  return visited;
}

function solution(land, height) {
  // (1) 방문 체크 배열 생성(0인 경우 미방문, 1 이상은 해당 구역 번호)
  let visited = [];
  for (let n = 0; n < land.length; n++) {
    visited.push(Array(land.length).fill(0));
  }
  
  // (2) 지형 검사
  let regionNumber = 0;
  for (let i = 0; i < land.length; i++) {
    for (let j = 0; j < land.length; j++) {
      if (visited[i][j] === 0) {
        regionNumber += 1;
        visited = checkRegion(i, j, land, height, visited, regionNumber);
      }
    }
  }
  
  // (3) 구역과 구역 간 최소 사다리 건설 비용 값 계산
  let edgeMap = new Map();
  for (let i = 0; i < visited.length; i++) {
    for (let j = 0; j < visited.length; j++) {
      const nowRegion = visited[i][j];
      for (const dir of direction) {
        const newRow = i + dir[0];
        const newCol = j + dir[1];
        if (newRow >= 0 && newRow < land.length && newCol >= 0 && newCol < land.length) {
          const adjacentRegion = visited[newRow][newCol];
          if (nowRegion === adjacentRegion) {
            continue;
          }
          const maxNum = Math.max(nowRegion, adjacentRegion);
          const minNum = Math.min(nowRegion, adjacentRegion);
          const heightDiff = Math.abs(land[i][j] - land[newRow][newCol]);
          if (!edgeMap.has(`${minNum}-${maxNum}`)) {
            edgeMap.set(`${minNum}-${maxNum}`, heightDiff);
          } else {
            const existValue = edgeMap.get(`${minNum}-${maxNum}`);
            if (existValue > heightDiff) {
              edgeMap.delete(`${minNum}-${maxNum}`);
              edgeMap.set(`${minNum}-${maxNum}`, heightDiff);
            }
          }
        }
      }
    }
  }

  // (4) 사다리 건설 비용 적은 순으로 정렬 후 Kruskal 알고리즘으로 MST 구하기
  let edge = [...edgeMap.entries()].map(edge =>
    [...edge[0].split('-').map(v => Number(v)), edge[1]]
  ).sort((a, b) => a[2] - b[2]);
  
  // cycle이 생기는 것을 방지하기 위해 disjoint-set 사용
  let p = Array(regionNumber + 1).fill().map((v, i) => i);
  const findSet = x => {
    if (x !== p[x]) {
      p[x] = findSet(p[x]);
    }
    return p[x];
  }

  let MST = [];
  let cur = 0;
  while (MST.length < regionNumber - 1) {
    const [u, v, w] = edge[cur];
    const a = findSet(u);
    const b = findSet(v);
    if (a !== b) {
      p[b] = a;
      MST.push([u, v, w]);
    }
    cur += 1;
  }

  // (5) 구한 MST를 가지고 사다리 설치 비용의 최솟값 계산
  return MST.reduce((acc, curr) => acc += curr[2], 0);
}

console.log(solution([[1, 4, 8, 10], [5, 5, 5, 5], [10, 10, 10, 10], [10, 10, 10, 20]], 3));
console.log(solution([[10, 11, 10, 11], [2, 21, 20, 10], [1, 20, 21, 11], [2, 1, 2, 1]], 1));