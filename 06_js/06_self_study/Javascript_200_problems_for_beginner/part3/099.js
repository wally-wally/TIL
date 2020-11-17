const numArr = [1, 2, 3, 4, 5];

const result = numArr.reduce((acc, el) => {
	return acc + el
}, 0);

console.log(result);
