const findTheDifference = (s: string, t: string): string => {
  const getSplitedWord = (word: string) => word.split('');

  const wordElements = getSplitedWord(t);

  for (const alphabet of s) {
    const index = wordElements.indexOf(alphabet);

    wordElements.splice(index, 1);
  }

  return wordElements[0];
};

console.log(findTheDifference('abcd', 'abcde')); // 'e'
console.log(findTheDifference('', 'y')); // 'y'
console.log(findTheDifference('a', 'aa')); // 'a'
console.log(findTheDifference('ae', 'aea')); // 'a'