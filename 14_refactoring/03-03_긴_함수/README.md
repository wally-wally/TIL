# 03-03. 긴 함수

<br>

## :hand: Intro

- 짧은 함수를 구성하면 간접 호출의 효과, 즉 코드를 이해하고, 공유하고, 선택하기 쉬워진다는 장점이 있다.
- 함수의 길이가 아닌, 함수의 목적(의도)과 구현 코드의 괴리가 얼마나 큰가다.
- '무엇을 하는지'를 코드가 잘 설명해주지 못할수록 함수로 만드는 게 유리하다.
- 리팩토링 책에서 소개하는 함수 분리 방법으로 여러 가지가 있는데 하나씩 살펴보도록 하자.

<br>

## (1) 임시 변수를 질의 함수로 바꾸기

- 함수 추출시 추출된 함수에 <b>임시 변수의 수가 많아질 수 있게 되는데 이럴 때 사용하는 리팩토링 기법</b>이다.
- 함수 안에서 어떤 코드의 결괏값을 뒤에서 다시 참조할 목적으로 임시 변수를 사용하는데 이보다 별도의 함수로 만들어 사용하는 편이 나을 때가 많다.
- 추출한 함수와 원래 함수의 경계가 더 분명해져 부자연스러운 의존 관계나 부수효과를 찾고 제거하는 데 도움이 된다.
- 또한 변수 대신 함수로 만들어두면 비슷한 계산을 수행하는 다른 함수에서도 사용할 수 있어 코드 중복이 줄어든다.
- 이 리팩토링 기법은 특히 클래스 안에서 적용할 때 효과가 가장 크다.
  - 클래스 바깥의 최상위 함수로 추출하면 매개변수가 너무 많아져서 함수를 사용하는 장점이 줄어든다.
  - 중첩 함수를 사용하면 이런 문제는 없지만 관련 함수들과 로직을 널리 공유하는 데 한계가 있다.
- 이 기법은 항상 모든 경우에 좋은 것은 아니다.
  - 변수에 값을 한 번 대입한 뒤 더 복잡한 코드 덩어리에서 여러 차례 다시 대입하는 경우에는 좋다.
  - 하지만 '옛날 주소'처럼 스냅숏 용도로 쓰이는 변수에는 적합하지 않다.

---

- 예시) 주문 클래스

```javascript
// before
class Order {
  constructor(quantity, item) {
    this._quantity = quantity;
    this._item = item;
  }
    
  get price() {
    // basePrice, discountFactor 두 임시 변수를 질의 함수로 분리할 예정
    const basePrice = this._quantity * this._item.price;
    let discountFactor = 0.98;
      
    if (basePrice > 1000) {
      discountFactor -= 0.03;
    }
      
    return basePrice * discountFactor;
  }
}
```

```javascript
// after
class Order {
  constructor(quantity, item) {
    this._quantity = quantity;
    this._item = item;
  }
    
  get basePrice() {
    return this._quantity * this._item.price;
  }
    
  get discountFactor() {
    let discountFactor = 0.98;
      
    if (this.basePrice > 1000) {
      discountFactor -= 0.03;
    }
      
    return discountFactor;
  }
    
  get price() { 
    return this.basePrice * this.discountFactor;
  }
}
```

<br>

## (2) 매개변수 객체 만들기

- 함수 추출시 <b>추출된 함수에 매개변수의 수가 많아질 수 있게 되는데 이럴 때 사용하는 리팩토링 기법</b>이다.
- 데이터 뭉치를 데이터 구조로 묶으면 데이터 사이의 관계가 명확해진다.
  - 함수가 이 데이터 구조를 받게 하면 매개변수 수가 줄어든다.
  - 같은 데이터 구조를 사용하는 모든 함수가 원소를 참조할 때 항상 똑같은 이름을 사용하기 때문에 일관성도 높여준다.
- 이 리팩토링 기법을 사용하면 코드를 더 근본적으로 바꿔준다.
  - 새로 만든 데이터 구조가 문제 영역을 훨씬 간결하게 표현하는 새로운 추상 개념으로 격상되면서, 코드의 개념적인 그림을 다시 그릴 수도 있다.
