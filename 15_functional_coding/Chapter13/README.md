# Chapter13. 함수형 도구 체이닝

<br>

## 1. `reduce`, `maxKey` 함수 적용

- before

```javascript
function biggestPurchasesBestCustomers(customers) {
  var bestCustomers = filter(customers, function(customer) {
    return customer.purchases.length >= 3;
  });
    
  var biggestPurchases = map(bestCustomers, function(customer) {
    return reduce(customer.purchases, { total: 0 }, function(biggestSoFar, purchase) {
      if (biggestSoFar.total > purchase.total) {
        return biggestSoFar;
      } else {
        return purchase;
      };
    });
  });
    
  return biggestPurchases;
}
```

- after
  - 위 코드보다 조금 개선되었지만 아직 코드에 중첩된 리턴 구문이 있는 콜백이 있다.

```javascript
// maxKey 함수의 세 번째 인자로 어떤 값을 비교할지 콜백 function으로 전달한다.
function maxKey(array, init, f) {
  return reduce(array, init, function(biggestSoFar, element) {
    if (f(biggestSoFar) > f(element)) {
      return biggestSoFar;
    } else {
      return element;
    };
  });
}

function biggestPurchasesBestCustomers(customers) {
  var bestCustomers = filter(customers, function(customer) {
    return customer.purchases.length >= 3;
  });
    
  var biggestPurchases = map(bestCustomers, function(customer) {
    return maxKey(customer.purchases, { total: 0 }, function(purchase) {
      return purchase.total;
    })
  });
    
  return biggestPurchases;
}
```

- `maxKey()` 함수로 `max()` 함수를 만들 수 있다.
  - `maxKey()` 는 비교하는 값을 자유롭게 선택해서 최댓값을 구할 수 있지만, `max()`는 값을 직접 비교해야 한다.
  - 호출 그래프상에서 `maxKey()` 가 `max()` 보다 아래 위치한다.
    - `maxKey()` 는 `max()` 보다 더 일반적인 함수다.
    - `max()` 는 `maxKey()` 의 특별한 버전이라고 볼 수 있다.

```javascript
// maxKey 함수로 max 함수 만들기
// 아래처럼 인자로 받은 값을 그대로 리턴하는 함수를 항등 함수(identify function)라고 한다.
function max(array, init) {
  return maxKey(array, init, function(x) {
    return x;
  })
}
```

<br>

## 2. 체인을 명확하게 만들기

> **체이닝(chaining)**
>
> 단계들을 조합해 하나의 쿼리로 만드는 것으로 여러 단계를 하나로 조합하는 것을 말한다.

### (1) 단계에 이름 붙이기

- 각 단계의 고차 함수를 빼내 이름을 붙인다.
- 각 단계에 이름을 붙이면 훨씬 명확해지고 각 단계에 숨어 있던 두 함수의 구현도 알아보기 쉽다.
- 하지만 <b>인라인으로 정의된 콜백 함수는 재사용할 수 없는 문제가 있다.</b>

```javascript
function biggestPurchasesBestCustomers(customers) {
  var bestCustomers = selectBestCustomers(customers);
  var biggestPurchases = getBiggestPurchases(bestCustomers);
  return biggestPurchases;
}

function selectBestCustomers(customers) {
  return filter(customers, function(customer) {
    return customer.purchases.length >= 3;
  });
}

function getBiggestPurchases(customers) {
  return map(customers, getBiggestPurchase);
}

function getBiggestPurchase(customer) {
  return maxKey(customer.purchases, { total: 0 }, function(purchase) {
    return purchase.total;
  });
}
```

<br>

### (2) 콜백에 이름 붙이기

- 콜백을 빼내고 이름을 붙여 <b>재사용할 수 있는 함수로 만든다.</b>
- <b>호출 그래프의 아래쪽에 위치</b>하므로 재사용하기 좋은 코드라는 것을 알 수 있다.
- 그리고 직관적으로 더 재사용하기 좋은 코드처럼 생겼다.
- 일반적으로 이 방법이 더 명확하다.
- 고차 함수를 그대로 쓰는 첫 번째 방법보다 이름을 붙인 두 번째 방법이 재사용하기도 더 좋다.
- 인라인 대신 이름을 붙여 콜백을 사용하면 단계가 중첩되는 것도 막을 수 있다.

```javascript
function biggestPurchasesBestCustomers(customers) {
  var bestCustomers = filter(customers, isGoodCustomer);
  var biggestPurchases = map(bestCustomers, getBiggestPurchase);
  return biggestPurchases;
}

function isGoodCustomer(customer) {
  return customer.purchases.length >= 3;
}

function getBiggestPurchase(customer) {
  return mapKey(customers.purchases, { total: 0 }, getPurchaseToal);
}

function getPurchaseToal(purchase) {
  return purchase.total;
}
```

<br>

## 3. 스트림 결합(stream fusion)

### (1) 스트림 결합 개념

