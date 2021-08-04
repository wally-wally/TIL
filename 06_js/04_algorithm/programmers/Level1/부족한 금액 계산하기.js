const solution = (price, money, count) => {
  const necessaryTotalPrice = Array(count).fill().map((_, playCount) => price * (playCount + 1));

  const sumNecessaryTotalPrice = necessaryTotalPrice.reduce((acc, curr) => acc += curr, 0);

  return sumNecessaryTotalPrice > money ? sumNecessaryTotalPrice - money : 0;
}

console.log(solution(3, 20, 4)); // 10