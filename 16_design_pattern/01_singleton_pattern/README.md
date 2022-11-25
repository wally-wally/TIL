# 01. Singleton Pattern

<br>

## 1. 싱글톤 패턴 개요

- 한 번 인스턴스화할 수 있고 전역으로 액세스할 수 있는 클래스
- 애플리케이션 전체에서 공유될 수 있으므로 서비스의 전역 상태를 관리하는데 적합하다.
- 전체 시스템에서 하나의 인스턴스만 존재하도록 보장하는 객체 생성패턴이며 자바스크립트에서는 객체 리터럴도 싱글톤 패턴이라고 할 수 있다.
  - 단, 객체 리터럴로는 비공개 상태 및 함수를 정의할 수 없어 비공개 멤버가 필요하다면 클로저도 함께 고려해야 한다.

```javascript
let counter = 0;

class Counter {
  getInstance() {
    return this;
  }

  getCount() {
    return counter;
  }

  increment() {
    return ++counter;
  }

  decrement() {
    return --counter;
  }
}

const counter1 = new Counter();
const counter2 = new Counter();

console.log(counter1.getInstance() === counter2.getInstance()); // false
```

- 위 코드는 싱글톤 패턴을 충족하지 않는다.
  - 싱글톤 패턴은 <b>한 번만 인스턴스화</b> 할 수 있어야 한다.
  - `new` 메서드를 두 번 호출했기 때문에 `counter1`과 `counter2`는 엄격하게 동일하지 않는 인스턴스다.

<br>

```javascript
let instance;
let counter = 0;

class Counter {
  constructor() {
    if (instance) {
      throw new Error("You can only create one instance!");
    }
    instance = this;
  }

  getInstance() {
    return this;
  }

  getCount() {
    return counter;
  }

  increment() {
    return ++counter;
  }

  decrement() {
    return --counter;
  }
}

const singletonCounter = Object.freeze(new Counter());
export default singletonCounter;
```

- 위와 같이 `instance` 라는 변수를 두면 `constructor` 내부 로직에서 이미 인스턴스가 있으면 error를 뿜어주는 식으로도 해결 할 수 있다.
- 그리고 `Object.freeze` 메서드를 통해서 싱글톤을 수정할 수 없게 할 수 있다.
  - 이와 같이하면 예기치 못한 인스턴스에 속성을 추가하거나 수정하는 일을 막을 수 있다.
- 참고로 ES7 이후로는 아래와 같이 작성할 수 있다.
  - Javascript Class의 static property ([MDN 공식 문서 바로가기](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static))

```javascript
class Counter {
  static instance;
    
  constructor() {
    if (instance) {
      throw new Error("You can only create one instance!");
    }
    instance = this;
  }

  getInstance() {
    return this;
  }

  getCount() {
    return counter;
  }

  increment() {
    return ++counter;
  }

  decrement() {
    return --counter;
  }
}
```

- 고정된 메모리 영역을 얻으면서 동시에 단 한번만 `new`를 사용하여 메모리 낭비를 방지할 수 있다.
- 싱글톤으로 만들어진 인스턴스는 전역으로 사용된다.
- 너무 많은 일을 위임하거나 공유할 경우 Coupling이 

<br>

## 2. 단점

- 하나의 인스턴스로 여러 컴포넌트에서 사용하는 경우 공통 인스턴스 내의 값을 한 컴포넌트에서 바꾸는 경우 다른 컴포넌트에서도 영향이 있을 수 있다.
- 싱글톤 패턴에 의존하는 테스트 코드는 까다로울 수 있다.
  - 매번 새 인스턴스를 만들 수 없기 때문에 모든 테스트는 이전 테스트의 전역 인스턴스 수정에 의존한다.
  - 이 경우 테스트 순서가 중요하며 작은 수정 하나가 전체 테스트 코드 실행의 실패로 이어질 수 있다.
  - 그래서 테스트 후 테스트에 의해 수정된 사항을 재설정하려면 전체 인스턴스를 재설정해야 한다.

<br>

## 3. 정리

- 싱글톤 패턴은 전체 앱에서 참조될 수 있어야 한다.
- 전역 변수는 전역 범위에서 사용할 수 있으므로 애플리케이션 전체에서 해당 변수에 액세스할 수 있다.
- 전역 변수는 전역 범위의 오염을 일으켜 예기치 않은 동작이 발생할 수 있다.
- 하지만 Javascript의 ES2015 이후에서는 `let`, `const`와 같은 변수 선언 키워드가 등장하여 변수를 블록 범위로 유지하여 전역 범위의 오염을 방지할 수 있게 되었다.
- 싱글톤 패턴은 전역에서 접근한다는 컨셉이 있기 때문에 설계상 유일해야하는 부분에서만 사용하는 것이 좋을 것 같다.

<br>

:bookmark: <b>Reference</b>

- https://www.patterns.dev/posts/singleton-pattern/
- https://heecheolman.tistory.com/40
- https://webclub.tistory.com/150
- https://velog.io/@sms8377/Structure-%EC%8B%B1%EA%B8%80%ED%86%A4-%ED%8C%A8%ED%84%B4%EA%B3%BC-%EB%AC%B8%EC%A0%9C%EC%A0%90
- https://mangkyu.tistory.com/153