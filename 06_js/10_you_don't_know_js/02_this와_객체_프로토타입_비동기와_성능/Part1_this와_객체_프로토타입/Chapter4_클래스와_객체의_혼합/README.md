# Chapter4. 클래스와 객체의 혼합

<br>

## 1. 클래스 이론

### (1) 기본 개념

- 자료 구조
  - 컴퓨터가 다루어야 하는 자료가 많은 경우 이것을 다루는 방법으로 알고리즘을 구현하는데 사용한다.
  - 데이터를 효과적으로 저장하고 처리하는 방법에 대해 바르게 이해할 필요성이 있고 제대로 이해하지 못하면 성능적인 측면에서 안 좋게 된다.
- 알고리즘
  - 주어진 문제를 해결하기 위한 절차를 말한다.
  - 효율적인 자료구조 설계를 위해 알고리즘 지식이 필요하고 효율적인 알고리즘을 작성하기 위해 문제 상황에 맞는 적절한 자료구조가 사용되어야 한다.
  - 따라서 자료구조론과 알고리즘 이론은 모두 동일선상에 놓을 수 있다.
- 클래스
  - 특정 자료 구조를 분류하는 용도로 쓰인다.
  - 즉, 일반적인 기준 정의에서 세부적이고 구체적인 변형으로서의 자료 구조를 도출하는 것이다.
- 다형성
  - 부모 클래스에 뭉뚱그려 정의된 작동을 자식 클래스에서 좀 더 구체화하여 오버라이드(재정의)하는 것을 뜻한다.
  - 사실 오버라이드된 작동에서 기반 작동을 참조할 수 있는 건 이런 상대적 다형성 덕분이다.
  - 클래스 이론에서는 부모와 자식 클래스 모두 똑같이 공유하여 자식 클래스 메서드가 부모 클래스 메서드를 (다르게) 오버라이드하라고 권장한다.
  - 그러나 자바스크립트에서 이렇게 하면 예기치 않은 결과를 초래하기도 하고 불안정한 코드가 만들어진다고 한다...

<br>

### (2) 클래스 디자인 패턴

#### :round_pushpin: 절차적 프로그래밍

| 분류 | 설명                                                         |
| ---- | ------------------------------------------------------------ |
| 개념 | <ul><li>상위 수준의 추상화 없이 다른 함수를 호출하는 프로시저(함수)로만 코드를 구성하는 프로그래밍 기법</li><li>프로그램을 재사용 가능한 함수 단위로 나누는 프로그래밍 구조</li><li><b><u>순차적인 처리</u></b>를 중요시 여기며, 프로그램 전체가 유기적으로 연결되도록 만드는 프로그래밍 기법</li><li>데이터를 중심으로 함수를 구현</li></ul> |
| 장점 | <ul><li>코드를 단위화(모듈 구성)할 수 있어 구조적인 프로그래밍이 가능함</li><li>컴퓨터의 처리구조와 유사해 실행 속도가 빠름</li></ul> |
| 단점 | <ul><li>유지보수가 어려움</li><li>정해진 순서대로 입력을 해야하므로 순서를 바꾸면 결과값을 보장할 수 없음</li><li>코드가 길어지면 가독성이 무척 떨어지며 이해하기가 힘듬</li><li>대형 프로젝트에 부적합</li></ul> |

<br>

#### :round_pushpin: 객체 지향 프로그래밍

| 분류 | 설명                                                         |
| ---- | ------------------------------------------------------------ |
| 개념 | <ul><li><b><u>모든 데이터를 객체로 취급</u></b>하며 모든 객체가 내부의 자료형과 함수로 구성된 프로그래밍 구조를 의미</li><li>기능을 중심으로 함수를 구현</li></ul> |
| 장점 | <ul><li>객체와 객체간의 독립성이 확립되므로 유지보수에 도움이 됨</li><li>코드의 재사용성이 높아짐</li></ul> |
| 단점 | <ul><li>설계에 많은 시간이 소요되며 처리 속도가 절차적 프로그래밍보다는 상대적으로 느림</li><li>객체가 많아지면 용량이 커질 수 있음</li></ul> |

