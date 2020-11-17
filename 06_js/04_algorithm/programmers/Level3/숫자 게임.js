function solution(A, B) {
  let answer = 0;

  A.sort((a, b) => a - b);
  B.sort((a, b) => a - b);

  let indexA = A.length - 1;
  let indexB = B.length - 1;

  while (true) {
    if (indexA < 0) {
      break
    }
    if (A[indexA] < B[indexB]) {
      answer += 1;
      indexB -= 1;
    }
    indexA -= 1;
  }
  return answer;
}

console.log(solution([5,1,3,7], [2,2,6,8])); // 3
console.log(solution([2,2,2,2], [1,1,1,1])); // 0