- `map()`, `filter()`, `reduce()` 체인을 최적화하는 것을 <b>스트림 결합</b>이라고 한다.
- `filter()`와 `map()`은 모두 새로운 배열을 만드는데 함수가 호출될 때마다 새로운 배열이 생겨 크기가 클 수도 있고 비효율적이라고 생각할 수 있다.
  - 하지만 대부분 문제가 되지 않는다.
  - 만들어진 배열이 배열이 필요 없을 때 가비지 컬렉터가 빠르게 처리하기 때문이고 현대 가비지 컬렉터를 매우 빠르다.
- 이 방법의 제일 큰 목적은 <b>'최적화'</b>이다.
  - 병목이 생겼을 때만 쓰는 것이 좋고 대부분의 경우에는 여러 단계를 사용하는 것이 더 명확하고 읽기 쉽다.

<br>

### (2) 스트림 결합 적용

- `map()`

```javascript
// before
// 값 하나에 map() 두 번 사용
var names = map(customers, getFullName);
var nameLengths = map(names, stringLength);

// after
// map()을 한 번 사용해도 같다.
// 이 코드가 가비지 컬렉션이 필요 없다.
var nameLengths = map(customers, function(customers) {
  return stringLength(getFullName(customer));
});
```

- `filter()`

```javascript
// before
// 값 하나에 filter() 두 번 사용
var goodCustomers = filter(customers, isGoodCustomer);
var withAddresses = filter(goodCustomers, hasAddress);

// after
// filter()을 한 번 사용해도 같다.
// 이 코드가 가비지 컬렉션을 적게 한다.
var withAddresses = filter(customers, function(customer) {
  return isGoodCustomer(customer) && hasAddress(customer);
});
```

- `reduce()`

```javascript
// before
// map() 다음에 reduce()를 사용
var purchaseTotals = map(purchases, getPurchaseTotal);
var purchaseSum = reduce(purchaseTotals, 0, plus);

// after
// reduce()를 한 번 사용해도 같다.
// map()을 사용하지 않았기 때문에 가비지 컬렉션할 중간 배열을 만들지 않았다.
var purchaseSum = reduce(purchases, 0, function(total, purchase) {
  return total + getPurchaseTotal(purchase);
});
```

<br>

## 4. 반복문을 함수형 도구로 리팩터링하기

> 리팩터링할 코드
>
> ```javascript
> var answer = [];
> var window = 5;
> 
> for (var i = 0; i < array.length; i += 1) {
>   var sum = 0;
>   var count = 0;
>   for (var w = 0; w < window; w += 1) {
>     var idx = i + w;
>     if (idx < array.length) {
>       sum += array[idx];
>       count += 1;
>     }
>   }
>   answer.push(sum / count);
> }
> ```

### (1) 데이터 만들기

- 어떤 값에 `map()`, `filter()`를 단계적으로 사용하면 중간에 배열이 생기고 없어지는데 `for` 반복문을 사용할 때는 처리할 모든 값이 배열이 들어있지 않아도 된다.
- 첫 번째 팁은 데이터를 배열에 넣으면 함수형 도구를 쓸 수 있다.
- 위 코드에서 안쪽에 있는 반복문을 개선해보자.

```javascript
for (var i = 0; i < array.length; i += 1) {
  var sum = 0;
  var count = 0;
  var subArray = array.slice(i, i + window);
  for (var w = 0; w < subArray.length; w += 1) {
    sum += subArray[w];
    count += 1;
  }
  answer.push(sum / count);
}
```

<br>

### (2) 한 번에 전체 배열을 조작하기

- 하위 배열을 만들었기 때문에 일부 배열이 아닌 배열 전체를 반복할 수 있다.
- `map()`, `filter()`, `reduce()` 는 배열 전체에 동작하기 때문에 이제 이런 함수형 도구를 쓸 수 있다.

```javascript
for (var i = 0; i < array.length; i += 1) {
  var subArray = array.slice(i, i + window);
  answer.push(average(subArray));
}
```

<br>

### (3) 작은 단계로 나누기

- 하지만 현재까지의 코드를 보면 배열의 항목을 도는 것이 아닌 <b>인덱스</b>를 가지고 반복해야 하는 문제가 있다.
- 인덱스로 반복하는 코드를 한 단계로 만들기 어렵거나 어쩌면 불가능할 수도 있다.
- 그래서 더 작은 단계로 나눠야 한다.

```javascript
var indices = [];
for (var i = 0; i < array.length; i += 1) {
  indices.push(i);
}

var window = 5;

var answer = map(indices, function(i) {
  var subArray = array.slice(i, i + window);
  answer.push(average(subArray));
});
```

- `map()` 콜백 안에서 두 가지 일을 하고 있어 두 단계로 나눈다.

```javascript
var indices = [];
for (var i = 0; i < array.length; i += 1) {
  indices.push(i);
}

var window = 5;

var windows = map(indices, function(i) {
  return array.slice(i, i + window);
});

var answer = map(windows, average);
```

- 마지막으로 남은 건 인덱스 배열을 만드는 코드를 빼내 유용한 함수로 정의하는 일이다.

