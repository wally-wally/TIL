const solution = (lottos, win_nums) => {
  // [prechecker1] lottos의 원소가 모두 0이면 답은 무조건 [1, 6]
  const noDuplicateLottoNumbers = [...new Set(lottos)];
  if (noDuplicateLottoNumbers.length === 1 && noDuplicateLottoNumbers[0] === 0) {
    return [1, 6];
  }

  // [utils] 두 배열 교집합의 원소 구하기
  const intersection = (arr1, arr2) => {
    return arr1.filter((element) => arr2.includes(element)).length;
  }

  // [prechecker2] lottos, win_nums 모두 0이 아닌 숫자들이 있는 경우 lottos와 win_nums의 구성 원소가 똑같으면 답은 무조건 [1, 1]
  if (!noDuplicateLottoNumbers.includes(0)) {
    // [utils] 두 배열 일치 여부 함수
    const isEqual = (arr1, arr2) => {
      const sortedArr1 = arr1.sort();
      const sortedArr2 = arr2.sort();

      for (let idx = 0; idx < arr1.length; idx++) {
        if (sortedArr1[idx] !== sortedArr2[idx]) {
          return false;
        }
      }

      return true;
    }

    if (isEqual(lottos, win_nums)) {
      return [1, 1];
    }
  }

  const zeroCount = lottos.filter((number) => number === 0).length;
  const noZeroLottoNumbers = lottos.filter((number) => number !== 0);

  const matchedNumberCount = intersection(noZeroLottoNumbers, win_nums);

  const minRank = matchedNumberCount === 0 ? 6 : 7 - matchedNumberCount;
  const maxRank = minRank - zeroCount;

  return [maxRank, minRank];
}

console.log(solution([44, 1, 0, 0, 31, 25], [31, 10, 45, 1, 6, 19])); // [3, 5]
console.log(solution([0, 0, 0, 0, 0, 0], [38, 19, 20, 40, 15, 25])); // [1, 6]
console.log(solution([45, 4, 35, 20, 3, 9], [20, 9, 3, 45, 4, 35])); // [1, 1]
console.log(solution([1, 2, 3, 4, 5, 6], [3, 4, 5, 6, 7, 8])); // [3, 3]
console.log(solution([1, 2, 3, 4, 5, 6], [7, 8, 9, 10, 11, 12])); // [6, 6]