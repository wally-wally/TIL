# 03-06. 가변 데이터

<br>

## (1) 변수 쪼개기

- 하나의 값이 여러 목적으로 사용된다면 혼란과 버그를 낳는다. 그러니 이런 코드를 발견했을 때 사용하는 리팩토링 기법이 '변수 쪼개기'이다.
  - 루프 변수 : 반복문을 한 번 돌 때마다 바뀌는 변수로 여러 번 대입할 수 밖에 없는 경우에 속함
  - 수집 변수 : 메서드가 동작하는 중간중간 값을 저장함

```javascript
// 루프 변수, 수집 변수 예시
for (let i = 0; i < 10; i++) {
  console.log(i);
}
```

- 변수는 긴 코드의 결과를 저장했다가 나중에 쉽게 참조하려는 목적으로 흔히 쓰인다.
  - 이런변수에는 값을 단 한 번만 대입해야 한다.
- 역할이 둘 이상인 변수가 있다면 쪼개야 한다. <b>역할 하나당 변수 하나임을 기억하자.</b>
  - 여러 용도로 쓰인 변수는 코드를 읽는 이에게 커다란 혼란을 주기 때문이다.

---

- 예시1) 해기스라는 음식이 다른 지역으로 전파된 거리를 구하는 코드

```javascript
// before

function disatnceTravelled (scenario, time) {
  let result;
  let acc = scenario.primaryForce / scenario.mass; // 가속도 = 힘 / 질량
  let primaryTime = Math.min(time, scenario.delay);

  result = 0.5 * acc * primaryTime * primaryTime; // 전파된 거리

  let secondaryTime = time - scenario.delay;

  if (secondaryTime > 0) { // 두 번째 힘을 반영해 다시 계산
    let primaryVelocity = acc * scenario.delay;
    acc = (scenario.primaryForce + scenario.secondaryForce) / scenario.mass;
    result += primaryVelocity * secondaryTime + 0.5 * acc * secondaryTime * secondaryTime;
  }
    
  return result;
}
```

```javascript
// after
function disatnceTravelled (scenario, time) {
  let result;
  const primaryAcceleration = scenario.primaryForce / scenario.mass;
  let primaryTime = Math.min(time, scenario.delay);

  result = 0.5 * primaryAcceleration * primaryTime * primaryTime;

  let secondaryTime = time - scenario.delay;

  if (secondaryTime > 0) {
    let primaryVelocity = primaryAcceleration * scenario.delay;
    const secondaryAcceleration = (scenario.primaryForce + scenario.secondaryForce) / scenario.mass;
    result += primaryVelocity * secondaryTime + 0.5 * secondaryAcceleration * secondaryTime * secondaryTime;
  }
    
  return result;
}
```

---

- 예시2) 입력 매개변수의 값을 수정할 때

```javascript
// before

function discount(inputValue, quantity) {
  if (inputValue > 50) {
    inputValue -= 2;
  }
  
  if (quantity > 100) {
    inputValue -= 1;
  }
  
  return inputValue;
}
```

- 위 코드에서 `inputValue`는 함수에 데이터를 전달하는 용도와 결과를 호출자에 반환하는 용도로 쓰였다.
  - 참고로 자바스크립트의 매개변수는 값에 의한 호출(call by value) 방식으로 전달되므로 `inputValue`를 수정해도 호출자에 영향을 주지 않는다.

```javascript
// after

function discount(inputValue, quantity) {
  let result = inputValue;
    
  // 사실 어떤 변수를 써서 비교해도 동일하지만,
  // 이 코드가 입력 값에 기초하여 결괏값에 누적해 계산한다는 사실을 더 명확하게 드러낼 수 있다.
  if (inputValue > 50) {
    result -= 2;
  }
  
  if (quantity > 100) {
    result -= 1;
  }
  
  return result;
}
```

<br>

## (2) 질의 함수(읽기 함수)와 변경 함수 분리하기

- 좋은 API는 데이터를 갱신하는 함수와 그저 조회만 하는 함수를 명확히 구분한다.
  - 두 기능이 섞여 있다면 이 리팩토링 기법을 적용해 갈라놓는 것이 좋다.
