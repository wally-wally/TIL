// 0 / 0은 NaN이 나오므로 sort하는데 오류가 없도록 0으로 return 해주는 함수를 추가함
// ex) let numbers = [NaN, 2, 6, 1];
// numbers 배열을 오름차순으로 정렬하면 [1, 2, 6, NaN]으로 출력된다.
// numbers 배열을 내림차순으로 정렬하면 [NaN, 6, 2, 1]으로 출력된다.
// cf) let arr = [-Infinity, Infinity, NaN, 0];
// arr 배열을 오름차순으로 정렬하면 [-Infinity, 0, Infinity, NaN]으로 출력된다.
// arr 배열을 내림차순으로 정렬하면 [Infinity, 0, -Infinity, NaN]으로 출력된다.
function checkZero(unClearPlayer, reachStagePlayer) {
  if (unClearPlayer === 0 && reachStagePlayer === 0) {
    return 0;
  } else {
    return unClearPlayer / reachStagePlayer;
  }
}

function solution(N, stages) {
  let failRates = [];
  for (let i = 1; i <= N; i++) {
    const unClearPlayer = stages.filter(stage => stage === i).length;
    const reachStagePlayer = stages.filter(stage => stage >= i).length;
    failRates.push({
      stage: i,
      failRate: checkZero(unClearPlayer, reachStagePlayer)
    });
  }
  const sortedFailRates = failRates.sort(function (a, b) {
    if (a.failRate !== b.failRate) {
      return b.failRate - a.failRate
    } else {
      return a.stage - b.stage
    }
  });
  return sortedFailRates.map(info => info.stage);
}

console.log(solution(5, [2, 1, 2, 6, 2, 4, 3, 3]))
console.log(solution(4, [4, 4, 4, 4, 4]))