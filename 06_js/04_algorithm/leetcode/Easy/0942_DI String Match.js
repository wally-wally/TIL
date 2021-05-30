const diStringMatch = (s) => {
  const diStringLegnth = s.length;

  const isIOpertaion = (operation) => operation === 'I';

  const { permutation, startIdx } = s.split('').reduce((acc, curr) => {
    const nextPermutationElement = isIOpertaion(curr) ? acc.startIdx : acc.endIdx;
    const nextStartIdx = isIOpertaion(curr) ? acc.startIdx + 1 : acc.startIdx;
    const nextEndIdx = !isIOpertaion(curr) ? acc.endIdx - 1 : acc.endIdx;

    return {
      permutation: [...acc.permutation, nextPermutationElement],
      startIdx: nextStartIdx,
      endIdx: nextEndIdx,
    }
  }, {
    permutation: [],
    startIdx: 0,
    endIdx: diStringLegnth
  });

  return [...permutation, startIdx];
}

console.log(diStringMatch('IDID')); // [0, 4, 1, 3, 2]
console.log(diStringMatch('III')); // [0, 1, 2, 3]
console.log(diStringMatch('DDI')); // [3, 2, 0, 1]