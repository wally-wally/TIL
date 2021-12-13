# 03-09. 기능 편애

<br>

## :hand: Intro

- **프로그램을 모듈화할 때는 코드를 여러 영역으로 나눈 뒤 영역 안에서 이뤄지는 상호작용은 최대한 늘리고 영역 사이에서 이뤄지는 상호작용은 최소로 줄이는 데 주력한다.**
- 기능 편애는 흔히 어떤 함수가 자기가 속한 모듈의 함수나 데이터보다 다른 모듈의 함수나 데이터와 상호작용할 일이 더 많을 때 풍기는 냄새다.
- 특정 함수가 데이터와 가까이 있고 싶어할 때는 '함수 옮기기' 기법으로 데이터 근처로 옮겨주면 된다.
- 만약 어디로 옮길지가 명확하게 드러나지 않을 때는 가장 많은 데이터를 포함한 모듈로 옮기면 된다.
  - '함수 추출하기' 기법으로 함수를 여러 조각으로 나눈 후 각각을 적합한 모듈로 옮기면 더 쉽게 해결되는 경우도 많다.

---

### :heavy_plus_sign: 전략 패턴(Strategy Pattern)

> 동일 계열의 알고리즘들을 정의하고, 각 알고리즘을 캡슐화하며, 이 알고리즘들을 해당 계열 안에서 상호교체가 가능하도록 만든다.
>
> 알고리즘을 사용하는 클라이언트와 상관없이 독립적으로 알고리즘을 다양하게 변경할 수 있게 한다.

- 하나의 클래스가 많은 행동들을 정의하고, 이런 행동들이 그 클래스의 연산 안에서 복잡한 다중 조건문의 모습을 취할 때, 많은 조건문보다는 행동 각각을 **전략(Strategy) 클래스**로 만들고, 동적으로 행동의 변경이 필요한 경우 **전략(Strategy)**을 바꾸어 주는 것으로 알고리즘을 다양하게 변경할 수 있게 해주는 패턴이다.

```javascript
function Fedex() {
  this.calculate = package => {
    // fedex calculations
    return 2.45
  }
}

function UPS(){
  this.calculate = package => {
    // ups calculations
    return 1.56
  }
}

function USPS(){
  this.calculate = package => {
    // usps calculations
    return 4.5
  }
}

const fedex = new Fedex()
const ups = new UPS()
const usps = new USPS()

const package = {
  from : "Lee",
  to: "John",
  weight: 4.6
}

function Shipping() {
  this.company;
  this.setStrategy = (company) => {
    this.company = company
  }
  this.calculate = (package) => {
    return this.company.calculate(package)
  }
}

// 같은 매개변수를 주었지만 콘솔에 출력되는 객체에 따라 달라진다..
const shipping = new Shipping()

// fedex 객체가 사용된다.
shipping.setStrategy(fedex)
console.log(shipping.calculate(package)) // => 2.45

// 전략이 바뀌어 ups 객체가 사용된다.
shipping.setStrategy(ups) // Change Strategy
console.log(shipping.calculate(package)) // => 1.56

// 전략이 또 바뀌어 usps 객체가 사용된다.
shipping.setStrategy(usps) // Change Strategy
console.log(shipping.calculate(package)) // => 4.5

// 코드 출처 : https://nwlee.app/posts/javascript-design-pattern/
```

:book: <b>Reference</b>

- https://devnest.tistory.com/3

---

### :heavy_plus_sign: 방문자 패턴(Visitor Pattern)

- **실제 로직을 가지고 있는 객체(Visitor)**가 로직을 **적용할 객체(Element)**를 **방문**하면서 실행하는 패턴이다.
- 즉, **로직과 구조를 분리**하는 패턴이라고 볼 수 있다. 로직과 구조가 분리되면 구조를 수정하지 않고도 새로운 동작을 기존 객체 구조에 추가할 수 있다.
- 객체 내 값에 접근하기 위해 방문자 함수를 사용한다. 객체 구조와 메소드를 분리하는 패턴이다.
- 객체에 직접 접근하는 것을 막을 수 있고 객체 내 연산을 추가하는 것도 가능하다.

```javascript
function Employee(name, salary){
  this.name = name;
  this.salary = salary;
}

Employee.prototype = {
  getSalary: function(){
    return this.salary
  },
  setSalary: function($){
    this.salary = $;
  },
  accept: function(visitorFunction){
    visitorFunction(this)
  }
}

const lee = new Employee("lee", 1000)
console.log(lee.getSalary()) // 1000

// Employee 객체를 매개변수로 받아서 객체의 메소드를 실행한다.
// 객체 내 프로퍼티의 값을 안전하게 변경할 수 있다.
function ExtraSalary(employee){
  employee.setSalary(employee.getSalary() * 2)
}

lee.accept(ExtraSalary)
console.log(lee.getSalary()) // 2000
```

:book: <b>Reference</b>

- https://thecodinglog.github.io/design/2019/10/29/visitor-pattern.html
- https://nwlee.app/posts/javascript-design-pattern/

---

