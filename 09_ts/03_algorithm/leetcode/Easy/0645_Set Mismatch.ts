const findErrorNums = (nums: number[]): number[] => {
  const numberArr = Array(nums.length).fill(0);
  
  let duplicatedNumber = 0;

  nums.forEach((num) => {
    if (numberArr[num - 1] !== 0) {
      duplicatedNumber = num;
      return;
    }

    numberArr[num - 1] = num;
  });

  const emptyNumber = numberArr.findIndex((num) => num === 0) + 1;

  return [duplicatedNumber, emptyNumber];
};

console.log(findErrorNums([1, 2, 2, 4])); // [2, 3]
console.log(findErrorNums([1, 1])); // [1, 2]
console.log(findErrorNums([3, 2, 3, 4, 6, 5])); // [3, 1]