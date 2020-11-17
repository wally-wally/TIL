function solution(msg) {
  // 사전 초기화
  const dictionary = {};
  for (let codeNum = 65; codeNum <= 90; codeNum++) {
    dictionary[String.fromCharCode(codeNum)] = codeNum - 64;
  }
  let answer = [];
  let dictionaryIndex = 27;
  let tempString = msg[0];
  for (let i = 1; i < msg.length; i++) {
    if ((tempString + msg[i]) in dictionary) {
      tempString += msg[i];
      continue;
    }
    // 사전에 해당 문자열 있는 경우 색인 번호 추출
    answer.push(dictionary[tempString]);
    dictionary[tempString + msg[i]] = dictionaryIndex;
    dictionaryIndex += 1;
    tempString = msg[i];
  }
  // 처리되지 않은 문자열의 색인 번호 추출
  answer.push(dictionary[tempString]);
  return answer;
}

console.log(solution('KAKAO'));
console.log(solution('TOBEORNOTTOBEORTOBEORNOT'));
console.log(solution('ABABABABABABABAB'));