- 이 책에서는 데이터 구조가 마련되어 있지 않은 경우 클래스로 만드는 걸 선호한다고 나와있다.
  - 나중에 동작까지 함께 묶기 좋기 때문이다. 또한 데이터 구조를 주로 값 객체(Value Object; VO)로 만든다고 한다.

---

- 예시) 유저 리스트에서 30대인 유저들을 찾는 코드

```javascript
// before
const group = {
  groupName: 'group1',
  users: [
    {
      id: 1,
      name: 'aaa',
      age: 28,
    },
    {
      id: 2,
      name: 'bbb',
      age: 31,
    },
    {
      id: 3,
      name: 'ccc',
      age: 35,
    },
    {
      id: 4,
      name: 'ddd',
      age: 41,
    },
  ]
};

function getThirties(group, min, max) {
  return group.users.
    filter((user) => user.age >= min && user.age <= max);
}

alerts = getThirties(group, ageCriteria.thirtiesMin, ageCriteria.thirtiesMax);
```

```javascript
// after
class AgeRange {
  constructor(min, max) {
    this._data = { min, max };
  }
    
  get min() {
    return this._data.min;
  }
    
  get max() {
    return this._data.max;
  }
}

const range = new AgeRange(ageCriteria.thirtiesMin, ageCriteria.thirtiesMax);

function getThirties(group, range) {
  return group.users.
    filter((user) => user.age >= range.min && user.age <= range.max);
}

alerts = getThirties(group, range);
```

- 데이터 구조 만들 때 클래스로 만들면 좋은 점
  - 관련된 동작들을 클래스 내부로 옮겨서 관리할 수 있다.

```javascript
class AgeRange {
  constructor(min, max) {
    this._data = { min, max };
  }
    
  get min() {
    return this._data.min;
  }
    
  get max() {
    return this._data.max;
  }
    
  getThirties(arg) {
    return arg >= this.min && arg <= this.max;
  }
}

const range = new AgeRange(ageCriteria.thirtiesMin, ageCriteria.thirtiesMax);

function getThirties(group, range) {
  return group.users.
    filter((user) => range.getThirties(user.age));
}

alerts = getThirties(group, range);
```

```javascript
// 직접 리팩토링한 코드 (객체 통째로 넘기기 기법도 적용해 봄)
class Group {
  constructor({ groupName, users }) {
    this._groupName = groupName;
    this._users = users;
  }

  get groupName() {
    return this._groupName;
  }

  set groupName(newGroupName) {
    this._groupName = newGroupName;
  }

  get users() {
    return this._users;
  }

  // 30대에 국한짓지 않고 특정 나이부터 특정 나이까지만 조회하고 싶은 경우도 있으므로
  // 가변적인 상황에서 유연하게 사용하기 위해 직접 인수를 받음
  getUsersInRange({ min, max }) {
    return (this._users || []).
      filter((user) => user.age >= min && user.age <= max);
  }
}
```

<br>

## (3) 객체 통째로 넘기기

- 하나의 레코드에서 값 두어 개를 가져와 인수로 넘기는 대신에 레코드를 통째로 넘기고 함수 본문에서 필요한 값들을 꺼내 쓰도록 구성하면 변화에 대응하기 쉽다.
  - 만약 레코드에 담긴 데이터 중 일부를 받는 함수가 여러 개라면 그 함수들끼리는 같은 데이터를 사용하는 부분이 있을 것이고, 그 부분의 로직이 중복될 가능성이 커진다.
  - 이러한 측면에서 레코드를 통째로 넘긴다면 이런 로직 중복도 없앨 수 있다.
- 하지만 함수가 레코드 자체에 의존하기를 원치 않을 때는 이 리팩토링 기법을 수행하지 않는다.
  - 어떤 객체로부터 값 몇 개를 얻은 후 그 값들만으로 무언가를 하는 로직이 있다면, 그 로직을 객체 안으로 집어넣어야 함을 알려주는 악취로 봐야 한다.

- 한편, 한 객체가 제공하는 기능 중 항상 똑같은 일부만을 사용하는 코드가 많다면, 그 기능만 따로 묶어서 클래스로 추출하라는 신호일 수 있다.
- 그리고 다른 객체의 메서드를 호출하면서 호출하는 객체 자신이 가지고 있는 데이터 여러 개를 건넬 때 데이터 여러 개 대신 객체 자신의 참조만 건네도록 수정할 수 있다.

