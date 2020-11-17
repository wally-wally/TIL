function solution(n, times) {
  let left = 1;
  let right = n * times[times.length -1];
  let answer = 0;
  while (left <= right){
    const mid = Math.floor((left + right) / 2);
    const count = times.reduce((acc, currTime) => acc += Math.floor(mid / currTime), 0);
    if (count >= n) { 
      right = mid - 1;
      answer = mid;
    }
    else {
      left = mid + 1;
    }
  }
  return answer;
}

console.log(solution(6, [7, 10]));