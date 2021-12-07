# 03-04. 긴 매개변수 목록

<br>

## :hand: Intro

- 프로그래밍을 처음 배울 때는 함수에 필요한 것들을 모조리 매개변수로 전달하라고 배웠다.
- 하지만 매개변수 목록이 길어지면 그 자체로 이해하기 어려울 때가 존재한다.
- 이러한 경우에 적용할 수 있는 리팩토링 기법을 살펴보자.

<br>

## (1) 매개변수를 질의 함수로 바꾸기

- 종종 다른 매개변수에서 값을 얻어올 수 있는 매개변수가 있을 때 이 리팩토링 기법을 이용해서 그 매개변수를 제거할 수 있다.
- 매개변수 목록은 함수의 동작에 변화를 줄 수 있는 일차적인 수단으로 다른 코드와 마찬가지로 이 목록에서도 중복은 피하는 게 좋으며 짧은수록 이해하기 쉽다.

```javascript
// before
availableVacation(anEmployee, anEmployee.grade);

function availableVacation(anEmployee, grade) {}
```

```javascript
// after
availableVacation(anEmployee);

function availableVacation(anEmployee) {
  const grade = anEmployee.grade;
}
```

- 특정 매개변수를 제거하면 값을 결정하는 책임 주체가 달라진다.
- 반면 이 기법을 적용하면 안 되는 상황도 있다.
  - 매개변수를 제거하면 피호출 함수에 원치 않는 의존성이 생길 때다.
  - 해당 함수가 알지 못했으면 하는 프로그램 요소에 접근해야 하는 상황을 만들 때가 존재한다.
- 주의해야할 점은 대상 함수가 참조 투명해야 한다는 것이다.
  - 참조 투명이란 '함수에 똑같은 값을 건네 호출하면 항상 똑같이 동작한다'는 뜻이다.
  - 이런 함수는 동작을 예측하고 테스트하기가 훨씬 쉬우니 이 특성이 사라지지 않도록 주의하자.
  - 따라서 매개변수를 없애는 대신 <b>가변 전역 변수를 이용하는 일은 하면 안 된다.</b> 변수 범위가 오염될 수 있는 위험이 있다.

---

- 다른 리팩토링을 수행한 후 특정 매개변수가 더는 필요 없어졌을 때가 있는데, 바로 이 리팩토링을 적용하는 가장 흔한 사례다.

```javascript
// before

// Order class
get finalPrice() {
  const basePrice = this.quantity * this.itemPrice;
  let discountLevel;
    
  if (this.quantity > 100) {
    discountLevel = 2;
  } else {
    discountLevel = 1;
  }
    
  return this.discountedPrice(basePrice, discountLevel);
}

discountPrice(basePrice, discountLevel) {
  switch (discountLevel) {
    case 1:
      return basePrice * 0.95;
    case 2:
      return basePrice * 0.9;
  }
}
```

```javascript
get finalPrice() {
  const basePrice = this.quantity * this.itemPrice;
   
  return this.discountedPrice(basePrice);
}

// 임시 변수를 질의 함수로 바꾸기 리팩토링 적용
get discountLevel() {
  return this.quantity > 100 ? 2 : 1;
}

// 함수 선언 바꾸기로 해당 매개변수 제거
discountPrice(basePrice) {
  switch (this.discountLevel) {
    case 1:
      return basePrice * 0.95;
    case 2:
      return basePrice * 0.9;
  }
}
```

<br>

## (2) 플래그 인수 제거하기

- 함수의 동작 방식을 정하는 플래그 역할의 매개변수는 이 리팩토링 기법을 이용해서 없애준다.
- 여기서 플래그 인수(flag argument)란 호출되는 함수가 실행할 로직을 호출하는 쪽에서 선택하기 위해 전달하는 인수다.
- 플래그 인수는 **호출할 수 있는 함수들이 무엇이고 어떻게 호출해야 하는지 이해하기 어려울 수 있다.**
  - 예를 들어 boolean flag는 코드를 읽는 이에게 뜻을 온전히 전달하지 못하기 때문에 더욱 좋지 못하다.
  - 함수에 전달한 `true`의 의미를 파악하는데 어려우므로 이보다는 특정한 기능 하나만 수행하는 명시적인 함수를 제공하는 편이 훨씬 깔끔하다.
- 플래그 인수의 조건
  - 호출하는 쪽에서 `boolean` 값으로 (프로그램에서 사용되는 데이터가 아닌) 리터럴 값을 건네야 한다.
  - 호출되는 함수는 그 인수를 (다른 함수에 전달하는 데이터가 아닌) 제어 흐름을 결정하는 데 사용해야 한다.
- 플래그 인수 없이 구현하려면 플래그 인수들의 가능한 조합 수만큼의 함수를 만들어야 한다.
  - 그런데 다른 관점에서 보면, 플래그 인수가 둘 이상이면 함수 하나가 너무 많은 일을 처리한다는 의미이기도 한다.
  - 그러니 같은 로직을 조합해내는 더 간단한 함수를 만들 방법을 고민해봐야 한다.

---

- 리팩토링 절차
  - 매개변수로 주어질 수 있는 값 각각에 대응하는 명시적 함수들을 생성
  - 원래 함수를 호출하는 코드들을 모두 찾아서 각 리터럴 값에 대응하는 명시적 함수를 호출하도록 수정

---

- 예시 - 배송일자 계산

