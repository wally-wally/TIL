# 03-11. 기본형 집착

<br>

## (1) 기본형을 객체로 바꾸기

- 단순한 출력 이상의 기능이 필요해지는 순간 그 데이터를 표현하는 전용 클래스를 정의한다.
  - 시작은 기본형 데이터를 단순히 감싼 것과 큰 차이가 없을 것이라 효과가 미미하지만 나중에 특별한 동작이 필요해지면 이 클래스에 추가하면 되므로 프로그램이 커질수록 점점 유용한 도구가 된다.
- 기본형을 객체로 바꾸기 기법을 통해서 알맞은 데이터 타입을 생성해준다.
- 문자열 리터럴이나 숫자로 해당 데이터들을 바로 다루지 않고 primitive 데이터들을 객체로 관리하여 데이터에 로직이 추가될 때 메소드로 이를 용이하게 관리할 수 있는 리팩토링 기법이다.

<br>

## (2) 타입 코드를 서브클래스로 바꾸기

- 타입 코드는 프로그래밍 언어에 따라 열거형이나 심볼, 문자열, 숫자 등으로 표현하며, 외부 서비스가 제공하는 데이터를 다루려 할 때 딸려오는 일이 흔하다.
- 타입 코드만으로는 특별히 불편한 상황은 별로 없지만 <u>그 이상</u>(서브클래스)의 무언가가 필요할 때가 있다.
  - 서브클래스를 통해서 관계를 더 명확하게 드러내준다.
- 서브클래스의 매력
  - 조건에 따라 다르게 동작하도록 해주는 다형성을 제공함
  - 특정 타입에서만 의미가 있는 값을 사용하는 필드나 메서드가 있을 때 발현됨

---

- 예시1) 직접 상속할 때

```javascript
// before

class Employee {
  constructor(name, type) {
    this.validateType(type);
    this._name = name;
    this._type = type;
  }
    
  validateType(arg) {
    if (!['engineer', 'manager', 'salesperson'].includes(arg)) {
      throw new Error(`${arg}라는 직원 유형은 없습니다.`);
    }
  }
    
  toString() {
    return `${this._name} (${this._type})`;
  }
}
```

```javascript
// after

class Employee {
  constructor(name, type) {
    this._name = name;
  }
}

class Engineer extends Employee {
  get type() {
    return 'engineer';
  }
}

class Salesperson extends Employee {
  get type() {
    return 'salesperson';
  }
}

class Manager extends Employee {
  get type() {
    return 'manager';
  }
}

function createEmployee(name, type) {
  switch (type) {
    case 'engineer':
      return new Engineer(name);
    case 'salesperson':
      return new Salesperson(name);
    case 'manager':
      return new Manager(name);
    default:
      throw new Error(`${arg}라는 직원 유형은 없습니다.`);
  }
}
```

---

- 예시2) 간접 상속할 때
  - 직원의 서브클래스로 '아르바이트'와 '정직원'이라는 클래스가 이미 있어서 `Employee`를 직접 상속하는 방식으로 타입 코드 문제에 대처할 수 없다고 가정하자.

```javascript
// before

class Employee {
  constructor(name, type) {
    this.validateType(type);
    this._name = name;
    this._type = type;
  }
    
  validateType(arg) {
    if (!['engineer', 'manager', 'salesperson'].includes(arg)) {
      throw new Error(`${arg}라는 직원 유형은 없습니다.`);
    }
  }
    
  get type() {
    return this._type;
  }
    
  set type(arg) {
    this._type = arg;
  }
    
  get capitalizedType() {
    return this._type.charAt(0).toUpperCase() + this._type.substr(1).toLowerCase();
  }
    
  toString() {
    return `${this._name} (${this.capitalizedType})`;
  }
}
```

```javascript
// after

class Engineer extends EmployeeType {
  toString() {
     return 'engineer';
  }
}

class Salesperson extends EmployeeType { 
  toString() {
     return 'salesperson';
  }
}

class Manager extends EmployeeType {
  toString() {
     return 'manager';
  }
}

class EmployeeType {
  constructor(aString) {
    this._value = aString;
  }
    
  toString() {
    return this._value;
  }
}

class Employee {
  constructor(name, type) {
    this.validateType(type);
    this._name = name;
    this.type = type;
  }
    
  validateType(arg) {
    if (!['engineer', 'manager', 'salesperson'].includes(arg)) {
      throw new Error(`${arg}라는 직원 유형은 없습니다.`);
    }
  }
    
  get typeString() {
    return this._type.toString();
  }
    
  get type() {
    return this._type;
  }
    
  set type(arg) {
    this._type = Employee.createEmployeeType(arg);
  }
    
  static createEmployeeType(aString) {
    switch(aString) {
      case 'engineer':
        return new Engineer();
      case 'salesperson':
        return new Salesperson();
      case 'manager':
        return new Manager();
      default:
        throw new Error(`${aString}라는 직원 유형은 없습니다.`);
    }
  }
    
  get capitalizedName() {
    return this.toString().charAt(0).toUpperCase() + this.toString().substr(1).toLowerCase();
  }
    
  toString() {
    return `${this._name} (${this.type.capitalizedName})`;
  }
}
```

---

