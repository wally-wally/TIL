function solution(distance, rocks, n) {
  let answer = 0;

  rocks.sort((a, b) => a - b);

  let start = 0;
  let end = distance;
  let mid;

  while (start <= end) {
    mid = parseInt((start + end) / 2);
    let prevRock = 0;
    let removeRockCount = 0;
    for (let i = 0; i < rocks.length; i++) {
      if (rocks[i] - prevRock < mid) {
        removeRockCount += 1;
        if (removeRockCount > n) {
          break;
        }
      } else {
        prevRock = rocks[i];
      }
    }
    if (removeRockCount > n) {
      end = mid - 1;
    } else {
      answer = Math.max(answer, mid);
      start = mid + 1;
    }
  }
  return answer;
}

console.log(solution(25, [2, 14, 11, 21, 17], 2)); // 4