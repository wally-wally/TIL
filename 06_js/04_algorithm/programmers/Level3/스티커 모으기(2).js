const solution = (sticker) => {
  const stickerCount = sticker.length;

  // [prechecker] sticker 배열의 원소가 하나인 경우
  if (stickerCount === 1) {
    return sticker[0];
  }

  // maxStickerTable1과 maxStickerTable2의 각 원소의 값은 각 스티커를 떼는 경우의 최댓값을 담음(DP로 해결)

  // 맨 앞 스티커를 뗀 경우
  const maxStickerTable1 = new Array(stickerCount + 2).fill(0);

  maxStickerTable1[0] = sticker[0];
  maxStickerTable1[1] = sticker[0];

  for (let idx = 2; idx < stickerCount - 1; idx++) {
    maxStickerTable1[idx] = Math.max(maxStickerTable1[idx - 1], maxStickerTable1[idx - 2] + sticker[idx]);
  }

  const maxValue1 = Math.max(...maxStickerTable1);

  // 맨 앞 스티커를 떼지 않은 경우
  const maxStickerTable2 = new Array(stickerCount).fill(0);

  maxStickerTable2[0] = 0;
  maxStickerTable2[1] = sticker[1];

  for (let idx = 2; idx < stickerCount; idx++) {
    maxStickerTable2[idx] = Math.max(maxStickerTable2[idx - 1], maxStickerTable2[idx - 2] + sticker[idx]);
  }

  const maxValue2 = Math.max(...maxStickerTable2);

  // 최종적으로 Math.max(...maxStickerTable1, ...maxStickerTable2); 로도 작성할 수 있지만
  // 효율성 테스트에서 런타임 에러가 발생하니 주의하자!
  return Math.max(maxValue1, maxValue2);
}

console.log(solution([14, 6, 5, 11, 3, 9, 2, 10])); // 36
console.log(solution([1, 3, 2, 5, 4])); // 8