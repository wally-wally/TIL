const map = new Map();

map.set('one', 1);
map.set('two', 2);

console.log(map.get('one'));
console.log(map.has('one'));
map.delete('one');

console.log(map.has('one'));
console.log(map.has('two'));