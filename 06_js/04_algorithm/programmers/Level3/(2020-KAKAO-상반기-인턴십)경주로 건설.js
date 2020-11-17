function solution(board) {
  let answer = Infinity;
  const direction = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  // 처음 칸 기준으로 오른쪽, 아래 방향으로 갈 수 있는지 확인 후 미리 queue 배열에 추가
  let queue = []; // [x좌표, y좌표, 방향, 현재 비용]
  board[0][0] = 1;
  direction.slice(0, 2).forEach((dir, index) => {
    if (board[dir[0]][dir[1]] === 0) {
      queue.push({ newX: dir[0], newY: dir[1], index, newCost: 100 });
      board[dir[0]][dir[1]] = 100;
    }
  });
  while (queue.length) {
    const popElem = queue.shift();
    if (popElem.newX === board.length - 1 && popElem.newY === board.length - 1) {
      answer = Math.min(popElem.newCost, answer);
      continue;
    }
    for (let index = 0; index < 4; index++) {
      const newX = popElem.newX + direction[index][0];
      const newY = popElem.newY + direction[index][1];
      // 경주로 범위 안에 들어오는지 확인
      if (newX >= 0 && newX < board.length && newY >= 0 && newY < board.length) {
        // 가려고 하는 칸이 벽이 아니여야 함
        if (board[newX][newY] !== 1) {
          const newCost = popElem.newCost + (index === popElem.index ? 100 : 600);
          // 처음 가는 곳(0)이거나
          // 예전에 지나갔던 곳이면 기존의 건설 비용보다 현재 새로 계산한 비용이
          // 더 적거나 같으면 해당 비용 부여
          if (board[newX][newY] === 0 || board[newX][newY] >= newCost) {
            board[newX][newY] = newCost;
            queue.push({ newX, newY, index, newCost });
          }
        }
      }
    }
  }
  return answer;
}

console.log(solution([
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
]));
console.log(solution([
  [0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 1],
  [0, 0, 1, 0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0, 1, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0]
]));
console.log(solution([
  [0, 0, 1, 0],
  [0, 0, 0, 0],
  [0, 1, 0, 1],
  [1, 0, 0, 0]
]));
console.log(solution([
  [0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 0],
  [0, 0, 1, 0, 0, 0],
  [1, 0, 0, 1, 0, 1],
  [0, 1, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0]
]));