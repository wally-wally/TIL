function solution(arr) {
  let sum_value = 0
  for (let i = 0; i < arr.length; i++) {
      sum_value += arr[i]
  }
  return sum_value / arr.length
}

console.log(solution[1, 2, 3, 4])
console.log(solution[5, 3, 4])