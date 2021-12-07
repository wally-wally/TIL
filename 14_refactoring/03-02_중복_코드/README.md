# 03-02. 중복 코드

<br>

## :hand: Intro

- 하나의 애플리케이션을 여러 명이서 개발하다보면 동일한 기능을 담당하는 로직이 중복해서 생기는 경우가 많이 있다.
- 동일한 구조의 코드가 여러 개 존재한다면 하나의 로직으로 통합해서 관리하는 것이 더 좋다.

<br>

## (1) 함수 추출하기

- 한 클래스에 딸린 두 메서드가 똑같은 표현식을 사용하는 경우에 주로 이 기법을 사용한다.
- 함수를 추출하는 최적의 기준은 <b><u>'목적과 구현을 분리'</u></b>하는 방식이다.
- 함수를 짧게 만들면 함수 호출이 많아져 성능이 느려질 것 같은 우려가 있을 수 있지만 요즘은 그럴 걱정을 할 필요가 없다.
  - 함수가 짧으면 오히려 캐싱하기가 더 쉬우므로 컴파일러가 최적화하는데 유리할 때가 많다.

- 함수를 추출하고 짧은 함수 작성시 함수명을 잘 지어야 한다.
- 함수 추출 절자
  - 함수를 새로 만들고 목적을 잘 드러내는 이름을 붙인다.(이 때, '어떻게'(how)가 아닌 <b>'무엇을'(what)</b> 하는지가 드러나야 함)
    - 만약 이름 붙이는게 떠오르지 않으면 함수로 추출하면 안 되는 신호다.
    - 일단 추출을 해보고 효과가 크지 않으면 다시 원래 상태로 인라인해도 무방하다.
  - 추출한 코드를 원본 함수에서 복사하여 새 함수에 붙여넣는다.
  - 추출한 코드 중 원본 함수의 지역 변수를 참조하거나 추출한 함수의 유효범위를 벗어나는 변수는 없는지 검사한다. 만약 있다면 매개변수로 전달한다.(변수 범위 확인)
  - 변수 처리 작업 후 컴파일을 한 다음 원본 함수에서 추출한 코드 부분을 새로 만든 함수를 호출하는 문장으로 바꾼다.

---

- 함수 추출하기 예시

```javascript
// before
function printOwing(invoice) {
  let outstanding = 0;
    
  console.log('----------------------');
  console.log('-------고객 채무-------');
  console.log('----------------------');
    
  // 미해결 채무 계산
  for (const o of invoice.orders) {
    outstanding += o.amount;
  }
    
  // 마감일 기록
  const today = Clock.today;
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
    
  // 세부 사항 출력
  console.log(`고객명: ${invoice.customer}`);
  console.log(`채무액: ${outstanding}`);
  console.log(`마감일: ${invoice.dueDate.toLocaleDateString()}`);
}
```

```javascript
// after
function printBanner() {
  console.log('----------------------');
  console.log('-------고객 채무-------');
  console.log('----------------------');
}

function printDetails(invoice, outstanding) {
  console.log(`고객명: ${invoice.customer}`);
  console.log(`채무액: ${outstanding}`);
  console.log(`마감일: ${invoice.dueDate.toLocaleDateString()}`);
}

function recordDueDate(invoice) {
  const today = Clock.today;
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
}

function calculateOutstanding(invoice) {
  let result = 0;
    
  for (const o of invoice.orders) {
    result += o.amount;
  }
    
  return result;
}

function printOwing(invoice) {
  // 배너 출력
  printBanner();
    
  // 미해결 채무 계산
  const outstanding = calculateOutstanding(invoice);
    
  // 마감일 기록
  recordDueDate(invoice);
    
  // 세부 사항 출력
  printDetails(invoice, outstanding);
}
```

```javascript
// 직접 리팩토링한 코드

// constants.js(다국어 library인 i18n 모듈이 설치되어 있다고 가정)
const printDetailsKey = {
  customer: i18n.$t('고객명'),
  outstanding: i18n.$t('채무액'),
  dueDate: i18n.$t('마감일'),
}

// functions.js
function printHeader() {
  console.log('----------------------');
  console.log('-------고객 채무-------');
  console.log('----------------------');
}

function calculateOutstanding(orders) {
  return orders.reduce((sum, order) => sum + order.amount, 0);
}

function calculateDueDate() {
  const today = Clock.today;
  return new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
}

function printDetails({ customer, outstanding, dueDate }) {
  console.log(`${printDetailsKey.customer}: ${customer}`);
  console.log(`${printDetailsKey.outstanding}: ${outstanding}`);
  console.log(`${printDetailsKey.dueDate}: ${dueDate.toLocaleDateString()}`);
}

// invoice라는 객체에 key 값으로 customer, orders만 있었다고 가정
function printOwing(invoice) {
  printHeader();

  const customer = invoice.customer;

  const outstanding = calculateOutstanding(invoice.orders);

  const dueDate = calculateDueDate();

  printDetails({ customer, outstanding, dueDate });
}
```

