interface Developer {
  name: string;
  skill: string;
}

interface Person {
  name: string;
  age: number;
}

function introduce(): Developer | Person {
  return { name: 'Tommy', age: 30, skill: 'Vue.js' }
}
var tommy = introduce();

// union type은 공통적으로 가지고 있는 속성에만 접근할 수 있다.
// console.log(tommy.skill); // 그래서 skill에는 접근 불가
console.log(tommy.name);

// 그래서 타입 단언을 이용하면 skill에 접근할 수 있다.
// tommy의 타입을 Developer라고 타입 단언을 했기 때문에 skill에 접근할 수 있다.
if ((tommy as Developer).skill) {
  var skill = (tommy as Developer).skill;
  console.log(skill);
} else if ((tommy as Person).age) {
  var age = (tommy as Person).age;
  console.log(age);
}

// 하지만 위와 같은 타입 단언을 이용한 코드는 가독성이 다소 떨어진다.
// 그래서 타입 가드를 이용하면 이러한 문제를 해결할 수 있다.

// 타입 가드 정의
function isDeveloper(target: Developer | Person): target is Developer {
  return (target as Developer).skill !== undefined;
}

if (isDeveloper(tommy)) {
  console.log(tommy.skill);
} else {
  console.log(tommy.age);
}