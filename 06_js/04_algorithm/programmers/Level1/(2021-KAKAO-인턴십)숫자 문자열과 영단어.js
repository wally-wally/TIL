const solution = (s)=> {
  const numberMap = new Map([
    ['zero', 0],
    ['one', 1],
    ['two', 2],
    ['three', 3],
    ['four', 4],
    ['five', 5],
    ['six', 6],
    ['seven', 7],
    ['eight', 8],
    ['nine', 9],
  ]);
  
  const convertResult = [...numberMap.keys()].reduce((result, engNumber) => {
    const number = numberMap.get(engNumber);

    return result.replace(new RegExp(engNumber, 'g'), number);
  }, s);

  return +convertResult;
}

console.log(solution('one4seveneight')); // 1478
console.log(solution('23four5six7')); // 234567
console.log(solution('2three45sixseven')); // 234567
console.log(solution('123')); // 123