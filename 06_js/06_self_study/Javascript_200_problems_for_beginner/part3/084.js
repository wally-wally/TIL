const prevList = [1, 2, 3];
const currentList = [4, 5, 6];
const nextList = [7, 8, 9];

console.log(prevList.concat(currentList));
console.log(prevList.concat(currentList, nextList));

console.log(['배열'].concat('합치기'));
console.log(['배열'].concat('합치기', 'JavaScript200'));