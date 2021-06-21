const selfDividingNumbers = (left: number, right: number): number[] => {
  const answers = [];

  const hasZero = (num: number) => String(num).includes('0');

  const isSelfDividing = (num: number) => {
    // 1로 나누면 나머지가 무조건 0이므로 1은 제외
    const stringizedNumberElements = String(num).split('').filter((val: string) => val !== '1');

    return stringizedNumberElements.every((stringizedNumber: string) => {
      const convertNummber = +stringizedNumber;

      return num % convertNummber === 0;
    });
  }

  for (let num = left; num <= right; num++) {
    // self-dividing number는 0을 포함할 수 없다.
    if (hasZero(num)) {
      continue;
    }

    if (isSelfDividing(num)) {
      answers.push(num);
    }
  }

  return answers;
};

console.log(selfDividingNumbers(1, 22)); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 15, 22]
console.log(selfDividingNumbers(47, 85)); // [48, 55, 66, 77]