---

- 예시) 실내온도 모니터링 시스템

```javascript
// before

// 호출자
const low = aRoom.daysTempRange.low;
const high = aRoom.daysTempRange.high;
if (!aPlan.withinRange(low, high)) {
  alerts.push('방 온도가 지정 범위를 벗어났습니다.');
}

// HeatingPlan class
withinRange(bottom, top) {
  return (bottom >= this._temperatureRange.low)
    && (top <= this._temperatureRange.high);
}
```

```javascript
// after

// 호출자
if (!aPlan.withinRange(aRoom.daysTempRange)) {
  alerts.push('방 온도가 지정 범위를 벗어났습니다.');
}

// HeatingPlan class
withinRange(aNumberRange) {
  return (aNumberRange.low >= this._temperatureRange.low)
    && (aNumberRange.high <= this._temperatureRange.high);
}
```

- 새 함수를 다른 방식으로 만들기 - 코드 작성 없이 순전히 다른 리팩토링들을 연달아 수행하여 새 메서드를 만들어내는 방법

```javascript
// 최상위
function xxNEWwithinRange(aPlan, tempRange) {
  const low = tempRange.low;
  const high = tempRange.high;
  const isWithinRange = aPlan.withinRange(low, high);
  return isWithinRange;
}

// 호출자
const tempRange = aRoom.daysTempRange;
const isWithinRange = xxNEWwithinRange(tempRange);
if (!isWithinRange) {
  alerts.push('방 온도가 지정 범위를 벗어났습니다.');
}

// HeatingPlan class
withinRange(bottom, top) {
  return (bottom >= this._temperatureRange.low)
    && (top <= this._temperatureRange.high);
}
```

<br>

## (4) 함수를 명령으로 바꾸기

- 만약 (1) ~ (3) 리팩토링 기법들을 적용해도 여전히 임시 변수와 매개변수가 너무 많다면 더 큰 수술이라 할 수 있는 이 기법을 고려해야한다.
- <b>명령(Command)</b> : 명령 객체 대부분은 메서드 하나로 구성되며, 이 메서드를 요청해 실행하는 것이 이 객체의 목적이다.
  - 평범한 함수 메커니즘보다 훨씬 유연하게 함수를 제어하고 표현할 수 있다.
  - 되돌리기(undo) 같은 보조 연산을 제공할 수 있으며, 수명주기를 더 정밀하게 제어하는 데 필요한 매개변수를 만들어주는 메서드도 제공할 수 있다.
  - 상속과 hook을 이용해 사용자 맞춤형으로 만들 수도 있다.

---

### :heavy_plus_sign: 명령 패턴(Command Pattern)

> 요청 자체를 캡슐화 하는 것입니다. 이를 통해 서로 다른 사용자(client)를 매개변수로 만들고, 요청을 대기시키거나 로깅하며, 되돌릴 수 있는 연산을 지원합니다. (GoF의 디자인 패턴 p311)

- 명령 패턴은 메서드 호출을 실체화한 것이다.
  - 여기서 실체화는 '실제하는 것으로 만든다'라는 뜻으로, 프로그래밍에서는 무엇인가를 '<b>일급(first-class)</b>'으로 만든다는 뜻으로 통한다.
  - 어떤 개념을 변수에 저장하거나 함수에 전달할 수 있도록 데이터, 즉, 객체로 바꿀 수 있다는 걸 의미한다.

- 즉, 명령 패턴은 함수 호출을 객체로 감싼다는 것이므로 콜백을 객체지향적으로 표현한 것이다.
- 요청을 객체 형태로 캡슐화하여 사용자가 보낸 요청을 원하는 시점에 이용할 수 있도록 메서드 이름, 매개변수 등의 요청에 사용되는 정보를 로깅, 취소할 수 있는 패턴이다.

---

### :heavy_plus_sign: 일급 함수(First-Class Function) vs 일급 객체(First-Class Object)

- 일급 객체 : 변수나 데이터에 할당 가능, 인자로 넘기기 가능, 리턴값으로 리턴하기 가능
- 일급 함수 : 함수가 다른 일급 객체와 동일하게 다루어 질 때, 일급 함수라고 지칭