- 외부에서 관찰할 수 있는 '겉보기 부수효과'가 전혀 없이 값을 반환해주는 함수를 추구해야 한다.
  - 이런 함수는 어느 때건 원하는 만큼 호출해도 아무 문제가 없다.
- <b>값을 반환하면서 부수효과도 있는 함수가 존재한다면 상태를 변경하는 부분과 질의하는 부분을 분리하는 것을 권장</b>한다.
  - '겉보기 부수효과' 없이 어떤 순서로 호출하든 모든 호출에 항상 똑같은 값을 반환해야 한다.

- 리팩토링 절차
  - 대상 함수 복제 후 질의 목적에 충실한 이름 짓기
  - 새 질의 함수에서 부수효과를 낳는 부분 제거
  - 원래 함수 호출하는 곳을 모두 찾아 새로운 질의 함수를 호출하도록 바꾸고 이어서 원래의 변경 함수를 호출하는 코드를 바로 아래에 삽입
  - 원래의 변경 함수에서 질의 관련 코드 제거

---

- 예시) 이름 목록을 훑어 악당을 찾는 함수

```javascript
// before

function alertForMiscreant(people) {
  for (const p of people) {
    if (p === '조커') {
      setOffAlarms(); // 부수효과 낳는 부분
      return '조커';
    }
      
    if (p === '사루만') {
      setOffAlarms(); // 부수효과 낳는 부분
      return '사루만';
    }
  }
    
  return '';
}

const found = alertForMiscreant(people);
```

```javascript
// after

function findMiscreant(people) {
  for (const p of people) {
    if (p === '조커') {
      return '조커';
    }
      
    if (p === '사루만') {
      return '사루만';
    }
  }
    
  return '';
}

function alertForMiscreant(people) {
  for (const p of people) {
    if (p === '조커') {
      setOffAlarms();
      return;
    }
      
    if (p === '사루만') {
      setOffAlarms();
      return;
    }
  }
    
  return;
}

const found = findMiscreant(people);
alertForMiscreant();
```

```javascript
// 알고리즘 교체하기 리팩토링 기법 적용

function alertForMiscreant(people) {
  for (const p of people) {
    const miscreants = ['조커', '사루만'];
    
    if (miscreants.includes(p)) {
      setOffAlarms();
      return;
    }
  }
    
  return;
}
```

<br>

## (3) 세터 제거하기

- 클래스에서 만든 객체가 불변이길 원할 때 이 리팩토링 기법을 적용하면 된다.
- setter 메서드가 있다고 함은 필드가 수정될 수 있다는 뜻이다.
  - 객체 생성 후에는 수정되지 않길 원하는 필드라면 setter를 제공하지 않았을 것이다.
  - 이렇게 하면 수정하지 않겠다는 의도가 명백해지고, 변경될 가능성이 봉쇄된다.
- 이 리팩토링이 필요한 상황
  - 무조건 접근자 메서드를 통해서만 필드를 다루려 할 때
  - 클라이언트에서 생성 스크립트를 사용해 객체를 생성할 때
    - 생성 스크립트 : 생성자를 호출한 후 일련의 세터를 호출하여 객체를 완성하는 형태의 코드(별도의 스크립트 파일이 아님)
- 객체가 생성된 후에는 값이 바뀌면 안 된다는 뜻을 분명히 하기 위해서는 setter들을 완전히 제거하여 의도를 더 정확하게 전달하는 것이 좋다.

---

- 예시) 사람 클래스

```javascript
// before

class Person {
  constructor(id, name) {
    this._name = name;
  }
    
  get name() {
    return this._name;
  }
    
  set name(arg) {
    this._name = arg;
  }
    
  get id() {
    return this._id;
  }
    
  set id(arg) {
    return this._id = arg;
  }
}

const martin = new Person();

martin.name = '마틴';
martin.id = '1234';
```

- 사람의 속성 중 이름은 객체를 생성한 뒤라도 변경될 수 있겠지만 `id`는 그러면 안 되기 때문에 `id` 관련 setter를 제거해보자.

