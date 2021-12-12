# 03-07. 뒤엉킨 변경

<br>

## :hand: Intro

- 소프트웨어의 구조를 변경하기 쉬운 형태로 조직해야한다.
  - 코드를 수정할 때는 시스템에서 고쳐야 할 딱 한 군데를 찾아서 그 부분만 수정할 수 있기를 바란다.
  - 이렇게 할 수 없다면 (서로 밀접한 악취인) '뒤엉킨 변경'과 '산탄총 수술' 중 하나가 풍긴다.
- '뒤엉킨 변경'은 **단일 책임 원칙(Single Responsibility Principle)**이 제대로 지켜지지 않을 때 나타난다.
  - 즉, 하나의 모듈이 서로 다른 이유들로 인해 여러 가지 방식으로 변경되는 일이 많을 때 발생한다.
  - 단일 책임 원칙은 '<u>단일 모듈은 변경의 이유가 하나, 오직 하나여야만 한다</u>'는 설계 원칙이다.
    - 여기서 '변경의 이유'는 '단일 모듈은 오직 하나의 액터(actor)에 대해서만 책임져야 한다'는 의미로 이해해도 좋다.
    - 액터란 시스템이 동일한 방식으로 변경되기를 원하는 사용자 집단을 말합니다.  즉 액터란 하나의 사용자가 될 수도 있고 여러 사용자가 모여서 하나의 액터가 될 수도 있다.
    - 단일 책임 원칙의 자세한 내용은 [여기](https://blog.itcode.dev/posts/2021/08/13/single-responsibility-principle)를 참고하자.
- 순차적으로 실행되는 게 자연스러운 맥락이라면, 다음 맥락에 필요한 데이터를 특정한 데이터 구조에 담아 전달하게 하는 식으로 단계를 분리하는 '**단계 쪼개기**' 기법을 적용하면 된다.
- 전체 처리 과정 곳곳에서 각기 다른 맥락의 함수를 호출하는 빈도가 높다면, 각 맥락에 해당하는 적당한 모듈들을 만들어서 관련 함수들을 모으는 '**함수 옮기기**' 기법을 적용한다.
  - 이 때 여러 맥락의 일에 관여하는 함수가 있다면 옮기기 전에 '**함수 추출하기**'부터 수행한다.
- 모듈이 클래스라면 '**클래스 추출하기**' 기법으로 맥락별 분리 방법을 잘 안내해 줄 것이다.

<br>

## (1) 단계 쪼개기

- 주로 이 리팩토링 기법은 덩치가 큰 소프트웨어에 적용된다.
  - 다른 단계로 볼 수 있는 코드 영역들이 마침 서로 다른 데이터와 함수를 사용한다면 단계 쪼개기에 적합하다.
  - 이 코드 영역들을 별도 모듈로 분리하면 그 차이를 코드에서 훨씬 분명하게 드러낼 수 있다.

---

- 예시) 상품의 결재 금액을 계산하는 함수

```javascript
// before

function priceOrder(product, quantity, shippingMethod) {
  const basePrice = product.basePrice * quantity;
  const discount = Math.max(quantity - product.discountThreshold, 0) * product.basePrice * product.discountRate;
  const shippingPerCase = (basePrice > shippingMethod.discountThreshold) ? shippingMethod.discountedFee : shippingMethod.feePerCase;
  const shippingCost = quantity * shippingPerCase;
  const price = basePrice - discount + shippingCost;
  return price;
}
```

```javascript
// after

function priceOrder(product, quantity, shippingMethod) {
  const priceData = calculatePricingData(product, quantity);
  return applyShipping(priceDate, shippingMethod);
}

function calculatePricingData(product, quantity) {
  const basePrice = product.basePrice * quantity;
  const discount = Math.max(quantity - product.discountThreshold, 0) * product.basePrice * product.discountRate;
  return { basePrice, quantity, discount };
}

function applyShipping(priceData, shippingMethod) {
  const shippingPerCase = (priceData.basePrice > shippingMethod.discountThreshold) ? shippingMethod.discountedFee : shippingMethod.feePerCase;
  const shippingCost = priceData.quantity * shippingPerCase;
  return priceData.basePrice - priceData.discount + shippingCost;
}
```