---

- 예시) 건강보험 애플리케이션에서 사용하는 점수 계산 함수

```javascript
// before
function score(candidate, medicalExam, scoringGuide) {
  let result = 0;
  let healthLevel = 0;
  let highMedicalRiskFlag = false;
    
  if (medicalExam,isSmoker) {
    healthLevel += 10;
    highMedicalRiskFlag = true;
  }
    
  let certificationGrade = 'regular';
  
  if (scoringGuide.stateWithLowCertification(candidate.originState)) {
    certificationGrade = 'low';
    result -= 5;
  }
  
  result -= Math.max(healthLevel - 5, 0);
  return result;
}
```

- 시작은 빈 클래스를 만들고 이 함수를 그 클래스로 옮기는 일부터다.
  - 리팩토링이 끝날 때까지는 원래 함수를 전달 함수 역할로 남겨두자.
  - 명령 관련 이름은 사용하는 프로그래밍 언어의 명명규칙을 따르는데 규칙이 딱히 없다면 'execute'나 'call' 같이 명령의 실행 함수에 흔히 쓰이는 이름을 택하자.

```javascript
function score(candidate, medicalExam, scoringGuide) {
  return new Scorer().execute(candidate, medicalExam, scoringGuide);
}

class Scorer {
  execute(candidate, medicalExam, scoringGuide) {
    let result = 0;
    let healthLevel = 0;
    let highMedicalRiskFlag = false;
    
    if (medicalExam,isSmoker) {
      healthLevel += 10;
      highMedicalRiskFlag = true;
    }
    
    let certificationGrade = 'regular';
  
    if (scoringGuide.stateWithLowCertification(candidate.originState)) {
      certificationGrade = 'low';
      result -= 5;
    }
  
    result -= Math.max(healthLevel - 5, 0);
    return result;
  }
}
```

- 매개변수 옮기기(이 과정은 한 번에 하나씩 수행하자)

```javascript
function score(candidate, medicalExam, scoringGuide) {
  return new Scorer(candidate, medicalExam, scoringGuide).execute();
}

class Scorer {
  constructor(candidate, medicalExam, scoringGuide) {
    this._candidate = candidate;
    this._medicalExam = medicalExam;
    this._scoringGuide = scoringGuide;
  }
    
  execute() {
    let result = 0;
    let healthLevel = 0;
    let highMedicalRiskFlag = false;
    
    if (this._medicalExam,isSmoker) {
      healthLevel += 10;
      highMedicalRiskFlag = true;
    }
    
    let certificationGrade = 'regular';
  
    if (this._scoringGuide.stateWithLowCertification(candidate.originState)) {
      certificationGrade = 'low';
      result -= 5;
    }
  
    result -= Math.max(healthLevel - 5, 0);
    return result;
  }
}
```

- 더 가다듬기
  - 모든 지역 변수를 필드로 변경
  - 함수가 사용하던 변수가 그 유효범위에 구애받지 않고 함수 추출하기

```javascript
function score(candidate, medicalExam, scoringGuide) {
  return new Scorer(candidate, medicalExam, scoringGuide).execute();
}

class Scorer {
  constructor(candidate, medicalExam, scoringGuide) {
    this._candidate = candidate;
    this._medicalExam = medicalExam;
    this._scoringGuide = scoringGuide;
  }
    
  execute() {
    this._result = 0;
    this._healthLevel = 0;
    this._highMedicalRiskFlag = false;
    
    this.scoreSmoking();
    
    this._certificationGrade = 'regular';
  
    if (this._scoringGuide.stateWithLowCertification(this._candidate.originState)) {
      this._certificationGrade = 'low';
      this._result -= 5;
    }
  
    this._result -= Math.max(this._healthLevel - 5, 0);
    return this._result;
  }
    
  scoreSmoking() {
    if (this._medicalExam.isSmoker) {
      this._healthLevel += 10;
      this._highMedicalRiskFlag = true;
    }
  }
}
```

<br>

## (5) 조건문 분해하기

