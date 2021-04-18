const solution = (s) => {
  let answer = 0;
  const stringLength = s.length;

  // [prechecker1] s의 길이가 1이면 무조건 0
  if (stringLength === 1) {
    return answer;
  }
  
  // [prechecker2] s의 구성 원소가 모두 여는 괄호만있거나 닫는 괄호만 있으면 0
  if (!s.match(/\(|\{|\[/g) || !s.match(/\)|\}|\]/g)) {
    return answer;
  }

  // 여는 괄호, 닫는 괄호 모음(상수)
  const openBrackets = ['(', '{', '['];
  const closeBrackets = [')', '}', ']'];

  // 회전한 괄호 문자열이 올바른지 확인하는 로직
  const isCorrectBracketString = (bracketString) => {
    const bracketStack = [];

    for (const str of bracketString) {
      // 여는 괄호는 무조건 stack에 넣기
      if (openBrackets.includes(str)) {
        bracketStack.push(str);
        continue;
      }

      // 닫는 괄호일 때
      // 아무것도 없으면 올바르지 않은 문자열이므로 0으로 바로 return
      if (bracketStack.length === 0) {
        return 0;
      }

      // pop한 여는 괄호가 현재 닫는 괄호와 쌍이 아닌 경우 0으로 바로 return
      const popOpenBracketStr = bracketStack.pop();
      if (openBrackets.indexOf(popOpenBracketStr) !== closeBrackets.indexOf(str)) {
        return 0;
      }
    }

    return bracketStack.length === 0;
  }

  // 회전한 괄호 문자열 만들기
  let rotateCount = 1;
  let rotatedBracketString = s;

  while (rotateCount <= stringLength) {
    rotatedBracketString = rotatedBracketString.slice(1) + rotatedBracketString[0];
    answer += isCorrectBracketString(rotatedBracketString);
    rotateCount += 1;
  }
  
  return answer;
}

console.log(solution('[](){}')); // 3
console.log(solution('}]()[{')); // 2
console.log(solution('[)(]')); // 0
console.log(solution('}}}')); // 0
