function solution(n, money) {
  let DP = Array(n + 1).fill(0);
  DP[0] = 1;
  
  for (let i = 0; i < money.length; i++) {
    for (let j = money[i]; j <= n; j++) {
      DP[j] = (DP[j] + DP[j - money[i]]) % 1000000007
    }
  }
  return DP[n];
}

console.log(solution(5, [1, 2, 5]));