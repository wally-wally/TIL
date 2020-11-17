# :keyboard: 05장. 표현식과 연산자

<br>

## 1. 산술 연산

### 1.1 산술 이항 연산자의 특징

- 정수끼리 나누어도 결과가 부동소수점이 된다.
  - 7 / 2 => `3.5`
- 나머지 연산자 `%`의 피연산자는 부동소수점이다.
  - 15 % 4 => `3`
  - 5 % 1.5 => `0.5`
- `+` 연산자는 피연산자 중 하나가 문자열이면 나머지 피연산자를 문자열로 만든다.
  - 1 + "2month" => `"12month"`
- 계산할 수 없는 경우 `NaN`으로 평가한다. 또한 산술 연산자의 피연산자가 `true`면 1, `false`와 `null`이면 0으로 평가한다. `undefined`면 `NaN`으로 평가한다.
  - 0 / 0 => `NaN`
  - "one" * 1 => `NaN`
  - true + true => `2`
  - 1 + null => `1`
  - 1 + undefined => `NaN`

<br>

### 1.2 Math 객체의 프로퍼티

| 메서드         | 설명                                   |
| -------------- | -------------------------------------- |
| Math.PI        | 원주율                                 |
| Math.abs(x)    | x의 절댓값                             |
| Math.cbrt(x)   | x의 세제곱근                           |
| Math.ceil(x)   | x 이상의 최소 정수                     |
| Math.exp(x)    | e의 x제곱                              |
| Math.floor(x)  | x 이하의 최대 정수                     |
| Math.log(x)    | x의 자연로그                           |
| Math.log2(x)   | x의 밑이 2인 로그                      |
| Math.log10(x)  | x의 밑이 10인 로그                     |
| Math.max(x, y) | x, y 중 큰 값                          |
| Math.min(x, y) | x, y 중 작은 값                        |
| Math.pow(x, p) | x의 p 제곱                             |
| Math.random()  | 0 이상 1 미만의 난수                   |
| Math.round(x)  | x의 반올림                             |
| Math.sign(x)   | x의 부호(양수면 1, 0이면 0, 음수면 -1) |
| Math.sqrt(x)   | x의 제곱근                             |
| Math.trunc(x)  | x의 정수부                             |

<br>

## 2. 문자열 제어하기

### 2.1 문자열 연결

- `+` 연산자는 피연산자가 모두 문자열이면 문자열로 연결한다.

  - "Hello " + "World!" => `"Hello World!"`
  - "1" + "2" => `"12"`

- 피연산자 중 하나가 문자열 또는 문자열로 변환할 수 있는 객체라면 다른 피연산자의 타입을 문자열로 바꾼 다음 연결한다.

  - 10 + " little indians" => `"10 little indians"`
  - 1 + {} => `"1[object Object]"`
  - true + (new Date()) => `"trueTue Sat Aug 05 2017 22:38:59 GMT+0900 (KST)"`

- 문자열을 연결하는 방법을 활용하면 변수 값을 문자열로 꾸며서 표시할 수 있다.

  ```javascript
  let a = 3;
  console.log("a 값은 " + a + "입니다.") // a 값은 3입니다.
  ```

<br>

### 2.2 문자열을 조작하는 메서드

- 아래 예시 구문을 직접 작성하고 출력을 확인하여 각 메서드의 동작 원리를 익혀보자

```javascript
let string = "Respect yourself and others will respect you."
let string2 = "We aim above the mark to hit the mark."
let string3 = "Don't find fault, find a remedy."

console.log(string.length)
console.log(string.charAt(3))
console.log(string.concat(string2))
console.log(string.concat(string2, string3))
console.log(string.concat(string2).concat(string3))
console.log(string.includes('c'))
console.log(string.includes(','))
console.log(string.indexOf('y'))
console.log(string.lastIndexOf('y'))
console.log(string.repeat(2))
console.log(string.replace('Respect', 'Good'))
console.log(string.slice(4))
console.log(string.slice(1, 4))
console.log(string3.slice(-4))
console.log(string3.slice(-4, -1))
console.log(string.split(' '))
console.log(string.split(' ', 3)) // split은 뒤에 숫자 인자를 추가하면 앞에서부터 n개의 원소만 출력
console.log(string2.startsWith('aim'))
console.log(string2.startsWith('aim', 3))
console.log(string.substring(3, 5))
console.log(string.substring(-5, -3)) // substring은 slice와 다르게 음수 불가능
console.log(string3.toLowerCase())
console.log(string3.toUpperCase())
console.log(string.trim())
```

