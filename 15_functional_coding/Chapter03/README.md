# Chapter03. 액션과 계산, 데이터의 차이를 알기

<br>

## 1. 액션과 계산, 데이터

### (1) 개념 정의

- 액션
  - <b>실행 시점과 횟수에 의존</b>한다.
  - 다른 말로 <b>부수 효과, 부수 효과가 있는 함수, 순수하지 않은 함수</b>라고 부르기도 한다.
  - ex) 이메일 보내기, 데이터베이스 읽기
- 계산
  - <b>입력으로 출력을 계산</b>한다.
  - 다른 말로 <b>순수 함수, 수학 함수</b>라고 부르기도 한다.
  - ex) 최댓값 찾기, 이메일 주소가 올바른지 확인하기
- 데이터
  - 이벤트에 대한 사실
  - ex) 사용자가 입력한 이메일 주소, 은행 API로 읽은 달러 수량

<br>

### (2) 상황별로 생각해보기

- 문제에 대해 생각할 때
  - 특별히 <u>주의</u>해야 할 부분(액션)과 데이터로 처리해야 할 부분, <u>결정</u>을 내려야 하는 부분(계산)을 명확히 알 수 있다.
- 코딩할 때
  - 함수형 프로그래머는 최대한 액션에서 계산을 빼내려고 한다.
  - 계산에서는 데이터를 분리할 수 있는지 생각한다.
  - 더 나아가 액션이 계산이 될 수 있는지, 계산은 데이터가 될 수 있는지 고민한다.
- 코드를 읽을 때
  - 액션은 시간에 의존하므로 더 조심해야 한다.
  - 액션에 숨어있는 다른 액션이나 계산 또는 데이터를 발견하면 좋다.

<br>

### (3) 정리

- 액션과 계산, 데이터는 어디에나 적용할 수 있다.
- 액션 안에는 계산과 데이터, 또 다른 액션이 숨어 있을지도 모른다.
- 계산은 더 작은 계산과 데이터로 나누고 연결할 수 있다.
- 데이터는 데이터만 조합할 수 있다.
- 계산은 때로 '우리 머릿속에서' 일어난다.

<br>

## 2. 데이터

- 데이터에 의미를 담는 방법
  - 데이터 구조로 의미를 담을 수 있다.
  - 예를 들어 목록의 순서가 중요하다면 순서를 보장하는 데이터 구조를 사용하면 된다.
  - 데이터 구조로 도메인을 표현할 수 있다.
- 불변 데이터 구조 만드는 두 가지 원칙
  - 카피-온-라이트(copy-on-write): 변경할 때 복사본을 만든다.
  - 방어적 복사(defensive copy): 보관하려고 하는 데이터의 복사본을 만든다.
- 데이터의 장점
  - 직렬화
    - 직렬화된 액션, 계산은 다른 곳에서 잘 동작할 것이라는 보장이 없지만 데이터는 전송하거나 디스크에 저장했다가 읽기 쉽다.
  - 동일성 비교
    - 계산이나 액션은 서로 비교하기 어렵지만 데이터는 비교하기 쉽다.
  - 자유로운 해석
    - 한 가지 방법에 국한되지 않고 여러 가지 방법으로 해석할 수 있다.
- 데이터의 단점
  - 유연하게 해석할 수 있는 장점 반면에, 해석이 반드시 필요하다는 점이 단점이다.
  - 계산은 해석하지 않아도 실행할 수 있지만 해석하지 않은 데이터는 쓸모없는 바이트일 뿐이다.

---

:heavy_check_mark: <b>모든 데이터가 이벤트에 대한 사실인가? 그럼 사용자나 다른 엔티티(entity)는 어떤 사실인가?</b>

- 사용자 정보도 어떤 시점에 시스템에 들어온다.
- 데이터베이스에 저장되어 있는 사용자 이름도 웹 요청 이벤트로부터 데이터가 저장되었다는 것을 알 수 있다.
- 사용자 이름을 사용자에 대한 사실로 해석할 수 있고 이것은 웹 요청이라는 이벤트로부터 생겼다고 할 수 있다.
- 그러므로 모든 데이터가 이벤트에 대한 사실이라고 할 수 있다.

---

<br>

## 3. 쿠폰 보내기(예제)

### (1) 액션 대신에 계산을 사용하자

- 함수형 프로그래머는 일반적으로 가능하면 액션을 쓰지 않으려고 한다.
  - 그리고 계산으로 바꿀 수 있는 액션이 있다면 그렇게 하는 것이 좋다.
- 가능한 계산을 사용하려고 하는 이유는 <b>테스트하기 쉽기</b> 때문이다.
  - 이메일을 실제로 보내고 결과를 주는 시스템은 테스트하기 어렵다.
  - 하지만 결과가 이메일 목록 데이터인 시스템은 테스트하기 쉽다.

<br>

### (2) 쿠폰 보내는 과정 구현하기

- 데이터베이스에서 가져온 구독자 데이터
  - 일반적으로 자바스크립트에서는 데이터베이스 행을 표현하기 위해 자바스크립트 객체를 사용한다.

```javascript
var subscriber = {
  email: 'sam@pamil.com',
  rec_count: 16,
};
```

- 쿠폰 등급

```javascript
var rank1 = 'best';
var rank2 = 'good';
```

