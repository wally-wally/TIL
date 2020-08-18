// (2) 정적 메서드
// 클래스의 속성은 static 수정자를 속성 앞에 붙여서 정적으로 만들 수 있다.
// 메서드 또한 속성이므로 이름 앞에 static 수정자를 붙여 정적 메서드를 만들 수 있다.
// '클래스 이름.정적 메서드()' 형태로 호출한다.

export class C {
  static whoAreYou(): string {
    return `I'm class C`
  }
}

export class D {
  static whoAreYou(): string {
    return `I'm class D`
  }
}

console.log(C.whoAreYou()) // I'm class C
console.log(D.whoAreYou()) // I'm class D
