/**
 * @param {string} s
 * @return {boolean}
 */
const isValid = (s) => {
  const OPEN_BRACKETS = ['(', '{', '['];
  const CLOSE_BRACKETS = [')', '}', ']'];

  // [prechecker] s의 길이가 홀수이거나 시작부터 닫는 괄호이면 할 필요가 없음
  if (s.length % 2 === 1 || CLOSE_BRACKETS.includes(s[0])) {
    return false;
  }

  const checkMatchBracketPair = (open, closeIdx) => open === OPEN_BRACKETS[closeIdx];

  const bracketStack = [];
  const BRACKET_UNVALID = s.split('').some((bracket) => {
    // 여는 괄호인 경우
    if (OPEN_BRACKETS.includes(bracket)) {
      bracketStack.push(bracket);
      return false;
    }
    // 닫는 괄호인 경우
    // stack이 비어있으면 괄호 매칭을 이어서 할 수 없으므로 false
    if (bracketStack.length === 0) {
      return true;
    }
    // 가장 마지막에 넣은 여는 괄호랑 매칭해서 짝이 안맞으면 false
    const CLOSE_BRACKET_INDEX = CLOSE_BRACKETS.indexOf(bracket);
    if (!checkMatchBracketPair(bracketStack.pop(), CLOSE_BRACKET_INDEX)) {
      return true;
    }
    return false;
  });

  // 괄호 문자열 검사시 오류이거나 모든 문자열을 돌았는데도 stack에 남아 있으면 false
  return !(BRACKET_UNVALID || bracketStack.length > 0);
};

isValid('()[]{}');