- 쿠폰 등급을 결정하는 것은 함수
  - 자바스크립트에서 계산은 함수로 구현한다.

```javascript
function subCouponRank(subscriber) {
  if (subscriber.rec_count >= 10) {
    return 'best';
  } else {
    return 'good';
  }
}
```

- 데이터베이스에서 가져온 쿠폰 데이터

```javascript
var coupon = {
  code: '10PERCENT',
  rank: 'bad',
};
```

- 특정 등급의 쿠폰 목록을 선택하는 계산은 함수

```javascript
function selectCouponsByRank(coupons, rank) {
  var ret = [];
    
  for (var c = 0; c < coupons.length; c += 1) {
    var coupon = coupons[c];
    if (coupon.rank === rank) {
      ret.push(coupon.code);
    }
  } 
    
  return ret;
}
```

- 이메일은 그냥 데이터
  - 이메일 데이터는 보내는 주소와 받는 주소, 제목, 본문을 포함하고 이 데이터 역시 자바스크립트 객체로 구현할 수 있다.

```javascript
var message = {
  from: 'newsletter@coupondog.co',
  to: 'sam@pamil.com',
  subject: 'Your weekly coupons inside',
  body: 'Here are your coupons ...',
};
```

- 구독자가 받을 이메일을 계획하는 계산
  - 외부에 어떤 영향도 주지 않고 입력값에 따라 이메일을 결정하고 리턴하는 것이 전부이므로 이 함수는 계산이다.

```javascript
function emailForSubscriber(subscriber, goods, bests) {
  var rank = subCouponRank(subscriber);
  if (rank === 'best') {
    return {
      from: 'newsletter@coupondog.co',
      to: subscriber.email,
      subject: 'Your best weekly coupons inside',
      body: `Here are the best coupons ${bests.join(', ')}`,
    }
  } else {
    return {
      from: 'newsletter@coupondog.co',
      to: subscriber.email,
      subject: 'Your good weekly coupons inside',
      body: `Here are the good coupons ${goods.join(', ')}`,
    }
  }
}
```

- 보낼 이메일 목록 준비하기
  - 이 함수는 실행 시점에 의존하지 않으므로 계산이다.

```javascript
function emailsForSubscribers(subscribers, goods, bests) {
  var emails = [];
  for (var s = 0; s < subscribers.length; s += 1) {
    var subscriber = subscribers[s];
    var email = emailForSubscriber(subscriber, goods, bests);
    emails.push(email);
  }
  return emails;
}
```

- 이메일 보내기는 액션이다.
  - 액션으로 모든 기능을 하나로 묶는다.

```javascript
function sendIssue() {
  var coupons = fetchCouponsFromDB();
  var goodCoupons = selectCouponsByRank(coupons, 'good');
  var bestCoupons = selectCouponsByRank(coupons, 'best');

  var subscribers = fetchSubscribersFromDB();
  var emails = emailsForSubscribers(subscribers, goodCoupons, bestCoupons);

  for (var e = 0; e < emails.length; e += 1) {
    var email = emails[e];
    emailSystem.send(email);
  }
}
```

- 데이터를 파악하는 것으로 시작해서 계산과 추가 데이터를 도출하고 액션으로 모든 것을 묶었다.
- 데이터는 사용하는 데 제약이 많고 액션은 가장 제약이 없다.
- 이와 같이 데이터를 먼저 구현하고 계산을 구현한 후에 마지막으로 액션을 구현하는 것이 함수형 프로그래밍의 일반적인 구현 순서이다.

---

:heavy_check_mark: <b>`sendIssue` 함수 개선해보기</b>

- 사용자가 많다면 메모리 부족으로 인해 시스템이 동작하지 않을 수 있는데 이러한 문제가 생긴다고 단정할 수도 없다.
- 실행하기 전에는 아무도 모르기 때문에 미리 최적화를 하는 것은 좋지 않다.
- 하지만 사용자가 증가한다면 문제가 생길 수도 있기 때문에 확장성에 대해 미리 고려하는 것은 좋다.
- 아래와 같이 페이지네이션 기법을 적용하면 해결할 수 있다.

```javascript
function sendIssue() {
  var coupons = fetchCouponsFromDB();
  var goodCoupons = selectCouponsByRank(coupons, 'good');
  var bestCoupons = selectCouponsByRank(coupons, 'best');
    
  var page = 0;
  var subscribers = fetchSubscribersFromDB(page);
    
  while (subscribers.length > 0) {
    var emails = emailsForSubscribers(subscribers, goodCoupons, bestCoupons);
      
    for (var e = 0; e < emails.length; e += 1) {
      var email = emails[e];
      emailSystem.send(email);
    }
      
    page += 1;
    subscribers = fetchSubscribersFromDB(page);
  }
}
```

- 위 개선된 코드에서 계산은 고치지 않았다는 것이 중요하다.
  - 잘 만들어진 시스템이라면 '0보다 크거나 같은 구독자들에 대한 이메일을 가져온다'는 추상적인 개념이 바뀌지 않는 한 계산은 바뀌지 않아야 한다.
- 데이터베이스에서 메모리로 읽어오는 것은 액션이다.
  - 더 작은 개수를 읽도록 액션만 고쳐서 최적화한 코드다.

---

<br>

## 4. 계산

(작성중...)
