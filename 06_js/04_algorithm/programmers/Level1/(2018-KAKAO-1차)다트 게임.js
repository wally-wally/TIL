function solution(dartResult) {
  let answer = 0;
  let scores = dartResult.split(/[SDT*#]/).filter(res => res.length).map(score => Number(score));
  let bonusOptions = dartResult.split(/[0-9]/).filter(res => res.length);
  const bonusInfo = { 'S': 1, 'D': 2, 'T': 3 };
  for (let i = 0; i < 3; i++) {
    scores[i] **= bonusInfo[bonusOptions[i][0]]; // 보너스 반영
    if (bonusOptions[i].includes('#')) { // 옵션 반영
      scores[i] *= -1
    } else if (bonusOptions[i].includes('*')) {
      scores[i] *= 2
      if (i > 0) { // 2회차 이후 스타상이 나오는 경우 이전 점수도 반영 가능
        scores[i - 1] *= 2;
      }
    }
  }
  answer = scores.reduce((acc, curr) => acc + curr, 0); // 점수 합계 계산
  return answer;
}

console.log(solution('1S2D*3T'));
console.log(solution('1D2S#10S'));
console.log(solution('1D2S0T'));
console.log(solution('1S*2T*3S'));
console.log(solution('1D#2S*3S'));
console.log(solution('1T2D3D#'));
console.log(solution('1D2S3T*'));