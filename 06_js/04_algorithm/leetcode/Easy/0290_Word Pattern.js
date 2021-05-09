const wordPattern = (pattern, s) => {
  const splitedPattern = pattern.split('');
  const splitedString = s.split(' ');
  
  // [prechecker1] pattern과 s의 단어 개수가 다르면 false
  if (splitedPattern.length !== splitedString.length) {
    return false;
  }
  
  // [prechecker2] pattern 또는 s의 단어 개수가 1이면 true
  if (splitedPattern.length === 1) {
    return true;
  }
  
  // key로 splitedString의 각 단어, value로 splitedPattern의 각 패턴어를 Map에 관리해서 사용
  const wordMap = new Map();

  for (let idx = 0; idx < splitedPattern.length; idx++) {
    const nowPatternLetter = splitedPattern[idx];
    const nowWord = splitedString[idx];

    // Map에 기존에 이미 넣은 단어인 경우
    if (wordMap.has(nowWord)) {
      if (wordMap.get(nowWord) !== nowPatternLetter) {
        return false;
      }

      continue;
    }

    // 새로운 단어인 경우
    if ([...wordMap.values()].includes(nowPatternLetter)) {
      return false;
    }

    wordMap.set(nowWord, nowPatternLetter);
  }

  return true;
};

console.log(wordPattern('abba', 'dog cat cat dog')); // true
console.log(wordPattern('abba', 'dog cat cat fish')); // false
console.log(wordPattern('aaaa', 'dog cat cat dog')); // false
console.log(wordPattern('abba', 'dog dog dog dog')); // false