<br>

## (2) 문장 슬라이드하기

- 비슷한 부분을 한 곳에 모아 함수 추출하기를 더 쉽게 적용할 수 있는 기법이다.

- 코드 조각을 슬라이드할 때는 무엇을 슬라이드할지와 슬라이드할 수 있는지 여부를 확인해야 한다.
  - 무엇을 슬라이드할지는 맥락과 관련이 깊은데 주로 요소를 선언 코드를 슬라이드하여 처음 사용하는 곳까지 끌어내리는 기법도 존재한다.
  - 특히 슬라이드할 수 있는지 여부를 확인할 때 이전 동작과 달라지지 않는지 꼭 확인해야 한다.
  - 슬라이드가 안전한 지를 판단하려면 관련된 연산이 무엇이고 어떻게 구성되는지를 완벽히 이해해야 한다.

---

- 조건문이 있을 때 문장 슬라이드하는 예시 코드

```javascript
// before
let result;

if (availableResources.length === 0) {
  result = createResource();
  allocatedResources.push(result);
} else {
  result = availableResources.pop();
  allocatedResources.push(result);
}

return result;
```

```javascript
// before
let result;

if (availableResources.length === 0) {
  result = createResource();
} else {
  result = availableResources.pop();
}

allocatedResources.push(result);

return result;
```

---

### :heavy_plus_sign: 명령-질의 분리 원칙(command-query separation principle)

- 함수는 성격에 따라 크게 두 가지로 분류할 수 있다.
  - 어떤 동작을 수행하는 <b>명령</b>과 답을 구하는 <b>질의</b>로 분리할 수 있다.
  - 이 두 역할은 한 곳에 섞이면 안 되는데 이러한 원칙을 <b>명령-질의 분리 원칙</b>이라고 한다.

```javascript
// before
function getFirstName() {
  let firstName = document.querySelector("#firstName").value;
  firstName = firstName.toLowerCase();
  setCookie("firstName", firstName);
  if (firstName === null) {
    return "";
  }
  return firstName;
}
 
let activeFirstName = getFirstName();
```

- 위 코드는 명령-질의 분리 원칙을 따르지 않은 코드이다.
  - 함수 이름만 보면 사람 이름을 return 한다는 것을 알 수 있다.
  - 하지만 실제로 내부적으로 수행하는 일은 사람 이름 return 하기 이전에 소문자로 변환하고 쿠키에 저장하는 일들도 수행하고 있다.
  - 이렇게만 봐서는 `getFirstName` 함수가 명령 역할을 하는지 질의 역할을 하는지 명확히 파악하기 어렵다.
  - 심지어 소문자로 변환하는 부분은 사용자에게 물어보지 않고 바로 쿠키로 설정한다.
- 코드를 최대한 명확하게 작성하려면 함수에서 값을 return하는 작업과 데이터의 상태를 변경하는 작업을 한 함수에서 동시에 처리해서는 안 된다.

```javascript
// after
function getFirstName() {
  let firstName = document.querySelector("#firstName").value;
  if (firstName === null) {
    return "";
  }
  return firstName;
}
 
setCookie("firstName", getFirstName().toLowerCase());
```

- 위 코드와 같이 명령-질의 분리 원칙에 따라 작성하면 수행할 작업을 명확히 드러내고 에러 발생 가능성도 많이 줄일 수 있다.

- 함수와 코드 베이스가 커질수록 이러한 분리 원칙은 더욱 중요하기 때문에 잊지 말자.

---

<br>

## (3) 메서드 올리기

- 같은 부모로부터 파생된 서브 클래스들에 코드가 중복되어 있다면, 각자 따로 호출되지 않도록 하는 기법이다.
- 메서드들의 본문 코드가 똑같을 때 하나로 통합하여 정리할 수 있다.

```javascript
// before
class Party {}

class Employee extends Party {
  get annualCost() {
    return this.monthlyCost * 12;
  }
}

class Department extends Party {
  get totalAnnualCost() {
    return this.monthlyCost * 12;
  }
}
```

```javascript
// after
class Party {
  get annualCost() {
    return this.monthlyCost * 12;
  }
}

class Employee extends Party {}

class Department extends Party {}
```

****
