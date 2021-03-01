// 1. Make sure to import 'vue' before declaring augmented types
import Vue from "vue";
// [특수 상황] Chart.js만 해당됨
// export = Chart; 와 같이 작성된 구문은
// import Chart = require("chart.js"); 로 불러와야 한다.
import Chart = require("chart.js");

// chart.js 라이브러리는 아래와 같이 작성해야 vue 컴포넌트 단에서 Chart의 class의 type을 정확하게 추론할 수 있다.
type ChartLib = typeof Chart;

// 2. Specify a file with the types you want to augment
//    Vue has the constructor type in types/vue.d.ts
declare module "vue/types/vue" {
  // 3. Declare augmentation for Vue
  interface Vue {
    $_Chart: ChartLib;
  }
}

// @types/라이브러리_이름 이 제공되지 않는 라이브러리의 경우
// declare module "라이브러리 이름" {
//   interface Vue {
//     // any 타입으로 시작하기
//   }
// }
