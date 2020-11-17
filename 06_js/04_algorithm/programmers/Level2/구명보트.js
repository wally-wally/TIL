function solution(people, limit) {
  let answer = 0;
  const sortedPeople = people.sort((a, b) => a - b);

  let i = 0;
  for (let j = people.length - 1; i <= j; j--) {
    if (sortedPeople[i] + sortedPeople[j] <= limit) {
      i += 1;
    }
    answer += 1;
  }

  return answer;
}

console.log(solution([70, 50, 80, 50], 100)); // 3
console.log(solution([70, 80, 50], 100)); // 3