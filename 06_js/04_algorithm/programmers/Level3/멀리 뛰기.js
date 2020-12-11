function solution(n) {
  let arr = [1, 2];
  let i = 0;
  while (arr.length < n) {
    arr.push(arr[i] % 1234567 + arr[i + 1] % 1234567);
    i += 1;
  }
  return arr[n - 1] % 1234567;
}

console.log(solution(4)); // 5
console.log(solution(3)); // 3