// import $ from 'jquery';
// const $ = require('jquery'); -> 타입스크립트에서는 import $ = require('jquery'); 형태로 사용
// import $ = require('jquery'); 와 아래 구문이 가은 방식이다.
import * as $ from 'jquery';

// typescript 에서 commonjs 라이브러리를 표현하는 방법
export = jQuery;
// 위와 같은 표현
// module.export = jQuery;

// 보통 import React as 'react';로 쓰고 있지만 사실 import * as React from 'react'; 로 써야한다.
// 이게 가능한 이유는 tsconfig.json에서 esModuleInterop: true로 설정되어 있기 때문이다.
// esModuleInterop -> commonjs 모듈 시스템으로 되어 있는 걸 es module 처럼 인식될 수 있게 해주는 옵션
// 만약 export default가 있다면 es 최신 모듈 시스템이다.
export = jQuery; // commonjs
export default jQuery; // es module