```javascript
// 직접 리팩토링한 코드

function calcPrice({ basePrice, discount, shippingCost }) {
  return basePrice - discount + shippingCost;
}

function calcShippingCost({ basePrice, quantity, shippingMethod }) {
  const shippingPerCase = (basePrice > shippingMethod.discountThreshold) ? shippingMethod.discountedFee : shippingMethod.feePerCase;
  return quantity * shippingPerCase;
}

function basePriceData({ product, quantity }) {
  return {
    basePrice: product.basePrice * quantity,
    discount: Math.max(quantity - product.discountThreshold, 0) * product.basePrice * product.discountRate,
  }
}

function priceOrder({ product, quantity, shippingMethod }) {
  const { basePrice, discount } = basePriceData({ product, quantity });
  const shippingCost = calcShippingCost({ basePrice, quantity, shippingMethod });
  return calcPrice({ basePrice, discount, shippingCost });
}
```

---

### :heavy_plus_sign: 험블 객체 패턴(Humble Object Pattern)

- 디자인 패턴 중의 하나로 테스트 하기 어려운 행위와 쉬운 행위를 분리하는 방법이다.
- 두 개의 모듈 또는 클래스로 분리 하되 테스트하기 어려운 행위를 한 곳으로 옮기는데 이것이 험블 객체가 된다.
- 험블 객체에 속하지 않은 테스트하기 쉬운 나머지 행위는 다른 하나의 객체로 옮긴다.
- 아키텍처 경계마다 험블 객체 패턴을 발견할 수 있는데 그 경계를 테스트하기 어려운 것과 쉬운 것으로 분리하는 험블 객체 패턴을 적용하면 테스트 용이성도 크게 높아질 수 있다.
- react hooks에서 험블 객체 패턴을 적용한 예시는 [여기](https://blog.coderifleman.com/2021/04/21/react-hooks-and-humble-object-pattern-and-tests/)를 참고하면 좋다.

---

<br>

## (2) 함수 옮기기

- **모듈성(modularity)**이란 프로그램의 어딘가를 수정하려 할 때 해당 기능과 깊이 관련된 작은 일부만 이해해도 가능하게 해주는 능력을 말한다.
  - 모듈성을 높이려면 **서로 연관된 요소들을 함께 묶고, 요소 사이의 연결 관계를 쉽게 찾고 이해할 수 있도록 해야 한다.**
- 어떤 함수가 자신이 속한 모듈 A의 요소들보다 다른 모듈 B의 요소들을 더 많이 참조한다면 모듈 B로 옮겨줘야 마땅하다.
  - 이렇게 하면 캡슐화가 좋아져서, 이 소프트웨어의 나머지 부분은 모듈 B의 세부사항에 덜 의존하게 된다.
- 함수를 옮길지 말지를 정하기란 쉽지 않다. 그럴 땐 대상 함수의 현재 컨텍스트와 후보 컨텍스트를 둘러보면 도움이 된다.
  - 대상 함수를 호출하는 함수들은 무엇인지, 대상 함수가 호출하는 함수들은 또 무엇이 있는지, 대상 함수가 사용하는 데이터는 무엇인지 살펴봐야 한다.

---

- 예시1) 중첩 함수를 최상위로 옮기기

```javascript
// before

function trackSummary(points) {
  const totalTime = calculateTime();
  const totalDistance = calculateDistance();
  const pace = totalTime / 60 / totalDistance;
    
  return {
    time: totalTime,
    distance: totalDistance,
    pace,
  };
    
  // 총 거리 계산
  function calculateDistance() {
    let result = 0;
    for (let i = 1; i < points.length; i++) {
      result += distance(points[i - 1], points[i]);
    }
      
    return result;
  }
    
  // 두 지점의 거리 계산
  function distance(p1, p2) {
    const EARTH_RADIUS = 3959;
    const dLat = radians(p2.lat) - radians(p1.lat);
    const dLon = radians(p2.lon) - radians(p1.lon);
    
    const a = Math.pow(Math.sin(dLat / 2), 2) + Math.cos(radians(p2.lat)) * Math.cos(radians(p1.lat)) * Math.pow(Math.sin(dLon / 2), 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      
    return EARTH_RADIUS * c;
  }
    
  // 라디안 값으로 변환
  function radians(degrees) {
    return degrees * Math.PI / 100;
  }
    
  function calculateTime() { ... } // 총 시간 계산
}
```

