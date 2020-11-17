const dist = [[0, 1], [1, 1], [1, 0]];
let gameBoard = [];

function removeBlock(index) {
  let removeBlockCount = 0;
  let newDist = [[0, 0], ...dist];
  index.forEach(idx => {
    for (const d of newDist) {
      let newRow = idx[0] + d[0];
      let newCol = idx[1] + d[1];
      if (gameBoard[newRow][newCol]) {
        removeBlockCount += 1;
        gameBoard[newRow][newCol] = '';
      }
    }
  })
  return removeBlockCount;
}

function checkRemovable(r, c) {
  let criteriaBlock = gameBoard[r][c];
  for (const d of dist) {
    let newRow = r + d[0];
    let newCol = c + d[1];
    if (criteriaBlock !== gameBoard[newRow][newCol]) {
      return false;
    }
  }
  return true;
}
function solution(m, n, board) {
  let answer = 0;
  gameBoard = board.map(line => line.split(''));
  while (true) {
    // (1) 제거 가능한 블록 찾기 (if 제거 가능 블록 개수 0이면 종료)
    let removeIndex = [];
    for (let r = 0; r < m - 1; r++) {
      for (let c = 0; c < n - 1; c++) {
        if (gameBoard[r][c] && checkRemovable(r, c)) {
          removeIndex.push([r, c]);
        }
      }
    }
    if (!removeIndex.length) {
      return answer;
    }
    // (2) 블록 제거 => 빈 칸으로 세팅
    answer += removeBlock(removeIndex);
    // (3) 블록 하강
    for (let c = 0; c <= n - 1; c++) {
      let dropPoints = m - 1;
      let dropCheck = false; // 검사하는 칸이 빈 칸인 경우 dropCheck를 true로 설정
      for (let r = m - 1; r >= 0; r--) {
        if (gameBoard[r][c]) {
          gameBoard[dropPoints][c] = gameBoard[r][c];
          if (dropCheck) {
            dropPoints -= 1;
            gameBoard[r][c] = '';
          } else {
            dropPoints = r - 1;
          }
        } else {
          dropCheck = true;
        }
      }
    }
  }
}

console.log(solution(4, 5, ['CCBDE', 'AAADE', 'AAABF', 'CCBBF']));
console.log(solution(6, 6, ['TTTANT', 'RRFACC', 'RRRFCC', 'TRRRAA', 'TTMMMF', 'TMMTTJ']));