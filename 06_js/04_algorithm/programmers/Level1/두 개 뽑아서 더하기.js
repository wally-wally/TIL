function solution(numbers) {
  const answer = new Set();
  const numbersCount = numbers.length;
  for (let i = 0; i < numbersCount; i++) {
    for (let j = i + 1; j < numbersCount; j++) {
      answer.add(numbers[i] + numbers[j]);
    }
  }
  return Array.from(answer).sort((a, b) => a - b);
}

console.log(solution([2, 1, 3, 4, 1]));
console.log(solution([5, 0, 2, 7]));