const V = 7;
const E = 11;
let edge = [
  [0, 1, 32],
  [0, 2, 31],
  [0, 5, 60],
  [0, 6, 51],
  [1, 2, 21],
  [2, 4, 46],
  [2, 6, 25],
  [3, 4, 34],
  [3, 5, 18],
  [4, 5, 40],
  [4, 6, 51]
];

function kruskal(edge) {
  edge.sort((a, b) => a[2] - b[2]);

  let p = [];
  for (let i = 0; i < V; i++) {
    p.push(i);
  }

  const findSet = x => {
    if (x !== p[x]) {
      p[x] = findSet(p[x]);
    }
    return p[x];
  }

  let MST = [];
  let cur = 0;
  while (MST.length < V - 1) {
    let [u, v, w] = edge[cur];
    let a = findSet(u);
    let b = findSet(v);
    if (a !== b) {
      p[b] = a;
      MST.push([u, v, w]);
    }
    cur += 1;
  }

  return MST;
}

console.log(kruskal(edge));