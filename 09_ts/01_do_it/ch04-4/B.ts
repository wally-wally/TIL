// 클래스 A는 구현하기도 번거롭고 가독성도 떨어짐
// 타입스크립트는 클래스 속성 중 함수 표현식을 담는 속성인 function 키워드를 생략할 수 있게 하는 단축 구문을 제공함

export class B {
  constructor(public value: number = 1) {}
  method(): void {
    console.log(`value: ${this.value}`)
  }
}