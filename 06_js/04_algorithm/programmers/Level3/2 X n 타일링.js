function solution(n) {
  let DP = new Array()
  DP[0] = DP[1] = 1
  for (let i = 2; i <= n; i++) {
      DP[i] = (DP[i - 1] + DP[i - 2]) % 1000000007
  }
  return DP[n]
}