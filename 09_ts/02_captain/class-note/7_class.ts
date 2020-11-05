class Person {
  // Typescript의 class에서는 class에서 사용할 멤버 변수(속성)들을 최상단에 정의해줘야 한다.
  private name: string; // class 내에서만 사용
  public age: number; // 기본
  readonly log: string; // 접근만 가능 변경 불가능(읽기만 가능)

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}