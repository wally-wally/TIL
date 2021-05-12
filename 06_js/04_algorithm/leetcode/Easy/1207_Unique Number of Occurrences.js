const uniqueOccurrences = (arr) => {
  const numberCountObj = arr.reduce((acc, curr) => {
    return {
      ...acc,
      [curr]: acc.hasOwnProperty(curr) ? acc[curr] + 1 : 1,
    }
  }, {});

  const numberCountArr = Object.values(numberCountObj);

  return numberCountArr.length === new Set(numberCountArr).size;
};

console.log(uniqueOccurrences([1, 2, 2, 1, 1, 3])); // true
console.log(uniqueOccurrences([1, 2])); // false
console.log(uniqueOccurrences([-3, 0, 1, -3, 1, 1, 1, -3, 10, 0])); // true