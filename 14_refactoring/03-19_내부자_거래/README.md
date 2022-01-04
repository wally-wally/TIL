# 03-19. 내부자 거래

<br>

## :hand: Intro

- 모듈 사이의 데이터 거래가 많아 결합도가 높아지는 것은 지양해야하지만 서비스를 구동하려면 어느 정도 내부적인 데이터 거래는 존재할 수 밖에 없다.
  - 하지만 그 양을 최소로 줄이고 모두 투명하게 처리해야 한다.

- 만약 은밀하게 데이터를 주고받는 모듈이 있다면 <b>함수 옮기기</b>와 <b>필드 옮기기</b> 기법으로 떼어놓고 사적으로 처리하는 부분을 줄인다.
- 같은 관심사를 공유하는 부분이 많다면 제3의 모듈을 새로 만들거나 <b>위임 숨기기</b>를 이용하여 다른 모듈이 중간자 역할을 하게 만든다.
- 상속 구조에서는 부모 - 자식 사이에 결탁이 생길 때가 있다.
  - 부모 - 자식 사이 에서는 자식 클래스는 항상 부모 클래스가 공개하고 싶은 것 이상으로 부모에 대해 알려고 하는 경우가 있다.
  - 그러다가 부모 품을 떠나야 할 때가 온다면 <b>서브클래스를 위임으로 바꾸기</b>나 <b>슈퍼클래스를 위임으로 바꾸기</b> 기법을 활용하면 된다.


---

<br>

## (1) 서브클래스를 위임으로 바꾸기

- 상속 구조의 가장 명확한 단점은 <u>한 번만 쓸 수 있는 카드라는 것</u>이다.
  - 무언가가 달라져야 하는 이유가 여러 개여도 상속에서는 그중 단 하나의 이유만 선택해 기준으로 삼을 수밖에 없다.
- 또 다른 문제로, 상속은 <u>클래스들의 관계를 아주 긴밀하게 결합</u>한다.
  - 부모를 수정하면 이미 존재하는 자식들의 기능을 해치기가 쉽기 때문에 각별히 주의해야 한다.
  - 그래서 자식들이 슈퍼클래스를 어떻게 상속해 쓰는지를 이해해야 한다.

- <b>위임(delegate)</b>은 이상의 두 문제를 모두 해결해준다.
  - 위임은 객체 사이의 일반적인 관계이므로 상호작용에 필요한 인터페이스를 명확히 정의할 수 있다.
  - 즉, 상속보다 결합도가 훨씬 약하다.

- 조심해야할 부분은 반드시 상속이 나쁘다는 것은 아니다!
  - 상속을 과용하는 데 따른 반작용이 있을 수 있으므로 적절하게 상속과 위임을 사용하라는 의미이다.

<br>

## (2) 슈퍼클래스를 위임으로 바꾸기

- 객체 지향 프로그래밍에서 상속은 기존 기능을 재활용하는 강력하고 손쉬운 수단이다.
  - 기존 클래스를 상속하여 입맛에 맞게 오버라이드하거나 새 기능을 추가하면 된다.
  - 하지만 상속이 혼란과 복잡도를 키우는 방식으로 이뤄지기도 한다.
- 슈퍼클래스의 기능들이 서브클래스에는 어울리지 않는다면 그 기능들을 상속을 통해 이용하면 안 된다는 신호다.
- 제대로 된 상속이라면 서브클래스가 슈퍼클래스의 모든 기능을 사용함은 물론, 서브클래스의 인스턴스를 슈퍼클래스의 인스턴스로도 취급할 수 있어야 한다.
- 위임을 이용하면 기능 일부만 빌려올 뿐인, 서로 별개인 개념이 명확해진다.
- 슈퍼/서브클래스는 강하게 결합된 관계라서 슈퍼클래스를 수정하면 서브클래스가 망가지기 쉽다.
- 단, 무조건 상속을 절대 사용하지 마라는 의미는 아니다.
  - 상위 타입의 모든 메서드가 하위 타입에도 적용되고, 하위 타입의 모든 인스턴스가 상위 타입의 인스턴스도 되는 등, 의미상 적합한 조건이라면 상속은 간단하고 효과적인 메커니즘이다.
  - 상속을 먼저 적용하고 나중에 문제가 생기면 슈퍼클래스를 위임으로 바꾸는 것도 좋다.

---

- 리팩토링 적용 예시

```javascript
// before

class CatalogItem {
  constructor(id, title, tags) {
    this._id = id;
    this._title = title;
    this._tags = tags;
  }
    
  get id() {
    return this._id;
  }
    
  get title() {
    return this._title;
  }
    
  hasTag(arg) {
    return this._tags.includes(arg);
  }
}

class Scroll extends CatalogItem {
  constructor(id, title, tags, dataLastCleaned) {
    super(id, title, tags);
    this._lastCleaned = dataLastCleaned;
  }
    
  needsCleaning(targetDate) {
    const threshold = this.hasTag('revered') ? 700 : 1500;
    return this.daysSinceLastCleaning(targetDate) > threshold;
  }
    
  daysSinceLastCleaning(targetDate) {
    return this._lastCleaned.until(targetDate, ChronoUnit.DAYS);
  }
}
```

- 위 코드에서 물리적인 스크롤과 논리적인 카탈로그 아이템에는 차이가 있다.
  - 예컨대 석화병 치료법을 적어 놓은 스크롤은 사본이 여러 개임에도 카탈로그 아이템은 하나뿐이었다.
- 제목과 태그로 사본을 구별할 수 있다.
  - 데이터가 절대 변하지 않는다면 이런 대표성이 문제를 해결해줄 것이다.
  - 하지만 사본 중 하나의 내용을 수정해야 한다면 같은 카테고리 항목의 다른 사본들 모두가 올바르게 수정되는지를 주의해서 확인해야 한다.
- 카탈로그 아이템을 스크롤의 슈퍼클래스로 사용한다면 미래에 이 코드를 읽는 개발자에게 혼란을 줄 수 있어 좋은 모델은 아니다.

```javascript
// after

class Scroll {
  constructor(id, title, tags, dataLastCleaned) {
    this._catalogItem = new CatalogItem(id, title, tags);
    this._lastCleaned = dataLastCleaned;
  }
    
  get id() {
    return this._catalogItem.id;
  }
    
  get title() {
    return this._catalogItem.title;
  }
    
  hasTag(aString) {
    return this._catalogItem.hasTag(aString);
  }
    
  needsCleaning(targetDate) {
    const threshold = this.hasTag('revered') ? 700 : 1500;
    return this.daysSinceLastCleaning(targetDate) > threshold;
  }
    
  daysSinceLastCleaning(targetDate) {
    return this._lastCleaned.until(targetDate, ChronoUnit.DAYS);
  }
}
```

```javascript
// after2 (값을 참조로 바꾸기)

class Scroll {
  constructor(id, dataLastCleaned, catalogID, catalog) {
    this._id = id;
    this._catalogItem = catalog.get(catalogID);
    this._lastCleaned = dataLastCleaned;
  }
    
  get id() {
    return this._id;
  }
    
  get title() {
    return this._catalogItem.title;
  }
    
  hasTag(aString) {
    return this._catalogItem.hasTag(aString);
  }
    
  needsCleaning(targetDate) {
    const threshold = this.hasTag('revered') ? 700 : 1500;
    return this.daysSinceLastCleaning(targetDate) > threshold;
  }
    
  daysSinceLastCleaning(targetDate) {
    return this._lastCleaned.until(targetDate, ChronoUnit.DAYS);
  }
}
```
