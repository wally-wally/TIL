const solution = (left, right) => { 
  // length 길이 만큼 idxExpression 식을 기준으로 초기 배열 생성하는 유틸 함수
  const getInitArray = (length, idxExpression) => {
    return Array(length).fill().map(idxExpression);
  }

  // 약수의 개수 구하는 로직
  const getDivisorCount = (number) => {
    const squareValue = Math.sqrt(number);

    // 1부터 제곱근 값 이하의 최대 정수까지 숫자를 담은 배열 생성
    const criteriaNumbers = getInitArray(Math.floor(squareValue), (_, i) => i + 1);
    
    const addDivisorCount = (criteriaNumber, currentNumber) => {
      // 나머지가 0이 아니면 약수 아님
      if (criteriaNumber % currentNumber) {
        return 0;
      }
      
      // 나머지가 0인데 제곱근 값과 같다면 약수는 1개, 아니면 2개로 체크
      return currentNumber === squareValue ? 1 : 2;
    }

    return criteriaNumbers.reduce((totalCount, currentCount) => {
      return totalCount += addDivisorCount(number, currentCount);
    }, 0);
  };

  // 실제 정답을 구할 때 현재 숫자에 1 또는 -1을 곱해서 더하거나 빼는 로직 수행
  const positive = 1; // 양수
  const negative = -1; // 음수

  // left ~ right 까지의 숫자를 담은 배열 생성
  const indexNumbers = getInitArray(right - left + 1, (_, i) => i + left);
  
  // 문제 조건에 맞게 약수 개수의 홀짝 여부에 따라 더하거나 빼는 로직 수행
  return indexNumbers.reduce((result, currentNumber) => {
    const divisorCount = getDivisorCount(currentNumber);
    const setSign = divisorCount % 2 ? negative : positive;
    
    return result + currentNumber * setSign;
  }, 0);
}

console.log(solution(13, 17)); // 43
console.log(solution(24, 27)); // 52