function solution(n, edge) {
  // (1) 방문 체크와 각 노드까지의 최소 거리를 담을 array 생성
  let visited = [];
  let distances = [];
  for (let i = 0; i <= n; i++) {
    visited.push(false);
    distances.push(0);
  }
  visited[1] = true; // 1번 노드는 시작점이므로 방문했다고 true로 설정

  // (2) 노드 간 연결 관계
  let vertax = {};
  edge.map(e => {
    [[0, 1], [1, 0]].map(([a, b]) => {
      if (vertax.hasOwnProperty(e[a])) {
        vertax[e[a]].push(e[b]);
      } else {
        vertax[e[a]] = [e[b]];
      }
    })
  })
  
  // (3) BFS 방식으로 1번 노드에서 각 노드까지의 최소거리 계산
  let nodes = [1];
  while (nodes.length > 0) {
    let popNode = nodes.shift();
    for (const n of vertax[popNode]) {
      const node = Number(n);
      if (!visited[node]) {
        visited[node] = true;
        distances[node] = distances[popNode] + 1;
        nodes.push(node);
      }
    }
  }

  // (4) 계산한 최소 거리 중 최댓값과 일치하는 노드의 개수 구하기
  return distances.filter(dist => dist === Math.max(...distances)).length;
}

console.log(solution(6, [[3, 6], [4, 3], [3, 2], [1, 3], [1, 2], [2, 4], [5, 2]]))