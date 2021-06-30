const squareIsWhite = (coordinates: string): boolean => {
  const [ alphabet, num ] = coordinates.split('');

  const chessboardLine = [
    ['a', 'c', 'e', 'g'],
    ['b', 'd', 'f', 'h'],
  ];

  return chessboardLine[+num % 2].includes(alphabet);
};

console.log(squareIsWhite('a1')); // false
console.log(squareIsWhite('h3')); // true
console.log(squareIsWhite('c7')); // false