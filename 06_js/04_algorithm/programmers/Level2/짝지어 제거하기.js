function solution(str) {
  let stack = [];
  str.split('').forEach(s => {
    stack[stack.length - 1] === s ? stack.pop() : stack.push(s);
  })
  return stack.length ? 0 : 1;
}

console.log(solution('baabaa'));
console.log(solution('cdcd'));