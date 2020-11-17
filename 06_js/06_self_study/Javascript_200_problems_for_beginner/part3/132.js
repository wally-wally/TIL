const s = new Set();

s.add('one');
s.add(2);
s.add([ 1, 2, 3 ]);
s.add({ a: 'A', b: 'B' });
s.add(function() {});

console.log(s.size);
s.clear();
console.log(s.size);