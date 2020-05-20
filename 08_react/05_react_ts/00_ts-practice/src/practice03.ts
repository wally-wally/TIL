// (3) interface : 클래스 또는 객체를 위한 타입을 지정할 때 사용되는 문법
// 클래스를 만들 때 특정 조건을 준수해야 함을 명시하고 싶을 때 interface를 사용해서
// 클래스가 가지고 있어야 할 요구사항을 설정할 수 있다.
// 그리고 클래스를 선언할 때 implements 키워드를 사용해서 해당 클래스가 특정 interface 요구사항을
// 구현해야 한다는 것을 명시한다.

// Shape라는 interface
interface Shape {
  getArea(): number; // getArea 라는 함수가 꼭 있어야 하며 해당 반환값은 number
}

// Circle 클래스가 Shape interface 의 조건을 충족하겠다는 의미
class Circle implements Shape {
  // class 내에서 객체를 생성하고 초기화하기 위한 메서드
  constructor(public radius: number) {
    this.radius = radius;
  }

  // 너비를 구하는 함수
  getArea() {
    return (this.radius ** 2) * Math.PI;
  }
}

class Rectangle implements Shape {
  constructor(private width: number, private height: number) {
    this.width = width;
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }
}

const shapes: Shape[] = [new Circle(5), new Rectangle(12, 5)];

shapes.forEach(shape => {
  console.log(shape.getArea());
})


// [추가] accessor
const circle = new Circle(4);
const rectangle = new Rectangle(10, 5);
// console.log(circle.radius); // public accessor로 radius를 설정했으므로 클래스 밖에서도 접근 가능
// console.log(rectangle.width); // private accessor로 width를 설정했으므로 클래스 밖에서는 접근 불가능

// [accessor 정리!] public, protected, private
// public : 내 class, instance, 상속받는 자식 모두 사용 가능
// protected : 내 class와 나를 상속받는 자식한테 사용 가능(식구들한테만 공개)
// private : class 내에서만 접근 가능