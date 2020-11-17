function solution(food_times, k) {
  let rotateTable = food_times.map((time, idx) => [time, idx + 1]).sort((a, b) => a[0] - b[0]);
  let nowTime = 0;
  for (let i = 0; i < rotateTable.length; i++) {
    let addTime;
    if (i === 0 || i === rotateTable.length) {
      addTime = rotateTable[i][0] * (rotateTable.length - i);
    } else {
      addTime = (rotateTable[i][0] - rotateTable[i - 1][0])* (rotateTable.length - i);
    }
    nowTime += addTime;
    if (nowTime > k) {
      nowTime -= addTime;
      const remainTable = rotateTable.slice(i).sort((a, b) => a[1] - b[1]);
      return remainTable[(k - nowTime) % remainTable.length][1]
    }
  }
  return -1
}

console.log(solution([1, 1, 1, 1, 1, 1], 1)); // 2
console.log(solution([4, 3, 5, 6, 2], 7)); // 3
console.log(solution([4, 5, 3, 1, 3, 6], 17));
console.log(solution([3, 1, 2], 5)); // 1
console.log(solution([4, 5, 2, 3, 3], 14)); // 1
console.log(solution([3, 1, 1, 1, 2, 4, 3], 12)); // 6
console.log(solution([2, 3, 1000, 2, 1, 2000], 20)); // 3