// 회전할 때 사용되는 direction 값(위에서부터 시계 방향으로 회전)
const rotateDirections = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]];

// 방향 유지한채 이동할 때 사용되는 direction 값
const moveDirections = rotateDirections.filter((v, i) => i % 2 === 0); // 상, 우, 하, 좌

function solution(board) {
  let answer = 0;
  let boardSize = board.length;
  
  // (1) 방문 체크 배열 생성
  let visited = [];
  for (let i = 0; i < boardSize; i++) {
    let visitedLine = [];
    for (let j = 0; j < boardSize; j++) {
      visitedLine.push([false, false]); // [가로 방향, 세로 방향]
    }
    visited.push(visitedLine);
  }

  // [util-01] (N, N) 위치에 도착했는지 확인
  const checkFinishPoint = (r, c) => r === boardSize - 1 && c === boardSize - 1;

  // [util-02] 해당 인덱스 값이 지도 범위 안에 있는지 확인
  const checkInsideMap = (r, c) => r >= 0 && r < boardSize && c >= 0 && c < boardSize;

  // [util-03] 검사하는 칸으로 갈 수 있는지 확인(=== 벽이 아닌 칸인지 확인)
  const checkWall = (r, c) => board[r][c] === 1;

  // [util-04] 방향 유지한채 이동할 수 있는지 확인
  const checkMaintainDirectionMove = (newRow, newCol, dir, adjacentVariation, time) => {
    const {adjRow, adjCol} = adjacentVariation;
    if (checkInsideMap(newRow + adjRow, newCol + adjCol) && !checkWall(newRow + adjRow, newCol + adjCol)) {
      if (!visited[newRow][newCol][dir]) {
        queue.push([newRow, newCol, dir, time + 1]);
        visited[newRow][newCol][dir] = true;
      }
    }
  }

  // [util-05] 회전할 수 있는지 확인
  const checkRotate = (r, c, dirIdx, changeRobotDir, time) => {
    for (const dir of dirIdx) {
      const newRow = r + rotateDirections[dir][0];
      const newCol = c + rotateDirections[dir][1];
      if (!checkInsideMap(newRow, newCol)) { // 우선 지도 범위 안에 있는지 확인
        return
      }
      if (checkWall(newRow, newCol)) { // 가려는 칸이 벽인지 아닌지 확인
        return
      }
    }
    let checkRow = r;
    let checkCol = c;
    if (dirIdx[1] === 0 || dirIdx[1] === 6) {
      checkRow += rotateDirections[dirIdx[1]][0];
      checkCol += rotateDirections[dirIdx[1]][1];
    }
    if (!visited[checkRow][checkCol][changeRobotDir]) {
      queue.push([checkRow, checkCol, changeRobotDir, time + 1]);
      visited[checkRow][checkCol][changeRobotDir] = true;
    }
  }
  
  // (2) BFS로 지도 상에서 로봇이 갈 수 있는 경로 탐색
  let queue = [[0, 0, 0, 0]]; // [가로 방향 인덱스, 세로 방향 인덱스, 로봇 방향(0-가로, 1-세로), 소요 시간]
  visited[0][0][0] = true; // 로봇 초기 상태
  while (queue.length > 0) {
    const [row, col, dir, time] = queue.shift();
    // (2-1) 도착한 경우 종료
    if ((dir === 0 && checkFinishPoint(row, col + 1)) || (dir === 1 && checkFinishPoint(row + 1, col))) {
      return time;
    }

    // (2-2) 방향 유지한채 이동할 수 있는지 확인
    for (const moveDir of moveDirections) {
      const newRow = row + moveDir[0];
      const newCol = col + moveDir[1];
      if (checkInsideMap(newRow, newCol) && !checkWall(newRow, newCol)) { // 새로 바뀐 기준 포인트만 우선 검사
        // 인접한 포인트에 대해서도 검사
        const adjacentVariation = dir === 0 ? {'adjRow': 0, 'adjCol': 1} : {'adjRow': 1, 'adjCol': 0};
        checkMaintainDirectionMove(newRow, newCol, dir, adjacentVariation, time);
      }
    }

    // (2-3) 각 포인트를 기준으로 회전할 수 있는지 확인
    if (dir === 0) {
      // 왼쪽 포인트 기준 (1, 0 / 3, 4)
      checkRotate(row, col, [1, 0], 1, time);
      checkRotate(row, col, [3, 4], 1, time);
      // 오른쪽 포인트 기준 (7, 0 / 5, 4)
      checkRotate(row, col + 1, [7, 0], 1, time);
      checkRotate(row, col + 1, [5, 4], 1, time);
    } else {
      // 위 포인트 기준 (5, 6 / 3, 2)
      checkRotate(row, col, [5, 6], 0, time);
      checkRotate(row, col, [3, 2], 0, time);
      // 아래 포인트 기준 (7, 6 / 1, 2)
      checkRotate(row + 1, col, [7, 6], 0, time);
      checkRotate(row + 1, col, [1, 2], 0, time);
    }
  }
  return answer;
}

console.log(solution([ // 7
  [0, 0, 0, 1, 1],
  [0, 0, 0, 1, 0],
  [0, 1, 0, 1, 1],
  [1, 1, 0, 0, 1],
  [0, 0, 0, 0, 0]
]))
console.log(solution([ // 5
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0]
]))
console.log(solution([ // 10
  [0, 0, 0, 0, 1, 0],
  [0, 0, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 1, 0],
  [0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0]
]))
console.log(solution([ // 11
  [0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 1, 0],
  [0, 0, 1, 0, 0, 0, 0]
]))
console.log(solution([ // 33
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 0]
]))