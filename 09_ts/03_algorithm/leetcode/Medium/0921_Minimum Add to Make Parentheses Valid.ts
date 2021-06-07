const minAddToMakeValid = (s: string): number => {
  let addParenthesesCount = 0;

  const stack = [];

  for (const str of s) {
    if (str === '(') {
      stack.push(str);
      continue;
    }

    if (stack.length && stack[stack.length - 1] === '(') {
      stack.pop();
      continue;
    }

    addParenthesesCount += 1;
  }

  return addParenthesesCount + stack.length;
};

console.log(minAddToMakeValid('())')); // 1
console.log(minAddToMakeValid('(((')); // 3
console.log(minAddToMakeValid('()')); // 0
console.log(minAddToMakeValid('()))((')); // 4