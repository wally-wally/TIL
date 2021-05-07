const reverseOnlyLetters = (s) => {
  const alphabetReg = /[a-zA-Z]/;
  
  const splitedLetters = [];
  const alphabets = [];
  
  for (const letter of s) {
    if (alphabetReg.test(letter)) {
      alphabets.push(letter);
      splitedLetters.push('');
      continue;
    }

    splitedLetters.push(letter);
  }

  for (let idx = 0; idx < s.length; idx++) {
    if (splitedLetters[idx] === '') {
      const popAlphabet = alphabets.pop();
      splitedLetters[idx] = popAlphabet;
    }
  }

  return splitedLetters.join('');
}

console.log(reverseOnlyLetters('ab-cd')); // 'dc-ba'
console.log(reverseOnlyLetters('a-bC-dEf-ghIj')); // 'j-Ih-gfE-dCba'
console.log(reverseOnlyLetters('Test1ng-Leet=code-Q!')); // 'Qedo1ct-eeLg=ntse-T!'