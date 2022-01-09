# 03-24. 주석

<br>

## :hand: Intro

> 주석을 남겨야겠다는 생각이 들면, 가장 먼저 주석이 필요 없는 코드로 리팩토링해보자!

- 주석은 악취가 아닌 향기를 입히는데 문제는 주석을 탈취제처럼 사용하는 데 있다.
  - 주석이 장황하게 달린 원인이 코드를 잘못 작성했기 때문인 경우가 의외로 많다.
- 특정 코드 블록이 하는 일에 주석을 남기고 싶으면 '**함수 추출하기**'를 적용해보자.
- 이미 추출되어 있는 함수임에도 여전히 설명이 필요하다면 '**함수 선언 바꾸기**'를 적용해보자.
- 시스템이 동작하기 위한 선행조건을 명시하고 싶다면 '**어서션 추가하기**'가 대기하고 있다.
- 주석을 달면 좋은 경우
  - 무엇을 해야할지 명확히 모를 때
  - 현재 진행 상황뿐만 아니라 확실하지 않은 부분
  - 코드를 지금처럼 작성한 특별한 이유를 설명할 때 => 타인이 코드를 이어서 작업하게 될 때 도움이 됨

<br>

## (1) 어서션 추가하기

- 어서션(assertion)은 항상 참이라고 가정하는 조건부 문장으로, 어서션이 실패했다는 건 프로그래머가 잘 못했다는 뜻이다.
  - 어서션 실패는 시스템의 다른 부분에서는 절대 검사하지 않아야 하며, **어서션이 있고 없고가 프로그램 기능의 정상 동작에 아무런 영향을 주지 않도록 작성돼야 한다.**
- 어서션의 쓰임
  - 오류 찾기에 활용할 수 있다.
  - 프로그램이 어떤 상태임을 가정한 채 실행되는지를 다른 개발자에게 알려주는 훌륭한 소통 도구가 된다.
  - 디버깅하기도 편하다.
- 테스트 코드가 있다면 어서션의 디버깅 용도로서의 효용은 줄어든다.
  - 단위 테스트를 꾸준히 추가하여 시각을 좁히면 어서션보다 나을 때가 많다.
- javascript의 `console.assert()` 메서드에 대한 자세한 내용은 [MDN 공식 문서](https://developer.mozilla.org/ko/docs/Web/API/Console/assert)를 참고해보자.

---

- 예시) 고객은 상품 구입 시 할인율을 적용받음

```javascript
class Customer {
  applyDiscount(aNumber) {
    return (this.discountRate)
      ? aNumber - (this.discountRate * aNumber)
      : aNumber;
  }
}

// 어서션 문장을 넣기 위해 if-then 문장으로 재구성
class Customer {
  applyDiscount(aNumber) {
    if (!this.discountRate) return aNumber;
    else return aNumber - (this.discountRate * aNumber);
  }
}
```

```javascript
// 어서션 문장 넣은 버전
class Customer {
  applyDiscount(aNumber) {
    if (!this.discountRate) return aNumber;
    else {
      console.assert(this.discountRate >= 0);
      return aNumber - (this.discountRate * aNumber);
    }
  }
}
```

```javascript
// 해당 예제에서는 어서션은 setter 메서드에 추가하는 게 나아 보인다.
// 어서션이 applyDiscount()에서 실패하면 이 문제가 언제 처음 발생했는지를 찾는 문제를 다시 풀어야 하기 때문이다.
class Customer {
  set discountRate(aNumber) {
    console.assert(null === aNumber || aNumber >= 0);
    this._discountRate = aNumber;
  }
}
```

---

- 어서션을 남발하는 것 역시 위험하다.
  - 참이라고 생각하는 가정 모두에 어서션을 달지 않고 **'반드시 참이어야 하는' 것만 검사**한다.
- 프로그래머가 일으킬만한 오류에만 어서션을 적용하는게 좋다.
  - 데이터를 외부에서 읽어 온다면 그 값을 검사하는 작업은 (어서션의 대상인) 가정이 아니라 (예외 처리로 대응해야 하는) 프로그램 로직의 일부로 다뤄야 한다.
  - 외부 데이터 출처를 전적으로 신뢰할 수 있는 상황이 아니라면 말이다.
  - 어서션은 그 <u>추적을 돕는 최후의 수단</u>이다.
- 해당 섹션을 정리하면서 개인적으로는 어서션 보다 차라리 테스트 코드를 작성해서 검사하는 것이 더 좋다고 생각이 들었다.
  - 다양한 테스트 케이스를 작성해서 다양한 상황들을 검사해볼 수 있어 어서션과 같이 참인지만 검사하는 것에 그치지 않아서 테스트 코드를 작성하는게 오히려 더 좋다고 생각한다.