- 복잡한 조건부 로직은 프로그램을 복잡하게 만드는 가장 흔한 원흉에 속한다.
  - 긴 함수는 그 자체로 읽기가 어렵지만, 조건문은 그 어려움을 한층 가중시킨다.
  - 조건을 검사하고 그 결과에 따른 동작을 표현한 코드는 무슨 일이 일어나는지는 이야기해주지만 <b>'왜' 일어나는지는 제대로 말해주지 않을 때가 많은 것이 문제</b>다.
- 조건문이 보이면 조건식과 각 조건절에 코드 분해 작업을 취하면 좋다.
  - 해당 조건이 무엇인지 강조하고, 그래서 무엇을 분기했는지가 명백해진다. 분기한 이유 역시 더 명확해진다.

---

- 예시) 할인율이 달라지는 어떤 서비스의 요금 계산

```javascript
// before

if (!aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd)) {
  charge = quantity * plan.summerRate;
} else  {
  charge = quantity * plan.regularRate + plan.regularServiceCharge;
}
```

```javascript
// after (조건식과 조건절에 해당하는 구문을 함수로 분리)

function isSummer() {
  return !aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd)
}

function summerCharge() {
  return quantity * plan.summerRate;
}

function regularCharge() {
  return quantity * plan.regularRate + plan.regularServiceCharge;
}

charge = isSummer() ? summerCharge() : regularCharge();
```

```javascript
// 직접 리팩토링한 코드
function summerCharge({ quantity, plan }) {
  return quantity * plan.summerRate;
}

function regularCharge({ quantity, plan }) {
  return quantity * plan.regularRate + plan.regularServiceCharge;
}

function calculateCharge({ quantity, plan }) {
  const isBeforeSummer = aDate.isBefore(plan.summerStart);
  const isAfterSummer = aDate.isAfter(plan.summerEnd);

  const isSummerSeason = !isBeforeSummer && !isAfterSummer;

  return isSummerSeason ? summerCharge({ quantity, plan }) : regularCharge({ quantity, plan });
}

const charge = calculateCharge({ quantity, plan });
```

<br>

## (6) 조건부 로직을 다형성으로 바꾸기

- 같은 조건을 기준으로 나뉘는 `switch`문이 여러 개일 때 사용되는 리팩토링 기법이다.
- 타입을 여러 개 만들고 각 타입이 조건부 로직을 자신만의 방식으로 처리하도록 구성하는 방법
- 기본 동작을 위한 `case` 문과 그 변형 동작으로 구성된 로직인 경우 기본 동작은 슈퍼클래스에 넣고 변형 동작은 각각의 서브클래스로 만든다.

---

### :heavy_plus_sign: 다형성 (polymorphism)

- 특정 기능을 **선언(설계)부분**과 **구현(동작)부분**으로 분리한 후 구현부분을 다양한 방법으로 만들어 선택해서 사용할 수 있게 하는 기능
  - 선언부분은 구현코드가 전혀 없는 텅 빈 상태이며 일종의 지켜야 할 약속으로 가득 찬 일종의 규약 문서이다. 그리고 개발자는 문제를 해결하는 구현 부분은 선언부분에 맞게 작성하면 된다.
  - 선언부분과 구현부분은 1 : N의 다형성 관계가 형성된다.
- 주변에서 볼 수 있는 흔한 다형성의 예로 USB가 있다.
  - 모든 USB 기기는 USB 규격에 맞춰 만들어져 있다. 여기서 USB 규격은 설계 부분인 인터페이스에 해당하며 USB 기기들은 구현 부분을 담당하게 된다.

- 다형성 **선언**부분 : 인터페이스(Interface)와 추상클래스(abstract class)
- 다형성 **구현**부분 : 클래스(class)

```javascript 
class Shape {
  constructor(width, height, color) {
    this.width = width;
    this.height = height;
    this.color = color;
  }
  
  draw() {
    console.log(`drawing ${this.color} color of`);
  }
    
  getArea() {
    return this.width * this.height;
  }
}

class Triangle extends Shape {
  draw() {
    super.draw();
    console.log('세모');
  }
    
  getArea() {
    return (this.width * this.height) / 2;
  }
}

const triangle = new Triangle(20, 20, 'red');
triangle.draw(); // drawing red color of / 세모
console.log(triangle.getArea()); // 200
```

