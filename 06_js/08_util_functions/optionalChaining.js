// ES2020에 ? 연산자를 활용한 optional chaining 이라는 문법이 새로 추가되었다.
// 하지만 크로스 브라우징에 대처하기 위해서 optional chaining 문법 대신에
// 아래와 같이 별도의 함수를 구성해서 사용할 수 있다.
// 물론 babel에 optional chaining과 관련된 library가 있지만
// 실무 환경에서 큰 프로젝트에 적용할 때 간헐적으로 오류가 발생할 수 있는 다소 risk가 있을 수도 있기 때문에
// 별도의 함수를 구성해서 사용하는 것도 나쁘지 않다.
// 만약 프로젝트에서 최신 브라우저 환경에서만 지원한다고 하면 아래와 같은 함수 대신에
// optional chaining 문법을 바로 사용하는 것이 코드 품질 측면에서 훨씬 더 좋다.

export const deepCheckHasProperty = (obj, properties, idx = 0) => {
  // 두 번째 인자로 확인할 property 모음을 입력하지 않으면 무조건 false 반환
  if (properties === undefined) {
    return false;
  }
  // 모두 다 검사해서 모든 property가 있는 경우 true 반환
  if (properties.length === idx) {
    return true;
  }
  if (obj.hasOwnProperty(properties[idx])) {
    return deepCheckHasProperty(obj[properties[idx]], properties, idx + 1);
  } else {
    return false;
  }
};

let obj = {
  a: {
    b: {
      c: 3
    }
  }
};

console.log(deepCheckHasProperty(obj)); // false
console.log(deepCheckHasProperty(obj, ['a'])); // true
console.log(deepCheckHasProperty(obj, ['a', 'b'])); // true
console.log(deepCheckHasProperty(obj, ['a', 'b', 'c'])); // true
console.log(deepCheckHasProperty(obj, ['a', 'b', 'c', 'd'])); // false
console.log(deepCheckHasProperty(obj, ['a', 'b', 'd'])); // false
console.log(deepCheckHasProperty(obj, ['b', 'a', 'c'])); // false