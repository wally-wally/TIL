/**
 * @param {number} num
 * @return {string}
 */
const intToRoman = (num) => {
  const romanInfo = {
    'M': 1000,
    'CM': 900,
    'D': 500,
    'CD': 400,
    'C': 100,
    'XC': 90,
    'L': 50,
    'XL': 40,
    'X': 10,
    'IX': 9,
    'V': 5,
    'IV': 4,
    'I': 1,
  };
  
  return Object.entries(romanInfo).reduce((acc, [currentRoman, currentValue]) => {
    const quotient = parseInt(num / currentValue);
    const remainder = num % currentValue;
    num = remainder;
    return acc += currentRoman.repeat(quotient);
  }, '');
};

console.log(intToRoman(4));