<br>

#### :round_pushpin: 절차적 프로그래밍

| 분류 | 설명                                                         |
| ---- | ------------------------------------------------------------ |
| 개념 | <ul><li>주어진 문제를 작은 문제로 나눈 뒤, 작은 문제를 해결할 수 있는 <b><u>‘순수 함수’</u></b>를 사용하는 방식</li><li>가독성을 높이고 유지보수를 용이하게 하는 프로그래밍 구조</li></ul> |
| 장점 | <ul><li>코드에서 프로그램의 실행에 영향을 미치는 순수한 영역을 최대한 분리함으로써 코드 가독성이 높아지고 유지보수가 좋아지며 더 안전한 프로그램을 만들 수 있음</li></ul> |
| 단점 | <ul><li>상태를 조작할 수 없음</li></ul>                      |

---

:page_facing_up: <b>참고 자료</b>

- [프로그래밍 언어] 절차적 프로그래밍 vs 객체지향 프로그래밍 [(바로 이동)](https://kevinkim95-dev.tistory.com/2)
- [Software Engineering] 절차적 vs 객체지향 vs 함수형 [(바로 이동)](https://wooono.tistory.com/270)

---

<br>

### (3) 자바스크립트 클래스

- 자바스크립트의 클래스는 다른 객체 지향 프로그래밍 언어에서 사용되는 클래스와 완벽히 동일하지 않다.
  - 내부적으로 동작하는 방식이 완전 다르다.(feat. prototype)

<br>

### (4) OOP의 특성

- 캡슐화(Encapsulation)
  - 변수와 함수를 클래스로 묶어놓은 것으로 캡슐화를 통해 정보 은닉의 이점을 얻는다.
- 상속(Inheritance)
  - 이미 작성된 클래스를 이어 받아서 새로운 클래스를 생성하는 기법으로 코드의 재활용성을 높여준다.
- 다형성(Polymorphism)
  - 같은 이름의 변수 혹은 함수가 상황에 따라 다른 의미로 해석될 수 있다는 특성이며 이로 인해 오버라이딩, 오버로딩이 가능하다.
    - 오버라이딩: 상위 클래스가 가지고 있는 메서드를 하위 클래스가 재정의해서 사용
    - 오버로딩: 같은 이름의 메서드를 여러 개 가지면서 매개변수의 유형과 개수가 다를 때 다르게 동작하도록 하는 것

---

:page_facing_up: <b>참고 자료</b>

- 오버로딩, 오버라이딩을 통해 다형성 구현하기 [(바로 이동)](https://gbsb.tistory.com/235)

---

<br>

## 2. 클래스 체계

### (1) 건축

> 건축에 비유하여 클래스와 인스턴스 개념 살펴보기

- 클래스가 건축할 때의 청사진(blueprint)에 해당한다.
- 개발자가 상호 작용할 실제 객체는 클래스라는 틀에서 만들어낸다.(인스턴스화한다.)
- 틀에서 만들어낸 최종 결과가 인스턴스라는 객체고 개발자는 객체 메서드를 직접 호출하거나 공용 데이터 프로퍼티에 접근한다.
- 객체는 클래스에 기술된 모든 특성을 그대로 가진 사본이다.

---

:page_facing_up: <b>참고 자료</b>

- [Java] 클래스, 객체, 인스턴스의 차이 [(바로 이동)](https://gmlwjd9405.github.io/2018/09/17/class-object-instance.html)
- [Java] 클래스, 객체, 인스턴스 차이 구분 [(바로 이동)](https://blog.naver.com/PostView.nhn?blogId=good_ray&logNo=222069343755)

---

<br>

### (2) 생성자

- 인스턴스는 보통 클래스명과 같은 이름의 생성자라는 특별한 메서드로 생성한다.
  - 생성자의 임무는 인스턴스에 필요한 정보를 초기화하는 일이다.

```javascript
class Person {
  constructor(name) {
     this.name = name;
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }
}
```

- `Person` 인스턴스를 생성하려면 클래스 생성자를 호출한다.

```javascript
const p1 = new Person('wally');
console.log(p1.getName()); // 'wally'
```

- `new Person()` 을 하면 생성자가 호출되고 생성자의 반환 값은 객체(클래스의 인스턴스)이므로 `getName()`을 호출하면 `name` 값을 얻을 수 있다.

---

:page_facing_up: <b>참고 자료</b>

- `new`의 동작 방식 [(바로 이동)](https://github.com/baeharam/Must-Know-About-Frontend/blob/main/Notes/javascript/new.md)

---

<br>

## 3. 클래스 상속

### (1) 클래스 상속 맛보기

```javascript
class Vehicle {
  engines = 1;

  ignition() {
    console.log('엔진을 켠다.');
  }

  drive() {
    this.ignition();
    console.log('방향을 맞추고 앞으로 간다!');
  }
}

class Car extends Vehicle {
  wheels = 4;

  drive() {
    super.drive();
    console.log(`${this.wheels}개의 바퀴로 굴러간다!`);
  }
}

class SpeedBoat extends Vehicle {
  engines = 2;

  ignition() {
    console.log(`${this.engines}개의 엔진을 켠다.`);
  }

  pilot() {
    super.drive();
    console.log('물살을 가르며 쾌속으로 질주한다!');
  }
}

const v1 = new Vehicle();
const v2 = new Car();
const v3 = new SpeedBoat();
```

- `Vehicle` 클래스에는 엔진 하나와 시동 거는 방법, 주행 방법이 정의되어 있다.
  - 하지만 이는 아직 만들지도 않은 탈것에 불과하니 현시점에선 단지 추상적인 개념이 지나지 않는다.
- 그래서 구체적인 탈 것 두 가지, 차(`Car`)와 모터보트(`SpeedBoat`)를 정의한다.
  - 둘 다 `Vehicle`의 일반적인 특성을 물려받아 각자에 맞는 특성을 세분화한다.

<br>

### (2) 다형성

- <b><u>한 메서드가 상위 수준의 상속 체계에서</u></b> (메서드명은 같거나 다를 수 있지만) <b><u>다른 메서드를 참조할 수 있게 해주는</u></b> 아이디어를 <b><u>다형성(polymorphism)</u></b>이라 한다.
- 위 코드를 보면 `Car`는 `Vehicle`로부터 상속받은 `drive()` 메서드를 같은 명칭의 자체 메서드로 오버라이드한다.
  - 그러나 이 메서드 안에서 `super.drive()` 호출은 `Vehicle`로부터 상속받아 오버라이드하기 전의 원본을 참조하게 되고 이를 다형성 또는 상대적 다형성이라 한다.
    - 참고로 ‘상대적’이 앞에 붙은 이유는 접근할 상속 수준에 대한 절대적인 기준이 없는 상태에서 참조할 대상을 찾기 위해 계속 거슬러 올라가기 때문이다.
- 다형성은 같은 이름의 메서드가 상속 연쇄의 수준별로 다르게 구현되어 있고 이 중 어떤 메서드가 적절한 호출 대상인지 자동으로 선택하는 특징이 있다.
  - `drive()` 메서드는 `Vehicle`, `Car` 둘 다 똑같은 이름으로 정의되어 있고 `ignition()` 역시 `Vehicle`, `SpeedBoat`에 모두 있다.

<br>

#### :round_pushpin: 다형성의 또 다른 모습 - `super`

> `v3.pilot();`을 실행할 때 `ignition()` 메서드는 어떤 클래스의 메서드로 실행할까? ⇒ `Vehicle` vs `SpeedBoat`

- 정답

  - 정답은 `SpeedBoat`의 `ignition()` 메서드이다.
    - `Vehicle` 클래스를 인스턴스화하여 `drive()`를 호출했다면 당연히 엔진은 `Vehicle`의 `ignition()`을 실행할 것이다.
    - 다시 말해, 인스턴스가 어느 클래스(상속 수준)를 참조하느냐에 따라 `ignition()` 메서드의 정의는 다형적이다(모습이 변한다).

  - 클래스를 상속하면 자식 클래스에는 자신의 부모 클래스를 가리키는 상대적 레퍼런스가 주어지는데, 바로 이 레퍼런스를 보통 `super`라고 한다.

  - 개념상으로는 자식 클래스 `SpeedBoat`가 상대-다형적 레퍼런스(`super`)를 통해 부모 클래스(`Vehicle`)의 작동에 접근할 수 있을 것 같지만 실제로 자식 클래스는 그냥 부모 클래스의 작동을 복사기에 넣고 찍어낸 사본에 불과하다.

  - 자식이 부모에게 상속받은 메서드를 ‘오버라이드’하면 원본 메서드와 오버라이드된 메서드는 각자의 길을 걷게 되며 양쪽 다 개별적으로 접근할 수 있다.

  - 자식은 그저 부모에게서 자신이 필요한 내용을 베껴왔을 뿐이니... 클래스 상속은 한 마디로 ‘복사’다.

- [개념 정리] `super`의 두 가지 용법

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayHi() {
    return `Hi! ${this.name}(${this.age})`;
  }
}

class Developer extends Person { 
  constructor(name, age, category) {
    super(name, age); // (1) super() => 부모 클래스의 생성자, 자식 constructor 내부에서만 사용할 수 있다.
    this.category = category;
  }

  sayHi() {
    return `${super.sayHi()} - ${this.category}`; // (2) super.method() => 부모 클래스에 정의된 메서드 호출
  }
}
```

---

:page_facing_up: <b>참고 자료 - '클래스 상속' 읽을거리</b>

- [JS] class - super [(바로 이동)](https://mill-study.tistory.com/149?category=914208)
- 클래스 상속 [(바로 이동)](https://ko.javascript.info/class-inheritance)

---

<br>

### (3) 다중 상속

- 일부 클래스 지향 언어에서는 복수의 ‘부모’ 클래스에서 ‘상속’받을 수 있다.
  - 다중 상속(Multiple Inheritance)은 부모 클래스 각각의 정의가 자식 클래스로 복사된다는 의미이다.
- 마름모 문제(Diamond Problem)
  - 이를테면 D 클래스가 부모 클래스 B, C로부터 상속받고 이 부모 클래스들은 다시 같은 부모 클래스 A를 갖는 구조가 있을 때 A의 `drive()` 메서드를 B와 C가 각각 오버라이드한다면 D는 어떤 클래스의 `drive()` 메서드를 참조해야할까? ⇒ 그 다음 절인 `4. 믹스인` 을 이어서 살펴보자.

<br>

## 4. 믹스인

------

- 자바스크립트 객체는 상속받거나 인스턴스화해도 자동으로 복사 작업이 일어나지는 않는다.
  - 쉽게 말하면 자바스크립트엔 인스턴스로 만들 ‘클래스’란 개념 자체가 없고 오직 객체만 있다.
  - 그리고 객체는 다른 객체에 복사되는 게 아니라 <b>서로 연결</b>된다.
- 믹스인은 다른 언어와 달리 자바스크립트에선 누락된 클래스 복사 기능을 흉내 낸 것으로 보면 된다.

------

<br>

### (1) 명시적 믹스인

> 명시적 믹스인은 클래스의 복사 기능과 같지 않다.
>
> 이는 객체(함수도 포함) 그 자체가 아니라 단지 <b><u>공유된 레퍼런스</u></b>만 복사하기 때문이다.

```javascript
function mixin(sourceObj, targetObj) {
  for (const key in sourceObj) {
    // 타겟에 없는 프로퍼티만 복사
    if (!(key in targetObj)) {
      targetObj[key] = sourceObj[key];
    }
  }

  return targetObj;
}

const Vehicle = {
  engines: 1,
  ignition() {
    console.log('엔진을 켠다');
  },
  drive() {
    this.ignition();
    console.log('방향을 맞추고 앞으로 간다!');
  }
}

// 현재 이 상태에서는 Car에는 이미 자체 drive 프로퍼티가 있으므로 이 프로퍼티 레퍼런스는 오버라이드 되지 않는다.(mixin 함수의 if문 참고)
const Car = mixin(Vehicle, {
  wheels: 4,
  drive() {
    Vehicle.drive.call(this);
    console.log(`${this.wheels}개의 바퀴로 굴러간다!'); 
  }
});
```

#### :round_pushpin: 다형성 재고 - 명시적 의사다형성

- `Vehicle.drive.call(this);`와 같은 코드를 명시적 의사다형성(Explicit Pseudopolymorphism)이라고 책에서 부른다.
  - 이전에 살펴본 상대적 다형성을 의미한다.
- 자바스크립트에서는 상대적 다형성을 제공하지 않아 구별해서 호출하려면 절대적인 레퍼런스를 이용할 수밖에 없고 그렇기 때문에 위 코드와 같이 명시적으로 `Vehicle` 객체의 이름을 지정하여 `drive()` 함수를 호출한 것이다.
  - 만약 `Vehicle.drive()`로 함수를 호출하면 `this`는 `Car` 객체가 아닌 `Vehicle`객체와 바인딩되므로 불가피하게 `.call(this)`를 덧붙여 `drive()`를 `Car` 객체의 콘텍스트로 실행하도록 강제한 것이다.
  - 참고로 부모 객체와 자식 객체의 메서드명이 서로 달랐다면 메서드 다형성을 생각하지 않아도 되지만 위와 같이 겹치게 되는 경우 명시적 의사다형성 같은 좀 더 복잡한 방법으로 접근할 수밖에 없다.
- 명사적 의사다형성은 장점보다는 비용이 훨씬 더 많이 들기 때문에 가능한 한 쓰지 않는 게 좋다.
  - 상대적 다형성을 제공하는 클래스 지향 언어에서는 클래스가 정의되는 시점에 관계들을 모두 한곳에서 취합하여 관리한다.
  - 하지만 자바스크립트는 명시적인 방법으로 연결 방식을 일일이 만들어줘야 한다.
  - 따라서 유지 비용은 훨씬 더 들면서 복잡도와 취약성은 한층 가중된다.

<br>

#### :round_pushpin: 사본 혼합 - `mixin` 함수

- 앞에서 살펴본 `mixin` 함수를 사용하면 영향이 없는 서로 다른 객체를 만들 수 있다.
  - 한쪽에 새로운 프로퍼티를 추가해도 다른 쪽엔 아무런 영향이 없다.
- 공용 함수의 레퍼런스는 두 객체 모두 같이 쓰므로 수동으로 객체 간에 함수를 일일이 복사(믹스인)하더라도 다른 클래스 지향 언어처럼 100% [클래스 ⇒ 인스턴스]의 복사는 어렵다.
  - 자바스크립트에서 참조형 데이터를 복사할 때는 해당 데이터를 가리키는 사본 레퍼런스가 복사되기 때문에 공용 함수 객체의 프로퍼티에 어떤 조작이 있다면 공유 레퍼런스를 통해 모두에게 영향을 끼친다.
- 방금 전에 보았던 함수-객체 레퍼런스를 보더라도 명시적 믹스인은 자바스크립트에서 쓸만한 장치이긴 하지만 보기보다 그다지 강력하지는 않다.
  - 복수의 객체를 타겟 객체에 명시적으로 믹스인할 경우 부분적으로는 다중 상속을 흉내 낼 수 있지만 여러 소스에서 이름이 같은 메서드나 프로퍼티가 복사되면 충돌을 피할 뾰족한 대책이 없다.
  - 또한 명시적 믹스인은 많이 사용할수록 점점 코드가 추적하기 어려워지거나 불필요하고 난해한 객체 간 의존 관계가 양산될 수 있다.
- Vue.js에서도 `mixins`이라는 인스턴스가 있는데 아주 간단한 로직은 문제가 되지 않지만 로직이 많고 관련있는 인스턴스나 메서드가 많아질수록 코드의 흐름을 파악하기 어려워지는 단점이 있다.
  - 그래서 최근에 새롭게 등장한 Vue3.0의 공식 문서에서도 `mixin`과 같은 패턴은 쓰지 말라고 안내 되어있다.

<br>

#### :round_pushpin: 기생 상속(Parasitic Inheritance)

> 더글러스 크록포드가 작성한 명시적 믹스인 패턴의 변형으로 명시적/암시적 특징을 모두 갖고 있다.

```javascript
// 전통적인 자바스크립트 클래스 'Vehicle'
function Vehicle() {
  this.engines = 1;
}

Vehicle.prototype.ignition = function() {
  console.log('엔진을 켠다.');
};

Vehicle.prototype.drive = function() {
  this.ignition();
  console.log('방향을 맞추고 앞으로 간다.');
};

// 기생 클래스 'Car'
function Car() {
  // 자동차는 탈것의 하나다.
  var car = new Vehicle();

  // 자동차에만 해당되는 내용은 수정한다.
  car.wheels = 4;

  // 'Vehicle::drive()'를 가리키는 내부 레퍼런스를 저장한다.
  var vehDrive = car.drive;

  // 'Vehciel::drive()'를 오버라이드 한다.
  car.drive = function() {
    vehDrive.call(this);
    console.log(`${this.wheels}개의 바퀴로 굴러간다!`);
  }

  return car;
}

// 참고로 Car()는 new 없이 호출해도 기능은 같으며 오히려 불필요한 객체 생성과 GC를 줄일 수 있다.
var myCar = new Car();

myCar.drive();
// 엔진을 켠다.
// 방향을 맞추고 앞으로 간다.
// 4개의 바퀴로 굴러간다!
```

- 초기에 부모 클래스인 `Vehicle`의 정의를 복사하고 자식 클래스 정의에 믹스인한 뒤 조합된 객체 `car`를 자식 인스턴스로 넘긴다.

<br>

### (2) 암시적 믹스인

- 암시적 믹스인은 명시적 의사다형성과 밀접한 관계가 있으므로 사용할 때 주의해야 한다.

```javascript
var Something = {
  cool() {
    this.greeting = 'Hello World';
    this.count = this.count ? this.count + 1 : 1;
  }
};

Somethig.cool();
Something.greeting; // 'Hello Wolrd'
Something.count; // 1

var Anthoer = {
  cool() {
    // 'Something'을 암시적으로 'Another'로 믹스인한다.
    Something.cool.call(this);
  }
};

Another.cool();
Another.greeting; // 'Hello World'
Antoher.count // 1 ('Something'과 상태가 공유되지 않는다.)
```

- `Something.cool.call(this);`를 하면 `Something.cool()` 함수를 본질적으로 ‘빌려와서’ `Another` 콘텍스트로 호출한다.
  - 결국 `Someting.cool()`의 할당은 `Something`이 아닌 `Another`다.
  - 따라서 `Something`의 작동을 `Another`와 섞은 셈이다.
- `this` 재바인딩을 십분 활용한 이런 유형의 테크닉은 `Something.cool.call(this);` 같은 호출이 상대적 레퍼런스가 되지 않아 불안정하므로 사용할 때 신중히 처리해야 한다.
  - 대부분은 깔끔하고 관리하기 쉬운 코드를 유지하기 위해 쓰지 않는 편이 좋다.
