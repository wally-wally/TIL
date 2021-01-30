/**
 * @param {string} s
 * @return {number}
 */
const calculate = (s) => {
  const OPERATOR_REG = /[+\-*/]/; // 연산자 검출 정규 표현식
  const NUM_REG = /[0-9]/; // 숫자 검출 정규 표현식

  const removeBlankString = s.replace(/ /gi, ''); // 불필요한 공백 제거 후 진행

  // 공백을 제거한 input값이 모두 숫자이면 계산 과정 필요없음
  if (!OPERATOR_REG.test(removeBlankString)) {
    return Number(removeBlankString);
  }

  // 곱셈, 나눗셈 연산 후 남은 숫자들을 모두 더하는 방식으로 마무리할 예정
  const stack = [];

  let tempNumber = ''; // input으로 들어온 string을 순회하면서 현재 숫자 값을 저장하는 변수
  let tempOperator = '+'; // input으로 들어온 string을 순회하면서 현재 연산자를 저장하는 변수

  const calcValue = () => {
    const numberizeTempNumber = Number(tempNumber);
    let popNumber = 0;
    if (tempOperator === '+') {
      stack.push(numberizeTempNumber);
    } else if (tempOperator === '-') {
      stack.push(-numberizeTempNumber);
    } else if (tempOperator === '*') {
      popNumber = stack.pop();
      stack.push(popNumber * numberizeTempNumber);
    } else if (tempOperator === '/') {
      popNumber = stack.pop();
      stack.push(Math.trunc(popNumber / numberizeTempNumber));
    }
  };

  removeBlankString.split('').forEach((val) => {
    if (NUM_REG.test(val)) {
      tempNumber += val;
    } else if (OPERATOR_REG.test(val)) {
      calcValue();
      tempOperator = val;
      tempNumber = '';
    }
  });

  calcValue();

  return stack.reduce((acc, curr) => {
    acc += curr;
    return acc;
  }, 0);
};

calculate('3+5/2');
