# 03-16. 임시 필드

<br>

## :hand: Intro

- 간혹 특정 상황에서만 값이 설정되는 필드를 가지는 클래스가 있다.
- 하지만 객체를 가져올 때는 당연히 모든 필드가 채워져 있으리라 기대하는게 보통이지만 쓰이지 않는 것처럼 보이는 임시 필드가 존재한다.
- 이러한 필드들을 발견하면 '**클래스 추출하기**'로 제 살 곳을 찾아주고 그 후 '**함수 옮기기**'로 임시 필드들과 관련된 코드를 모조리 새 클래스에 몰아넣는다.
- 또한, 임시 필드들이 유효한지 확인한 후 동작하는 조건부 로직이 있을 수 있는데, '**특이 케이스 추가하기**'로 필드들이 유효하지 않을 때를 위한 대안 클래스를 만들어서 제거할 수 있다.

---

- 책에서는 클래스를 예시로 설명하고 있는데 객체인 경우에도 해당 경우를 생각해볼 수 있을 것 같다.

```javascript
const obj = {
  id: 123,
  name: 'wally',
  age: 28,
};

if (office === 'abc.com') {
  obj.member_access_unique_id = `abc_${obj.id}`
} else if (office === 'def.go.kr') {
  obj.gov_auth_key = `${getAuthKey(obj)}_def`
}
// 하략
```

- 위 코드와 같이 특정 케이스에 대해서만 고려되는 필드들을 추가하고 관리하는 코드를 종종 볼 수 있다.
  - 변수명이라도 시멘틱하게 잘 지으면 코드를 이어받아서 다른 사람이 작업할 때 그나마 머리를 싸맬 필요가 없을 수 있다.
  - 하지만 `obj.a`, `obj.temp_key` 와 같이 의미를 파악하기 어려운 네이밍으로 변수명을 지으면 어떤 의미인지 파악하기 어려워 작업하는데 해맬 수도 있다.
- 그래서 특정 상황에서만 쓰이는 key 값을 무한으로 증식해서 관리하지 않고 공통으로 사용할 수 있는 변수로 묶어서 관리하고 위 코드의 `if` 문 처럼 조건식에 걸리지 않는 경우 empty string이나 `null` 값으로 기본값을 설정하는 방식이 좋을 것 같다.

---

<br>

## (1) 특이 케이스 추가하기

- 특수한 경우의 공통 동작은 요소 하나에 모아서 사용하는 <b>특이 케이스 패턴</b>이라는 것이 있는데, 이 때 적용하면 좋은 리팩토링 기법 중 하나이다.
- 특이 케이스 객체에서 단순히 데이터를 읽기만 한다면 반환할 값들을 담은 리터럴 객체 형태로 준비하면 된다.
- 만약 그 이상의 어떤 동작을 수행한다면 필요한 메서드를 담은 객체를 생성하면 된다.
- 특이 케이스 객체는 이를 캡슐화한 클래스가 반환하도록 만들 수도 있고, 변환을 거쳐 데이터 구조에 추가시키는 형태도 될 수 있다.
- 가장 흔한 특이 케이스 패턴으로 널 객체 패턴(Null Object Pattern)이 있다.

---

### :heavy_plus_sign: 널 객체 패턴(Null Object Pattern)

> 인터페이스는 구현하지만 아무 일도 하지 않는 객체

- Null 객체 패턴은 GoF의 디자인 패턴 목록에는 없는 패턴이다.
- 하지만 코딩을 하다 보면 자연스럽게 터득해 사용하게 되는 기법이기도 하다.
- 구현의 심플함에 비해 유용하고, 나름의 중요한 의미가 있는 패턴이다.
- 자바에서 흔히 마주칠 수 있는 에러가 `NullPointerException`이다.
  - 이를 방지하기 위해 `if(object!=null)` 등의 코드를 활용하게 된다.
  - 특정 객체가 존재하지 않는다는 것을 `null`이아닌 Null Object를 반환하여 `NullPointerException`을 방지하는 기법이 널 오브젝트 패턴이다.
