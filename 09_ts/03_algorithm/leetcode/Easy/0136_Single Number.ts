const singleNumber = (nums: number[]): number => {
  return nums.reduce((tempArr: number[], num: number) => {
    if (tempArr.includes(num)) {
      tempArr.splice(tempArr.indexOf(num), 1);
    } else {
      tempArr.push(num);
    }

    return tempArr;
  }, [])[0];
};

console.log(singleNumber([2, 2, 1])); // 1
console.log(singleNumber([4, 1, 2, 1, 2])); // 4
console.log(singleNumber([1])); // 1