- 인터페이스나 추상 클래스에 도형과 관련된 메소드들을 선언하고 해당 기능을 사용하는 서브 클래스에서 상속을 받아 해당 클래스에서 클래스에 맞게 기능을 구현하면 된다.

:page_facing_up: <b>Reference</b>

- https://webclub.tistory.com/406

- https://velog.io/@feelslikemmmm/JavaScriptClass
- https://debugdaldal.tistory.com/152
- https://velog.io/@soulee__/TypeScript-%ED%81%B4%EB%9E%98%EC%8A%A4-Class-5

---

- 예시) 새의 종에 따른 비행 속도와 깃털 상태 파악하는 코드

```javascript
// before

function plumages(birds) {
  return new Map(birds.map(b => [b.name, plumage(b)]));
}

function speeds(birds) {
  return new Map(birds.map(b => [b.name, airSpeedVelocity(b)]));
}

// 깃털 상태
function plumage(bird) {
  switch (bird.type) {
    case '유럽 제비':
      return '보통이다';
    case '아프리카 제비':
      return (bird.numberOfCoconuts > 2) ? '지쳤다' : '보통이다';
    case '노르웨이 파랑 앵무':
      return (bird.voltage > 100) ? '그을렸다' : '예쁘다';
    default:
      return '알 수 없다';
  }
}

// 비행 속도
function airSpeedVelocity(bird) {
  switch (bird.type) {
    case '유럽 제비':
      return 35;
    case '아프리카 제비':
      return 40 - 2 * bird.numberOfCoconuts;
    case '노르웨이 파랑 앵무':
      return (bird.isNailed) ? 0 : 10 + bird.voltage / 10;
    default:
      return null;
  }
}
```

```javascript
// after

function plumages(birds) {
  return new Map(birds.map(b => createBird(b)).map(bird => [bird.name, bird.plumage]));
}

function speeds(birds) {
  return  new Map(birds.map(b => createBird(b)).map(bird => [bird.name, bird.airSpeedVelocity]));
}

function createBird(bird) {
  switch (bird.type) {
    case '유럽 제비':
      return new EuropeanSwallow(bird);
    case '아프리카 제비':
      return new AfricanSwallow(bird);
    case '노르웨이 파랑 앵무':
      return new NorwegianBlueParrot(bird);
    default:
      return new Bird(bird);
  }
}

class Bird {
  constructor(birdObject) {
    Object.assign(this, birdObject);
  }
    
  get plumage() {
    return '알 수 없다';
  }
    
  get airSpeedVelocity() {
    return null;
  }
}

class EuropeanSwallow extends Bird {
  get plumage() {
    return '보통이다';
  }
    
  get airSpeedVelocity() {
    return 35;
  }
}

class AfricanSwallow extends Bird {
  get plumage() {
    return (this.numberOfCoconuts > 2) ? '지쳤다' : '보통이다';
  }
    
  get airSpeedVelocity() {
    return 40 - 2 * this.numberOfCoconuts;
  }
}

class NorwegianBlueParrot extends Bird {
  get plumage() {
    return (this.voltage > 100) ? '그을렸다' : '예쁘다';
  }
    
  get airSpeedVelocity() {
    return (this.isNailed) ? 0 : 10 + this.voltage / 10;
  }
}
```

---

### :heavy_plus_sign: 덕 타이핑(Duck Typing)

>  'If it walks like a duck and it quacks like a duck, then it must be a duck'
>
>  ('오리처럼 걷고, 오리처럼 꽥꽥거리면, 그것은 틀림없이 오리다.')

- 타입을 미리 정하는게 아니라 실행이 되었을 때 해당 Method들을 확인하여 타입을 정한다.
- 동적타입의 언어에서 본질적으로 다른클래스라도 객체의 적합성은 객체의 실제 유형이 아니라 특정 메소드와 속성의 존재에 의해 결정되는 것입니다.
- 장점
  - 타입에 대해 매우 자유롭다.
  - 런타임 데이터를 기반으로 한 기능과 자료형을 창출하는 것
