function sum() {
  var total = 0;
  for (var i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  console.log(arguments instanceof Array);
  return total;
}

var sumOf1to3 = sum(1, 2, 3);
console.log(sumOf1to3);

function testArg() {
  var newArr = Array.prototype.slice.call(arguments);
  console.log(newArr);
  console.log(newArr.indexOf('b'));
  console.log(arguments.indexOf('b'));
}

testArg('a', 'b');