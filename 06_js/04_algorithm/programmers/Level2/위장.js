function solution(clothes) {
  let answer = 1;
  let clothesCountObj = {};
  for (const clothesItem of clothes) {
    const clothesKind = clothesItem[1];
      if (!Object.prototype.hasOwnProperty.call(clothesCountObj, clothesKind)) {
        clothesCountObj[clothesKind] = 1;
        continue;
      }
      clothesCountObj[clothesKind] += 1;
  }
  for (const count in clothesCountObj) {
    answer *= (clothesCountObj[count] + 1)
  }
  return answer - 1;
}

console.log(solution([
  ['yellow_hat', 'headgear'],
  ['blue_sunglasses', 'eyewear'],
  ['green_turban', 'headgear']
]));
console.log(solution([
  ['crow_mask', 'face'],
  ['blue_sunglasses', 'face'],
  ['smoky_makeup', 'face']
]));