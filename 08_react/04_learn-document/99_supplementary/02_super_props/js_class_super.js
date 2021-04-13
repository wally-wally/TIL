class Person {
	constructor(name) {
    this.name = name;
  };
};

// class를 상속 받아서 구성할 때 super 선언 전 this를 사용하면 아래 코드에서 this.name에 그 어떤 것도 매칭이 되지 않기 때문에 오류가 발생할 수 있다.
// this가 초기화되지 않기 때문이다.
// 그리고 super()가 불러오기 전에 this.greetColleagues()가 실행되면 this.name은 아직 변경되지 않았으므로 논리 구조가 상당히 복잡해지게 된다.
// 그래서 이러한 단점을 보완하기 위해 javascript 내부적으로 자체적으로 super 키워드 실행 전에 this를 사용하면 오류 문구를 출력하게 된다.

// ES6 class constructor는 subclasses가 있다면 무조건 super()를 불러야 하므로 코드에 constructor가 있는 한 반드시 super()를 불러야 한다.
// 하지만(subclass는 constructor를 가지지 않아도 상관 없다.)
class PolitePerson extends Person {
	constructor(name) {
    super(name);
    this.greetColleagues();
  };
  
  greetColleagues() {
    alert(`Hello, ${this.name}!`);
  };
};

let p1 = new PolitePerson('wally');