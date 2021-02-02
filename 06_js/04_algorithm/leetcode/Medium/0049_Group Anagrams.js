/**
 * @param {string[]} strs
 * @return {string[][]}
 */
const groupAnagrams = (strs) => {
  let wordMap = new Map();
  
  const makeSortedWordLetterr = (word) => {
    return word.split('').sort().join('');  
  }
  
  strs.forEach((str) => {
    const reWord = makeSortedWordLetterr(str);
    if (wordMap.has(reWord)) {
      wordMap.get(reWord).push(str);
    } else {
      wordMap.set(reWord, [str]);
    }
  })
  
  return Array.from(wordMap.values()).map((words) => words);
};

groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']);
