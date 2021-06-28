const isSubsequence = (s: string, t: string): boolean => {
  let matchIndex = 0;

  for (const letter of t) {
    if (s[matchIndex] === letter) {
      matchIndex += 1;
    }

    if (matchIndex === s.length) {
      return true;
    }
  }

  return matchIndex === s.length;
};

console.log(isSubsequence('abc', 'ahbgdc')); // true
console.log(isSubsequence('axc', 'ahbgdc')); // false
console.log(isSubsequence('', '')); // true