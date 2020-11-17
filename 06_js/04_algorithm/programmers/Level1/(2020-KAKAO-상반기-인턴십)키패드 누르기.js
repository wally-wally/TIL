const keyPositions = {
  1: [0, 0], 2: [0, 1], 3: [0, 2],
  4: [1, 0], 5: [1, 1], 6: [1, 2],
  7: [2, 0], 8: [2, 1], 9: [2, 2], 0: [3, 1]
};

let leftHands = [3, 0];
let rightHands = [3, 2];

function changeHandsPosition(hand, number) {
  if (hand === 'L') {
    leftHands = keyPositions[number];
  } else {
    rightHands = keyPositions[number];
  }
}

function selectMoveHandsInCenter(number, hand) {
  // 거리 계산
  const leftDistance = Math.abs(leftHands[0] - keyPositions[number][0]) + Math.abs(leftHands[1] - keyPositions[number][1])
  const rightDistance = Math.abs(rightHands[0] - keyPositions[number][0]) + Math.abs(rightHands[1] - keyPositions[number][1])
  // 짧은 쪽으로 결정
  if (leftDistance < rightDistance) {
    return 'L';
  }
  if (leftDistance > rightDistance) {
    return 'R';
  }
  // 계산한 거리가 같은 경우 hand 값에 따라 결정
  return hand[0].toUpperCase();
}

function selectMoveHands(number, hand) {
  // 입력 숫자가 1, 4, 7 중 하나인 경우
  if ([1, 4, 7].includes(number)) {
    return 'L';
  }
  // 입력 숫자가 3, 6, 9, 중 하나인 경우
  if ([3, 6, 9].includes(number)) {
    return 'R';
  }
  // 입력 숫자가 2, 5, 8, 0 중 하나인 경우
  return selectMoveHandsInCenter(number, hand);
}

function solution(numbers, hand) {
  let answer = '';
  numbers.map(number => {
    const resultHands = selectMoveHands(number, hand);
    changeHandsPosition(resultHands, number);
    answer += resultHands;
  });
  return answer;
}

console.log(solution([1, 3, 4, 5, 8, 2, 1, 4, 5, 9, 5], 'right'));