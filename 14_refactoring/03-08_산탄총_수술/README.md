# 03-08. 산탄총 수술

<br>

## :hand: Intro

:star: <b>뒤엉킨 변경 vs 산탄총 수술</b>
| 구분            | 뒤엉킨 변경             | 산탄총 수술              |
| --------------- | ----------------------- | ------------------------ |
| 원인            | 맥락을 잘 구분하지 못함 | 맥락을 잘 구분하지 못함  |
| 해법(원리)      | 맥락을 명확히 구분      | 맥락을 명확히 구분       |
| 발생 과정(현상) | 한 코드에 섞여 들어감   | **여러 코드에 흩뿌려짐** |
| 해법(실제 행동) | 맥락별로 분리           | **맥락별로 모음**        |

<br>

## (1) 필드 옮기기

- 프로그램의 상당 부분이 동작을 구현하는 코드로 이뤄지지만 프로그램의 진짜 힘은 **데이터 구조**에서 나온다.
  - 주어진 문제에 적합한 데이터 구조를 활용하면 동작 코드는 자연스럽게 단순하고 직관적으로 짜여진다.
- 현재 데이터 구조가 적절치 않음을 깨닫게 되면 곧바로 수정해야 한다.
  - 고치지 않고 데이터 구조에 남겨진 흠들은 우리 머릿속을 혼란스럽게 하고 훗날 작성하게 될 코드를 더욱 복잡하게 만들어버린다.
- 예컨대 함수에 어떤 레코드를 넘길 때마다 또 다른 레코드의 필드도 함께 넘기고 있다면 데이터 위치를 옮겨야 할 것이다.
  - 함수에 항상 함께 건네지는 데이터 조각들은 상호 관계가 명확하게 드러나도록 한 레코드에 담는 게 가장 좋다.
- 클래스를 사용하면 이 리팩토링을 수행하기가 더 쉬워진다.
  - 데이터의 위치를 옮기더라도 접근자만 그에 맞게 수정하면 클라이언트 코드들은 아무 수정 없이도 동작할 것이다.

---

- 예시) 고객 클래스(`Customer`)와 계약 클래스(`CustomerContract`) - 할인율을 의미하는 `discountRate` 필드를 `Customer` 클래스에서 `CustomerContract` 클래스로 옮기기

```javascript
// before

class Customer {
  constructor(name, discountRate) {
    this._name = name;
    this._discountRate = discountRate;
    this._contract = new CustomerContract(dateToday());
  }
    
  get discountRate() {
    return this._discountRate;
  }
    
  becomePreferred() {
    this._discountRate += 0.03;
  }
    
  applyDiscount(amount) {
    return amount.subtract(amount.multiply(this._discountRate));
  }
}

class CustomerContract {
  constructor(startDate) {
    this._startDate = startDate;
  }
}
```

```javascript
// after

class Customer {
  constructor(name, discountRate) {
    this._name = name;
    this._contract = new CustomerContract(dateToday());
    this._setDiscountRate(discountRate);
  }
    
  get discountRate() {
    return this._contract.discountRate;
  }
    
  _setDiscountRate(aNumber) {
    this._contract.discountRate = aNumber;
  }
    
  becomePreferred() {
    this._setDiscountRate(this.discountRate + 0.03);
  }
}

class CustomerContract {
  constructor(startDate, discountRate) {
    this._startDate = startDate;
    this._discountRate = discountRate;
  }
    
  get discountRate() {
    return this._discountRate;
  }
    
  set discountRate(arg) {
    this._discountRate = arg;
  }
}
```

---

<br>

## (2) 여러 함수를 변환 함수로 묶기

- 소프트웨어는 데이터를 입력받아서 여러 가지 정보를 도출하곤 한다.
  - 이렇게 도출된 정보는 여러 곳에서 사용될 수 있는데, 그러다 보면 이 정보가 사용되는 곳마다 같은 도출 로직이 반복되기도하여 한 곳에 모으는 것이 좋다.
  - **검색과 갱신을 일관된 장소에서 처리할 수 있고 로직 중복도 막을 수 있다.**
