const s = new Set();

s.add('one');
s.add('two');
s.add('three');

const keys = s.keys();
const values = s.values();
const entries = s.entries();

console.log(keys.next().value);
console.log(values.next().value);
console.log(entries.next().value);

console.log(keys);
console.log(values);
console.log(entries);