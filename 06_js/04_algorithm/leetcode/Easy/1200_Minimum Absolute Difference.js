const minimumAbsDifference = (arr) => {
  const arrLength = arr.length;

  arr.sort((a, b) => a - b);

  let minDifference = Number.MAX_SAFE_INTEGER;
  const results = [];

  for (let i = 0; i < arrLength - 1; i++) {
    const difference = arr[i + 1] - arr[i];

    if (minDifference === difference) {
      results.push([arr[i], arr[i + 1]]);
      continue;
    }

    if (minDifference > difference) {
      minDifference = difference;
      results.splice(0, arrLength);
      results.push([arr[i], arr[i + 1]]);
    }
  }

  return results;
}

console.log(minimumAbsDifference([4, 2, 1, 3])); // [[1, 2], [2, 3], [3, 4]]
console.log(minimumAbsDifference([1, 3, 6, 10, 15])); // [[1, 3]]
console.log(minimumAbsDifference([3, 8, -10, 23, 19, -4, -14, 27])); // [[-14, -10], [19, 23], [23, 27]]