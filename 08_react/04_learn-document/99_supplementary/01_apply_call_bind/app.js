const obj = {
  'name': 'wally',
  'age': 28,
};

function a(x, y, z) {
  console.log(this);
  console.log(x, y, z);
};

// call과 apply는 즉시 호출하는 명령
a.call(obj, 1, 2, 3);
a.call(obj, 1, 2); // 마지막 z값은 undefined

a.apply(obj, [1, 2, 3]);

let b = a.bind(obj, 1, 2, 3); // bind는 새로운 함수를 생성할 뿐 호출을 담당하지는 않음
b();

let c = a.bind(obj, 1, 2);
c(3); // 위 코드와 동일한 결과