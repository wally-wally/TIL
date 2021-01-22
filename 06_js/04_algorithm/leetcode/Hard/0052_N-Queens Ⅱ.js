/**
 * @param {number} n
 * @return {number}
 */
const totalNQueens = (n) => {
  let visited = Array.from({ length: n - 1 }, () => 0);
  let cols = Array.from({ length: n - 1 }, () => 0);
  
  const checkPossible = (k, c) => {
    for (let i = 0; i < k; i++) {
      if (k - i === Math.abs(c - cols[i])) {
        return false;
      }
    }
    return true;
  }
  
  const nQueen = (k, cnt) => {
    if (k === n) {
      cnt += 1;
    } else {
      for (let i = 0; i < n; i++) {
        if (visited[i] || !checkPossible(k, i)) {
          continue;
        }
        visited[i] = 1;
        cols[k] = i;
        cnt = nQueen(k + 1, cnt);
        visited[i] = 0;
      }
    }
    return cnt;
  }
  
  return nQueen(0, 0);
};
