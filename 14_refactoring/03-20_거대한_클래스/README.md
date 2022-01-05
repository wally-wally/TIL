# 03-20. 거대한 클래스

<br>

## :hand: Intro

- 한 클래스가 너무 많은 일을 하여 필드 수가 상당히 늘어나고 너무 많아 중복코드가 생기는 경우 '<u>클래스 추출하기</u>'를 통해서 필드들 일부를 따로 묶는다.
- 이 때 분리할 컴포넌트를 원래 클래스나 상속 관계로 만드는 게 좋다면 '<u>슈퍼클래스 추출하기</u>'나 '<u>타입 코드를 서브클래스로 바꾸기</u>'를 적용하는게 좋다.


---

<br>

## (1) 슈퍼클래스 추출하기

- 비슷한 일을 수행하는 두 클래스가 보이면 <b>상속</b> 메커니즘을 이용해서 <b>비슷한 부분을 공통의 슈퍼클래스로 옮겨 닮을 수 있다.</b>
  - 공통된 부분이 데이터라면 '필드 올리기'를 활용하고, 동작이라면 '메서드 올리기'를 활용하면 된다.
- '슈퍼클래스 추출하기' 방법으로 리팩토링을 시도해본 후 나중에 필요해지면 '슈퍼클래스를 위임으로 바꾸기'로 시도하면 된다.

---

- 리팩토링 적용 예시

```javascript
// before

class Employee {
  constructor(name, id, monthlyCost) {
    this._id = id;
    this._name = name;
    this._monthlyCost = monthlyCost;
  }
    
  get monthlyCost() {
    return this._monthlyCost;
  }
    
  get name() {
    return this._name;
  }
    
  get id() {
    return this._id;
  }
    
  get annualCost() {
    return this.monthlyCost * 12;
  }
}

class Department {
  constructor(name, staff) {
    this._name = name;
    this._staff = staff;
  }
    
  get staff() {
    return this._staff.slice();
  }
    
  get name() {
    return this.name;
  }
    
  get totalMonthlyCost() {
    return this.staff
      .map(e => e.monthlyCost)
      .reduce((sum, cost) => sum + cost);
  }
  
  get headCount() {
    return this.staff.length;
  }
    
  get totalAnnualCost() {
    return this.totalMonthlyCost * 12;
  }
}
```

```javascript
// after

class Party {
  // 필드 올리기
  constructor(name) {
    this._name = name;
  }
    
  // 메서드 올리기
  get name() {
    return this._name;
  }
    
  // 함수 선언 바꾸기
  get annualCost() {
    return this.monthlyCost * 12;
  }
}

class Employee extends Party {
  constructor(name, id, monthlyCost) {
    super(name);
    this._id = id;
    this._name = name;
    this._monthlyCost = monthlyCost;
  }
    
  get monthlyCost() {
    return this._monthlyCost;
  }
    
  get id() {
    return this._id;
  }
}

class Department extends Party {
  constructor(name, staff) {
    super(name);
    this._name = name;
    this._staff = staff;
  }
    
  get staff() {
    return this._staff.slice();
  }
    
  get totalMonthlyCost() {
    return this.staff
      .map(e => e.monthlyCost)
      .reduce((sum, cost) => sum + cost);
  }
  
  get headCount() {
    return this.staff.length;
  }
}
```

<br>

## (2) 타입 코드를 서브클래스로 바꾸기

- 소프트웨어의 타입 코드
  - 비슷한 대상들을 특정 특성에 따라 구분해야 할 때 유용하다.
  - 열거형이나 심볼, 문자열 숫자 등으로 표현하며, 외부 서비스가 제공하는 데이터를 다루려 할 때 딸려오는 일이 흔하다.
- 타입 코드 + 서브클래스
  - 때로는 타입 코드 뿐만 아니라 서브클래스와 같은 것도 필요할 때가 있다.
  - 조건에 따라 다르게 동작하도록 해주는 다형성을 제공한다.
    - 타입 코드에 따라 동작이 달라져야 하는 함수가 여러 개일 때 특히 유용하다.
  - 특정 타입에서만 의미가 있는 값을 사용하는 필드가 메서드가 있을 때 발현된다.

------

- 리팩토링 적용 예시

```jsx
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

- (1) 직접 상속할 때 - 대상 클래스에 직접 적용

```jsx
// after

class Employee {
  constructor(name) {
    this._name = name;
  }

  toString() {
    return `${this._name} (${this.type})`;
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
      throw new Error(`${type}라는 직원 유형은 없습니다.`);
  }
}
```

- (2) 간접 상속할 때 - 타입 코드 자체에 적용
  - 이번에는 직원의 서브클래스로 ‘아르바이트’와 ‘정직원’이라는 클래스가 이미 있어서 `Employee`를 직접 상속하는 방식으로는 타입 코드 문제에 대처할 수 없다고 해보자

```jsx
// after

// 기본형을 객체로 바꾸기
class EmployeeType {
  constructor(aString) {
    this._value = aString;
  }

  get capitalizedType() {
    return this.toString().charAt(0).toUpperCase() + this.toString().substr(1).toLowerCase();
  }

  toString() {
    return this._value;
  }
}

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
      case 'manager':
        return new Manager();
      case 'salesperson':
        return new Salesperson();
      default:
        throw new Error(`${aString}라는 직원 유형은 없습니다.`);
    }
  }

  toString() {
    return `${this._name} (${this.type.capitalizedType})`;
  }
}

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
```
