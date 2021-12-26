# 03-17. 메시지 체인

<br>

## :hand: Intro

- 클라이언트가 한 객체를 통해 다른 객체를 얻은 뒤 방금 얻은 객체에 또 다른 객체를 요청하는 식으로, **<u>다른 객체를 요청하는 작업이 연쇄적으로 이어지는 코드</u>**를 '메시지 체인'이라고 한다.
- 메세지 체인 예시

```javascript
managerName = aPerson.department.manager.name;

managerName = aPerson.department.managerName; // 관리자 객체(manager)의 존재를 숨김
managerName = aPerson.manager.name; // 부서 객체(department)의 존재를 숨김
managerName = aPerson.managerName; // 부서 객체와 관리자 객체 모두의 존재를 숨김
```

- 해당 로직을 별도의 함수로 추출하게 되면 체인의 존재를 감출 수도 있다.

```javascript
function report(aPerson) {
  const managerName = aPerson.department.manager.name;
    
  return `
    ${managerName} 님의 작업 로그
    ...
  `
}
```

- 위와 같은 <b>위임 숨기기</b> 기법으로 메시지 체인 문제를 해결할 수 있지만 중간 객체들이 모두 중개자가 돼버리기 쉬울 수 있다.
  - 그래서 <b>함수 추출하기</b>로 객체 결과를 사용하는 코드 일부를 따로 빼낸 다음 <b>함수 옮기기</b>로 체인을 숨길 수 있는지 살펴보자.
- 그리고 메시지 체인을 해결할 때 중간 객체들을 숨기는 것도 상황에 따라서 어느 포인트까지 숨길지 정하는 것이 중요한 것 같다.

---

<br>

## (1) 위임 숨기기

- 클라이언트에서 어떤 사람이 속한 부서의 관리자를 알고 싶다고 하자. 그러기 위해서는 부서 객체부터 얻어와야 한다.

```javascript
// before

manager = aPerson.department.manager;
```

- 위 `before`와 같은 코드에서는 부서 클래스가 관리자 정보를 제공한다는 사실을 알아야 하는데 이와 같은 의존성을 줄이려면 클라이언트가 부서 클래스를 볼 수 없게 숨기고, 대신 사람 클래스에 간단한 위임 메서드를 만들면 된다.

```javascript
// after

manager = aPerson.manager;

class Person {
  get manager() {
    return this.department.manager;
  }
}
```

- 이러한 리팩토링 기법을 잘 적용만 한다면 모듈화의 장점을 극대화할 수 있을 것 같다.
- 캡슐화가 잘 되어 있다면 무언가를 변경해야 할 때 함께 고려해야 할 모듈 수가 적어져서 코드를 변경하기가 훨씬 쉬워진다.

