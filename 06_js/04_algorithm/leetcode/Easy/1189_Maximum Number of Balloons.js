const maxNumberOfBalloons = (text) => {
  const balloonText = 'balloon';
  const balloonAlphabetMap = new Map();

  // text의 각 알파벳을 담은 배열을 forEach로 순회하면서 'b', 'a', 'l', 'o', 'n'인 경우
  // balloonAlphabetMap에 알파벳 개수 하나씩 증가하여 저장
  text.split('').forEach((character) => {
    if (balloonText.includes(character)) {
      if (balloonAlphabetMap.has(character)) {
        balloonAlphabetMap.set(character, balloonAlphabetMap.get(character) + 1);
      } else {
        balloonAlphabetMap.set(character, 1);
      }
    }
  });

  // 알파벳 o와 l은 두개가 하나로 취급되므로 2로 나눈 후 소수점 자리는 버림 처리
  const setHalfAlphabetCount = (alphabet) => {
    const alphabetOcount = balloonAlphabetMap.get(alphabet);
    balloonAlphabetMap.set(alphabet, Math.floor(alphabetOcount / 2));
  }

  setHalfAlphabetCount('o');
  setHalfAlphabetCount('l');

  // 만약 balloonAlphabetMap의 구성 요소가 5개(=balloon에서 사용된 알파벳 개수)가 아니면 무조건 0으로 return
  const balloonAlphabetCount = 5;

  if (balloonAlphabetMap.size !== balloonAlphabetCount) {
    return 0;
  }

  return Math.min(...[...balloonAlphabetMap.values()]);
}

console.log(maxNumberOfBalloons('nlaebolko')); // 1
console.log(maxNumberOfBalloons('loonbalxballpoon')); // 2
console.log(maxNumberOfBalloons('leetcode')); // 0
console.log(maxNumberOfBalloons('lloo')); // 0