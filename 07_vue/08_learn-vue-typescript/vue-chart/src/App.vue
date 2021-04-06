<template>
  <div>
    <canvas id="myChart" ref="myChart"></canvas>
  </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from "vue";
import { MyVueRefs } from "@/types/index";
// import Chart from "chart.js";

// export default (Vue as VueConstructor<
//   Vue & { $refs: { myChart: HTMLCanvasElement } }
// >).extend({
export default (Vue as MyVueRefs<{ myChart: HTMLCanvasElement }>).extend({
  mounted() {
    // '!'를 붙여서 null이 아니라고 선언해주는 방법도 있다.(non null assertion)
    // const ctx = document.getElementById("myChart")!.getContext("2d");
    // const canvasElement = document.getElementById(
    //   "myChart"
    // ) as HTMLCanvasElement;

    // 기본적으로 this.$refs의 타입은 Vue | Element | Vue[] | Element[]가 된다.
    const canvasElement = this.$refs.myChart;
    // as 키워드를 이용해서 HTMLCanvasElement 라는 구체적인 타입을 지정해줌으로써 getContext 오류를 해결
    const ctx = canvasElement.getContext("2d");
    // 타입 가드(ctx가 null이면 return)
    if (!ctx) {
      return;
    }
    const chart = new this.$_Chart(ctx, {
      // The type of chart we want to create
      type: "line",

      // The data for our dataset
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July"
        ],
        datasets: [
          {
            label: "My First dataset",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: [0, 10, 5, 2, 20, 30, 45]
          }
        ]
      },

      // Configuration options go here
      options: {}
    });
  }
});
</script>

<style scoped></style>
