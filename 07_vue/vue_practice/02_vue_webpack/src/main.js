// Vue 인스턴스를 최종으로 만드는 파일

// 1. 설치할 vue를 추가
import Vue from 'vue'

// 2. 최상위 컴포넌트 추가(App.vue)
import App from './App.vue'

new Vue({
  render: h => h(App) // h === createElement
}).$mount('#app')