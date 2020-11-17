const jsonStr = '{"drama":"PET","season":2017,"casting":'
  + '["koyuki","matsumoto jun"],"character":["sumire","momo"]}';

console.log(JSON.parse(jsonStr));
console.log(JSON.parse(jsonStr, (key, val) => {
  if (key === 'season') val = 2003;
  return val;
}));

console.log(JSON.parse('13.1'));
console.log(typeof JSON.parse('13.1'));
console.log(JSON.parse('false'));
console.log(typeof JSON.parse('false'));

console.log(JSON.parse('Kiss Carnival'));
console.log(JSON.parse('[2003, 2017]'));
