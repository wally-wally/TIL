# 03-18. 중개자

<br>

## :hand: Intro

- [메시지 체인](https://github.com/wally-wally/TIL/tree/master/14_refactoring/03-17_%EB%A9%94%EC%8B%9C%EC%A7%80_%EC%B2%B4%EC%9D%B8) 리팩토링 기법과 반대로 중개자 역할하는 것들을 제거하는 리팩토링 기법을 소개한다.

---

<br>

## (1) 중개자 제거하기

- 지난번 위임 숨기기 기법을 통해서 클라이언트가 위임 객체의 또 다른 기능을 사용하고 싶을 때마다 그 앞단의 클래스에 위임 메서드를 추가해야 한다.
  - 이렇게 기능을 추가하다 보면 단순히 전달만 하는 위임 메서드들이 너무 많아지게 되어 해당 클래스는 본래의 기능보다 그저 중개자 역할로 변질되어 버릴 수 있다.
  - 차라리 클라이언트가 위임 객체를 직접 호출하는 게 나을 수 있다.

- 이러한 내용은 [디미터의 법칙](https://tecoble.techcourse.co.kr/post/2020-06-02-law-of-demeter/)과도 연관이 깊다. ([추가 참고 자료](https://mangkyu.tistory.com/147))
  - 내부 정보를 가능한 한 숨기고 밀접한 모듈과만 상호작용하여 결합도를 낮추는 원칙으로, 자칫하면 이 과정에서 위임 혹은 wrapper 메서드가 너무 늘어나는 등의 부작용이 있을 수 있으니 상황에 맞게 응용하는 게 좋다.

- 즉, <b>위임 숨기기</b> 기법과 <b>중개자 제거하기</b> 기법을 통해 <u>적절하게</b> 숨기고 캡슐화하면 될 것 같다.

```javascript
// before

manager = aPerson.manager;

class Person {
  get manager() {
    return this.department.manager;
  }
}
```

```javascript
// after

manager = aPerson.department.manager;
```

