# Chapter14. 중첩된 데이터에 함수형 도구 사용하기

<br>

## 1. `update()` 함수 도출

- before

```javascript
function incrementField(item, field) {
  var value = item[field];
  var newValue = value + 1;
  var newItem = objectSet(item, field, newValue);
  return newItem;
}
```

- after

```javascript
function incrementField(item, field) {
  return updateField(item, field, function(value) {
    return value + 1;
  });
}

function updateField(item, field, modify) {
  var value = item[field];
  var newValue = modfiy(value);
  var newItem = objectSet(item, field, newValue);
  return newItem;
}
```

- 최종 개선된 `update()` 함수
  - 아래와 같이 작성하면 이전에 배운 카피-온-라이트 원칙을 사용했기 때문에 원본 해시 맵을 바꾸지 않는다.
  - `update()` 함수는 원래 해시 맵의 복사본을 변경해 리턴한다.

```javascript
function update(object, key, modify) {
  var value = object[key]; // 값을 가져와서
  var newValue = modify(value); // 바꾸고
  var newObject = objectSet(object, key, newValue); // 설정한다.
  return newObject; // 바꾼 객체를 리턴(카피-온-라이트)
}
```

- 조회하고 변경하고 설정하는 것을 `update()`로 교체하기

  - 단계1. 조회하고 바꾸고 설정하는 것을 찾기

    ```javascript
    function halveField(item, field) {
      var value = item[field]; // 설정
      var newValue = value / 2; // 바꾸기
      var newItem = objectSet(item, field, newValue); // 설정
      return newItem;
    }
    ```

  - 단계2. `update()`로 교체하기

    ```javascript
    function halveField(item, field) {
      return update(item, field, function(value) {
        return value / 2;
      });
    }
    ```

  - 이 리팩토링 기법은 중첩된 객체에 적용하기 좋다.

<br>

## 2. 중첩된 객체에 적합한 `update()` 함수 도출 - `update2()`

- before

```javascript
var shirt = {
  name: 'shirt',
  price: 13,
  options: {
    color: 'blue',
    size: 3,
  },
};

function incrementSize(item) {
  var options = item.options; // 조회
  var size = options.size; // 조회
  var newSize = size + 1; // 변경
  var newOptions = objectSet(options, 'size', newSize); // 설정
  var newItem = objectSet(item, 'options', newOptions); // 설정
  return newItem;
}
```

- after - 버전1
  - 중첩된 `update()` 함수 사용
  - 내부 `update` 함수에서 `'size'`, `increment` 처럼 암묵적 인자를 본문에서 두 번이나 쓰고 있음

```javascript
function incrementSize(item) {
  return update(item, 'options', function(options) {
    return update(options, 'size', increment);
  });
}
```

- after - 버전2
  - 암묵적 인자를 드러내기 리팩터링 적용
    - 함수 이름에 있는 암묵적 인자 확인
    - 명시적인 인자 추가
    - 함수 본문에 하드 코딩된 값을 새로운 인자로 바꿈
    - 함수를 호출하는 곳을 고침
  - 하지만 여전히 `'options'` 에서 코드의 냄새가 또 생김
  - 여전히 함수 이름에 있는 것을 본문에서 참조하고 있음

```javascript
function updateOption(item, option, modify) {
  return update(item, 'options', function(options) {
    return update(options, option, modify);
  });
}
```

- after - 버전3
  - `updateOption` 함수에서 암묵적인 인자 드러내기

```javascript
function update2(object, key1, key2, modify) {
  return update(object, key1, function(value1) {
    return update(value1, key2, modify);
  });
}

function incrementSize(item) {
  return update2(item, 'options', 'size', function(size) {
    return size + 1;
  });
}
```

---

### :grey_question: 그러면 만약 중첩 단계가 깊어질 때마다 `update()` 함수는 어떻게 만들어질까?

```javascript
function update3(object, k1, k2, k3, modify) {
  return update(object, k1, function(object2) {
    return update2(object2, k2, k3, modify);
  });
}

function update4(object, k1, k2, k3, k4, modify) {
  return update(object, k1, function(object2) {
    return update3(object2, k2, k3, k4, modify);
  })
}

function update5(object, k1, k2, k3, k4, k5, modify) {
  return update(object, k1, function(object2) {
    return update3(object2, k2, k3, k4, k5, modify);
  })
}
```

---

<br>

## 3. `nestedUpdate()` 도출

- 방금 전 위에서 살펴본 `update3`, `update4`, `update5` 함수를 참고로 중첩된 개수에 상관없이 쓸 수 있는 `nestedUpdate()` 함수를 도출해보자.

```javascript
function updateX(object, depth, key1, key2, key3, modify) {
  return update(object, key1, function(value1) {
    return updateX(object, value1, depth - 1, key2, key3, modify);
  });
}
```

- 위와 같이 작성하면 인자를 명시적으로 만들 수 있지만 깊이와 키 개수를 정확히 맞춰야하는 문제가 생긴다.
  - `depth` 인자와 실제 키 개수는 달라질 수 있어 버그가 생길 수 있다.
  - 키의 개수와 순서가 중요하다는 점을 이용하면 배열 자료 구조가 필요하다는 것을 알 수 있다.

