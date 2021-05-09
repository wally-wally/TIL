const maxScore = (s) => {
  const stringLength = s.length;

  return s.split('').reduce((acc, _, index) => {
    if (index === 0) {
      return 0;
    }

    const leftSubstring = s.slice(0, index);
    const rightSubstring = s.slice(index, stringLength);

    const zeroCount = (leftSubstring.match(/0/g) || []).length;
    const oneCount = (rightSubstring.match(/1/g) || []).length;

    return Math.max(acc, zeroCount + oneCount);
  }, 0);
};

console.log(maxScore('011101')); // 5
console.log(maxScore('00111')); // 5
console.log(maxScore('1111')); // 3