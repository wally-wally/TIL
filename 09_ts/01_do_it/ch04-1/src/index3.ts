// (3) 화살표 함수와 표현식 문

// (3-1) 화살표 함수 작성법
const func1 = function(a: number, b: number): number {
  return a + b
}

const func2 = (a: number, b:number): number => { return a + b } // 실행문 방식
const func3 = (a: number, b:number): number => a + b // 표현식 문

// (3-2) 함수 몸통과 복합 실행문
// 복합 실행문: 중괄호 {}를 이용해서 컴파일러로 하여금 여러 실행문을 한 개처럼 인식하게 한다.
// function 키워드로 만드는 함수는 반드시 몸통을 중괄호로 감싸야 한다.
// 이 때 중괄호는 복합 실행문이므로 함수 몸통은 다음처럼 여러 줄로 구현할 수 있다.
function f() {
  let x = 1, y = 3
  let result = x + y + 5
}

// 또한 복합 실행문은 변수의 유효 범위도 지역 범위로 제한된다.
// 그래서 g1과 g2에 있는 x는 서로 다르며 간섭하지 않는다.
function g1() { let x = 1 }
function g2() { let x = 2 }


// (3-3) return 키워드
// 실행문은 CPU에서 실행된 결과를 알려주지 않는다.
// function multiple(a: number, b: number): number {
//   a * b // 결과 반환 X
// }
// 그래서 실행문 기반 언어는 이 문제를 해결하기 위해 return 키워드를 도입했지만
// 반드시 함수 몸통에서만 사용할 수 있다는 제약이 있다.
function multiple(a: number, b: number): number {
  return a * b // 결과 반환 O
}
// 문법을 잘못 이해해서 아래와 같은 코드를 만드는 것을 방지하기 위함이다.
// if(return x > 0) x = 1


// (3-4) 화살표 함수 작성법
// 위에서 구현한 multiple 함수를 화살표 함수로 구현하면 다음과 같다.
const arrowMultiple = (a: number, b: number): number => {
  return a * b;
}
// a * b 표현식은 값을 반환하는 실행문이므로 return 키워드를 생략할 수 있다.
const shortenArrowMultiple = (a: number, b: number): number => a * b;