- 변환 함수는 원본 데이터를 입력받아서 필요한 정보를 모두 도출한 뒤, 각각을 출력 데이터의 필드에 넣어 변환한다.
  - 이렇게 해두면 도출 과정을 검토할 일이 생겼을 때 변환 함수만 살펴보면 된다.
  - 또한 도출 로직이 중복되는 것을 막을 수도 있다.
  - 그리고 데이터 구조와 이를 사용하는 함수가 근처에 묶여 있기 때문에 찾는데 불필요한 시간을 소모할 필요도 없다.
- 원본 데이터가 코드 안에서 갱신될 때는 클래스로 묶는 것이 더 낫다.
  - 변환 함수를 묶으면 가공한 데이터를 새로운 레코드에 저장하므로, 원본 데이터가 수정되면 일관성이 깨질 수 있기 때문이다.

---

- 예시) 매달 사용자가 마신 차의 양을 측정

```javascript
// 클라이언트 1 (기본 요금 계산)
const aReading = acquireReading();
const baseCharge = baseRate(aReading.month, aReading.year) * aReading.quantity;
```

```javascript
// 클라이언트 2 (세금을 부과할 소비량 계산)
const aReading = acquireReading();
const base = baseRate(aReading.month, aReading.year) * aReading.quantity;
const taxableCharge = Math.max(0, base - taxThreshold(aReading.year));
```

```javascript
// 클라이언트 3
const aReading = acquireReading();
const basicChargeAmount = calculateBaseCharge(aReading);

// 다른 곳에서 이미 함수로 만들어둠
function calculateBaseCharge(aReading) {
  return baseRate(aReading.month, aReading.year) * aReading.quantity;
}
```

- 리팩토링 과정

  - 입력 객체를 그대로 복사해 반환하는 변환 함수 만든다.

  ```javascript
  function enrichReading(original) {
    const result = _.cloneDeep(original);
    return result;
  }
  ```

  - 변경하려는 계산 로직 중 하나를 고른다. 먼저 이 계산 로직에 측정값을 전달하기 전에 부가 정보를 덧붙이도록 수정한다.

  ```javascript
  // 클라이언트 3
  const rawReading = acquireReading();
  const basicChargeAmount = enrichReading(rawReading);
  ```

  - `calculateBaseCharge()` 를 부가 정보를 덧붙이는 코드 근처로 옮긴다.

  ```javascript
  function enrichReading(original) {
    const result = _.cloneDeep(original);
    result.baseCharge = calculateBaseCharge(result); // 미가공 측정값에 기본 소비량을 부가 정보로 덧붙임
    return result;
  }
  ```

  - 변환 함수 안에서는 결과 객체를 매번 복제할 필요 없이 마음껏 변경해도 된다.

  - 이어서 이 함수를 사용하던 클라이언트가 부가 정보를 담은 필드를 사용하도록 수정한다.

  ```javascript
  // 클라이언트 3
  const rawReading = acquireReading();
  const aReading = enrichReading(rawReading); // 아래 함수 참고
  const basicChargeAmount = enrichReading(rawReading);
  ```

  - 클라이언트 1도 이 필드를 사용하도록 수정한다.

  ```javascript
  // 클라이언트 1
  const rawReading = acquireReading();
  const aReading = enrichReading(rawReading);
  const baseCharge = aReading.baseCharge;
  ```

  - 클라이언트 2도 마찬가지다.

  ```javascript
  // 클라이언트 2
  const rawReading = acquireReading();
  const aReading = enrichReading(rawReading);
  const taxableCharge = Math.max(0, aReading.baseCharge - taxThreshold(aReading.year)); // 변수 인라인 작업도 수행함
  ```

  - 그 후 클라이언트 2의 계산 코드를 변환 함수로 옮긴다.

  ```javascript
  function enrichReading(original) {
    const result = _.cloneDeep(original);
    result.baseCharge = calculateBaseCharge(result); // 미가공 측정값에 기본 소비량을 부가 정보로 덧붙임
    result.taxableCharge = Math.max(0, result.baseCharge - taxThreshold(result.year));
    return result;
  }
  ```

  - 마지막으로 새로 만든 필드를 사용하도록 클라이언트 2의 코드를 수정한다.

  ```javascript
  // 클라이언트 2
  const rawReading = acquireReading();
  const aReading = enrichReading(rawReading);
  const taxableCharge = aReading.taxableCharge;
  ```

