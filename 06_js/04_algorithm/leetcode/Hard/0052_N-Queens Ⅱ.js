/**
 * @param {number} n
 * @return {number}
 */
var totalNQueens = function(n) {
  let visited = Array.from({ length: n - 1 }, () => 0);
  let cols = Array.from({ length: n - 1 }, () => 0);
  
  const CHECK_POSSIBLE = (k, c) => {
    for (let i = 0; i < k; i++) {
      if (k - i === Math.abs(c - cols[i])) {
        return false;
      }
    }
    return true;
  }
  
  const N_QUEEN = (k, cnt) => {
    if (k === n) {
      cnt += 1;
    } else {
      for (let i = 0; i < n; i++) {
        if (visited[i] || !CHECK_POSSIBLE(k, i)) {
          continue;
        }
        visited[i] = 1;
        cols[k] = i;
        cnt = N_QUEEN(k + 1, cnt);
        visited[i] = 0;
      }
    }
    return cnt;
  }
  
  return N_QUEEN(0, 0);
};
