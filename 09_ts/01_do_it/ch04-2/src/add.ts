// (4) 기존에 구현한 add 고차 함수를 좀 더 이해하기 쉬운 형태로 다시 구현
// number 타입의 매개변수를 받아 number 타입의 값을 반환하는 함수 시그니처를 NumberToNumberFunc 타입으로 정의

export type NumberToNumberFunc = (number) => number
export const add = (a: number): NumberToNumberFunc => {
  const _add: NumberToNumberFunc = (b: number): number => {
    return a + b // 클로저 형성
  }
  return _add
}

// 7행의 a는 add 함수의 매개변수이고, b는 _add 함수의 매개변수이다.
// 즉, _add 함수의 관점에서만 보면 a는 외부에서 선언된 변수이다.
// 고차 함수에서는 위 코드와 같은 클로저 기능이 반드시 필요하다.