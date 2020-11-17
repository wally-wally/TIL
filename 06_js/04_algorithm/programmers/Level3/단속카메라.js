function solution(routes) {
  let answer = 0;

  routes.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);

  let standardPoint = routes[0][1];
  routes.shift();
  answer += 1;

  for (let i = 0; i < routes.length; i++) {
    if (routes[i][0] <= standardPoint) {
      standardPoint = Math.min(routes[i][1], standardPoint);
      continue;
    }
    standardPoint = routes[i][1];
    answer += 1;
  }
  return answer;
}

console.log(solution([[-20,15], [-14,-5], [-18,-13], [-5,-3]])); // 2
console.log(solution([[-20,10], [-15,15], [-10,5], [8,20], [17, 30]])); // 2