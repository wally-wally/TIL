function checkCompressedString(i, s) {
  let tempResult = '';
  let tempStringPattern = s.slice(0, i);
  let patternCount = 1;
  for (let j = i; j <= s.length; j += i) {
    let nextStringPattern = s.slice(j, j + i);
    if (tempStringPattern === nextStringPattern) {
      patternCount += 1;
    } else {
      tempResult += `${patternCount > 1 ? patternCount : ''}${tempStringPattern}`;
      tempStringPattern = nextStringPattern;
      patternCount = 1;
    }
    if (j + i > s.length) {
      tempResult += s.slice(j, s.length);
    }
  }
  return tempResult.length;
}

function solution(s) {
  let answer = Infinity;
  if (s.length === 1) {
    return 1;
  }
  for (let i = 1; i <= s.length / 2; i++) {
    answer = Math.min(answer, checkCompressedString(i, s));
  }
  return answer;
}

console.log(solution("aabbaccc"));
console.log(solution("ababcdcdababcdcd"));
console.log(solution("abcabcdede"));
console.log(solution("abcabcabcabcdededededede"));
console.log(solution("xababcdcdababcdcd"));