const isPalindrome = (s) => {
  const nonAlphabetReg = /[^a-zA-Z0-9]/g;

  const onlyAlphabetString = s.replace(nonAlphabetReg, '').toLowerCase();

  const reversedOnlyAlphabetString = onlyAlphabetString.split('').reverse().join('');

  return onlyAlphabetString === reversedOnlyAlphabetString;
}

console.log(isPalindrome('A man, a plan, a canal: Panama')); // true
console.log(isPalindrome('race a car')); // false