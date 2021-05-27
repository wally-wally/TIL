const sortArrayByParity = (nums) => {
  const evenNumbers = nums.filter((num) => num % 2 === 0);
  const oddNumbers = nums.filter((num) => num % 2 === 1);
    
  return [...evenNumbers, ...oddNumbers];
}

console.log(sortArrayByParity([3, 1, 2, 4])); // [2, 4, 3, 1]