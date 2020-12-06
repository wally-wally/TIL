function solution(n, costs) {
  let answer = 0;
  costs.sort((a, b) => a[2] - b[2]);
  let p = [];
  for (let i = 0; i < n; i++) {
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
  while (MST.length < n - 1) {
    const [u, v, w] = costs[cur];
    let a = findSet(u);
    let b = findSet(v);
    if (a !== b) {
      p[b] = a;
      MST.push([u, v, w]);
    }s
    cur += 1;
  }
  
  answer = MST.reduce((acc, curr) => acc += curr[2], 0);
  return answer;
}


console.log(solution(4, [[0,1,1],[0,2,2],[1,2,5],[1,3,1],[2,3,8]])); // 4