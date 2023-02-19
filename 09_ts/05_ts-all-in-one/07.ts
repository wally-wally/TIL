// 클래스의 새로운 기능들
class AA {
  a: string;
  b: number;

  // 기본값을 지정하면 ?를 굳이 안 붙여도 된다.
  constructor(a: string, b: number = 123) {
    this.a = a;
    this.b = b; 
  }

  method() {

  }
}

new AA('123');
new AA('123', 456);

class AAA {
  private a: string = '123'; // ts에서 제공하는 private(권장!)
  #b: number; // js에서 제공하는 private
}

// interface는 '추상'(객체지향 관점에서 본다면... 추상에 의존하고 구현에 의존하지 말자)
interface A {
  readonly a: string;
  b: string;
}

// class는 '구현'
// B implements A -> B 라는 클래스는 A 라는 인터페이스를 따라야 한다.
class B implements A {
  private a: string = '123';
  protected b: string = 'world';
  c: string = 'wow';

  method() {
    console.log(this.a); // private 속성은 해당 클래스 내부에서만 접근 가능
    console.log(this.b);
  }
}
class CC extends B {
  method() {
    console.log(this.b); // 단, protected 속성은 상속 받은 클래스 내부에서 사용 가능
  }
}
new CC().a; // private 속성은 외부에서 접근 불가능
new CC().b; // protected 속성은 외부에서 접근 불가능
new CC().c; // public은 외부에서 접근 가능

//              public             protected             private
// 클래스 내부      O                    O                    O
// 인스턴스         O                    X                    X
// 상속 클래스      O                    O                    X

// interface를 굳이 implements 해서 추상적으로 하지 않고 아래 처럼 abstract class로 한방에 가능하다.
abstract class X {
  abstract work(user: User): boolean;
}
// abstract로 되어 있는건 상속 받았을 대 반드시 구현해줘야 한다.
class Y extends X {
  work(user: User): boolean {
    return true;
  }
}