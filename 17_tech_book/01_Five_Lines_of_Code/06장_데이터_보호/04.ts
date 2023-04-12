// 내부 변형 -> 이 책에서는 이 방법은 더 중요시 함!
class CapitalizedString {
  private value: string;
  constructor(str: string) {
    this.value = capitalize(str);
  }
  print() {
    console.log(this.value);
  }
}

// 외부 변형
class CapitalizedString {
  public readonly value: string;
  constructor(str: string) {
    this.value = capitalize(str);
  }
}

function print(str: CapitalizedString) {
  console.log(str.value);
}
