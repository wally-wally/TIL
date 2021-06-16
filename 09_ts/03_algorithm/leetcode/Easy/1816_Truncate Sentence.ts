const truncateSentence = (s: string, k: number): string => {
  return s.split(' ').slice(0, k).join(' ');
};

console.log(truncateSentence('Hello how are you Contestant', 4)); // 'Hello how are you'
console.log(truncateSentence('What is the solution to this problem', 4)); // 'What is the solution'
console.log(truncateSentence('chopper is not a tanuki', 5)); // 'chopper is not a tanuki'