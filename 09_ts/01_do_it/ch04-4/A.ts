// (1) function 함수와 this 키워드
// 타입스크립트에서 function 키워드로 만든 함수에 this 키워드를 사용할 수 있다.
// 반면에 화살표 함수에서는 this 키워드를 사용할 수 없다.

// 클래스 A의 method 속성은 () => void 타입의 함수 표현식을 설정함

export class A {
  value: number = 1
  method: () => void = function(): void {
    console.log(`value: ${this.value}`)
  }
}