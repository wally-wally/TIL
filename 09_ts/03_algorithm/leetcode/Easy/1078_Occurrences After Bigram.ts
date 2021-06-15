const findOcurrences = (text: string, first: string, second: string): string[] => {
  const splitedText = text.split(' ');

  if (splitedText.length <= 2) {
    return [];
  }

  let answer = [];

  for (let idx = 0; idx < splitedText.length - 2; idx++) {
    if (splitedText[idx] === first && splitedText[idx + 1] === second) {
      answer.push(splitedText[idx + 2]);
    }
  }

  return answer;
};

console.log(findOcurrences('alice is a good girl she is a good student', 'a', 'good')); // ['girl', 'student']
console.log(findOcurrences('we will we will rock you', 'we', 'will')); // ['we', 'rock']