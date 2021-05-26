const backspaceCompare = (s, t) => {
  const generateRemoveBackspace = (str) => {
    return str.split('').reduce((acc, curr) => {
      return curr === '#' ? acc.slice(0, -1) : acc + curr;
    }, '');
  }

  return generateRemoveBackspace(s) === generateRemoveBackspace(t);
}

console.log(backspaceCompare('ab#c', 'ad#c')); // true
console.log(backspaceCompare('ab##', 'c#d#')); // true
console.log(backspaceCompare('a##c', '#a#c')); // true
console.log(backspaceCompare('a#c', 'b')); // false