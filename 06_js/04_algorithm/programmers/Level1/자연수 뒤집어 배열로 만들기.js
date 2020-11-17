function solution(n) {
  let answer = [];
  let string_num = n.toString();
  for (let i = string_num.length - 1; i >= 0; i--) {
    answer.push(parseInt(string_num[i]));
  }
  return answer;
}