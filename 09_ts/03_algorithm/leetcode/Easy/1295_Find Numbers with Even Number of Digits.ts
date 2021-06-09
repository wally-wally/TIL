const findNumbers = (nums: number[]): number => {
  return nums.filter((num) => !(String(num).length % 2)).length;
};

console.log(findNumbers([12, 345, 2, 6, 7896])); // 2
console.log(findNumbers([555, 901, 482, 1771])); // 1