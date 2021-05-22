const findWords = (words) => {
  const getWordInfo = (originalWords) => originalWords.map((word) => {
    return {
      alphabets: [...new Set(word.toLowerCase().split(''))],
      originalWord: word,
    };
  });
  
  const keyboardLines = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];

  const findKeyboardLineIndex = (alphabet) => {
    return keyboardLines.findIndex((keyboardLine) => keyboardLine.includes(alphabet));
  }

  const isAvailableMakeOneRowKeyboard = ({ alphabets }) => {
    const indexes = alphabets.map((alphabet) => findKeyboardLineIndex(alphabet));
    const uniqueIndexes = new Set(indexes);
    return uniqueIndexes.size === 1;
  };

  return getWordInfo(words)
    .filter(isAvailableMakeOneRowKeyboard)
    .map(({ originalWord }) => originalWord);
}

console.log(findWords(['Hello', 'Alaska', 'Dad', 'Peace'])); // ['Alaska', 'Dad']
console.log(findWords(['omk'])); // []
console.log(findWords(['adsdf', 'sfd'])); // ['adsdf', 'sfd']