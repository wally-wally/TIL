function solution(a) {
  let answer = 0;
  let balloonCount = a.length;
  let left = Infinity;
  let right = Infinity;
  let minMap = Array(balloonCount).fill().map(_ => [0, 0]);
  
  for (let i = 0; i < balloonCount; i++) {
    if (left > a[i]) {
      left = a[i];
    }
    minMap[i][0] = left;
  }
  
  for (let i = balloonCount - 1; i >= 0; i--) {
    if (right > a[i]) {
      right = a[i];
    }
    minMap[i][1] = right;
  }
  
  for (let i = 0; i < balloonCount; i++) {
    if (a[i] <= minMap[i][0] || a[i] <= minMap[i][1]) {
      answer += 1;
    }
  }
  
  return answer;
}

console.log(solution([9, -1, -5])); // 3
console.log(solution([-16, 27, 65, -2, 58, -92, -71, -68, -61, -33])); // 6