```javascript
function nestedUpdate(object, keys, modify) {
  if (keys.length === 0) {
    return modify(object); // 종료 조건(경로의 길이가 0일 때)
  }
    
  var key1 = keys[0];
  var restOfKeys = drop_first(keys); // 종료 조건에 가까워진다.(항목을 하나씩 없앰)
  return update(object, key1, function(value1) {
    return nestedUpdate(value1, restOfKeys, modify); // 재귀 호출
  })
}
```

---

### :heavy_plus_sign: 추가 내용

- `for` 반복문보다 재귀 호출로 구성하는게 더 좋은 이유
  - `for` 반복문이 재귀보다 이해하기 쉽다.
  - 하지만 코드를 작성할 때 하려는 일을 코드로 명확하게 표현하는 것이 좋다.
  - 중첩된 데이터를 다루는 경우에는 재귀로 만드는 것이 더 명확하다.
  - 재귀의 장점은 재귀 호출을 리턴 받는 곳에서 기존의 인잣값을 스택으로 유지할 수 있다는 점이다.
  - 만약 일반 반복문으로 만든다면 스택을 직접 관리해야 한다.
- 재귀 호출은 위험한가?
  - 재귀도 절차적인 반복문처럼 무한 반복에 빠질 수 있다.
  - 언어나 재귀 함수에 따라 스택이 빨리 바닥날 수 있지만 잘 만들었다면 그렇게 깊은 스택을 사용할 일이 없을 것이다.
  - 재귀를 올바로 사용하려면 되도록 적은 단계로 사용하는 것이 좋다.

---

<br>

## 4. 안전한 재귀 사용법

### (1) 종료 조건

- 재귀를 멈추려면 <b>종료 조건(base case)</b>이 필요하다.
  - 종료 조건은 재귀가 멈춰야 하는 곳에 있어야 한다.
  - 더는 재귀 호출을 하지 않으므로 그 위치에서 재귀가 끝난다.

<br>

### (2) 재귀 호출

- 재귀 함수는 최소 하나의 <b>재귀 호출(recursive call)</b>이 있어야 한다.
  - 재귀 호출이 필요한 곳에서 재귀 호출을 해야 한다.

<br>

### (3) 종료 조건에 다가가기

- 재귀 함수를 만든다면 최소 하나 이상의 인자가 점점 줄어들어야 한다.
  - 그래야 종료 조건에 가까워질 수 있다.
  - 예를 들어 종료 조건이 빈 배열이라면 각 단계에서 배열 항목을 없애야 한다.
- 가장 좋지 않은 것은 재귀 호출에 같은 인자를 그대로 전달하는 것이다.
  - 이렇게 하면 무한 반복에 빠질 가능성이 높아진다.

<br>

## 5. 깊이 중첩된 데이터에 추상화 벽 사용하기

- 깊이 중첩된 데이터를 사용할 때 너무 많은 것을 기억해야 하는 어려움이 있다.
- 중첩된 각 단계의 데이터 구조를 모두 기억해야 한다.
- 문제를 해결하는 열쇠는 같은 작업을 하면서 알아야 할 데이터 구조를 줄이는 것이고 이는 추상화 벽을 통해 할 수 있다.
- 추상화 벽에 함수를 만들고 의미 있는 이름을 붙여주는 것이다.
- 추상화 벽을 만들 때는 사용하려는 데이터의 이해도를 높일 수 있는 방향으로 만들어야 한다.

```javascript
// updatePostById 라는 명확한 이름
// 분류에 있는 블로그 글이 어떤 구조인지 몰라도 modifyPost 라는 함수를 쓸 수 있음
function updatePostById(category, id, modifyPost) {
  // ['posts', 'id'] 처럼 분류의 구조 같은 구체적인 부분은 추상화 벽 뒤로 숨김
  // 블로그 글 구조에 대해서는 콜백에 맡김
  return nestedUpdate(category, ['posts', 'id'], modifyPost);
}
```

```javascript
function updateAuthor(post, modifyUser) {
  // 사용자를 처리하는 방법은 modifyUser가 알고 있다.
  return update(post, 'author', modifyUser);
}
```

```javascript
// caplitalizeName() 함수 사용시 키를 몰라도 된다.
function capitalizeName(user) {
  return update(user, 'name', capitalize);
}
```

- 종합본

```javascript
updatePostById(blogCategory, '12', function(post) {
  return updateAuthor(post, capitalizeUserName);
})
```

- 위와 같이 작성하면 좋은 점
  - 기억해야 할 것이 네 가지에서 세 가지로 줄어든다.
  - 동작의 이름이 있으므로 각각의 동작을 기억하기 쉽다.
    - 분류 안에 블고그 글이 있다는 것을 알고 있다.
    - 하지만 이제 어떤 키에 들어 있는지 기억하지 않아도 된다.
