const solution = (numbers) => numbers.reduce((acc, curr) => acc -= curr, 45);

console.log(solution([1, 2, 3, 4, 6, 7, 8, 0])); // 14
console.log(solution([5, 8, 4, 0, 6, 7, 9])); // 6