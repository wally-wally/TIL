/**
 * @param {number} num
 * @return {number}
 */
const addDigits = (num) => {
  while (true) {
    const STRINGIZE_NUMBER = num.toString();
    let digitSum = 0;
    for (const DIGIT_NUMBER of STRINGIZE_NUMBER) {
      digitSum += Number(DIGIT_NUMBER);
    }
    if (digitSum <= 9) {
      return digitSum;
    }
    num = digitSum;
  }
};
