var a=5, b=3;

console.log(a+b, a-b, a+3, 5+3)
console.log(a*b, a/b, a%b, -a);

var m=1, n=3, x=1, y=3;

console.log(x);
console.log(++x); // ++x; 는 x = x + 1;과 같은 의미이다.
console.log(x);

console.log(m);
console.log(m++); // m++는 m을 출력 후 증가연산은 나중에 수행한다.
console.log(m);

console.log(y);
console.log(--y); // --y; 는 y = y - 1;과 같은 의미이다.
console.log(y);

console.log(n);
console.log(n--); // n--는 n을 출력 후 감소연산은 나중에 수행한다.
console.log(n);

console.log(Math.pow(2, 3));
console.log(Math.sqrt(16));
console.log(Math.random()); // 0에서 1사이의 난수 발생
console.log(Math.round(4.67)); // 입력값을 반올림한 수와 가장 가까운 정수 값을 반환
console.log(Math.round(-20.4));
console.log(Math.sign(3), Math.sign(-3), Math.sign("number")); // 입력값의 부호를 반환(양수는 1, 음수는 -1, 판별할 수 없는 경우 NaN)
console.log(Math.sign(0), Math.sign(-0)); // 양수 0은 0, 음수 0은 -0으로 출력됨