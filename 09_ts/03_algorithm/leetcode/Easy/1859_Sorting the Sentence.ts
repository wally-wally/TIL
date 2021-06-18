const sortSentence = (s: string): string => {
  const sortedSentence = s.split(' ').sort((a: string, b: string) => {
    const aIndex = Number(a.slice(-1));
    const bIndex = Number(b.slice(-1));

    return aIndex - bIndex;
  });

  return sortedSentence.map((str: string) => str.slice(0, str.length - 1)).join(' ');
};

console.log(sortSentence('is2 sentence4 This1 a3')); // 'This is a sentence'
console.log(sortSentence('Myself2 Me1 I4 and3')); // 'Me Myself and I'