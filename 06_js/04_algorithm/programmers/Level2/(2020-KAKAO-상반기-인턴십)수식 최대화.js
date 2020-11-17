function calc(num1, num2, oper) {
  if (oper === '+') {
    return num1 + num2;
  } else if (oper === '-') {
    return num1 - num2;
  } else {
    return num1 * num2;
  }
}


function calcFormula(numbers, operators, priority) {
  for (const operator of priority) {
    const operatorIndexes = operators
      .map((oper, idx) => oper === operator && idx)
      .filter(val => val === 0 || val !== false);
    const popIndex = [];
    for (const operatorIndex of operatorIndexes) {
      const tempCalcValue = calc(numbers[operatorIndex], numbers[operatorIndex + 1], operator);
      numbers[operatorIndex + 1] = tempCalcValue;
      numbers[operatorIndex] = 0;
      popIndex.push(operatorIndex);
    }
    for (const idx of popIndex.reverse()) {
      numbers.splice(idx, 1);
      operators.splice(idx, 1);
    }
  }
  return Math.abs(numbers[0]);
}


function getOperatorComb(operatorsSet) {
  const operators = Array.from(operatorsSet);
  const operatorPriorities = [];
  const getComb = (operators, comb) => {
    if (comb.length === operators.length) {
      operatorPriorities.push([...comb]);
      return
    }
    for (const operator of operators) {
      if (!comb.includes(operator)) {
        comb.push(operator);
        getComb(operators, comb);
        comb.pop();
      }
    }
  }
  getComb(operators, []);
  return operatorPriorities;
}


function solution(expression) {
  let answer = 0;
  // (1) 숫자, 기호 분리
  const numbers = [];
  const operators = [];
  let tempNumber = '';
  for (const express of expression) {
    if (isNaN(express)) {
      operators.push(express);
      numbers.push(Number(tempNumber));
      tempNumber = '';
      continue;
    }
    tempNumber += express;
  }
  numbers.push(Number(tempNumber));
  
  // (2) 가능한 연산자 우선순위 모든 경우의 수 구하기
  const operatorsSet = new Set(operators);
  const operatorPriorities = getOperatorComb(operatorsSet);
  
  // (3) 연산자 우선순위 모든 경우에 대한 계산 결과 구해서 절댓값 적용된 최댓값 구하기
  for (const priority of operatorPriorities) {
    answer = Math.max(answer, calcFormula([...numbers], [...operators], priority));
  }
  return answer;
}

console.log(solution('100-200*300-500+20'));
console.log(solution('50*6-3*2'));