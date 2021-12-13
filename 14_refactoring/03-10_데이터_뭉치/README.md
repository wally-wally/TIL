# 03-10. 데이터 뭉치

<br>

## :hand: Intro

- 클래스 추출하기 기법으로 필드 형태의 데이터 뭉치를 찾아서 하나의 객체로 묶는다.
- 매개변수 객체 만들기나 객체 통째로 넘기기를 적용해서 매개변수 수를 줄여 본다.
- 데이터 뭉치인지 판별하려면 값 하나를 삭제해보자. 그랬을 때 나머지 데이터만으로는 의미가 없다면 객체로 환생하길 갈망하는 데이터 뭉치라는 뜻이다.

<br>

## (1) 클래스 추출하기

- 메서드와 데이터가 너무 많은 클래스는 이해하기가 쉽지 않으니 잘 살펴보고 적절히 분리하는 것이 좋다.
  - 특히 일부 데이터와 메서드를 따로 묶을 수 있다면 어서 분리하라는 신호다.

- 함께 변경되는 일이 많거나 서로 의존하는 데이터들도 분리한다.
- 리팩토링 절차
  - 클래스의 역할을 분리할 방법을 정함
  - 분리될 역할을 담당할 클래스를 새로 만듬
  - 원래 클래스의 생성자에서 새로운 클래스의 인스턴스를 생성하여 필드에 저장해둠
  - 분리될 역할에 필요한 필드들을 새 클래스로 옮김
  - 메서드들도 새 클래스로 옮김. 이 때 저수준 메서드, 즉 다른 메서드를 호출하기보다는 호출을 당하는 일이 많은 메서드부터 옮긴다.
  - 양쪽 클래스의 인터페이스를 살펴보면서 불필요한 메서드를 제거하고, 이름에 새로운 환경에 맞게 바꾼다.
  - 새 클래스를 외부로 노출할지 정한다. 노출하려거든 새 클래스에 참조를 값으로 바꾸기를 적용할지 고민해본다.

---

- 예시) `Person` 클래스 - 전화번호 관련 동작을 별도 클래스의 뽑아내기

```javascript
// before

class Person {
  get name() {
    return this._name;
  }
    
  set name(arg) {
    this._name = arg;
  }
    
  get telephoneNumber() {
    return `${this.officeAreaCode} ${this.officeNumber}`;
  }
    
  get officeAreaCode() {
    return this._officeAreaCode;
  }
    
  set officeAreaCode(arg) {
    this._officeAreaCode = arg;
  }
    
  get officeNumber() {
    return this._officeNumber;
  }
    
  set officeNumber(arg) {
    this._officeNumber = arg;
  }
}
```

```javascript
// after

class Person {
  constructor() {
    this._telephoneNumber = new TelephoneNumber();
  }
    
  get officeAreaCode() {
    return this._telephoneNumber.areaCode;
  }
    
  set officeAreaCode(arg) {
    this._telephoneNumber.areaCode = arg;
  }
    
  get officeNumber() {
    return this._telephoneNumber.number;
  }
    
  set officeNumber(arg) {
    this._telephoneNumber.number = arg;
  }
    
  get telephoneNumber() {
    rethir.this._telephoneNumber.toString();
  }
}

class TelephoneNumber {
  get areaCode() {
    return this._areaCode;
  }
    
  set areaCode(arg) {
    this._areaCode = arg;
  }
    
  get number() {
    return this._number;
  }
    
  set number(arg) {
    this._number = arg;
  }
    
  toString() {
    return `${this.areaCode} ${this.number}`;
  }
}
```

