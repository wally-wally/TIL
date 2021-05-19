const solution = (numbers) => {
  const changeBit = (number) => {
    // 짝수인 경우
    // 마지막 비트만 1로 바꾸면 된다.
    if (!(number % 2)) {
      return number + 1;
    }

    // 홀수인 경우
    // 우선 0인 비트 중 최하위 비트를 1로 바꾼다.
    // 그 중에서 가장 작은 수를 찾아야 하므로 방금 전 0에서 1로 바꾼 비트 위치보다 아래에 있는 1들 중
    // 가장 상위에 있는 비트를 0으로 바꾸면 된다.
    const binaryNumber = number.toString(2).split('');
    
    let lowerZeroBitIndex = binaryNumber.lastIndexOf('0');

    if (lowerZeroBitIndex === -1) {
      binaryNumber.unshift('0');
      lowerZeroBitIndex = 0;
    }

    const oneBitIndex = binaryNumber.indexOf('1', lowerZeroBitIndex);

    binaryNumber[lowerZeroBitIndex] = '1';

    binaryNumber[oneBitIndex] = '0';

    return parseInt(binaryNumber.join(''), 2);
  }

  return numbers.map(changeBit);
}

console.log(solution([2, 7])); // [3, 11]