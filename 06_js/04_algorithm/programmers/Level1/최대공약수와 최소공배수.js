function getGCD(n, m) {
  while (m !== 0) {
    let nmg = n % m;
    n = m;
    m = nmg;
  }
  return n;
}

function solution(n, m) {
  // 유클리드 호제법을 이용해서 최대공약수 구한 후
  // 이 값을 이용해서 최소공배수 구하기
  const gcd = getGCD(n, m);
  return [gcd, (n * m) / gcd];
}

console.log(solution(3, 12));
console.log(solution(2, 5));