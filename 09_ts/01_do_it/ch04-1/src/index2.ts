// (2) 함수 표현식

// (2-1) 함수는 객체
let mul = new Function('a', 'b', 'return a * b')
let result = mul(1, 2)
console.log(result)

// 아래 코드와 같이 function(a, b) { return a * b }와 같은 구문을 함수 표현식이라고 한다.
let mul2 = function(a, b) { return a * b }
console.log(mul2(4, 5));


// (2-2) 일등 함수
// 일등 함수: 함수와 변수를 구분하지 않는다는 의미
// func는 변수이므로 a + b 형태의 함수 표현식을 저장할 수 있다.
// 하지만 func는 변수이므로 a - b 형태의 함수 표현식도 저장할 수 있다.
let func = function(a, b) { return a + b }
func = function(a, b) { return a - b }

// (2-3) 익명 함수
let value =
(function(a, b) { return a + b })
(1, 2) // 3
// 컴파일러는 22행의 익명 함수 부분에 게으른 계산ㅂ버을 적용해 그 상태로 놔두지만,
// 곧바로 23행의 함수 호출 연산자(1, 2)를 만나므로 22행의 함수 몸통에 조급한 계산법을 적용해
// 최종적으로 3이라는 값을 만든다. 그 다음 21행의 value 변수에 이 값을 대입한다.