/**
 * @param {number} n
 * @return {number}
 */
const numSquares = (n) => {
  // [prechecker] numSquares 함수의 인자로 들어온 값이 제곱수 이면 바로 1로 return
  if (Number.isInteger(Math.sqrt(n))) {
    return 1;
  }

  // 실제 제곱수 최소 사용 횟수 계산하는 로직
  // parameter: 정답, 현재 제곱수로 나누어야하는 숫자, 제곱수 시작 기준점, 지금까지 사용(나누어진)된 제곱수 개수
  const checkPerfectSquares = (answer, nowNumber, nowIdx, useNumCount) => {
    // 백트래킹1 - 지금까지 사용된 숫자 개수가 현재까지 구한 정답보다 크거나 같으면 더 이상 할 필요가 없음
    if (answer <= useNumCount) {
      return answer;
    }
    // 백트래킹2 - 제곱수를 기준으로 나누어야 하는 숫자 0인 경우 더 이상 나눌 수 없기 때문에 종료
    if (nowNumber === 0) {
      return useNumCount;
    }
    for (let idx = nowIdx; idx >= 1; idx -= 1) {
      const SQUARE_VALUE = idx ** 2; // 제곱수
      const QUOTIENT = Math.floor(nowNumber / SQUARE_VALUE); // 몫(해당 제곱수가 몇 개 사용되었는지 결정)
      const REMAINDER = nowNumber % SQUARE_VALUE; // 나머지(이 값을 가지고 다음 재귀 로직에서 제곱수로 나눔)
      const NEXT_START_IDX = Math.floor(Math.sqrt(REMAINDER)); // 다음 재귀 로직에서 제곱수 만들 때 시작하는 기준 인덱스 값
      const USED_NUMBER_COUNT = useNumCount + QUOTIENT; // 해당 로직 순번에서 몇 개의 숫자가 더 사용되었는지
      answer = checkPerfectSquares(answer, REMAINDER, NEXT_START_IDX, USED_NUMBER_COUNT);
    }
    return answer;
  };

  return checkPerfectSquares(Infinity, n, Math.floor(Math.sqrt(n)), 0);
};
