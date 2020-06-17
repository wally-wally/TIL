// 8번 예제를 위한 import
import INameable from './INameable'

// 1. 클래스 선언 방법
class Person {
  constructor(public name: string, public age?: number) {}
  // 아래 다섯 줄을 위의 한 줄로 줄인 것이다.
  // name: string
  // age?: number
  // constructor(name: string, age?: number) {
  //   this.name = name
  //   this.age = age
  // }
}

let wally: Person = new Person('wally', 27)
console.log(wally)



// 2. 접근 제한자
// public: 클래스 내부, 자식 클래스 내부, 클래스 인스턴스 접근 가능
// protected: 클래스 내부, 자식 클래스 내부 접근 가능 / 클래스 인스턴스 접근 불가능
// private: 클래스 내부에서만 접근 가능
// readonly: 읽기 전용 속성을 만들 때 사용
// static: 정적인 속성을 가질 때 사용
class Foo {
  public x: string;
  protected y: string;
  private z: string;

  constructor(x: string, y: string, z: string) {
    // public, protected, private 접근 제한자 모두 클래스 내부에서 참조 가능하다.
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

const foo = new Foo('x', 'y', 'z');

// public 접근 제한자는 클래스 인스턴스를 통해 클래스 외부에서 참조 가능하다.
console.log(foo.x);

// protected 접근 제한자는 클래스 인스턴스를 통해 클래스 외부에서 참조할 수 없다.
console.log(foo.y); // npm run dev 또는 build시 해당 구문 주석 처리할 것
// error TS2445: Property 'y' is protected and only accessible within class 'Foo' and its subclasses.

// private 접근 제한자는 클래스 인스턴스를 통해 클래스 외부에서 참조할 수 없다.
console.log(foo.z); // npm run dev 또는 build시 해당 구문 주석 처리할 것
// error TS2341: Property 'z' is private and only accessible within class 'Foo'.


// 3. 클래스로 인터페이스 구현 => 'implements' 키워드 사용
interface IPerson {
  name: string
  age?: number
}

class Person2 implements IPerson {
  constructor(public name: string, public age?: number) {}
}

let honghong: IPerson = new Person2('honghong', 30)
console.log(honghong)


// 4. 추상 클래스
// 하나 이상의 추상 메소드를 포함하여 일반 메소드를 포함할 수 있다.
// 추상 메소드는 내용이 없이 메소드 이름과 타입만이 선언된 메소드를 말하며 선언할 때 'abstract' 키워드를 사용한다.
// 직접 인스턴스를 생성할 수 없고 상속만을 위해 사용된다.
// 추상 클래스를 상속한 클래스는 추상 클래스의 추상 메소드를 반드시 구현하여야 한다.
// 인터페이스는 모든 메소드가 추상 메소드이지만 추상 클래스는 하나 이상의 추상 메소드와 일반 메소드를 포함할 수 있다.
abstract class AbstractPerson {
  abstract name: string // name 속성 앞에 abstract가 붙었으므로 new 연산자를 적용해 객체를 만들 수 ㅇ벗다.
  constructor(public age?: number) {}
}


// 5. 클래스 상속 => 'extends' 키워드 사용
// 객체지향 언어는 부모 클래스를 상속받는 상속 클래스를 만들 수 있다.
class Animal {
  foots: number
  species: string
  constructor() {
    this.foots = 4
    this.species = '동물'
  }

  bark(): string {
    return '짖는다!'
  }
}

// Dog 클래스는 Animal 클래스의 자식 클래스가 되고 해당 기능을 액세스할 수 있다.
// 생성자 함수(constructor())를 포함하는 파생 클래스는 기본 클래스에서 생성자 함수를 실행하기 위해 무조건 'super()'를 호출해야 한다.
class Dog extends Animal {
  species: string
  constructor() {
    super();
    this.species = '강아지'
  }

  work() {
    console.log(`${this.species}는 ${this.foots}개의 발로 걷는다.`)
  }

  dogBark() {
    console.log(`${this.species}는 '왈왈!' 이라고 ${this.bark()}`)
  }
}

let dog1: Dog = new Dog()
dog1.work()
dog1.dogBark()


// 6. 객체의 비구조화 할당(destructuring)
interface Home {
  country: string
  address: string
  zipcode: number
}

let myHome: Home = {country: 'Korea', address: 'Seoul', zipcode: 12345}
let {country, address, zipcode} = myHome
console.log(country, address, zipcode)


// 7. spread operator
let studentInfo: any = {
  classNumber: 1,
  gender: 'man',
  math: 90,
  science: 85,
  computer: 95
}

const {classNumber, gender, ...score} = studentInfo
console.log(classNumber)
console.log(score) // classNumber와 gender를 제외한 나머지 속성이 object 형태로 담겨 있다.

// spread operator는 특정 속성들을 별도의 변수에 담을 때 뿐만 아니라 여러 개의 객체를 하나로 합칠 때도 사용할 수 있다.
let obj1 = {'a': 1}
let obj2 = {'b': 2}
let obj3 = {'c': 3}
let mergedObj = {...obj1, ...obj2, ...obj3}
console.log(mergedObj)


// 8. 타입 변환(타입 단언)
let comment: object = {id: 'wallywally', contents: 'Good!'}
// 아래와 같이 접근할 수 없다. 왜냐하면 comment는 object 타입인데 object 타입은 id 속성을 가지고 있지 않기 때문이다.
comment.id // npm run dev 또는 build시 해당 구문 주석 처리할 것
// 그래서 이러한 오류를 타입 변환 구문을 통해 해결할 것이다.
// comment 변수를 일시적으로 id 속성이 있는 타입 즉, {id: string} 타입으로 변환해 comment.id 속성값을 얻게 했다.
(<{id: string}>comment).name
// 참고로 타입스크립트에서는 타입 변환이 아닌 '타입 단언'이라는 표현을 사용한다.

// 타입 단언 두 가지 방법
// (<타입>객체)
// (객체 as 타입)
let obj: object = {title: 'Book-Title'}
let title1 = (<INameable>obj).title
let title2 = (obj as INameable).title
console.log(title1, title2)