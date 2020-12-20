function solution(n, computers) {
  let answer = 0;
  let visited = Array(n).fill().map(_ => false);
  
  const DFS = num => {
    for (let j = 0; j < n; j++) {
      if (!visited[j] && j !== num && computers[num][j]) {
        visited[j] = true;
        DFS(j);
      }
    }
  };
  
  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      visited[i] = true;
      DFS(i);
      answer += 1;
    }
  }
  return answer;
}

console.log(solution(3, [[1, 1, 0], [1, 1, 0], [0, 0, 1]])); // 2
console.log(solution(3, [[1, 1, 0], [1, 1, 1], [0, 1, 1]])); // 1