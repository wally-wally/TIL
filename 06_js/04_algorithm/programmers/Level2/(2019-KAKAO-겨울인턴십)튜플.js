function solution(s) {
  let answer = [];
  let nTuple = [];
  let openBracket = false;
  let subTuple = '';
  for (let i = 1; i < s.length - 1; i++) {
    if (s[i] === '{') {
      openBracket = true;
    } else if (s[i] === '}') {
      nTuple.push(subTuple.split(',').map(elem => Number(elem)));
      openBracket = false;
      subTuple = '';
    } else {
      subTuple += (openBracket ? s[i] : '');
    }
  }
  nTuple.sort((a, b) => a.length - b.length);
  nTuple.forEach(tuple => {
    let newElement = tuple.filter(elem => !answer.includes(elem))[0];
    answer.push(newElement);
  })
  return answer;
}

console.log(solution("{{2},{2,1},{2,1,3},{2,1,3,4}}"));
console.log(solution("{{1,2,3},{2,1},{1,2,4,3},{2}}"));
console.log(solution("{{20,111},{111}}"));
console.log(solution("{{123}}"));
console.log(solution("{{4,2,3},{3},{2,3,4,1},{2,3}}"));