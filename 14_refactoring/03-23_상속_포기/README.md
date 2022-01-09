# 03-23. 상속 포기

<br>

## :hand: Intro

- 서브클래스가 부모로부터 메서드와 데이터를 물려받기를 원하지 않을 때 해결 방법
  - 계층구조를 잘못 설계한 경우에 **'메서드 내리기'**와 **'필드 내리기'**를 활용해서 물려받지 않을 부모 코드를 모조리 새로 만든 서브클래스로 넘긴다. 그러면 부모에는 공통된 부분만 남는다.

- 상속 포기 냄새는 서브클래스가 부모의 동작은 필요로 하지만 인터페이스는 따르고 싶지 않을 때 특히 심하게 난다.
  - 구현을 따르지 않는 것은 이해할 수 있지만 인터페이스를 따르지 않는다는 것은 상당히 무례한 태도다.
  - 이럴 때는 **'서브클래스를 위임으로 바꾸기'**나 **'슈퍼클래스를 위임으로 바꾸기'**를 활용해서 아예 상속 메커니즘에서 벗어나보자.

<br>

## (1) 메서드 내리기

- 특정 서브클래스의 하나(혹은 소수)와만 관련된 메서드는 슈퍼클래스에서 제거하고 해당 서브클래스(들)에 추가하는 편이 깔끔하다.
  - 다만, 이 리팩토링은 해당 기능을 제공하는 서브클래스가 정확히 무엇인지를 호출자가 알고 있을 때만 적용할 수 있다.
  - 그렇지 못한 상황이라면 서브크래스에 따라 다르게 동작하는 슈퍼클래스의 기만적인 조건부 로직을 다형성으로 바꿔야 한다.


```javascript
// before

class Employee {
  get quota { ... }
}

class Engineer extends Employee { ... }
class Salesperson extends Employee { ... }
```

```javascript
// after

class Employee { ... }

class Engineer extends Employee { ... }
class Salesperson extends Employee {
  get quota { ... }
}
```

<br>

## (2) 필드 내리기

- 서브클래스 하나(혹은 소수)에서만 사용하는 필드는 해당 서브클래스(들)로 옮긴다.
- 참고로 아래 예시 코드는 java로 작성되어 있다.

``` java
// before

class Employee {
  private String quota;
}

class Engineer extends Employee { ... }
class Salesperson extends Employee { ... }
```

```java
// after

class Employee { ... }

class Engineer extends Employee { ... }
class Salesperson extends Employee {
  protected String quota;
}
```

