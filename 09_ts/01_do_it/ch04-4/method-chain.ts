// (3) 메서드 체인
// 객체의 메서드를 이어서 계속 호출하는 방식을 메서드 체인이라고 한다.
// 타입스크립트로 메서드 체인을 구현하려면 메서드가 항상 this를 반환하게 해야 한다.

export class Calculator {
  constructor(public value: number = 0) {}
  add(value: number) {
    this.value += value
    return this
  }
  multiply(value: number) {
    this.value *= value
    return this
  }
}