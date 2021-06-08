const findAndReplacePattern = (words: string[], pattern: string): string[] => {
  const getIndexInfo = (word: string) => {
    const indexObj = word.split('').reduce((info, str, index) => {
      return {
        ...info,
        [str]: info.hasOwnProperty(str) ? [...info[str], index] : [index],
      }
    }, {});

    return Object.values(indexObj).sort((a, b) => a[0] - b[0]);
  }

  const patternIndexes = JSON.stringify(getIndexInfo(pattern));

  const compareWords = (word: string): boolean => {
    const wordIndexes = getIndexInfo(word);

    return patternIndexes === JSON.stringify(wordIndexes);
  }

  return words.reduce((result: string[], word: string) => {
    return compareWords(word) ? [...result, word] : result;
  }, []);
}

console.log(findAndReplacePattern(['abc','deq','mee','aqq','dkd','ccc'], 'abb')); // ['mee','aqq']
console.log(findAndReplacePattern(['a', 'b', 'c'], 'a')); // ['a', 'b', 'c']