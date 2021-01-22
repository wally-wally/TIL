/**
 * @param {number} x
 * @return {number}
 */
const reverse = (x) => {
  const STRINGIZE_NUMBER = String(x);
  const START_SLICE_INDEX = STRINGIZE_NUMBER[0] === '-' ? 1 : 0;
  const REVERSED_NUMBER = STRINGIZE_NUMBER.split('').slice(START_SLICE_INDEX, STRINGIZE_NUMBER.length).reverse().join('');
  const TEMP_RESULT = Number(`${START_SLICE_INDEX ? '-' : ''}${REVERSED_NUMBER}`);
  if (TEMP_RESULT >= -Math.pow(2, 31) && TEMP_RESULT <= Math.pow(2, 31) - 1) {
    return TEMP_RESULT;
  } else {
    return 0;
  }
};
