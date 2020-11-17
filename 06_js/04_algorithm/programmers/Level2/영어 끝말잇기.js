function solution(n, words) {
  let usedWords = [];
  let recentlyWord = '';
  for (let i = 0; i < words.length; i++) {
    const nowWord = words[i];
    if (recentlyWord.length === 0 || recentlyWord[recentlyWord.length - 1] === nowWord[0]) {
      if (!usedWords.includes(nowWord)) {
        recentlyWord = nowWord;
        usedWords.push(nowWord);
        continue;
      }
    }
    return [(i % n) + 1, parseInt(i / n) + 1];
  }
  return [0, 0];
}

console.log(solution(3, ['tank', 'kick', 'know', 'wheel', 'land', 'dream', 'mother', 'robot', 'tank']));