const toGoatLatin = (sentence: string): string => {
  const vowel = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];

  const maStr = 'ma';

  const words = sentence.split(' ').reduce((goatLatinWords, word, index) => {
    const newWord = vowel.includes(word[0]) ? word : word.slice(1, word.length) + word[0];

    const repeatAStr = 'a'.repeat(index + 1);

    const goatLatinWord = `${newWord}${maStr}${repeatAStr}`;

    return [...goatLatinWords, goatLatinWord];
  }, []);

  return words.join(' ');
};

console.log(toGoatLatin('I speak Goat Latin'));
// 'Imaa peaksmaaa oatGmaaaa atinLmaaaaa'
console.log(toGoatLatin('The quick brown fox jumped over the lazy dog'));
// 'heTmaa uickqmaaa rownbmaaaa oxfmaaaaa umpedjmaaaaaa overmaaaaaaa hetmaaaaaaaa azylmaaaaaaaaa ogdmaaaaaaaaaa'