- 주의
  - 이 패턴을 잘못 도입하면 예외나 에러를 탐지하기 어려워지는 경우가 있다.
  - 도입했을 때 클래스와 코드가 마구 늘어난다면 이 패턴이 적절하지 않은 상황이거나 잘못 구현한 것이다.

:page_facing_up: <b>Reference</b>

- https://johngrib.github.io/wiki/pattern/null-object/
- https://bb-library.tistory.com/207

---

- 리팩토링 적용 예시

```javascript
class Site {
  get customer() {
    return this._customer;
  }
}

class Customer {
  get name() {
    // 고객 이름
  }
  get billingPlan() {
    // 요금제
  }
  set billingPlan(arg) {
    // 요금제 setter
  }
  get paymentHistory() {
    // 납부 이력
  }
}
```

```javascript
// 미확인 고객을 처리해야 하는 클라이언트가 아래와 같이 여러 개 있다고 가정하자.
// 고객 이름으로는 '거주자'를 사용하고, 기본 요금제를 청구하고, 연체 기간은 0주로 분류한다.

// 클라이언트1
const aCustomer = site.custoner;
let customerName;
if (aCustomer === '미확인 고객') customerName = '거주자';
else customerName = aCustomer.name;

// 클라이언트2
const plan = (aCustomer === '미확인 고객') ? registry.billingPlans.basic : aCustomer.billingPlan;

// 클라이언트3
if (aCustomer !== '미확인 고객') aCustomer.billingPlan = newPlan;

// 클라이언트4
const weekDelinquent = (aCustomer === '미확인 고객') ? 0 : aCustomer.paymentHistory.weeksDelinquentInLastYear;
```

- 예시1) 클래스 생성 방식

```javascript
// 미확인 고객인지를 나타내는 메서드를 고객 클래스에 추가
class Customer {
  get isUnknown() {
    return false;
  }
}

// 그 후 미확인 고객 전용 클래스를 만듬
class UnknwonCustomer {
  get isUnknown() {
    return true;
  }
}
```

```javascript
// 여러 곳에서 똑같이 수정해야만 하는 코드를 별도 함수로 추출하여 한데 모음
// 지금 예에서는 특이 케이스인지 확인하는 코드가 추출 대상임
function isUnknown(arg) {
  if (!((arg instancof Customer) || (arg === '미확인 고객'))) {
    throw new Error(`잘못된 값과 비교: <${arg}>`);
  }
  
  return (arg === '미확인 고객');
}
```

```javascript
// 추출한 함수를 클라이언트 코드에 적용

// 클라이언트1
const aCustomer = site.custoner;
let customerName;
if (isUnknown(aCustomer)) customerName = '거주자';
else customerName = aCustomer.name;

// 클라이언트2
const plan = isUnknown(aCustomer) ? registry.billingPlans.basic : aCustomer.billingPlan;

// 클라이언트3
if (!isUnknown(aCustomer)) aCustomer.billingPlan = newPlan;

// 클라이언트4
const weekDelinquent = isUnknown(aCustomer) ? 0 : aCustomer.paymentHistory.weeksDelinquentInLastYear;
```

```javascript
// 특이 케이스일 때 Site 클래스가 UnknownCustomer 객체를 반환하도록 수정

class Site {
  get customer() {
    return (this._customer === '미확인 고객') ? new UnknownCustomer() : this._customer;
  }
}

// isUnknown 함수 수정
function isUnknown(arg) {
  if (!(arg instancof Customer || arg instanceof UnknownCustomer)) {
    throw new Error(`잘못된 값과 비교: <${arg}>`);
  }
  
  return arg.isUnknown;
}
```

