const countBits = (num) => Array(num + 1).fill().map((_, idx) => idx.toString(2).replace(/0/g, '').length);

console.log(countBits(5)); // [0, 1, 1, 2, 1, 2]