// (1) 이분 탐색(참고: https://hellominchan.tistory.com/262)
function checkPossible(stones, k, mid) {
  let impossibleStones = 0;
  for (const stone of stones) {
    if (stone - mid <= 0) {
      impossibleStones += 1;
      if (impossibleStones === k) {
        return false;
      }
    } else {
      impossibleStones = 0;
    }
  }
  return true;
}

function solution(stones, k) {
  let answer = 0;
  let left = 0;
  let right = 200000000;
  while (left <= right) {
    let mid = parseInt((left + right) / 2);
    if (checkPossible(stones, k, mid)) {
      answer = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return answer + 1;
}

console.log(solution([2, 4, 5, 3, 2, 1, 4, 2, 5, 1], 3));

// (2) 다른 신박한 풀이방법
// function solution(stones, k) {
//   stones.push(Infinity);
//   let stack = [{ count: Infinity, idx: -1 }];
//   let answer = Infinity;
//   stones.forEach((stone, idx) => {
//     let right = { count: stone, idx };
//     while (stack[stack.length - 1].count < right.count) {
//       let mid = stack.pop();
//       let left = stack[stack.length - 1];
//       if (right.idx - left.idx > k) {
//         answer = Math.min(answer, mid.count);
//       }
//     }
//     stack.push(right);
//   })
//   return answer;
// }


// (3) 처음 시도했던 코드(효율성 부분 중 테스트 케이스 No.13만 실패...)
// function solution(stones, k) {
//   let answer = Math.max.apply(null, stones.slice(0, k));
//   for (let i = 1; i <= stones.length - k; i++) {
//     const popValue = stones[i - 1];
//     const newValue = stones[i + k - 1];
//     if (popValue >= answer && answer > newValue) {
//       answer = Math.min(answer, Math.max.apply(null, stones.slice(i, i + k)));
//     }
//   }
//   return answer;
// }