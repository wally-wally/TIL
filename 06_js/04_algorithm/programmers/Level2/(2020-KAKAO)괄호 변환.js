// (1) 빈 문자열인지 확인
const checkEmptyString = (string) => {
  return string.length === 0
}

// (2) 주어진 문자열을 두 '균형잡힌 괄호 문자열'로 분리
// (단, u는 반드시 균형잡힌 괄호 문자열 형태)
const separateBalancedBrackets = (string) => {
  let u = '';
  let v = '';
  let openBracketCount = 0;
  let closeBracketCount = 0;
  for (let i = 0; i < string.length; i++) {
    if (string[i] === '(') {
      openBracketCount += 1;
    } else {
      closeBracketCount += 1;
    }
    if (openBracketCount === closeBracketCount) {
      u = string.slice(0, i + 1);
      v = string.slice(i + 1, string.length);
      break
    }
  }
  return [u, v];
}

// (3) '올바른 괄호 문자열' 체크
const checkCorrectBracketString = (string) => {
  let bracketStack = [];
  for (const str of string) {
    if (str === '(') {
      bracketStack.push(str);
    } else {
      const popElem = bracketStack.pop();
      if (!popElem) {
        return false
      }
    }
  }
  return bracketStack.length === 0 ? true : false
}

// (4-4)괄호 방향 뒤집기
const convertBracket = (string) => {
  return string.split('').map(v => v === '(' ? ')' : '(').join('');
}

function solution(bracketString) {
  const makeCorrectBracketString = (string) => {
    let tempAnswer = '';
    if (checkEmptyString(string)) { // (1)
      return '';
    }
    const [u, v] = separateBalancedBrackets(string); // (2)
    if (checkCorrectBracketString(u)) { // (3)
      tempAnswer += u;
      tempAnswer += makeCorrectBracketString(v);
    } else { // (4) 문자열 u가 '올바른 괄호 문자열'이 아닌 경우
      let tempStr = '(';
      tempStr += makeCorrectBracketString(v);
      tempStr += ')';
      tempStr += convertBracket(u.slice(1, u.length - 1));
      return tempStr;
    }
    return tempAnswer;
  }
  
  return makeCorrectBracketString(bracketString);
}

console.log(solution('(()())()'));
console.log(solution(')('));
console.log(solution('()))((()'));