/**
 * @param {number[]} digits
 * @return {number[]}
 */
const plusOne = (digits) => {
  digits[digits.length - 1] += 1;
  for (let i = digits.length - 1; i >= 0; i -= 1) {
    if (digits[i] <= 9) {
      return digits;
    }
    digits[i] = 0;
    if (i > 0) {
      digits[i - 1] += 1;
    } else {
      digits.unshift(1);
    }
  }
  return digits;
};

console.log(plusOne([4, 3, 2, 1])); // [4, 3, 2, 2]