---

<br>

## (3) 함수 인라인하기

- 짤막한 함수로 추출하면 코드가 명료해지고 이해하기 쉬워지는 장점이 있는데 때로는 함수 본문이 이름만큼 명확한 경우가 있거나 함수 본문 코드를 이름만큼 깔끔하게 리팩토링할 때도 있다.
  - 간접 호출은 유용할 수도 있지만 <b><u>쓸데없는 간접 호출은 거슬릴 수 있다.</u></b>
- 다른 함수로 단순히 위임하기만 하는 함수들이 너무 많아서 위임 관계가 다소 복잡하게 얽혀 있으면 인라인하는 방향도 나쁘지 않다.

- **함수 인라인 작업시 항상 단계를 잘게 나눠서 처리하면 좋다.**
  - 만약 함수를 작게 만들었다면 인라인 작업을 단번에 처리할 수 있지만 이렇지 않고 함수 내에 많은 문장이 있는 경우 한 번에 한 문장씩 처리하면 된다.
  - 이럴 때 사용되는 리팩토링 기법이 '문장을 호출한 곳으로 옮기기'이다.

---

- 예시) 함수 인라인 리팩토링 적용

```javascript
// before

function reportLines(aCustomer) {
  const lines = [];
  gatherCustomerData(lines, aCustomer);
  return lines;
}

function gatherCustomerData(out, aCustomer) {
  out.push(['name', aCustomer.name]);
  out.push(['location', aCustomer.location]);
}
```

```javascript
// after

function reportLines(aCustomer) {
  const lines = [];
  lines.push(['name', aCustomer.name]);
  lines.push(['location', aCustomer.location]);
  return lines;
}
```

---

<br>

## (4) 클래스 인라인하기

- 더 이상 제 역할을 못 해서 그대로 두면 안 되는 클래스는 인라인하는 것이 좋다.
  - 역할을 옮기는 리팩토링을 하고나면 특정 클래스에 남은 역할이 거의 없을 때 이런 현상이 자주 생긴다.
  - 이럴 땐 이러한 클래스를 가장 많이 사용하는 클래스로 흡수시키면 된다.
- 두 클래스의 기능을 지금과 다르게 배분하고 싶을 때도 클래스를 인라인한다.
  - 클래스를 인라인해서 하나로 합친 다음 새로운 클래스를 추출하는 게 쉬울 수도 있기 때문이다.

---

- 예시) 배송 추적 정보
  - `TrackingInformation` 클래스에서 `Shipment` 클래스로 인라인

```javascript
// before

// 클라이언트
aShipment.trackingInformation.shippingCompany = request.vendor;

class TrackingInformation {
  // 배송 회사
  get shippingCompany() {
    return this._shippingCompany;
  }
    
  set shippingCompany(arg) {
    this._shippingCompany = arg;
  }
    
  // 추적 번호
  get trackingNumber() {
    return this._trackingNumber;
  }
    
  set trackingNumber(arg) {
    this._trackingNumber = arg;
  }
    
  get display() {
    return `${this.shippingCompany}: ${this.trackingNumber}`;
  }
}

class Shipment {
  get trackingInfo() {
    return this._trackingInformation.display;
  }
    
  get trackingInformation() {
    return this._trackingInformation;
  }
    
  set trackingInformation(aTrackingInformation) {
    this._trackingInformation = aTrackingInformation;
  }
}
```

```javascript
// after

// 클라이언트
aShipment.shippingCompany = request.vendor;

class Shipment {
  get trackingInfo() {
    return `${this.shippingCompany}: ${this.trackingNumber}`;
  }
    
  get shippingCompany() {
    return this._shippingCompany;
  }
    
  set shippingCompany(arg) {
    this._shippingCompany = arg;
  }
    
  get trackingNumber() {
    return this._trackingNumber;
  }
    
  set trackingNumber(arg) {
    this._trackingNumber = arg;
  }
    
  get trackingInformation() {
    return this._trackingInformation;
  }
    
  set trackingInformation(aTrackingInformation) {
    this._trackingInformation = aTrackingInformation;
  }
    
  set shippingCompany(arg) {
    this._trackingInformation.shippingCompany = arg;
  }
}
```

---

