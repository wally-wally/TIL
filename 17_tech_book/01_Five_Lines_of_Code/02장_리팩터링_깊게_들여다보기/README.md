# 02장. 리팩터링 깊게 들여다보기

<br>

## 1. 가독성 및 유지보수성 향상

> <b>리팩터링</b>
>
> <u>코드가 하는 일을 변경하지 않고</u> <u>더 나은 코드를 만드는 것</u>

### (1) 코드 개선 - 가독성

```typescript
// before
function checkValue(str: boolean) {
  if (str !== false) {
    return true;
  }
    
  else {
    return str;
  }
}
```

```typescript
// after(1)
function isTrue(bool: boolean) {
  if (bool) {
    return true;
  }
    
  else {
    return false;
  }
}
```

```typescript
// after(2)
function isTrue(bool: boolean) {
  return bool;
}
```

<br>

### (2) 코드 개선 - 유지보수성

- 버그를 고치거나 기능 추가를 위해 일부 기능 변경할 때마다 새 코드를 어디에 놓을지 후보 위치를 조사하는 것으로 시작한다.
  - '유지보수성'은 얼마나 많은 후보를 조사해야하는지를 나타내는 표현이다.
- 읽고 살펴봐야 할 코드가 많을수록 시간은 더 오래 걸리고 무언가를 놓칠 가능성이 높다는 쉽게 알 수 있다.
- 어떤 시스템에서는 한군데서 무언가를 수정하면 관련 없어 보이는 다른 곳에서 문제가 발생한다.
- 그런 시스템을 취약하다고 말하는데 이 취약성의 근원은 일반적으로 전역상태(global state)이다.
- 전역상태의 문제는 내부 변수에 외부의 데이터를 할당하는 경우가 많다.
- 코드에서 상태(조건)를 명시적으로 확인하지 않는 속성을 불변속성(invariant)이라고 한다.
  - ex) 이 숫자는 절대 음수일 수 없다, 이 파일은 확실히 존재한다. 등
  - 하지만 시스템이 변경되거나 프로그래머들이 깜빡하거나 팀에 새로운 사람들이 추가될 때 불변속성이 유효한 상태로 유지되기란 거의 불가능하다.
- 변수를 명시적으로 체크해서 불변속성을 제거함으로써 유지보수성을 향상시킬 수 있다.
  - 그러나 이렇게 하면 리팩터링에서 해서는 안 되는, 코드가 수행하는 작업이 변경된다.
  - 대신 이런 경우 리팩터링은 불변속성을 더욱 쉽게 볼 수 있도록 서로 가깝게 이동시켜 유지보수성을 향상시키는데 이를 불변속성의 범위제한(localizing invariants)이라고 한다.

<br>

### (3) 코드가 하는 일을 바꾸지 않고 유지보수하기

- 리팩터링 전과 후에 값을 입력하면 동일한 결과를 얻어야 한다. 물론 결과가 예외인 경우에도 마찬가지이다.
  - 하지만 한 가지 주목할 만한 예외는 '성능'을 바꿀 수 있다는 것이다.
-  특히 리팩터링 중에는 코드가 느려져도 거의 신경 쓰지 않는다.
  - 대부분의 시스템에서 성능은 가독성과 유지보수성보다 가치가 떨어지고 성능이 중요한 경우 프로파일링 도구나 성능 전문가의 지도를 받아 리팩터링과 다른 단계에서 처리해야 한다.

---

:heavy_check_mark: <b>정리</b>

- 의도를 전달함으로써 가독성 향상
- 불변속성의 범위제한을 통한 유지보수성 향상
- 범위 밖의 코드에 영향을 주지 않고 1항과 2항을 수행

---

<br>

## 2. 속도, 유연성 및 안정성 확보

### (1) 상속보다는 컴포지션 사용

```typescript
// 상속을 사용
interface Bird {
  hasBeak(): boolean;
  canFly(): boolean;
}

class CommonBird implements Bird {
  hasBeak() { return true; }
  canFly() { return true; }
}

class Penguin extends CommonBird {
  canFly() { return false; }
}
```

