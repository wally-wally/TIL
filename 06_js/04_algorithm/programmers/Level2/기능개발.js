function solution(progresses, speeds) {
  let workDays = [];
  for (let i = 0; i < progresses.length; i++) {
    workDays.push(Math.ceil((100 - progresses[i]) / speeds[i]));
  }

  let criteriaDay = 0;
  let checkDays = 0;
  let answer = [];
  for (let j = 0; j < workDays.length; j++) {
    if (criteriaDay === 0) {
      criteriaDay = workDays[j];
      checkDays = 1;
      continue;
    }
    if (criteriaDay < workDays[j]) {
      answer.push(checkDays);
      criteriaDay = workDays[j];
      checkDays = 1;
    } else {
      checkDays += 1;
    }
  }
  answer.push(checkDays);
  return answer;
}

console.log(solution([93, 30, 55], [1, 30, 5])); // [2, 1]
console.log(solution([95, 90, 99, 99, 80, 99], [1, 1, 1, 1, 1, 1])); // [1, 3, 2]