- 단점
  - 런타임 자료형 오류가 발생할 수 있다 런타임에서, 값은 예상치 못한 유형이 있을 수 있고, 그 자료형에 대한 무의미한 작업이 적용된다.
  - 이런 오류가 프로그래밍 실수 구문에서 오랜 시간 후에 발생할 수 있다
  - 데이터의 잘못된 자료형의 장소로 전달되는 구문은 작성하지 않아야 한다. 이것은 버그를 찾기 어려울 수도 있다.

- **속성과 메소드 존재에 의해 객체의 적합성이 결정된다.**

```python
class Parrot:
    def fly(self):
        print("Parrot flying")

class Airplane:
    def fly(self):
        print("Airplane flying")

class Whale:
    def swim(self):
        print("Whale swimming")

def lift_off(entity):
    entity.fly()

parrot = Parrot()
airplane = Airplane()
whale = Whale()

lift_off(parrot) # prints `Parrot flying`
lift_off(airplane) # prints `Airplane flying`
lift_off(whale) # Throws the error `'Whale' object has no attribute 'fly'`
```

:page_facing_up: <b>Reference</b>

- https://nesoy.github.io/articles/2018-02/Duck-Typing
- https://wikidocs.net/16076

---

<br>

## (7) 반복문 쪼개기

- 종종 반복문 하나에서 두 가지 이상의 일을 수행하는 모습을 보게 되는데 이렇게 하면 반복문을 수정할 때마다 두 가지 이상의 일 모두를 잘 이해하고 진행해야 한다.
  - 반대로 각각의 반복문을 분리해두면 수정할 동작 하나만 이해하면 된다.
- 반복문을 분리하면 사용하기도 쉬워진다.
  - 한 가지 값만 계산하는 반복문이라면 그 값만 곧바로 반환할 수 있다.
- 여러 일을 수행하는 반복문이라면 구조체를 반환하거나 지역 변수를 활용해야 한다.

---

### :heavy_plus_sign: 클린코드 vs 리팩토링

> 해당 내용은 <a href="https://kim6394.tistory.com/213" target="_blank">관련 블로그 게시글</a> 을 참고하여 작성했습니다.

- 클린코드
  - 단순히 가독성을 높이기 위한 작업
  - 설계부터 잘 이루어져 있는 것이 중요
- 리팩토링
  - 클린코드를 포함한 유지보수를 위한 코드 개선
  - 결과물이 나온 이후 수정이나 추가 작업이 진행될 때 개선해나가는 것

---

- 예시) 전체 급여와 가장 어린 나이를 계산

```javascript
// data
const people = [
  {
    age: 27,
    salary: 200,
  },
  {
    age: 40,
    salary: 500,
  },
  {
    age: 51,
    salary: 700,
  },
];
```

```javascript
// before
let youngest = people[0] ? people[0].age : Infinity;
let totalSalary = 0;

for (const p of people) {
  if (p.age < youngest) {
    youngest += p.age;
  }
  
  totalSalary += p.salary;
}

return `최연소: ${youngest}, 총 급여: ${totalSalary}`;
```

```javascript
// after
let youngest = people[0] ? people[0].age : Infinity;
let totalSalary = 0;

for (const p of people) {
  if (p.age < youngest) {
    youngest += p.age;
  }
}

for (const p of people) {
  totalSalary += p.salary;
}

return `최연소: ${youngest}, 총 급여: ${totalSalary}`;
```

```javascript
// upgrade

function totalSalary() {
  return people.reduce((total, p) => total + p.salary, 0);
}

function youngestAge() {
  return Math.min(...people.map(p => p.age));
}

return `최연소: ${totalSalary()}, 총 급여: ${youngestAge()}`;
```

```javascript
// 직접 리팩토링한 코드
function getYoungestAge(ages) {
  return Math.min(...ages);
}

function getTotalSalary(salaries) {
  return salaries.reduce((sum, salary) => sum + salary, 0);
}

function getEmployeesData(people) {
  if (!people || !Array.isArray(people) || !people.length) {
    return {
      youngest: Infinity,
      totalSalary: 0,
    }
  }

  const ages = people.map(({ age }) => age);
  const salaries = people.map(({ salary }) => salary);

  const youngest = getYoungestAge(ages);
  const totalSalary = getTotalSalary(salaries);

  return {
    youngest,
    totalSalary,
  }
}
```