```javascript
// 각 클라이언트에서 수행하는 특이 케이스 검사를 일반적인 기본값으로 대체할 수 있다면 이 검사 코드에서 여러 함수를 클래스로 묶기를 적용할 수 있다.
// 그러면 조건부 로직이 필요없게 된다.

class UnknwonCustomer {
  get isUnknown() {
    return true;
  }
    
  get name() {
    return '거주자';
  }
    
  get billingPlan() {
    return registry.billingPlans.basic;
  }
    
  set billingPlan(arg) {
    // 우선 무시
  }
    
  get paymentHistory() {
    return new NullPaymentHistory();
  }
}

class NullPaymentHistory() {
  get weeksDelinquentInLastYear() {
    return 0;
  }
}

// 클라이언트1
const aCustomer = site.customer;
const customerName = aCustomer.name;

// 클라이언트2 (읽는 경우)
const plan = aCustomer.billingPlan;

// 클라이언트3
aCustomer.billingPlan = newPlan;

// 클라이언트4
const weekDelinquent = aCustomer.paymentHistory.weeksDelinquentInLastYear;
```

```javascript
// 특이 케이스로부터 다른 클라이언트와는 다른 무언가를 원하는 독특한 클라이언트가 있을 수 있다.
// ex) 미확인 고객의 이름으로 '거주자'를 사용하는 경우
// 이런 경우엔 원래의 특이 케이스 검사 코드를 유지해야 한다.
// isUnknown() 함수를 인라인 하고 모든 클라이언트를 수정했다면, 호출하는 곳이 없어진 전역 isUnknown() 함수를 죽은 코드 제거하기로 없애면 된다.

const name = aCustomer.isUnknown ? '미확인 거주자' : aCustomer.name;
```

- 예시2) 객체 리터럴 방식
  - 만약 데이터 구조를 읽기만 한다면 클래스 대신 리터럴 객체를 사용해도 된다.
  - 리터럴을 아래와 같이 사용하려면 불변으로 만들어야 한다.(`freeze()` 메서드 이용)

```javascript
function isUnknown(arg) {
  return arg.isUnknown;
}

function createUnknownCustomer() {
  return {
    isUnknown: true,
    name: '거주자',
    billingPlan: registry.billingPlans.basic,
    paymentHistory: {
      weeksDelinquentInLastYear: 0,
    }
  }
}

class Customer {
  get isUnknown() {
    return false;
  }
}

class Site {
  get customer() {
    return (this._customer === '미확인 고객') ? createUnknownCustomer() : this._customer;
  }
}

// 클라이언트1
const aCustomer = site.customer;
const customerName = aCustomer.name;

// 클라이언트2
const plan = aCustomer.billingPlan;

// 클라이언트3
const weekDelinquent = aCustomer.paymentHistory.weeksDelinquentInLastYear;
```

- 예시3) 변환 함수 방식
  - 변환 단계를 추가하면 같은 아이디어를 레코드에도 적용할 수 있다.

```javascript
const rawSite = acquireSiteData();
const site = enrichSite(rawSite);

function isUnknown(aCustomer) {
  if (aCustomer === '미확인 고객') {
    return true;
  } else {
    return aCustomer.isUnknown;
  }
}

function enrichSite(aSite) {
  const result = _.cloneDeep(aSite);
  const unknownCustomer = {
    isUnknown: true,
    name: '거주자',
    billingPlan: registry.billingPlans.basic,
    paymentHistory: {
      weekDelinquentInLastYear: 0,
    }
  };
    
  if (isUnknown(result.customer)) {
    result.customer = unknownCustomer;
  } else {
    result.customer.isUnknown = false;
  }
    
  return result;
}

// 클라이언트1
const aCustomer = site.customer;
// 수 많은 코드 ...
const customerName = aCustomer.name;

// 클라이언트2
const plan = aCustomer.billingPlan;

// 클라이언트3
const weeksDelinquent = aCustomer.paymentHistory.weeksDelinquentInLastYear;
```

