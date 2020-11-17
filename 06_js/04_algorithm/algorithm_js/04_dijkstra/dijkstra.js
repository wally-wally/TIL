const V = 8;
const E = 10;
let infos = [
  [1, 2, 2],
  [1, 3, 3],
  [2, 4, 3],
  [2, 5, 5],
  [3, 6, 1],
  [4, 7, 4],
  [5, 6, 1],
  [5, 7, 1],
  [6, 8, 6],
  [7, 8, 2]
]


function dijkstra(s) {
  let graph = [];
  let D = [];
  for (let i = 0; i <= V; i++) {
    graph.push([]);
    D.push(Infinity);
  }
  
  for (const info of infos) {
    let [u, v, w] = info;
    graph[u].push([v, w]);
    graph[v].push([u, w]);
  }

  D[s] = 0;
  let visited = [];
  for (let i = 0; i <= V; i++) {
    visited.push(false);
  }

  let cnt = V;
  while (cnt) {
    let u = 0;
    let minValue = Infinity;
    for (let i = 1; i <= V; i++) {
      if ((!visited[i]) && (minValue > D[i])) {
        u = i;
        minValue = D[i];
      }
    }
    visited[u] = true;
    for (const value of graph[u]) {
      let [v, w] = value;
      if (D[v] > D[u] + w) {
        D[v] = D[u] + w;
      }
    }
    cnt -= 1;
  }

  return D.slice(1, V + 1);
}

for (let i = 1; i <= V; i++) {
  console.log(`${i}번 지점을 시작으로 했을 때: ${dijkstra(i)}`);
}