```javascript
// after

class Person {
  constructor(id, name) {
    this._id = id;
    this._name = name;
  }
    
  get name() {
    return this._name;
  }
    
  set name(arg) {
    this._name = arg;
  }
    
  get id() {
    return this._id;
  }
}

const martin = new Person();

martin.name = '마틴';
```

<br>

## (4) 파생 변수를 질의 함수로 바꾸기

- 가변 데이터를 완전히 배제하기란 현실적으로 불가능할 때가 많지만, <b>가변 데이터의 유효 범위를 가능한 한 좁혀야 한다.</b>
- 효과가 좋은 방법으로, 값을 쉽게 계산해낼 수 있는 변수들을 모두 제거할 수 있다.
  - <b>계산 과정을 보여주는 코드 자체가 데이터의 의미를 더 분명히 드러내는 경우도 자주 있으며</b> 변경된 값을 깜빡하고 결과 변수에 반영하지 않는 실수를 막아준다.
- 여기에는 합당한 예외가 있는데 새로운 데이터 구조를 생성하는 변형 연산이라면 비록 계산 코드로 대체할 수 있더라도 그대로 두는 것도 좋다. 이에 해당 변형 연산은 다음과 같다.
  - 데이터 구조를 감싸며 그 데이터에 기초하여 계산한 결과를 속성으로 제공하는 객체
  - 데이터 구조를 받아 다른 데이터 구조로 변환해 반환하는 함수

---

- 예시) 데이터 중복 이슈 해결

```javascript
// before

class ProductionPlan {
  get production() {
    return this._production;
  }
    
  applyAdjustment(anAdjustment) {
    this.adjustments.push(anAdjustment);
    // 조정 값 adjustment를 적용하는 과정에서 직접 관련이 없는 누적 값 production까지 갱신함
    // 이 누적 값은 매번 갱신하지 않고도 계산할 수 있다.
    this._production += anAdjustment.amount;
  }
}
```

```javascript
// after

class ProductionPlan {
  get production() {
    return this._adjustments.reduce((sum, a) => sum + a.amount, 0);
  }
    
  applyAdjustment(anAdjustment) {
    this.adjustments.push(anAdjustment);
  }
}
```

- 만약 위 상황에서 둘 이상의 요소가 관여되는 경우 '변수 쪼개기'를 적용하여 해결할 수 있다.(`_production` 의 초깃값이 0이 아닌 경우에 해당)

```javascript
class ProductionPlan {
  constructor(production) {
    this._initialProduction = production;
    this._productionAccumulator = 0;
    this._adjustments = [];
  }
    
  get production() {
    return this._initialProduction + this._productionAccumulator;
  }
    
  get calculatedProductionAccumulator() {
    return this._adjustments.reduce((sum, a) => sum + a.amount, 0);
  }
    
  applyAdjustment(anAdjustment) {
    this.adjustments.push(anAdjustment);
  }
}
```

<br>

## (5) 참조를 값으로 바꾸기

- 객체를 다른 객체에 중첩하면 내부 객체를 참조 혹은 값으로 취급할 수 있다.
  - 참조냐 값이냐의 차이는 내부 객체의 속성을 갱신하는 방식에서 가장 극명하게 드러난다.
    - 참조로 다루는 경우 : 내부 객체는 그대로 둔 채 그 객체의 속성만 갱신
    - 값으로 다루는 경우 : 새로운 속성을 담은 객체로 기존 내부 객체를 통째로 대체
- 필드를 값으로 다룬다면 내부 객체의 클래스를 수정하여 값 객체(VO)로 만들 수 있다.
  - 값 객체는 불변이기 때문에 다루기가 더 쉽고 프로그램 외부로 건네줘도 나중에 그 값이 나 몰래 바뀌어서 내부에 영향을 줄까 염려하지 않아도 된다.
  - 또한 값을 복제해 이곳저곳에서 사용하더라도 서로 간의 참조를 관리하지 않아도 된다.
  - 그래서 값 객체는 분산 시스템과 동시성 시스템에서 특히 유용하다.
