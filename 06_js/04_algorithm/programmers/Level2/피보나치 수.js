function solution(n) {
  let arr = Array(n + 1).fill().map(_ => 0);
  arr[0] = 0;
  arr[1] = 1;
  
  if (n <= 1) {
    return arr[n];
  }
  
  for (let i = 2; i <= n; i++) {
    arr[i] = (arr[i - 1] + arr[i - 2]) % 1234567;
  }
  
  return arr[n] % 1234567;
}

console.log(solution(3)); // 2
console.log(solution(5)); // 5