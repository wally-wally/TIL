/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var complexNumberMultiply = function(a, b) {
  const SPLIT_DIGIT = complexNumber => {
    const [REAL, IMAG] = complexNumber.split('+');
    return [Number(REAL), Number(IMAG.slice(0, -1))];
  }
  
  const [REAL_A, IMAG_A] = SPLIT_DIGIT(a);
  const [REAL_B, IMAG_B] = SPLIT_DIGIT(b);
  
  const REAL_DIGIT = (REAL_A * REAL_B) - (IMAG_A * IMAG_B);
  const IMAG_DIGIT = (REAL_A * IMAG_B) + (IMAG_A * REAL_B);
  
  return `${REAL_DIGIT}+${IMAG_DIGIT}i`;
};