```javascript
// before

// 호출문
aShipment.deliveryDate = deliveryDate(anOrder, true);

aShipment.deliveryDate = deliveryDate(anOrder, false);

function deliveryDate(anOrder, isRush) {
  if (isRush) {
    let deliveryTime;
      
    if (['MA', 'CT'].includes(anOrder.deliveryState)) {
      deliveryTime = 1;
    } else if (['NY', 'NH'].includes(anOrder.deliveryState)) {
      deliveryTime = 2;
    } else {
      deliveryTime = 3;
    }
    
    return anOrder.placeOn.plusDays(1 + deliveryTime);
  } else {
    let deliveryTime;
      
    if (['MA', 'CT', 'NY'].includes(anOrder.deliveryState)) {
      deliveryTime = 2;
    } else if (['ME', 'NH'].includes(anOrder.deliveryState)) {
      deliveryTime = 3;
    } else {
      deliveryTime = 4;
    }
    
    return anOrder.placeOn.plusDays(2 + deliveryTime);
  }
}
```

```javascript
// after

// 호출문
aShipment.deliveryDate = rushDeliveryDate(anOrder);

aShipment.deliveryDate = regularDeliveryDate(anOrder);

function rushDeliveryDate(anOrder) {
  let deliveryTime;
      
  if (['MA', 'CT'].includes(anOrder.deliveryState)) {
    deliveryTime = 1;
  } else if (['NY', 'NH'].includes(anOrder.deliveryState)) {
    deliveryTime = 2;
  } else {
    deliveryTime = 3;
  }
    
  return anOrder.placeOn.plusDays(1 + deliveryTime);
}

function regularDeliveryDate(anOrder) {
  let deliveryTime;
      
  if (['MA', 'CT', 'NY'].includes(anOrder.deliveryState)) {
    deliveryTime = 2;
  } else if (['ME', 'NH'].includes(anOrder.deliveryState)) {
    deliveryTime = 3;
  } else {
    deliveryTime = 4;
  }
    
  return anOrder.placeOn.plusDays(2 + deliveryTime);
}
```

<br>

## (3) 여러 함수를 클래스로 묶기

- 클래스는 데이터와 함수를 하나의 공유 환경으로 묶은 후, 다른 프로그램 요소와 어우러질 수 있도록 그중 일부를 외부에 제공한다.
- 클래스는 객체 지향 언어의 기본인 동시에 다른 패러다임 언어에도 유용하다.
- 클래스로 묶으면 이 함수들이 공유하는 공통 환경을 더 명확하게 표현할 수 있고, 각 함수에 전달되는 인수를 줄여서 객체 안에서의 함수 호출을 간결하게 만들 수 있다.
- 클래스로 묶을 때의 장점은 클라이언트가 객체의 핵심 데이터를 변경할 수 있고, 파싱 객체들을 일관되게 관리할 수 있다.

---

- 예시) 매달 차 계량기를 읽어서 측정값 기록

```javascript
const reading = {
  customer: 'ivan',
  quantity: 10,
  month: 5,
  year: 2017
};
```

```javascript
const aReading = acquireReading();
const basicChargeAmount = calculateBaseCharge(aReading);
const taxableCharge = Math.max(0, basicChargeAmount - taxThreshold(aReading.year));

// 기본 요금 계산 함수
function calculateBaseCharge(aReading) {
  return baseRate(aReading.month, aReading.year) * aReading.quantity;
}
```

- 절차1 - 먼저 레코드를 클래스로 변환하기 위해 레코드를 캡슐화한다.

```javascript
class Reading {
  constructor(data) {
    this._customer = data.customer;
    this._quantity = data.quantity;
    this._month = data.month;
    this._year = data.year;
  }
    
  get customer() {
    return this._customer;
  }
    
  get quantity() {
    return this._quantity;
  }
    
  get month() {
    return this._month;
  }
    
  get year() {
    return this._year;
  }
}
```

- 절차2 - 이미 만들어져 있는 `calculateBaseCharge()`부터 옮기자. 새 클래스를 사용하려면 데이터를 얻자마자 객체로 만들어야 한다. 

```javascript
const rawReading = acquireReading();
const aReading = new Reading(rawReading);
const basicChargeAmount = calculateBaseCharge(aReading);
```

- 그런 다음 `calculateBaseCharge()`를 새로 만든 클래스로 옮긴 후 적절한 이름(`baseCharge`)으로 바꾼다.

```javascript
class Reading {
  // 생략
    
  get baseCharge() {
    return baseRate(this.month, this.year) * this.quantity;
  }
}

const taxableCharge = Math.max(0, aReading.baseCharge - taxThreshold(aReading.year));
```

- 절차3 - 이어서 세금을 부과할 소비량을 계산하는 코드를 함수로 추출하고 이를 `Reading` 클래스로 옮긴다.

```javascript
// 완성본
class Reading {
  constructor(data) {
    this._customer = data.customer;
    this._quantity = data.quantity;
    this._month = data.month;
    this._year = data.year;
  }
    
  get customer() {
    return this._customer;
  }
    
  get quantity() {
    return this._quantity;
  }
    
  get month() {
    return this._month;
  }
    
  get year() {
    return this._year;
  }
    
  get baseCharge() {
    return baseRate(this.month, this.year) * this.quantity;
  }
    
  get taxableCharge() {
    return Math.max(0, this.baseCharge - taxThreshold(this.year));
  }
}

const rawReading = acquireReading();
const aReading = new Reading(rawReading);
const taxableCharge = aReading.taxableCharge;
```

- 파생 데이터 모두를 필요한 시점에 계산되게 만들었기 때문에 저장된 데이터를 갱신하더라도 문제가 생길 일이 없다.
- 프로그램의 다른 부분에서 데이터를 갱신할 가능성이 꽤 있을 때는 클래스로 묶어두면 큰 도움이 된다.
