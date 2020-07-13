// (3) interface : 클래스 또는 객체를 위한 타입을 지정할 때 사용되는 문법
// 클래스를 만들 때 특정 조건을 준수해야 함을 명시하고 싶을 때 interface를 사용해서
// 클래스가 가지고 있어야 할 요구사항을 설정할 수 있다.
// 그리고 클래스를 선언할 때 implements 키워드를 사용해서 해당 클래스가 특정 interface 요구사항을
// 구현해야 한다는 것을 명시한다.
// Circle 클래스가 Shape interface 의 조건을 충족하겠다는 의미
var Circle = /** @class */ (function () {
    // class 내에서 객체를 생성하고 초기화하기 위한 메서드
    function Circle(radius) {
        this.radius = radius;
    }
    // 너비를 구하는 함수
    Circle.prototype.getArea = function () {
        return (Math.pow(this.radius, 2)) * Math.PI;
    };
    return Circle;
}());
var Rectangle = /** @class */ (function () {
    function Rectangle(width, height) {
        this.width = width;
        this.height = height;
    }
    Rectangle.prototype.getArea = function () {
        return this.width * this.height;
    };
    return Rectangle;
}());
var shapes = [new Circle(5), new Rectangle(12, 5)];
shapes.forEach(function (shape) {
    console.log(shape.getArea());
});