<br>

## 3. 연산자

### 3.1 동일 연산자(`==`)

- 좌변과 우변의 피연산자가 같은지 판별
- 내부적으로는 좌우 피연산자의 타입을 변환한 다음에 좌변과 우변이 같은지 <b>느슨하게 비교</b>

#### (1) 좌우 피연산자의 타입이 같을 때

- 같은 객체를 가리킬 때 true, 다르면 false로 판정

> [예시]
>
> ```javascript
> let a = ['w', 'x', 'y', 'z']
> let b = ['w', 'x', 'y', 'z']
> let c = a
> console.log(a == b) // false
> console.log(a == c) // true
> ```
>
> 변수 a와 b에는 모두 배열의 참조가 저장되어 있다.
>
> 각 배열에는 같은 데이터가 담겨 있지만 메모리에서 차지하는 위치가 다르다.
>
> 따라서 a 값과 b 값이 다르다고 판정한다.

<br>

#### (2) 좌우 피연산자의 타입이 다를 때

- 이때는 두 피연산자가 같은 타입이 되도록 타입을 변환한 다음에 다음 규칙에 따라 동일한지 판별한다.
  - `undefined`와 `null`은 같은 것으로 친다.
  - 한쪽이 숫자고 다른 한 쪽이 문자열이면 문자열을 숫자로 변환해서 비교한다.
  - 둘 중에 한쪽이 논리값이 true는 1, false는 0으로 변환해서 비교한다.
  - 한쪽이 객체고 다른 한쪽이 숫자 또는 문자열이면 객체를 `toString`이나 `valueOf` 매서드를 사용해서 원시 타입으로 변환한 다음에 비교한다.
  - 앞의 규칙에서 벗어나면 모두 `같지 않음`으로 판정한다.

> [예시] 아래 구문은 모두 true를 출력한다.
>
> ```javascript
> null == undefined
> 1 == '1'
> '0xff' == 255
> true == 1
> true == '1'
> (new String('a')) == 'a'
> (new Number(3)) == 3
> [9] == 9
> ```

<br>

### 3.2 일치 연산자(`===`)

- 피연산자를 평가한 후에 타입을 변환하지 않은 상태의 두 값을 <b>엄격하게 비교</b>
- 타입과 값이 모두 같으면 같다고 판정하고 그렇지 않으면 같지 않다고 판정
  - 단, `NaN` 만큼은 `NaN`을 포함한 모든 값과 같지 않다고 판정 (`NaN === NaN` => `false`)
  - 즉, `NaN`은 `x !== x`를 만족하는 유일한 값임을 확인할 수 있다.
  - 변수 값이 `NaN`인지는 `isNaN` 함수로도 확인할 수 있다.

> [예시] 아래 구문은 모두 false를 출력한다.
>
> ```javascript
> null === undefined
> 1 === '1'
> '0xff' === 255
> true === 1
> true === '1'
> (new String('a')) === 'a'
> (new Number(3)) === 3
> [9] === 9
> ```

:heavy_check_mark: **그래서 자바스크립트로 프로그래밍할 때 if문에서 같은지 확인하는 구문을 작성할 때 동일 연산자(`==`)보다 일치 연산자(`===`)를 사용하도록 습관화하자!**

<br>

### 3.3 논리 연산자

#### (1) 논리 연산자의 종류

- `a && b` (논리곱) : a와 b 모두 true면 true, 그 외에는 false
- `a || b` (논리합) : a와 b 중 하나라도 true면 true, 모두가 false면 false
- `!a` (부정) : a가 true면 false, false면 true

<br>

#### (2) 논리 연산을 할 때의 타입 변환

| 피연산자                                                    | 평가되는 값 |
| ----------------------------------------------------------- | ----------- |
| 0, -0, empty string, NaN, null, undefined                   | `false`     |
| 0을 제외한 숫자, 빈 문자열을 제외한 문자열, 모든 객체, 심벌 | `true`      |