- 하지만 특정 객체를 여러 객체에서 공유하고자 한다면, 이 리팩토링을 적용하면 안 된다.
- 리팩토링 절차
  - 후보 클래스가 불변인지, 혹은 불변이 될 수 있는지 확인
  - 각각의 세터를 하나씩 제거
  - 이 값 객체의 필드들을 사용하는 동치성 비교 메서드를 만듬

---

### :heavy_plus_sign: 값 객체(Value Object; VO)

- 즉, VO란, 한 개 혹은 그 이상의 속성들을 묶어서 특정 값을 나타내는 객체를 말한다.

> **Martin Fowler가 언급한 VO의 개요**
>
> When programming, I often find it's useful to represent things as a compound. (프로그래밍할 때, 사물을 복합물로 표현하는 것이 유용한 경우가 종종 있다.)
>
> A 2D coordinate consists of an x value and y value. (예를 들어, 2차원 좌표는 x, y로 이루어져 있고,)
>
> An amount of money consists of a number and a currency. (돈이나 통화 같은 경우 숫자로 이루어져 있다.)
>
> A date range consists of start and end dates, (날짜의 범위는 시작 날짜와 종료날짜로 구성될 수 있고,)
>
> which themselves can be compounds of year, month, and day. (연도와 월, 일의 복합물일 수 도 있다.)

- 또한 값 객체의 <b>동등성 비교(이 책에서는 동치성 비교라고 하는 것 같음)</b>라는 개념이 등장한다.
  - <u>객체가 포함하고 있는 속성 값을 기준으로 객체를 비교한다.</u>
  - 이러한 동등성 비교를 구현하기 위해 `equals` 메서드를 재정의함으로써 가능하다.
  - 이 메서드 재정의 시에는 어떠한 속성 값들을 기준으로 동등성을 비교할 것인지 정해야 한다.
- 주로 객체의 동등성을 비교할 때는 `hashCode` 메소드를 재정의한다. (Java에서는 `Object.hashCode()` 메서드 제공)
  - 객체를 식별할 하나의 정수 값을 가리키고, 재정의하지 않는다면 메모리 주소 값을 사용해서 해쉬 값을 만들 수도 있다.
  - 특정 값을 기준으로 같은 hash code를 얻을 수 있고, 이는 hash 값을 사용하는 컬렉션 등에서 객체를 비교하는 용도로 사용된다.
- 이와 별개로 동일성 비교라는 개념도 있는데 이는 해당 객체가 참조하는 있는 메모리의 주소 값을 확인하는 비교법이다.
  - 이 때 주소 값은 임의로 바꿀 수 없다.

:book: <b>Reference</b>

- https://velog.io/@jbb9229/VO-RO-ValueObject-ReferenceObject

---

- 예시) 사람 객체가 있고, 이 객체는 다음 코드처럼 생성 시점에는 전화번호가 올바로 설정되지 못하게 짜여 있다고 가정

```javascript
// before

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
    
  // 세터로 설정하던 필드를 생성자에서 입력받아 설정
  set officeAreaCode(arg) {
    this._telephoneNumber = new TelephoneNumber(arg, this.officeNumber);
  }
    
  get officeNumber() {
    return this._telephoneNumber.number;
  }
   
  // 세터로 설정하던 필드를 생성자에서 입력받아 설정
  set officeNumber(arg) {
    this._telephoneNumber = new TelephoneNumber(this.officeAreaCode, arg);
  }
}

class TelephoneNumber {
  // 전화번호 불변 만들기
  constructor(areaCode, number) {
    this._areaCode = areaCode;
    this._number = number;
  }
    
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
    
  // 동치성 비교
  equals(other) {
    if (!(other instanceof TelephoneNumber)) {
      return false;
    }
      
    return this.areaCode === other.areaCode && this.number === other.number;
  }
}
```

```javascript
// 독립된 객체를 두 개 생성하여 동치성 검사 수행

it ('telephone equals', () => {
  assert(new TelephoneNumber('312', '555-0142').equals(new TelephoneNumber('312', '555-0142')));
})
```

<br>
