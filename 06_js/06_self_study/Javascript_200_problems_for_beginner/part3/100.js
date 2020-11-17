const arr = [1, [2, 3], [4, 5, 6], ['배열', '나열하기'], 'JavaScript'];

const result = arr.reduce((acc, el) => {
    return acc.concat(el);
}, []);

console.log(result);