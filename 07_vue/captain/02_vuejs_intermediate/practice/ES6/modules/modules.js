// Modules - 자바스크립트 모듈화 방법
// 자바스크팁트 모듈 로더 라이브러리(AMD, Commons JS)기능을 js 언어 자체에서 지원
// 호출되기 전까지는 코드 실행과 동작을 하지 않는 특징이 있음
// 재사용이 가능한 부분을 모듈화하여 사용

// libs.math.js
export function sum(x, y) {
  return x + y
}

export var pi = 3.141593

// main.js
import {sum} from 'libs/math.js'
sum(1, 2)