```javascript
// after

function trackSummary(points) {
  const totalTime = calculateTime();
  const pace = totalTime / 60 / totalDistance(points);
    
  return {
    time: totalTime,
    distance: totalDistance(points),
    pace,
  };
    
  function calculateTime() { ... } // 총 시간 계산
}
    
// 총 거리 계산
function totalDistance(points) {
  let result = 0;
  for (let i = 1; i < points.length; i++) {
    result += distance(points[i - 1], points[i]);
  }
    
  return result;
}
    
// 두 지점의 거리 계산
function distance(p1, p2) {
  const EARTH_RADIUS = 3959;
  const dLat = radians(p2.lat) - radians(p1.lat);
  const dLon = radians(p2.lon) - radians(p1.lon);
  
  const a = Math.pow(Math.sin(dLat / 2), 2) + Math.cos(radians(p2.lat)) * Math.cos(radians(p1.lat)) * Math.pow(Math.sin(dLon / 2), 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
  return EARTH_RADIUS * c;
}
    
// 라디안 값으로 변환
function radians(degrees) {
  return degrees * Math.PI / 100;
}
```

---

- 예시2) 다른 클래스로 옮기기

```javascript
// before

class Account {
  get bankCharge() { // 은행 이자 계산
    let result = 4.5;
    if (this._daysOverdrawn > 0) {
      result += this.overdraftCharge;
    }
    
    return result;
  }
    
  get overdraftCharge() { // 초과 인출 이자 계산
    if (this.type.isPremium) {
      const baseCharge = 10;
      
      if (this.daysOverdrawn <= 7) {
        return baseCharge;
      } else {
        return baseCharge + (this.daysOverdrawn - 7) * 0.85;
      }
    } else {
      return this.daysOverdrawn * 1.75;
    }
  }
}
```

```javascript
// after
// 계좌 종류에 따라 이자 책정 알고리즘이 달라지도록 AccountType이라는 다른 클래스를 두는 방식으로 수정

// cf) 만약 소스 컨텍스트에서 가져와야 할 데이터가 많다면 매개변수로 this 자체를 넘길 수도 있다.

class Account {
  get bankCharge() {
    let result = 4.5;
    if (this._daysOverdrawn > 0) {
      result += this.type.overdraftCharge(this.daysOverdrawn);
    }
    
    return result;
  }
    
  get overdraftCharge() { // 위임 메서드
    return this.type.overdraftCharge(this.daysOverdrawn);
  }
}

class AccountType {
  overdraftCharge(daysOverdrawn) {
    if (this.isPremium) {
      const baseCharge = 10;
      
      if (daysOverdrawn <= 7) {
        return baseCharge;
      } else {
        return baseCharge + (daysOverdrawn - 7) * 0.85;
      }
    } else {
      return daysOverdrawn * 1.75;
    }
  }
}
```

---

<br>

## (3) 클래스 추출하기

- 메서드와 데이터가 너무 많은 클래스는 이해하기가 쉽지 않으니 잘 살펴보고 적절히 분리하는 것이 좋다.
- 특히 일부 데이터와 메서드를 따로 묶을 수 있다면 어서 분리하라는 신호다.
- 함께 변경되는 일이 많거나 서로 의존하는 데이터들도 분리한다.

---

- 예시) `Person` 클래스에서 전화번호 관련 동작을 별도 클래스로 추출하기

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
    return `${this._officeAreaCode} ${this.officeNumber}`;
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
    return this._telephoneNumber.toString();
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

- 전화번호는 여러모로 쓸모가 많으니 이 클래스는 클라이언트에게 공개하는 것이 좋다.
  - 그러면 'office'로 시작하는 메서드들을 없애고 `TelephoneNumber`의 접근자를 바로 사용하도록 바꿀 수 있다.
  - 그런데 기왕 이렇게 쓸 거라면 전화번호를 값 객체(VO)로 만드는 게 나으니 참조를 값으로 바꾸기 기법을 적용하면 된다.

---
