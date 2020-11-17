function solution(n, arr1, arr2) {
  let answer = [];
  for (let i = 0; i < n; i++) {
    let binaryNumber1 = arr1[i].toString(2);
    let binaryNumber2 = arr2[i].toString(2);
    if (n !== binaryNumber1.length) {
      binaryNumber1 = '0'.repeat(n - binaryNumber1.length) + binaryNumber1;
    }
    if (n !== binaryNumber2.length) {
      binaryNumber2 = '0'.repeat(n - binaryNumber2.length) + binaryNumber2;
    }
    let line = [];
    for (let j = 0; j < n; j++) {
      line.push(binaryNumber1[j] === '0' && binaryNumber2[j] === '0' ? ' ' : '#');
    }
    answer.push(line.join(''));
  }
  return answer;
}

console.log(solution(5, [9, 20, 28, 18, 11], [30, 1, 21, 17, 28]))