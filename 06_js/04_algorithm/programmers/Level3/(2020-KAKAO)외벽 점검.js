function solution(n, weak, dist) {
  let answer = Infinity;
  let reverseSortedDist = dist.sort((a, b) => b - a); // (1) 내림차순으로 dist 정렬
  let weakPointCount = weak.length;

  // (5) 실제 검사하는 로직
  const isAllCheck = (perm, weakPoints) => {
    let criteriaWeak = weakPoints[0];
    let criteriaCheckWeakIdx = 1;
    let checkAvailable = [weakPoints[0]];
    for (const dist of perm) {
      for (let m = criteriaCheckWeakIdx; m < weakPointCount; m++) {
        if (weakPoints[m] - criteriaWeak <= dist) {
          checkAvailable.push(weakPoints[m]);
        } else {
          criteriaWeak = weakPoints[m];
          criteriaCheckWeakIdx = m;
          break
        }
      }
    }
    return checkAvailable.length === weakPointCount
  }

  // (4) 나온 순열을 가지고 각 취약 포인트를 시작점으로 두고
  // 모든 포인트를 검사할 수 있는지 확인하는 함수로 연결
  // ex) (n = 12) [1, 5, 8] => [5, 8, 1 + 12] => [8, 1 + 12, 5 + 12]로 변환하여
  // 계산하기 쉬운 형태로 변환
  const check = (perm) => {
    let copiedWeak = [...weak];
    for (let k = 0; k < weakPointCount; k++) {
      if (isAllCheck(perm, copiedWeak)) {
        return true;
      }
      let popElem = copiedWeak.shift();
      copiedWeak.push(popElem + n);
    }
    return false;
  }

  // (3) 순열 생성
  const makePerm = (perm, count) => {
    if (perm.length === count) {
      if (check(perm)) {
        answer = Math.min(answer, perm.length);
      }
      return
    }
    for (let j = 0; j < dist.length; j++) {
      if (!visited[j]) {
        visited[j] = true;
        perm.push(reverseSortedDist[j]);
        makePerm(perm, count);
        perm.pop();
        visited[j] = false;
      }
    }
  }

  // (2) 내림차순 정렬된 dist 원소들 중 1개 부터 dist 배열 길이 개수로
  // 뽑을 수 있는 모든 순열 구하기
  let visited = Array(dist.length).fill(false);
  for (let i = 1; i <= dist.length; i++) {
    makePerm([], i);
    if (answer !== Infinity) {
      return answer;
    }
  }
  return -1;
}

console.log(solution(12, [1, 5, 8], [1, 2, 3, 4])); // 2
console.log(solution(12, [1, 4, 6, 9], [1, 2, 3, 3])); // 2
console.log(solution(12, [1, 5, 6, 10], [1, 2, 3, 4])); // 2
console.log(solution(12, [1, 3, 4, 9, 10], [3, 5, 7])); // 1
console.log(solution(50, [1], [6])); // 1
console.log(solution(200, [0, 100], [1, 1])); // 2
console.log(solution(200, [0, 10, 50, 80, 120, 160], [1, 10, 5, 40, 30])); // 3
console.log(solution(12, [0, 10], [1, 2])); // 1
console.log(solution(30, [0, 3, 11, 21], [10, 4])); // 2