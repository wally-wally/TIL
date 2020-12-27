// ES5에서의 리스트 순회
// 리스트
const list = [1, 2, 3, 4, 5];
for (var i = 0; i < list.length; i++) {
  log(list[i]);
}

// 유사 배열
const str = 'abc';
for (var i = 0; i < str.length; i++) {
  log(str[i]);
}

// ES6에서의 리스트 순회
for (const a of list) {
  log(a);
}

for (const a of str) {
  log(a);
}