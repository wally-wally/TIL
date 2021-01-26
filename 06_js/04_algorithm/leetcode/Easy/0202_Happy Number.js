/**
 * @param {number} n
 * @return {boolean}
 */
const isHappy = (n) => {
  // [prechecker] n이 1이거나 n의 맨 앞자리가 1이고 나머지는 0인 경우
  const reg = /^1{1}(0)+$/;
  if (n === 1 || reg.test(n)) {
    return true;
  }

  const uniqueNumbers = new Set();

  const calcHappyNumber = (number) => String(number).split('').reduce(
    (acc, curr) => {
      acc += Number(curr) ** 2;
      return acc;
    },
    0,
  );

  let nowHappyNumber = 0;

  while (nowHappyNumber !== 1) {
    nowHappyNumber = calcHappyNumber(n);
    if (uniqueNumbers.has(nowHappyNumber)) {
      return false;
    }
    uniqueNumbers.add(nowHappyNumber);
    n = nowHappyNumber;
  }
  return true;
};

isHappy(19); // true
