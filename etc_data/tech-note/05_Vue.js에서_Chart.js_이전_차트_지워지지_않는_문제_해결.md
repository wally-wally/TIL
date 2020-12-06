# Vue.js에서 Chart.js 이전 차트 지워지지 않는 문제 해결

<br>

## :one: `destroy()` API를 사용하는 방법

chart.js 로 차트 구성하면서 데이터가 업데이트될 때 이전 차트가 남겨져서 겹쳐 보이는 현상 해결하려면 Chart.js API 중 .destroy()를 사용해서 canvas 태그에 그려진 이전 차트를 없애주고 새로운 차트 데이터를 넣으면 된다.

```vue
<template>
  <div>
    <canvas id="charts" class="chart-area no-margin" />
    <!-- 아래 버튼을 클릭하면 차트를 업데이트하는 동작을 수행한다고 가정 -->
    <button @click="createChart">차트 데이터 update</button>
  </div>
</template>

<script>
import chart from 'chart.js'

export default {
  data() {
    return {
      chartComponent: null,
      chartOptions: {
        type: 'line',
        options: {}
      }
    }
  },
  mounted() {
    createChart()
  },
  methods: {
    createChart() {
      const chartData = {}

      // 처음 데이터 가져와서 차트 보여줄 때는 chartComponent가 null이므로 무시됩니다.

      // 새롭게 차트를 업데이트하는 경우 chartComponent에 담긴 이전의 차트 데이터를
      // chart.js의 destroy API를 이용해서 지워주는 동작을 수행해야 합니다.
      // 그러면 이전 차트가 겹쳐 보이는 버그가 발생하지 않습니다.
      
      if (this.chartComponent) {
        this.chartComponent.destroy()
      }
      const ctx = document.getElementById('charts')
      this.chartComponent = new chart(ctx, {
        type: this.chartOptions.type,
        data: chartData,
        options: this.chartOptions.options
      })
    }
  },
}
</script>
```

<br>

## :two: mixins의 `reactiveProp`을 사용하는 방법

```js
import { mixins } from 'chart-js'
const { reactiveProp } = mixins
export default {
	...
	mixins: [reactiveProp],
	props: ['chartData'],
	data() {
		...
	},
	mounted() {
		this.renderChart(this.chartData, this.options);		
	},
//	methods: {
//		update() {
//			this.$data._chart.update();		
//		} 
// 메소드로 하는 방법도 있긴함
	}
}
```