```typescript
// 컴포지션을 사용
interface Bird {
  hasBeak(): boolean;
  canFly(): boolean;
}

class CommonBird implements Bird {
  hasBeak() { return true; }
  canFly() { return true; }
}

class Penguin implements Bird {
  private bird = new CommonBird();
  hasBeak() { return bird.hasBeak(); }
  canFly() { return false; }
}
```

- 만약 위와 같은 상황에서 `canSwim` 이라는 새로운 메서드를 `Bird`에 추가한다고 가정해보자.

```typescript
interface Bird {
  // ...
  canSwim(): boolean;
}

class CommonBird implements Bird {
  // ...
  canSwim() { return false; }
}
```

- '컴포지션을 사용'한 코드에서는 `Penguin`이 새로운 메서드 `canSwim`을 구현하지 않기 때문에 컴파일 오류가 발생한다.
  - 따라서 이를 인지하고 수동으로 추가하고 펭귄이 수영할 수 있는지를 반환해야 한다.
- `Penguin`이 다른 새처럼 동작하기를 원할 경우에는 `hasBeak` 처럼 간단하게 구현할 수 있다.
- 반대로 상속 예에서 `Penguin`이 수영할 수 없다고 가정하면 `canSwim`을 재정의(override)해야 한다는 것을 작업자가 기억해야 한다.
  - 사람의 기억력은 종종 의존관계에 취약하다.
  - 특히 다른 기능에 집중하고 있을 때는 이 같은 것을 간과하기 쉽다.
- 컴포지션을 중심으로 만들어진 시스템을 사용하면 다른 방식보다 더 깔끔하게 코드를 결합하고 재사용할 수 있다.
  - 마치 레고 블록의 부품 조립 및 교체하여 기존 부품으로 새로운 것을 만드는 것과 유사하다고 볼 수 있다. => '유연성'

<br>

### (2) 수정이 아니라 추가로 코드를 변경

- 컴포지션의 가장 큰 장점은 추가(addition)로 변경이 가능하다는 것이다.
  - 이것은 기존 기능에 영향을 주지 않고 기능을 추가하거나 변경할 수 있음을 의미하는데, 어떤 경우에는 기존 코드를 변경하지 않고도 가능하다.
- 개방-폐쇄(open-closed) 원칙
  - 소프트웨어 구성 요소들은 확장에 대해 열려 있어야 하고, 수정에 대해 닫혀 있어야 한다.
- 프로그래밍 속도
  - 다른 코드를 건들지 않고 변경할 수 있다면 시간을 매우 아낄 수 있다.
  - 물론 계속해서 코드를 추가하면 코드베이스가 빠르게 늘어나는데, 이것이 문제가 될 수 있다.
  - 어떤 코드가 사용되고 어떤 코드가 사용되지 않는지 주의를 기울이고 사용하지 않는 코드는 최대한 빨리 삭제해야 한다.
- 안정성
  - 추가에 의한 변경 방식을 따르면 기존 코드를 항상 보존할 수 있다.
  - 새 코드가 실패할 경우 이전 기능으로 대체하는 기능을 구현하는 것은 쉽다.
  - 불변속성의 범위를 제한해 오류를 줄이는 것에 더해서 시스템의 안정성이 더욱 향상된다.

<br>

## 3. 리팩터링과 일상 업무

- 리팩터링은 프로그래머의 일상 업무가 돼야 한다.
- 코드를 리팩터링하지 않고 그냥 전달하기만 하면 다른 프로그래머의 시간을 빼앗는 셈이다.
- 설상가상으로 지금까지 설명한 부정적인 요인들로 인해 열악한 소프트웨어 아키텍처에 대한 이자가 붙는데 이를 '기술 부채'라고 한다.
- 레거시 시스템에서는 변경하기 전에 먼저 리팩토링하자. 그런 다음 작업 절차를 따르자.
- 코드를 변경한 후에도 리팩터링하자.