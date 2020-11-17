function solution(s){
  let stack = [];
  s.split('').forEach(bracket => {
    if (bracket === '(') {
      stack.push(bracket);
    } else {
      if (stack[stack.length - 1] === '(') {
        stack.pop();
      } else {
        stack.push(bracket);
      }
    }
  })
  return stack.length > 0 ? false : true;
}

console.log(solution('()()'));
console.log(solution('(())()'));
console.log(solution(')()('));
console.log(solution('(()('));