```javascript
// 재사용 가능한 추가 도구 생성
function range(start, end) {
  var ret = [];
  for (var i = start; i < end; i += 1) {
    ret.push(i);
  }
  return ret;
}

var window = 5;

var indices = range(0, array.length); // 단계1. 인덱스 배열 생성
var windows = map(indices, function(i) { // 단계2. 하위 배열 만들기
  return array.slice(i, i + window);
});
var answer = map(windows, average); // 단계3. 평균 계산하기
```

<br>

### :pushpin: 체이닝 팁 요약

#### :round_pushpin: 데이터 만들기

- 함수형 도구는 배열 전체를 다룰 때 잘 동작한다.
- 배열 일부에 대해 동작하는 반복문이 있다면 배열 일부를 새로운 배열로 나눌 수 있다.
- 그리고 `map()`, `filter()`, `reduce()` 같은 함수형 도구를 사용하면 작업을 줄일 수 있다.

#### :round_pushpin: 배열 전체를 다루기

- 반복문 대신에 전체 배열을 한 번에 처리할 수 있을지 생각해보자.
- `map()`은 모든 항목을 변환하고 `filter()`는 항목을 없애거나 유지한다.
- 그리고 `reduce()`는 항목을 하나로 합친다.
- 과감하게 배열 전체를 처리해보자.

#### :round_pushpin: 작은 단계로 나누기

- 알고리즘이 한 번에 너무 많은 일을 한다고 생각된다면 직관에 반하지만 두 개 이상의 단계로 나눠보자.

#### :round_pushpin: [추가] 조건문을 `filter()`로 바꾸기

- 반복문 안에 있는 조건문은 항목을 건너뛰기 위해 사용하는 경우가 있다.
- 앞 단계에서 `filter()`를 사용해 거를 수 있다.

#### :round_pushpin: [추가] 유용한 함수로 추출하기

- `map()`, `filter()`, `reduce()` 는 함수형 도구의 전부가 아니다.
- 자주 사용하는 함수형 도구일 뿐 얼마든지 더 추가할 수 있다.

#### :round_pushpin: [추가] 개선을 위해 실험하기

- 좋은 방법을 찾기 위해 함수형 도구를 새로운 방법으로 다양하게 조합하며 시도하고 연습해보자.



### :pushpin: 체이닝 디버깅 팁

#### :round_pushpin: 구체적인 것을 유지하기

- 파이프라인 단계가 많으면 잊어버리기 쉬우므로 각 단계에서 어떤 것을 하고 있는지 알기 쉽게 이름을 잘 지어야 한다.

#### :round_pushpin: 출력해보기

- 각 단계 사이에 `console.log` 혹은 `print` 문으로 코드를 돌려 예상한 대로 동작하는지 출력하며 확인해보자

#### :round_pushpin: 타입을 따라가 보기

- 타입스크립트와 같은 정적 타입 언어를 사용하면 IDE에서 콜백 함수의 인자나 리턴 값이 어떤 타입인지 자동 추론해서 보여준다.
- 이 기능을 잘 활용하면 원하는 결과가 잘 도출되는지 확인하는데 유용하다.

<br>

## 5. `reduce()` 우아하게 사용하기

> `reduce()`를 이용하여 새로운 값을 만들 수 있다.

- 로그 데이터를 이용하여 새로운 장바구니 데이터 만들기

```javascript
var itemsAdded = ['shirt', 'shoes', 'shirt', 'socks', 'hat'];

var shoppingCart = reduce(itemsAdded, {}, addOne);

function addOne(cart, item) {
  if (!cart[item]) {
    return add_item(cart, { name: item, quantity: 1, price: priceLookup(item) });
  } else {
    var quantity = cart[item].quantity;
    return setFieldByName(cart, item, 'quantity', quantity + 1);
  }
}
```

- 만약 위 상황에서 제품을 추가하거나 삭제하는 것을 모두 지원하려면?
  - 아래와 같이 고객이 제품을 추가했는지 삭제했는지 알려주는 값과 제품에 대한 값을 함께 기록하면 고객이 제품을 삭제한 경우도 처리할 수 있다.

```javascript
var itemOps = [['add', 'shirt'], ['add', 'shoes'], ['remove', 'shirt'], ['add', 'socks'], ['add', 'hat']];

var shoppingCart = reduce (itemOps, {}, function(cart, itemOp) {
  var op = itemOp[0];
  var item = itemOp[1];
  
  if (op === 'add') {
    return addOne(cart, item);
  }
    
  if (op === 'remove') {
    return removeOne(cart, item);
  }
});

function removeOne(cart, item) {
  if (!cart[item]) {
    return cart;
  }
    
  var quantity = cart[item].quantity;
  if (quantity === 1) {
    return remove_item_by_name(cart, item);
  } else {
    setFieldByName(cart, item, 'quantity', quantity - 1);
  }
}
```

- 위 코드에서 중요한 기술은 인자를 데이터로 표현했다는 점이다.
  - 배열에 동작 이름과 제품 이름인 인자를 넣어 동작을 완전한 데이터로 표현했다.
- 인자를 데이터로 만들면 함수형 도구를 체이닝하기 좋다.
  - 체이닝을 할 때 리턴할 데이터를 다음 단계의 인자처럼 쓸 수 있도록 만들어보자.
