const maximum69Number = (num) => {
  const splitedNumber = String(num).split('');

  const sixNumberIndex = splitedNumber.findIndex((n) => n === '6');

  if (sixNumberIndex === -1) {
    return num;
  }

  splitedNumber[sixNumberIndex] = '9';

  return +splitedNumber.join('');
};

console.log(maximum69Number(9669)); // 9969
console.log(maximum69Number(9996)); // 9999
console.log(maximum69Number(9999)); // 9999